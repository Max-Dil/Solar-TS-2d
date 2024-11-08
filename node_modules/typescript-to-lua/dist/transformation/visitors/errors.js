"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformThrowStatement = exports.transformTryStatement = void 0;
const __1 = require("../..");
const lua = require("../../LuaAST");
const diagnostics_1 = require("../utils/diagnostics");
const lua_ast_1 = require("../utils/lua-ast");
const lualib_1 = require("../utils/lualib");
const scope_1 = require("../utils/scope");
const typescript_1 = require("../utils/typescript");
const async_await_1 = require("./async-await");
const block_1 = require("./block");
const identifier_1 = require("./identifier");
const multi_1 = require("./language-extensions/multi");
const return_1 = require("./return");
const transformAsyncTry = (statement, context) => {
    const [tryBlock] = (0, block_1.transformScopeBlock)(context, statement.tryBlock, scope_1.ScopeType.Try);
    if ((context.options.luaTarget === __1.LuaTarget.Lua50 || context.options.luaTarget === __1.LuaTarget.Lua51) &&
        !context.options.lua51AllowTryCatchInAsyncAwait) {
        context.diagnostics.push((0, diagnostics_1.unsupportedForTargetButOverrideAvailable)(statement, "try/catch inside async functions", __1.LuaTarget.Lua51, "lua51AllowTryCatchInAsyncAwait"));
        return tryBlock.statements;
    }
    // __TS__AsyncAwaiter(<catch block>)
    const awaiter = (0, async_await_1.wrapInAsyncAwaiter)(context, tryBlock.statements, false);
    const awaiterIdentifier = lua.createIdentifier("____try");
    const awaiterDefinition = lua.createVariableDeclarationStatement(awaiterIdentifier, awaiter);
    // local ____try = __TS__AsyncAwaiter(<catch block>)
    const result = [awaiterDefinition];
    if (statement.finallyBlock) {
        const awaiterFinally = lua.createTableIndexExpression(awaiterIdentifier, lua.createStringLiteral("finally"));
        const finallyFunction = lua.createFunctionExpression(lua.createBlock(context.transformStatements(statement.finallyBlock.statements)));
        const finallyCall = lua.createCallExpression(awaiterFinally, [awaiterIdentifier, finallyFunction], statement.finallyBlock);
        // ____try.finally(<finally function>)
        result.push(lua.createExpressionStatement(finallyCall));
    }
    if (statement.catchClause) {
        // ____try.catch(<catch function>)
        const [catchFunction] = transformCatchClause(context, statement.catchClause);
        if (catchFunction.params) {
            catchFunction.params.unshift(lua.createAnonymousIdentifier());
        }
        const awaiterCatch = lua.createTableIndexExpression(awaiterIdentifier, lua.createStringLiteral("catch"));
        const catchCall = lua.createCallExpression(awaiterCatch, [awaiterIdentifier, catchFunction]);
        // await ____try.catch(<catch function>)
        const promiseAwait = (0, lualib_1.transformLuaLibFunction)(context, __1.LuaLibFeature.Await, statement, catchCall);
        result.push(lua.createExpressionStatement(promiseAwait, statement));
    }
    else {
        // await ____try
        const promiseAwait = (0, lualib_1.transformLuaLibFunction)(context, __1.LuaLibFeature.Await, statement, awaiterIdentifier);
        result.push(lua.createExpressionStatement(promiseAwait, statement));
    }
    return result;
};
const transformTryStatement = (statement, context) => {
    var _a;
    if ((0, typescript_1.isInAsyncFunction)(statement)) {
        return transformAsyncTry(statement, context);
    }
    const [tryBlock, tryScope] = (0, block_1.transformScopeBlock)(context, statement.tryBlock, scope_1.ScopeType.Try);
    if ((context.options.luaTarget === __1.LuaTarget.Lua50 || context.options.luaTarget === __1.LuaTarget.Lua51) &&
        (0, typescript_1.isInGeneratorFunction)(statement)) {
        context.diagnostics.push((0, diagnostics_1.unsupportedForTarget)(statement, "try/catch inside generator functions", __1.LuaTarget.Lua51));
        return tryBlock.statements;
    }
    const tryResultIdentifier = lua.createIdentifier("____try");
    const returnValueIdentifier = lua.createIdentifier("____returnValue");
    const result = [];
    const returnedIdentifier = lua.createIdentifier("____hasReturned");
    let returnCondition;
    const pCall = lua.createIdentifier("pcall");
    const tryCall = lua.createCallExpression(pCall, [lua.createFunctionExpression(tryBlock)]);
    if (statement.catchClause && statement.catchClause.block.statements.length > 0) {
        // try with catch
        const [catchFunction, catchScope] = transformCatchClause(context, statement.catchClause);
        const catchIdentifier = lua.createIdentifier("____catch");
        result.push(lua.createVariableDeclarationStatement(catchIdentifier, catchFunction));
        const hasReturn = (_a = tryScope.functionReturned) !== null && _a !== void 0 ? _a : catchScope.functionReturned;
        const tryReturnIdentifiers = [tryResultIdentifier]; // ____try
        if (hasReturn || statement.catchClause.variableDeclaration) {
            tryReturnIdentifiers.push(returnedIdentifier); // ____returned
            if (hasReturn) {
                tryReturnIdentifiers.push(returnValueIdentifier); // ____returnValue
                returnCondition = lua.cloneIdentifier(returnedIdentifier);
            }
        }
        result.push(lua.createVariableDeclarationStatement(tryReturnIdentifiers, tryCall));
        const catchCall = lua.createCallExpression(catchIdentifier, statement.catchClause.variableDeclaration ? [lua.cloneIdentifier(returnedIdentifier)] : []);
        const catchCallStatement = hasReturn
            ? lua.createAssignmentStatement([lua.cloneIdentifier(returnedIdentifier), lua.cloneIdentifier(returnValueIdentifier)], catchCall)
            : lua.createExpressionStatement(catchCall);
        const notTryCondition = lua.createUnaryExpression(tryResultIdentifier, lua.SyntaxKind.NotOperator);
        result.push(lua.createIfStatement(notTryCondition, lua.createBlock([catchCallStatement])));
    }
    else if (tryScope.functionReturned) {
        // try with return, but no catch
        // returnedIdentifier = lua.createIdentifier("____returned");
        const returnedVariables = [tryResultIdentifier, returnedIdentifier, returnValueIdentifier];
        result.push(lua.createVariableDeclarationStatement(returnedVariables, tryCall));
        // change return condition from '____returned' to '____try and ____returned'
        returnCondition = lua.createBinaryExpression(lua.cloneIdentifier(tryResultIdentifier), returnedIdentifier, lua.SyntaxKind.AndOperator);
    }
    else {
        // try without return or catch
        result.push(lua.createExpressionStatement(tryCall));
    }
    if (statement.finallyBlock && statement.finallyBlock.statements.length > 0) {
        result.push(...context.transformStatements(statement.finallyBlock));
    }
    if (returnCondition && returnedIdentifier) {
        const returnValues = [];
        if ((0, multi_1.isInMultiReturnFunction)(context, statement)) {
            returnValues.push((0, lua_ast_1.createUnpackCall)(context, lua.cloneIdentifier(returnValueIdentifier)));
        }
        else {
            returnValues.push(lua.cloneIdentifier(returnValueIdentifier));
        }
        const returnStatement = (0, return_1.createReturnStatement)(context, returnValues, statement);
        const ifReturnedStatement = lua.createIfStatement(returnCondition, lua.createBlock([returnStatement]));
        result.push(ifReturnedStatement);
    }
    return lua.createDoStatement(result, statement);
};
exports.transformTryStatement = transformTryStatement;
const transformThrowStatement = (statement, context) => {
    const parameters = [];
    if (statement.expression) {
        parameters.push(context.transformExpression(statement.expression));
        parameters.push(lua.createNumericLiteral(0));
    }
    return lua.createExpressionStatement(lua.createCallExpression(lua.createIdentifier("error"), parameters), statement);
};
exports.transformThrowStatement = transformThrowStatement;
function transformCatchClause(context, catchClause) {
    const [catchBlock, catchScope] = (0, block_1.transformScopeBlock)(context, catchClause.block, scope_1.ScopeType.Catch);
    const catchParameter = catchClause.variableDeclaration
        ? (0, identifier_1.transformIdentifier)(context, catchClause.variableDeclaration.name)
        : undefined;
    const catchFunction = lua.createFunctionExpression(catchBlock, catchParameter ? [lua.cloneIdentifier(catchParameter)] : []);
    return [catchFunction, catchScope];
}
//# sourceMappingURL=errors.js.map
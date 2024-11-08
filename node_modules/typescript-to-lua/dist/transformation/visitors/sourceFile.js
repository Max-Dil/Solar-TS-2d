"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSourceFileNode = void 0;
const ts = require("typescript");
const lua = require("../../LuaAST");
const utils_1 = require("../../utils");
const lua_ast_1 = require("../utils/lua-ast");
const preceding_statements_1 = require("../utils/preceding-statements");
const scope_1 = require("../utils/scope");
const typescript_1 = require("../utils/typescript");
const transformSourceFileNode = (node, context) => {
    var _a, _b;
    let statements = [];
    if (node.flags & ts.NodeFlags.JsonFile) {
        const [statement] = node.statements;
        if (statement) {
            (0, utils_1.assert)(ts.isExpressionStatement(statement));
            const { precedingStatements, result: expression } = (0, preceding_statements_1.transformInPrecedingStatementScope)(context, () => context.transformExpression(statement.expression));
            statements.push(...precedingStatements);
            statements.push(lua.createReturnStatement([expression]));
        }
        else {
            const errorCall = lua.createCallExpression(lua.createIdentifier("error"), [
                lua.createStringLiteral("Unexpected end of JSON input"),
            ]);
            statements.push(lua.createExpressionStatement(errorCall));
        }
    }
    else {
        context.pushScope(scope_1.ScopeType.File);
        statements = (0, scope_1.performHoisting)(context, context.transformStatements(node.statements));
        context.popScope();
        if (context.isModule) {
            // If export equals was not used. Create the exports table.
            // local ____exports = {}
            if (!(0, typescript_1.hasExportEquals)(node)) {
                statements.unshift(lua.createVariableDeclarationStatement((0, lua_ast_1.createExportsIdentifier)(), lua.createTableExpression()));
            }
            // return ____exports
            statements.push(lua.createReturnStatement([(0, lua_ast_1.createExportsIdentifier)()]));
        }
    }
    const trivia = (_b = (_a = node.getFullText().match(/^#!.*\r?\n/)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : "";
    return lua.createFile(statements, context.usedLuaLibFeatures, trivia, node);
};
exports.transformSourceFileNode = transformSourceFileNode;
//# sourceMappingURL=sourceFile.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorExtensionTransformers = void 0;
const lua = require("../../../LuaAST");
const utils_1 = require("../../../utils");
const CompilerOptions_1 = require("../../../CompilerOptions");
const diagnostics_1 = require("../../utils/diagnostics");
const language_extensions_1 = require("../../utils/language-extensions");
const expression_list_1 = require("../expression-list");
const binaryOperatorMappings = new Map([
    [language_extensions_1.ExtensionKind.AdditionOperatorType, lua.SyntaxKind.AdditionOperator],
    [language_extensions_1.ExtensionKind.AdditionOperatorMethodType, lua.SyntaxKind.AdditionOperator],
    [language_extensions_1.ExtensionKind.SubtractionOperatorType, lua.SyntaxKind.SubtractionOperator],
    [language_extensions_1.ExtensionKind.SubtractionOperatorMethodType, lua.SyntaxKind.SubtractionOperator],
    [language_extensions_1.ExtensionKind.MultiplicationOperatorType, lua.SyntaxKind.MultiplicationOperator],
    [language_extensions_1.ExtensionKind.MultiplicationOperatorMethodType, lua.SyntaxKind.MultiplicationOperator],
    [language_extensions_1.ExtensionKind.DivisionOperatorType, lua.SyntaxKind.DivisionOperator],
    [language_extensions_1.ExtensionKind.DivisionOperatorMethodType, lua.SyntaxKind.DivisionOperator],
    [language_extensions_1.ExtensionKind.ModuloOperatorType, lua.SyntaxKind.ModuloOperator],
    [language_extensions_1.ExtensionKind.ModuloOperatorMethodType, lua.SyntaxKind.ModuloOperator],
    [language_extensions_1.ExtensionKind.PowerOperatorType, lua.SyntaxKind.PowerOperator],
    [language_extensions_1.ExtensionKind.PowerOperatorMethodType, lua.SyntaxKind.PowerOperator],
    [language_extensions_1.ExtensionKind.FloorDivisionOperatorType, lua.SyntaxKind.FloorDivisionOperator],
    [language_extensions_1.ExtensionKind.FloorDivisionOperatorMethodType, lua.SyntaxKind.FloorDivisionOperator],
    [language_extensions_1.ExtensionKind.BitwiseAndOperatorType, lua.SyntaxKind.BitwiseAndOperator],
    [language_extensions_1.ExtensionKind.BitwiseAndOperatorMethodType, lua.SyntaxKind.BitwiseAndOperator],
    [language_extensions_1.ExtensionKind.BitwiseOrOperatorType, lua.SyntaxKind.BitwiseOrOperator],
    [language_extensions_1.ExtensionKind.BitwiseOrOperatorMethodType, lua.SyntaxKind.BitwiseOrOperator],
    [language_extensions_1.ExtensionKind.BitwiseExclusiveOrOperatorType, lua.SyntaxKind.BitwiseExclusiveOrOperator],
    [language_extensions_1.ExtensionKind.BitwiseExclusiveOrOperatorMethodType, lua.SyntaxKind.BitwiseExclusiveOrOperator],
    [language_extensions_1.ExtensionKind.BitwiseLeftShiftOperatorType, lua.SyntaxKind.BitwiseLeftShiftOperator],
    [language_extensions_1.ExtensionKind.BitwiseLeftShiftOperatorMethodType, lua.SyntaxKind.BitwiseLeftShiftOperator],
    [language_extensions_1.ExtensionKind.BitwiseRightShiftOperatorType, lua.SyntaxKind.BitwiseRightShiftOperator],
    [language_extensions_1.ExtensionKind.BitwiseRightShiftOperatorMethodType, lua.SyntaxKind.BitwiseRightShiftOperator],
    [language_extensions_1.ExtensionKind.ConcatOperatorType, lua.SyntaxKind.ConcatOperator],
    [language_extensions_1.ExtensionKind.ConcatOperatorMethodType, lua.SyntaxKind.ConcatOperator],
    [language_extensions_1.ExtensionKind.LessThanOperatorType, lua.SyntaxKind.LessThanOperator],
    [language_extensions_1.ExtensionKind.LessThanOperatorMethodType, lua.SyntaxKind.LessThanOperator],
    [language_extensions_1.ExtensionKind.GreaterThanOperatorType, lua.SyntaxKind.GreaterThanOperator],
    [language_extensions_1.ExtensionKind.GreaterThanOperatorMethodType, lua.SyntaxKind.GreaterThanOperator],
]);
const unaryOperatorMappings = new Map([
    [language_extensions_1.ExtensionKind.NegationOperatorType, lua.SyntaxKind.NegationOperator],
    [language_extensions_1.ExtensionKind.NegationOperatorMethodType, lua.SyntaxKind.NegationOperator],
    [language_extensions_1.ExtensionKind.BitwiseNotOperatorType, lua.SyntaxKind.BitwiseNotOperator],
    [language_extensions_1.ExtensionKind.BitwiseNotOperatorMethodType, lua.SyntaxKind.BitwiseNotOperator],
    [language_extensions_1.ExtensionKind.LengthOperatorType, lua.SyntaxKind.LengthOperator],
    [language_extensions_1.ExtensionKind.LengthOperatorMethodType, lua.SyntaxKind.LengthOperator],
]);
const bitwiseOperatorMapExtensions = new Set([
    language_extensions_1.ExtensionKind.BitwiseAndOperatorType,
    language_extensions_1.ExtensionKind.BitwiseAndOperatorMethodType,
    language_extensions_1.ExtensionKind.BitwiseOrOperatorType,
    language_extensions_1.ExtensionKind.BitwiseOrOperatorMethodType,
    language_extensions_1.ExtensionKind.BitwiseExclusiveOrOperatorType,
    language_extensions_1.ExtensionKind.BitwiseExclusiveOrOperatorMethodType,
    language_extensions_1.ExtensionKind.BitwiseLeftShiftOperatorType,
    language_extensions_1.ExtensionKind.BitwiseLeftShiftOperatorMethodType,
    language_extensions_1.ExtensionKind.BitwiseRightShiftOperatorType,
    language_extensions_1.ExtensionKind.BitwiseRightShiftOperatorMethodType,
    language_extensions_1.ExtensionKind.BitwiseNotOperatorType,
    language_extensions_1.ExtensionKind.BitwiseNotOperatorMethodType,
]);
const requiresLua53 = new Set([
    ...bitwiseOperatorMapExtensions,
    language_extensions_1.ExtensionKind.FloorDivisionOperatorType,
    language_extensions_1.ExtensionKind.FloorDivisionOperatorMethodType,
]);
exports.operatorExtensionTransformers = {};
for (const kind of binaryOperatorMappings.keys()) {
    exports.operatorExtensionTransformers[kind] = transformBinaryOperator;
}
for (const kind of unaryOperatorMappings.keys()) {
    exports.operatorExtensionTransformers[kind] = transformUnaryOperator;
}
function transformBinaryOperator(context, node, kind) {
    if (requiresLua53.has(kind))
        checkHasLua53(context, node, kind);
    const args = (0, language_extensions_1.getBinaryCallExtensionArgs)(context, node, kind);
    if (!args)
        return lua.createNilLiteral();
    const [left, right] = (0, expression_list_1.transformOrderedExpressions)(context, args);
    const luaOperator = binaryOperatorMappings.get(kind);
    (0, utils_1.assert)(luaOperator);
    return lua.createBinaryExpression(left, right, luaOperator);
}
function transformUnaryOperator(context, node, kind) {
    if (requiresLua53.has(kind))
        checkHasLua53(context, node, kind);
    const arg = (0, language_extensions_1.getUnaryCallExtensionArg)(context, node, kind);
    if (!arg)
        return lua.createNilLiteral();
    const luaOperator = unaryOperatorMappings.get(kind);
    (0, utils_1.assert)(luaOperator);
    return lua.createUnaryExpression(context.transformExpression(arg), luaOperator);
}
function checkHasLua53(context, node, kind) {
    const isBefore53 = context.luaTarget === CompilerOptions_1.LuaTarget.Lua50 ||
        context.luaTarget === CompilerOptions_1.LuaTarget.Lua51 ||
        context.luaTarget === CompilerOptions_1.LuaTarget.Lua52 ||
        context.luaTarget === CompilerOptions_1.LuaTarget.LuaJIT ||
        context.luaTarget === CompilerOptions_1.LuaTarget.Universal;
    if (isBefore53) {
        const luaTarget = context.luaTarget === CompilerOptions_1.LuaTarget.Universal ? CompilerOptions_1.LuaTarget.Lua51 : context.luaTarget;
        if (kind === language_extensions_1.ExtensionKind.FloorDivisionOperatorType ||
            kind === language_extensions_1.ExtensionKind.FloorDivisionOperatorMethodType) {
            context.diagnostics.push((0, diagnostics_1.unsupportedForTarget)(node, "Floor division operator", luaTarget));
        }
        else {
            // is bitwise operator
            context.diagnostics.push((0, diagnostics_1.unsupportedForTarget)(node, "Native bitwise operations", luaTarget));
        }
    }
}
//# sourceMappingURL=operators.js.map
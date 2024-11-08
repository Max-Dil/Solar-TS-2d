"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformForOfStatement = void 0;
const ts = require("typescript");
const lua = require("../../../LuaAST");
const lualib_1 = require("../../utils/lualib");
const typescript_1 = require("../../utils/typescript");
const iterable_1 = require("../language-extensions/iterable");
const range_1 = require("../language-extensions/range");
const utils_1 = require("./utils");
const language_extensions_1 = require("../../utils/language-extensions");
const utils_2 = require("../../../utils");
function transformForOfArrayStatement(context, statement, block) {
    const valueVariable = (0, utils_1.transformForInitializer)(context, statement.initializer, block);
    const ipairsCall = lua.createCallExpression(lua.createIdentifier("ipairs"), [
        context.transformExpression(statement.expression),
    ]);
    return lua.createForInStatement(block, [lua.createAnonymousIdentifier(), valueVariable], [ipairsCall], statement);
}
function transformForOfIteratorStatement(context, statement, block) {
    const valueVariable = (0, utils_1.transformForInitializer)(context, statement.initializer, block);
    const iterable = (0, lualib_1.transformLuaLibFunction)(context, lualib_1.LuaLibFeature.Iterator, statement.expression, context.transformExpression(statement.expression));
    return lua.createForInStatement(block, [lua.createAnonymousIdentifier(), valueVariable], [iterable], statement);
}
const transformForOfStatement = (node, context) => {
    const body = lua.createBlock((0, utils_1.transformLoopBody)(context, node));
    if (ts.isCallExpression(node.expression) && (0, range_1.isRangeFunction)(context, node.expression)) {
        return (0, range_1.transformRangeStatement)(context, node, body);
    }
    const iterableExtensionType = (0, language_extensions_1.getIterableExtensionKindForNode)(context, node.expression);
    if (iterableExtensionType) {
        if (iterableExtensionType === language_extensions_1.IterableExtensionKind.Iterable) {
            return (0, iterable_1.transformForOfIterableStatement)(context, node, body);
        }
        else if (iterableExtensionType === language_extensions_1.IterableExtensionKind.Pairs) {
            return (0, iterable_1.transformForOfPairsIterableStatement)(context, node, body);
        }
        else if (iterableExtensionType === language_extensions_1.IterableExtensionKind.PairsKey) {
            return (0, iterable_1.transformForOfPairsKeyIterableStatement)(context, node, body);
        }
        else {
            (0, utils_2.assertNever)(iterableExtensionType);
        }
    }
    if ((0, typescript_1.isArrayType)(context, context.checker.getTypeAtLocation(node.expression))) {
        return transformForOfArrayStatement(context, node, body);
    }
    return transformForOfIteratorStatement(context, node, body);
};
exports.transformForOfStatement = transformForOfStatement;
//# sourceMappingURL=for-of.js.map
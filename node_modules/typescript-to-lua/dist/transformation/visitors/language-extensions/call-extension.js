"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callExtensions = void 0;
exports.transformLanguageExtensionCallExpression = transformLanguageExtensionCallExpression;
const language_extensions_1 = require("../../utils/language-extensions");
const operators_1 = require("./operators");
const table_1 = require("./table");
const allCallExtensionHandlers = {
    ...operators_1.operatorExtensionTransformers,
    ...table_1.tableExtensionTransformers,
};
exports.callExtensions = new Set(Object.keys(allCallExtensionHandlers));
table_1.tableNewExtensions.forEach(kind => exports.callExtensions.add(kind));
function transformLanguageExtensionCallExpression(context, node) {
    const extensionKind = (0, language_extensions_1.getExtensionKindForNode)(context, node.expression);
    if (!extensionKind)
        return;
    const transformer = allCallExtensionHandlers[extensionKind];
    if (transformer) {
        return transformer(context, node, extensionKind);
    }
}
//# sourceMappingURL=call-extension.js.map
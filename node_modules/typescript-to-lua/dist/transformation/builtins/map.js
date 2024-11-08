"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMapConstructorCall = transformMapConstructorCall;
const diagnostics_1 = require("../utils/diagnostics");
const call_1 = require("../visitors/call");
const lualib_1 = require("../utils/lualib");
function transformMapConstructorCall(context, node, calledMethod) {
    const args = (0, call_1.transformArguments)(context, node.arguments);
    const methodName = calledMethod.name.text;
    switch (methodName) {
        case "groupBy":
            return (0, lualib_1.transformLuaLibFunction)(context, lualib_1.LuaLibFeature.MapGroupBy, node, ...args);
        default:
            context.diagnostics.push((0, diagnostics_1.unsupportedProperty)(calledMethod.name, "Map", methodName));
    }
}
//# sourceMappingURL=map.js.map
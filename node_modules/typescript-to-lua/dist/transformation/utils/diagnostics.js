"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incompleteFieldDecoratorWarning = exports.cannotAssignToNodeOfKind = exports.invalidSpreadInCallExtension = exports.invalidMethodCallExtensionUse = exports.undefinedInArrayLiteral = exports.unsupportedOptionalCompileMembersOnly = exports.unsupportedBuiltinOptionalCall = exports.awaitMustBeInAsyncFunction = exports.notAllowedOptionalAssignment = exports.truthyOnlyConditionalValue = exports.annotationDeprecated = exports.invalidCallExtensionUse = exports.invalidMultiReturnAccess = exports.invalidMultiFunctionReturnType = exports.invalidMultiFunctionUse = exports.unsupportedVarDeclaration = exports.invalidAmbientIdentifierName = exports.unsupportedProperty = exports.unsupportedForTargetButOverrideAvailable = exports.unsupportedForTarget = exports.unsupportedRightShiftOperator = exports.unsupportedAccessorInObjectLiteral = exports.invalidPairsIterableWithoutDestructuring = exports.invalidMultiIterableWithoutDestructuring = exports.invalidRangeControlVariable = exports.invalidVarargUse = exports.invalidRangeUse = exports.annotationInvalidArgumentCount = exports.decoratorInvalidContext = exports.unsupportedOverloadAssignment = exports.unsupportedSelfFunctionConversion = exports.unsupportedNoSelfFunctionConversion = exports.forbiddenForIn = exports.unsupportedNodeKind = void 0;
const ts = require("typescript");
const lua = require("../../LuaAST");
const CompilerOptions_1 = require("../../CompilerOptions");
const utils_1 = require("../../utils");
const createDiagnosticFactory = (category, message) => (0, utils_1.createSerialDiagnosticFactory)((node, ...args) => ({
    file: ts.getOriginalNode(node).getSourceFile(),
    start: ts.getOriginalNode(node).getStart(),
    length: ts.getOriginalNode(node).getWidth(),
    messageText: typeof message === "string" ? message : message(...args),
    category,
}));
const createErrorDiagnosticFactory = (message) => createDiagnosticFactory(ts.DiagnosticCategory.Error, message);
const createWarningDiagnosticFactory = (message) => createDiagnosticFactory(ts.DiagnosticCategory.Warning, message);
exports.unsupportedNodeKind = createErrorDiagnosticFactory((kind) => `Unsupported node kind ${ts.SyntaxKind[kind]}`);
exports.forbiddenForIn = createErrorDiagnosticFactory("Iterating over arrays with 'for ... in' is not allowed.");
exports.unsupportedNoSelfFunctionConversion = createErrorDiagnosticFactory((name) => {
    const nameReference = name ? ` '${name}'` : "";
    return (`Unable to convert function with a 'this' parameter to function${nameReference} with no 'this'. ` +
        "To fix, wrap in an arrow function, or declare with 'this: void'.");
});
exports.unsupportedSelfFunctionConversion = createErrorDiagnosticFactory((name) => {
    const nameReference = name ? ` '${name}'` : "";
    return (`Unable to convert function with no 'this' parameter to function${nameReference} with 'this'. ` +
        "To fix, wrap in an arrow function, or declare with 'this: any'.");
});
exports.unsupportedOverloadAssignment = createErrorDiagnosticFactory((name) => {
    const nameReference = name ? ` to '${name}'` : "";
    return (`Unsupported assignment of function with different overloaded types for 'this'${nameReference}. ` +
        "Overloads should all have the same type for 'this'.");
});
exports.decoratorInvalidContext = createErrorDiagnosticFactory("Decorator function cannot have 'this: void'.");
exports.annotationInvalidArgumentCount = createErrorDiagnosticFactory((kind, got, expected) => `'@${kind}' expects ${expected} arguments, but got ${got}.`);
exports.invalidRangeUse = createErrorDiagnosticFactory("$range can only be used in a for...of loop.");
exports.invalidVarargUse = createErrorDiagnosticFactory("$vararg can only be used in a spread element ('...$vararg') in global scope.");
exports.invalidRangeControlVariable = createErrorDiagnosticFactory("For loop using $range must declare a single control variable.");
exports.invalidMultiIterableWithoutDestructuring = createErrorDiagnosticFactory("LuaIterable with a LuaMultiReturn return value type must be destructured.");
exports.invalidPairsIterableWithoutDestructuring = createErrorDiagnosticFactory("LuaPairsIterable type must be destructured in a for...of statement.");
exports.unsupportedAccessorInObjectLiteral = createErrorDiagnosticFactory("Accessors in object literal are not supported.");
exports.unsupportedRightShiftOperator = createErrorDiagnosticFactory("Right shift operator is not supported for target Lua 5.3. Use `>>>` instead.");
const getLuaTargetName = (version) => (version === CompilerOptions_1.LuaTarget.LuaJIT ? "LuaJIT" : `Lua ${version}`);
exports.unsupportedForTarget = createErrorDiagnosticFactory((functionality, version) => `${functionality} is/are not supported for target ${getLuaTargetName(version)}.`);
exports.unsupportedForTargetButOverrideAvailable = createErrorDiagnosticFactory((functionality, version, optionName) => `As a precaution, ${functionality} is/are not supported for target ${getLuaTargetName(version)} due to language features/limitations. ` +
    `However "--${optionName}" can be used to bypass this precaution. ` +
    "See https://typescripttolua.github.io/docs/configuration for more information.");
exports.unsupportedProperty = createErrorDiagnosticFactory((parentName, property) => `${parentName}.${property} is unsupported.`);
exports.invalidAmbientIdentifierName = createErrorDiagnosticFactory((text) => `Invalid ambient identifier name '${text}'. Ambient identifiers must be valid lua identifiers.`);
exports.unsupportedVarDeclaration = createErrorDiagnosticFactory("`var` declarations are not supported. Use `let` or `const` instead.");
exports.invalidMultiFunctionUse = createErrorDiagnosticFactory("The $multi function must be called in a return statement.");
exports.invalidMultiFunctionReturnType = createErrorDiagnosticFactory("The $multi function cannot be cast to a non-LuaMultiReturn type.");
exports.invalidMultiReturnAccess = createErrorDiagnosticFactory("The LuaMultiReturn type can only be accessed via an element access expression of a numeric type.");
exports.invalidCallExtensionUse = createErrorDiagnosticFactory("This function must be called directly and cannot be referred to.");
exports.annotationDeprecated = createWarningDiagnosticFactory((kind) => `'@${kind}' is deprecated and will be removed in a future update. Please update your code before upgrading to the next release, otherwise your project will no longer compile. ` +
    `See https://typescripttolua.github.io/docs/advanced/compiler-annotations#${kind.toLowerCase()} for more information.`);
exports.truthyOnlyConditionalValue = createWarningDiagnosticFactory("Only false and nil evaluate to 'false' in Lua, everything else is considered 'true'. Explicitly compare the value with ===.");
exports.notAllowedOptionalAssignment = createErrorDiagnosticFactory("The left-hand side of an assignment expression may not be an optional property access.");
exports.awaitMustBeInAsyncFunction = createErrorDiagnosticFactory("Await can only be used inside async functions.");
exports.unsupportedBuiltinOptionalCall = createErrorDiagnosticFactory("Optional calls are not supported for builtin or language extension functions.");
exports.unsupportedOptionalCompileMembersOnly = createErrorDiagnosticFactory("Optional calls are not supported on enums marked with @compileMembersOnly.");
exports.undefinedInArrayLiteral = createErrorDiagnosticFactory("Array literals may not contain undefined or null.");
exports.invalidMethodCallExtensionUse = createErrorDiagnosticFactory("This language extension must be called as a method.");
exports.invalidSpreadInCallExtension = createErrorDiagnosticFactory("Spread elements are not supported in call extensions.");
exports.cannotAssignToNodeOfKind = createErrorDiagnosticFactory((kind) => `Cannot create assignment assigning to a node of type ${lua.SyntaxKind[kind]}.`);
exports.incompleteFieldDecoratorWarning = createWarningDiagnosticFactory("You are using a class field decorator, note that tstl ignores returned value initializers!");
//# sourceMappingURL=diagnostics.js.map
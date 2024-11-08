import { TransformationContext } from "../../context";
import * as ts from "typescript";
import { ExtensionKind } from "../../utils/language-extensions";
import * as lua from "../../../LuaAST";
export declare const callExtensions: Set<ExtensionKind>;
export type LanguageExtensionCallTransformer = (context: TransformationContext, node: ts.CallExpression, extensionKind: ExtensionKind) => lua.Expression;
export type LanguageExtensionCallTransformerMap = {
    [P in ExtensionKind]?: LanguageExtensionCallTransformer;
};
export declare function transformLanguageExtensionCallExpression(context: TransformationContext, node: ts.CallExpression): lua.Expression | undefined;

import * as ts from "typescript";
import { TransformationContext } from "../../context";
import { ExtensionKind } from "../../utils/language-extensions";
import { LanguageExtensionCallTransformerMap } from "./call-extension";
export declare function isTableNewCall(context: TransformationContext, node: ts.NewExpression): boolean;
export declare const tableNewExtensions: ExtensionKind[];
export declare const tableExtensionTransformers: LanguageExtensionCallTransformerMap;

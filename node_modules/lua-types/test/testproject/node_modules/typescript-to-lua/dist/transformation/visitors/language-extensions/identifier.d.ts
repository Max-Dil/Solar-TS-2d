import * as ts from "typescript";
import { ExtensionKind } from "../../utils/language-extensions";
import { TransformationContext } from "../../context";
export declare function isIdentifierExtensionValue(symbol: ts.Symbol | undefined, extensionKind: ExtensionKind): boolean;
export declare function reportInvalidExtensionValue(context: TransformationContext, identifier: ts.Identifier, extensionKind: ExtensionKind): void;

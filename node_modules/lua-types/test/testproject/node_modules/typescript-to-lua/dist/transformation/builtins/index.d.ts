import * as ts from "typescript";
import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export declare function transformBuiltinPropertyAccessExpression(context: TransformationContext, node: ts.PropertyAccessExpression): lua.Expression | undefined;
export declare function transformBuiltinCallExpression(context: TransformationContext, node: ts.CallExpression): lua.Expression | undefined;
export declare function transformBuiltinIdentifierExpression(context: TransformationContext, node: ts.Identifier, symbol: ts.Symbol | undefined): lua.Expression | undefined;
export declare function checkForLuaLibType(context: TransformationContext, type: ts.Type): void;

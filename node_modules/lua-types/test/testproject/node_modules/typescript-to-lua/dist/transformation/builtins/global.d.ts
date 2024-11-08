import * as ts from "typescript";
import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export declare function tryTransformBuiltinGlobalCall(context: TransformationContext, node: ts.CallExpression, expressionType: ts.Type): lua.Expression | undefined;

import * as ts from "typescript";
import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export declare function transformMathProperty(context: TransformationContext, node: ts.PropertyAccessExpression): lua.Expression | undefined;
export declare function transformMathCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.Expression | undefined;

import * as ts from "typescript";
import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export declare function transformFunctionPrototypeCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.CallExpression | undefined;
export declare function transformFunctionProperty(context: TransformationContext, node: ts.PropertyAccessExpression): lua.Expression | undefined;

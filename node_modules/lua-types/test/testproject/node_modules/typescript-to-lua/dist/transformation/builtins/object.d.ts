import * as lua from "../../LuaAST";
import * as ts from "typescript";
import { TransformationContext } from "../context";
export declare function transformObjectConstructorCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.Expression | undefined;
export declare function tryTransformObjectPrototypeCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.Expression | undefined;

import * as lua from "../../LuaAST";
import * as ts from "typescript";
import { TransformationContext } from "../context";
export declare function transformMapConstructorCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.Expression | undefined;

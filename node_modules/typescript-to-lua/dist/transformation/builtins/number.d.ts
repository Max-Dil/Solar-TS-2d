import ts = require("typescript");
import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export declare function transformNumberPrototypeCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.Expression | undefined;
export declare function transformNumberProperty(context: TransformationContext, node: ts.PropertyAccessExpression): lua.Expression | undefined;
export declare function transformNumberConstructorCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.CallExpression | undefined;

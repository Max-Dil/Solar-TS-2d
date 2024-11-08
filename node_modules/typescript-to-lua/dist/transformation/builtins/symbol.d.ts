import ts = require("typescript");
import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export declare function transformSymbolConstructorCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.CallExpression | undefined;

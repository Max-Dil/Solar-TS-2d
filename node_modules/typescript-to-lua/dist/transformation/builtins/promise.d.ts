import * as ts from "typescript";
import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export declare function isPromiseClass(context: TransformationContext, node: ts.Identifier): boolean;
export declare function createPromiseIdentifier(original: ts.Node): lua.Identifier;
export declare function transformPromiseConstructorCall(context: TransformationContext, node: ts.CallExpression, calledMethod: ts.PropertyAccessExpression): lua.Expression | undefined;
export declare function createStaticPromiseFunctionAccessor(functionName: string, node: ts.Node): lua.TableIndexExpression;

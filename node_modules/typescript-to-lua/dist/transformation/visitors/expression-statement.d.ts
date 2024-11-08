import * as ts from "typescript";
import * as lua from "../../LuaAST";
import { FunctionVisitor } from "../context";
export declare const transformExpressionStatement: FunctionVisitor<ts.ExpressionStatement>;
export declare function wrapInStatement(result: lua.Expression): lua.Statement | undefined;

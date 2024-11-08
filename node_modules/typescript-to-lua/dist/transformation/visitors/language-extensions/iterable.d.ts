import * as ts from "typescript";
import * as lua from "../../../LuaAST";
import { TransformationContext } from "../../context";
export declare function transformForOfIterableStatement(context: TransformationContext, statement: ts.ForOfStatement, block: lua.Block): lua.Statement;
export declare function transformForOfPairsIterableStatement(context: TransformationContext, statement: ts.ForOfStatement, block: lua.Block): lua.Statement;
export declare function transformForOfPairsKeyIterableStatement(context: TransformationContext, statement: ts.ForOfStatement, block: lua.Block): lua.Statement;

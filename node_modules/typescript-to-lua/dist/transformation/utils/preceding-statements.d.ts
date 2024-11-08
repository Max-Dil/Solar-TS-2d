import * as lua from "../../LuaAST";
import { TransformationContext } from "../context";
export interface WithPrecedingStatements<T extends lua.Statement | lua.Statement[] | lua.Expression | lua.Expression[]> {
    precedingStatements: lua.Statement[];
    result: T;
}
export declare function transformInPrecedingStatementScope<TReturn extends lua.Statement | lua.Statement[] | lua.Expression | lua.Expression[]>(context: TransformationContext, transformer: () => TReturn): WithPrecedingStatements<TReturn>;

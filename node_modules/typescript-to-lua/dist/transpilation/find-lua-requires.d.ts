export interface LuaRequire {
    from: number;
    to: number;
    requirePath: string;
}
export declare function findLuaRequires(lua: string): LuaRequire[];

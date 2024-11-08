import * as ts from "typescript";
import { Plugin } from "./plugins";
import { TranspileOptions } from "./transpile";
import { EmitFile, EmitHost, ProcessedFile } from "./utils";
export interface TranspilerOptions {
    emitHost?: EmitHost;
}
export interface EmitOptions extends TranspileOptions {
    writeFile?: ts.WriteFileCallback;
}
export interface EmitResult {
    emitSkipped: boolean;
    diagnostics: readonly ts.Diagnostic[];
}
export declare class Transpiler {
    protected emitHost: EmitHost;
    constructor({ emitHost }?: TranspilerOptions);
    emit(emitOptions: EmitOptions): EmitResult;
    private emitFiles;
    protected getEmitPlan(program: ts.Program, diagnostics: ts.Diagnostic[], files: ProcessedFile[], plugins: Plugin[]): {
        emitPlan: EmitFile[];
    };
    private getLuaLibBundleContent;
}
export declare function getEmitPath(file: string, program: ts.Program): string;
export declare function getEmitPathRelativeToOutDir(fileName: string, program: ts.Program): string;
export declare function getSourceDir(program: ts.Program): string;
export declare function getEmitOutDir(program: ts.Program): string;
export declare function getProjectRoot(program: ts.Program): string;

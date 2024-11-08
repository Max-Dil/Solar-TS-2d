import * as ts from "typescript";
import { EmitHost, ProcessedFile } from "./utils";
import { Plugin } from "./plugins";
interface ResolutionResult {
    resolvedFiles: ProcessedFile[];
    diagnostics: ts.Diagnostic[];
}
export declare function resolveDependencies(program: ts.Program, files: ProcessedFile[], emitHost: EmitHost, plugins: Plugin[]): ResolutionResult;
export {};

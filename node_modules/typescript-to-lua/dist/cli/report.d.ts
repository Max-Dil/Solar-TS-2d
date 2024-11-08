import * as ts from "typescript";
export declare const prepareDiagnosticForFormatting: (diagnostic: ts.Diagnostic) => {
    code: any;
    reportsUnnecessary?: {};
    reportsDeprecated?: {};
    source?: string;
    relatedInformation?: ts.DiagnosticRelatedInformation[];
    category: ts.DiagnosticCategory;
    file: ts.SourceFile | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | ts.DiagnosticMessageChain;
};
export declare function createDiagnosticReporter(pretty: boolean, system?: ts.System): ts.DiagnosticReporter;

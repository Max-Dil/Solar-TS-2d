"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformInPrecedingStatementScope = transformInPrecedingStatementScope;
function transformInPrecedingStatementScope(context, transformer) {
    context.pushPrecedingStatements();
    const statementOrStatements = transformer();
    const precedingStatements = context.popPrecedingStatements();
    return { precedingStatements, result: statementOrStatements };
}
//# sourceMappingURL=preceding-statements.js.map
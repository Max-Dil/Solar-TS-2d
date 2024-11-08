"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymbolInfo = getSymbolInfo;
exports.getSymbolIdOfSymbol = getSymbolIdOfSymbol;
exports.trackSymbolReference = trackSymbolReference;
exports.getIdentifierSymbolId = getIdentifierSymbolId;
const spread_1 = require("../visitors/spread");
const scope_1 = require("./scope");
function getSymbolInfo(context, symbolId) {
    return context.symbolInfoMap.get(symbolId);
}
function getSymbolIdOfSymbol(context, symbol) {
    return context.symbolIdMaps.get(symbol);
}
function trackSymbolReference(context, symbol, identifier) {
    // Track first time symbols are seen
    let symbolId = context.symbolIdMaps.get(symbol);
    if (symbolId === undefined) {
        symbolId = context.nextSymbolId();
        context.symbolIdMaps.set(symbol, symbolId);
        context.symbolInfoMap.set(symbolId, { symbol, firstSeenAtPos: identifier.pos });
    }
    // If isOptimizedVarArgSpread returns true, the identifier will not appear in the resulting Lua.
    // Only the optimized ellipses (...) will be used.
    if (!(0, spread_1.isOptimizedVarArgSpread)(context, symbol, identifier)) {
        (0, scope_1.markSymbolAsReferencedInCurrentScopes)(context, symbolId, identifier);
    }
    return symbolId;
}
function getIdentifierSymbolId(context, identifier, symbol) {
    if (symbol) {
        return trackSymbolReference(context, symbol, identifier);
    }
}
//# sourceMappingURL=symbols.js.map
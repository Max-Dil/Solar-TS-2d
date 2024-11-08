"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLuaRequires = findLuaRequires;
function findLuaRequires(lua) {
    return findRequire(lua, 0);
}
function findRequire(lua, offset) {
    const result = [];
    while (offset < lua.length) {
        const c = lua[offset];
        if (c === "r" &&
            (offset === 0 ||
                isWhitespace(lua[offset - 1]) ||
                lua[offset - 1] === "]" ||
                lua[offset - 1] === "(" ||
                lua[offset - 1] === "[")) {
            const m = matchRequire(lua, offset);
            if (m.matched) {
                offset = m.match.to + 1;
                result.push(m.match);
            }
            else {
                offset = m.end;
            }
        }
        else if (c === '"' || c === "'") {
            offset = readString(lua, offset, c).offset; // Skip string and surrounding quotes
        }
        else if (c === "-" && offset + 1 < lua.length && lua[offset + 1] === "-") {
            offset = skipComment(lua, offset);
        }
        else {
            offset++;
        }
    }
    return result;
}
function matchRequire(lua, offset) {
    const start = offset;
    for (const c of "require") {
        if (offset > lua.length) {
            return { matched: false, end: offset };
        }
        if (lua[offset] !== c) {
            return { matched: false, end: offset };
        }
        offset++;
    }
    offset = skipWhitespace(lua, offset);
    let hasParentheses = false;
    if (offset > lua.length) {
        return { matched: false, end: offset };
    }
    else {
        if (lua[offset] === "(") {
            hasParentheses = true;
            offset++;
            offset = skipWhitespace(lua, offset);
        }
        else if (lua[offset] === '"' || lua[offset] === "'") {
            // require without parentheses
        }
        else {
            // otherwise fail match
            return { matched: false, end: offset };
        }
    }
    if (offset > lua.length || (lua[offset] !== '"' && lua[offset] !== "'")) {
        return { matched: false, end: offset };
    }
    const { value: requireString, offset: offsetAfterString } = readString(lua, offset, lua[offset]);
    offset = offsetAfterString; // Skip string and surrounding quotes
    if (hasParentheses) {
        offset = skipWhitespace(lua, offset);
        if (offset > lua.length || lua[offset] !== ")") {
            return { matched: false, end: offset };
        }
        offset++;
    }
    return { matched: true, match: { from: start, to: offset - 1, requirePath: requireString } };
}
function readString(lua, offset, delimiter) {
    expect(lua, offset, delimiter);
    offset++;
    let start = offset;
    let result = "";
    let escaped = false;
    while (offset < lua.length && (lua[offset] !== delimiter || escaped)) {
        if (lua[offset] === "\\" && !escaped) {
            escaped = true;
        }
        else {
            if (lua[offset] === delimiter) {
                result += lua.slice(start, offset - 1);
                start = offset;
            }
            escaped = false;
        }
        offset++;
    }
    if (offset < lua.length) {
        expect(lua, offset, delimiter);
    }
    result += lua.slice(start, offset);
    return { value: result, offset: offset + 1 };
}
function skipWhitespace(lua, offset) {
    while (offset < lua.length && isWhitespace(lua[offset])) {
        offset++;
    }
    return offset;
}
function isWhitespace(c) {
    return c === " " || c === "\t" || c === "\r" || c === "\n";
}
function skipComment(lua, offset) {
    expect(lua, offset, "-");
    expect(lua, offset + 1, "-");
    offset += 2;
    if (offset + 1 < lua.length && lua[offset] === "[" && lua[offset + 1] === "[") {
        return skipMultiLineComment(lua, offset);
    }
    else {
        return skipSingleLineComment(lua, offset);
    }
}
function skipMultiLineComment(lua, offset) {
    while (offset < lua.length && !(lua[offset] === "]" && lua[offset - 1] === "]")) {
        offset++;
    }
    return offset + 1;
}
function skipSingleLineComment(lua, offset) {
    while (offset < lua.length && lua[offset] !== "\n") {
        offset++;
    }
    return offset + 1;
}
function expect(lua, offset, char) {
    if (lua[offset] !== char) {
        throw new Error(`Expected ${char} at position ${offset} but found ${lua[offset]}`);
    }
}
//# sourceMappingURL=find-lua-requires.js.map
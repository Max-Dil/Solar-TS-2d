"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmitOutputCollector = createEmitOutputCollector;
const utils_1 = require("../utils");
function createEmitOutputCollector(luaExtension = ".lua") {
    const files = [];
    const writeFile = (fileName, data, _bom, _onError, sourceFiles = []) => {
        let file = files.find(f => (0, utils_1.intersection)(f.sourceFiles, sourceFiles).length > 0);
        if (!file) {
            file = { outPath: fileName, sourceFiles: [...sourceFiles] };
            files.push(file);
        }
        else {
            file.sourceFiles = (0, utils_1.union)(file.sourceFiles, sourceFiles);
        }
        if (fileName.endsWith(luaExtension)) {
            file.lua = data;
        }
        else if (fileName.endsWith(`${luaExtension}.map`)) {
            file.luaSourceMap = data;
        }
        else if (fileName.endsWith(".js")) {
            file.js = data;
        }
        else if (fileName.endsWith(".js.map")) {
            file.jsSourceMap = data;
        }
        else if (fileName.endsWith(".d.ts")) {
            file.declaration = data;
        }
        else if (fileName.endsWith(".d.ts.map")) {
            file.declarationMap = data;
        }
    };
    return { writeFile, files };
}
//# sourceMappingURL=output-collector.js.map
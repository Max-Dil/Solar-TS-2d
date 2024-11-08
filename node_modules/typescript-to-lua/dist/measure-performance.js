"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSection = startSection;
exports.endSection = endSection;
exports.isMeasurementEnabled = isMeasurementEnabled;
exports.enableMeasurement = enableMeasurement;
exports.disableMeasurement = disableMeasurement;
exports.forEachMeasure = forEachMeasure;
exports.getTotalDuration = getTotalDuration;
const perf_hooks_1 = require("perf_hooks");
// We use our own performance hooks implementation for easier use, but also call node's performance hooks, so it shows up in the profiler.
let enabled = false;
const marks = new Map();
const durations = new Map();
function timestamp() {
    return perf_hooks_1.performance.now();
}
/**
 * Marks a performance event, with the given markName.
 */
function mark(markName) {
    if (enabled) {
        marks.set(markName, timestamp());
        perf_hooks_1.performance.mark(markName);
    }
}
/**
 * Adds a performance measurement with the specified name.
 *
 * @param measureName The name of the performance measurement.
 * @param startMarkName The name of the starting mark
 * @param endMarkName The name of the ending mark
 */
function measure(measureName, startMarkName, endMarkName) {
    var _a, _b, _c;
    if (enabled) {
        const end = (_a = marks.get(endMarkName)) !== null && _a !== void 0 ? _a : timestamp();
        const start = (_b = marks.get(startMarkName)) !== null && _b !== void 0 ? _b : perf_hooks_1.performance.timeOrigin;
        const previousDuration = (_c = durations.get(measureName)) !== null && _c !== void 0 ? _c : 0;
        durations.set(measureName, previousDuration + (end - start));
        perf_hooks_1.performance.measure(measureName, startMarkName, endMarkName);
    }
}
/**
 * Starts a performance measurement section.
 * @param name name of the measurement
 */
function startSection(name) {
    mark("start " + name);
}
/**
 * Ends a performance measurement section.
 * @param name name of the measurement
 */
function endSection(name) {
    mark("end " + name);
    measure(name, "start " + name, "end " + name);
}
function isMeasurementEnabled() {
    return enabled;
}
function enableMeasurement() {
    if (!enabled) {
        enabled = true;
    }
}
function disableMeasurement() {
    if (enabled) {
        enabled = false;
        marks.clear();
        durations.clear();
    }
}
function forEachMeasure(callback) {
    durations.forEach((duration, measureName) => callback(measureName, duration));
}
function getTotalDuration() {
    let total = 0;
    forEachMeasure((_, duration) => (total += duration));
    return total;
}
//# sourceMappingURL=measure-performance.js.map
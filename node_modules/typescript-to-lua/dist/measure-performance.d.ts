/**
 * Starts a performance measurement section.
 * @param name name of the measurement
 */
export declare function startSection(name: string): void;
/**
 * Ends a performance measurement section.
 * @param name name of the measurement
 */
export declare function endSection(name: string): void;
export declare function isMeasurementEnabled(): boolean;
export declare function enableMeasurement(): void;
export declare function disableMeasurement(): void;
export declare function forEachMeasure(callback: (measureName: string, duration: number) => void): void;
export declare function getTotalDuration(): number;

import * as ts from "typescript";
import { TransformationContext } from "../../context";
export declare function typeAlwaysHasSomeOfFlags(context: TransformationContext, type: ts.Type, flags: ts.TypeFlags): boolean;
export declare function typeCanHaveSomeOfFlags(context: TransformationContext, type: ts.Type, flags: ts.TypeFlags): boolean;
export declare function isStringType(context: TransformationContext, type: ts.Type): boolean;
export declare function isNumberType(context: TransformationContext, type: ts.Type): boolean;
/**
 * Iterate over a type and its bases until the callback returns true.
 */
export declare function forTypeOrAnySupertype(context: TransformationContext, type: ts.Type, predicate: (type: ts.Type) => boolean): boolean;
export declare function isArrayType(context: TransformationContext, type: ts.Type): boolean;
export declare function isFunctionType(type: ts.Type): boolean;
export declare function canBeFalsy(context: TransformationContext, type: ts.Type): boolean;
export declare function canBeFalsyWhenNotNull(context: TransformationContext, type: ts.Type): boolean;

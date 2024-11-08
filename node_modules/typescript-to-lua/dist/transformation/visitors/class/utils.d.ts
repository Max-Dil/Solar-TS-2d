import * as ts from "typescript";
import { TransformationContext } from "../../context";
export declare function isPrivateNode(node: ts.HasModifiers): boolean;
export declare function isStaticNode(node: ts.HasModifiers): boolean;
export declare function getExtendsClause(node: ts.ClassLikeDeclarationBase): ts.HeritageClause | undefined;
export declare function getExtendedNode(node: ts.ClassLikeDeclarationBase): ts.ExpressionWithTypeArguments | undefined;
export declare function getExtendedType(context: TransformationContext, node: ts.ClassLikeDeclarationBase): ts.Type | undefined;

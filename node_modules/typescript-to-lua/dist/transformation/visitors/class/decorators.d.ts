import * as ts from "typescript";
import * as lua from "../../../LuaAST";
import { TransformationContext } from "../../context";
export declare function transformDecoratorExpression(context: TransformationContext, decorator: ts.Decorator): lua.Expression;
export declare function createClassDecoratingExpression(context: TransformationContext, classDeclaration: ts.ClassDeclaration | ts.ClassExpression, className: lua.Expression): lua.Expression;
export declare function createClassMethodDecoratingExpression(context: TransformationContext, methodDeclaration: ts.MethodDeclaration, originalMethod: lua.Expression, className: lua.Identifier): lua.Expression;
export declare function createClassAccessorDecoratingExpression(context: TransformationContext, accessor: ts.AccessorDeclaration, originalAccessor: lua.Expression, className: lua.Identifier): lua.Expression;
export declare function createClassPropertyDecoratingExpression(context: TransformationContext, property: ts.PropertyDeclaration, className: lua.Identifier): lua.Expression;
export declare function createConstructorDecoratingExpression(context: TransformationContext, node: ts.ConstructorDeclaration, className: lua.Identifier): lua.Statement | undefined;

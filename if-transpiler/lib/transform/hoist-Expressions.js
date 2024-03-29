/*
 Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
	'use strict';

	var Name, Syntax, common, modified;

	Name = 'hoist-Expressions';

	common = require('../common');
	Syntax = common.Syntax;

	function hoistExpressions(tree, options) {
		var result;

		result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
		modified = false;


		common.traverse(result, {
			enter: function enter(node) {
				var statements, i, stmt, tmpId, tmpVar, newVarDeclStmt;
				if (node.type === Syntax.Program || node.type === Syntax.BlockStatement
					|| node.type === Syntax.TryStatement) {
					if (node.type === Syntax.TryStatement)
						statements = node.handlers[0].body.body;
					else
						statements = node.body;
					outerLoop:for (i = 0; i < statements.length; i++) {
						stmt = statements[i];
						switch (stmt.type) {
							case Syntax.ThrowStatement:
							case Syntax.ReturnStatement:
								if (stmt.argument && stmt.argument.type !== Syntax.Identifier) {
									// Create new Variable Declaration statement
									newVarDeclStmt = common.buildVarDeclStmt(stmt.argument);
									stmt.argument = newVarDeclStmt.declarations[0].id;
									// Insert the new variable declaration statement before
									// the current statement
									statements.splice(i, 0, newVarDeclStmt);
									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;
									// force the loop to continue
									continue;
								}
								break;
							case Syntax.ForStatement:
								if (stmt.init && stmt.init.type !== Syntax.Identifier) {
									if (stmt.init.type === Syntax.VariableDeclaration) {
										statements.splice(i, 0, stmt.init);
										stmt.init = null;
									} else {
										// Create new Variable Declaration statement
										newVarDeclStmt = common.buildVarDeclStmt(stmt.init);
										stmt.init = null;
										// Insert the new variable declaration statement before
										// the current statement
										statements.splice(i, 0, newVarDeclStmt);
									}
									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;
									// force the loop to continue
									continue;
								}
								if (stmt.update && stmt.update.type !== Syntax.Identifier) {
									// Create new Variable Declaration statement
									newVarDeclStmt = common.buildVarDeclStmt(stmt.update);
									stmt.update = null;
									// Look for any continue statement and insert update statement
									// before it.
									common.insertUpdateStmtBeforeContinue(stmt.body.body, newVarDeclStmt);
									// Add the same statement to the end of the for-loop body
									stmt.body.body.push(newVarDeclStmt);
									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;
									// force the loop to continue
									continue;
								}
								if (stmt.test && stmt.test.type !== Syntax.Identifier) {
									// Create new Variable Declaration statement
									newVarDeclStmt = common.buildVarDeclStmt(stmt.test);
									stmt.test = newVarDeclStmt.declarations[0].id;
									// Look for any continue statement and insert update statement
									// before it.
									common.insertUpdateStmtBeforeContinue(stmt.body.body, newVarDeclStmt);
									// Insert the new variable declaration statement before
									// the current statement
									statements.splice(i, 0, newVarDeclStmt);
									// Add the same statement to the end of the for-loop body
									stmt.body.body.push(common.deepCopy(newVarDeclStmt));
									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;
									// force the loop to continue
									continue;
								}

								break;
							case Syntax.ForInStatement:
								if (!common.isIdentOrLiteral(stmt.left.type) &&
									stmt.left.type === Syntax.VariableDeclaration) {
									// If the left side of a for-in statement is not an ident
									// e.g. a declaration, hoist it.
									var varDecl = stmt.left;
									// Replace left side of the for-in with the identifier
									stmt.left = varDecl.declarations[0].id;
									// Insert the new variable declaration statement before
									// the current statement
									statements.splice(i, 0, varDecl);

									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;

									// force the loop to continue
									continue;
								}
								if (!common.isIdentOrLiteral(stmt.right.type)) {
									// Create new Variable Declaration statement
									newVarDeclStmt = common.buildVarDeclStmt(stmt.right);
									stmt.right = newVarDeclStmt.declarations[0].id;
									// Insert the new variable declaration statement before
									// the current statement
									statements.splice(i, 0, newVarDeclStmt);

									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;

								}
								break;
							case Syntax.WithStatement:
								if (!common.isIdentOrLiteral(stmt.object.type) &&
									stmt.object.type !== Syntax.ThisExpression) {
									// Create new Variable Declaration statement
									newVarDeclStmt = common.buildVarDeclStmt(stmt.object);
									stmt.object = newVarDeclStmt.declarations[0].id;
									// Insert the new variable declaration statement before
									// the current statement
									statements.splice(i, 0, newVarDeclStmt);

									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;
								}
								break;

							case Syntax.IfStatement:
								if (!common.isIdentOrLiteral(stmt.test.type)) {
									// Create new Variable Declaration statement
									newVarDeclStmt = common.buildVarDeclStmt(stmt.test);
									stmt.test = newVarDeclStmt.declarations[0].id;
									// Insert the new variable declaration statement before
									// the current statement
									statements.splice(i, 0, newVarDeclStmt);

									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;
								}
								break;

							case Syntax.WhileStatement:
							case Syntax.DoWhileStatement:
								if (!common.isIdentOrLiteral(stmt.test.type)) {
									// Create new Variable Declaration statement
									newVarDeclStmt = common.buildVarDeclStmt(stmt.test);
									stmt.test = newVarDeclStmt.declarations[0].id;
									// Insert the new variable declaration statement before
									// only while statement.
									if (stmt.type === Syntax.WhileStatement)
										statements.splice(i, 0, newVarDeclStmt);
									else {
										var tmp = common.deepCopy(newVarDeclStmt);
										tmp.declarations[0].init = null;
										statements.splice(i, 0, tmp);
									}

									// Look for any continue statement and insert update statement
									// before it.
									common.insertUpdateStmtBeforeContinue(stmt.body.body, newVarDeclStmt);

									// Add the same statement to the end of the for-loop body
									stmt.body.body.push(common.deepCopy(newVarDeclStmt));
									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;
								}
								break;

							case Syntax.VariableDeclaration:
								var decls = stmt.declarations;
								// loop backwards on the declarations and move them to new
								// assignment statements, so it is easier to deal with them.
								for (var j = decls.length - 1; j >= 0; j--) {
									// if this var is initialized move the initialization to
									// a new assignment statement.
									if (decls[j].type === Syntax.VariableDeclarator && decls[j].init) {
										// Create a new ExprStmt with an assignment expression
										var newAssigStmt = {
											type: Syntax.ExpressionStatement, expression: {
												type: Syntax.AssignmentExpression,
												left: decls[j].id,
												right: decls[j].init,
												operator: "="
											}
										};
										// Clear the init from the var decls stmt
										decls[j].init = null;
										// Insert the new variable declaration statement before
										// the current statement
										statements.splice(i + 1, 0, newAssigStmt);
									}
								}
								break;

							case Syntax.ExpressionStatement:
								if (stmt.expression.type !== Syntax.AssignmentExpression &&
									stmt.expression.type !== Syntax.Identifier) {
									var initExpr;
									//if (stmt.expression.type === Syntax.CallExpression &&
									//	stmt.expression.callee.type === Syntax.CallExpression) {
									//	tmpVar = {type: Syntax.Identifier, name: common.getTempVar()};
									//	initExpr = stmt.expression.callee;
									//	// Create new Variable Declaration statement
									//	newVarDeclStmt = {
									//		type: Syntax.VariableDeclaration,
									//		declarations: [{
									//			type: Syntax.VariableDeclarator,
									//			id: tmpVar, init: initExpr
									//		}],
									//		kind: 'var'
									//	};
									//	stmt.expression.callee = tmpVar;
									//	// Insert the new variable declaration statement before
									//	// the current statement
									//	statements.splice(i, 0, newVarDeclStmt);
									//	// Decrement the loop counter to force visiting the
									//	// new statement.
									//	if (i >= 0)
									//		i--;
									//	// force the loop to continue
									//	continue outerLoop;
									//
									//}

									// Get a new tmp variable
									tmpId = (stmt.expression.type === Syntax.CallExpression &&
									stmt.expression.callee.type === Syntax.FunctionExpression) ?
										common.getTempFuncVar() : common.getTempVar();
									// Tmp variable
									tmpVar = {type: Syntax.Identifier, name: tmpId};

									// Handling Anonymous function case (function(x){...})(5) -->
									// $λ0 = function(x){...}; $λ0(5);
									if (stmt.expression.type === Syntax.CallExpression &&
										stmt.expression.callee.type === Syntax.FunctionExpression) {
										initExpr = stmt.expression.callee;
										// Creating the new expression statement with same arguments
										var newExprStmt = {
											type: Syntax.ExpressionStatement, expression: {
												type: Syntax.CallExpression,
												callee: tmpVar,
												arguments: stmt.expression.arguments
											}
										};
										statements.splice(i + 1, 0, newExprStmt);
									} else {
										initExpr = stmt.expression;
									}
									// Create new Variable Declaration statement
									newVarDeclStmt = {
										type: Syntax.VariableDeclaration,
										declarations: [{
											type: Syntax.VariableDeclarator,
											id: tmpVar, init: initExpr
										}],
										kind: 'var'
									};
									// Replace the current Expr Stmt with
									// the new variable declaration statement.
									statements[i] = newVarDeclStmt;

									// Decrement the loop counter to force visiting the
									// new statement.
									if (i >= 0)
										i--;

								} else if (stmt.expression.type === Syntax.AssignmentExpression) {
									if (stmt.expression.left.type === Syntax.MemberExpression) {
										var memExpr = stmt.expression.left;
										// If we have x.y.z = 6; --> var $tmp= x.y; $tmp.z = 4;
										if (memExpr.object.type !== Syntax.Identifier &&
											memExpr.object.type !== Syntax.ThisExpression) {
											// Create new Variable Declaration statement
											newVarDeclStmt = common.buildVarDeclStmt(memExpr.object, true);
											memExpr.object = newVarDeclStmt.declarations[0].id;
											// Insert the new variable declaration statement before
											// the current statement
											statements.splice(i, 0, newVarDeclStmt);
											// Decrement the loop counter to force visiting the
											// new statement.
											if (i >= 0)
												i--;
											// force the loop to continue
											continue;

										}
										if (!common.isIdentOrLiteral(memExpr.property.type)) {
											// Create new Variable Declaration statement
											newVarDeclStmt = common.buildVarDeclStmt(memExpr.property);
											memExpr.property = newVarDeclStmt.declarations[0].id;
											// Insert the new variable declaration statement before
											// the current statement
											statements.splice(i, 0, newVarDeclStmt);
											// Decrement the loop counter to force visiting the
											// new statement.
											if (i >= 0)
												i--;
											// force the loop to continue
											continue;
										}
									}
									if (stmt.expression.right.type === Syntax.CallExpression &&
										stmt.expression.right.callee.type === Syntax.FunctionExpression) {

										// Get a new tmp variable
										if (stmt.expression.right.callee.id && stmt.expression.right.callee.id.name) {
											tmpId = stmt.expression.right.callee.id.name;
											stmt.expression.right.callee.id.name = "";
										} else
											tmpId = common.getTempFuncVar();

										// Tmp variable
										tmpVar = {type: Syntax.Identifier, name: tmpId};
										var initExpr;
										// Handling Anonymous function case (function(x){...})(5) -->
										// $λ0 = function(x){...}; $λ0(5);
										initExpr = stmt.expression.right.callee;
										// Creating the new expression statement with same arguments
										var newExprStmt;
										//= {
										//    type: Syntax.ExpressionStatement, expression: {
										//        type: Syntax.CallExpression,
										//        callee: tmpVar,
										//        arguments: stmt.expression.right.arguments
										//    }
										//};
										newExprStmt = common.astBuilder.assignmentStatement("=", stmt.expression.left,
											common.astBuilder.callExpression(tmpVar, stmt.expression.right.arguments));
										statements.splice(i + 1, 0, newExprStmt);
										// Create new Variable Declaration statement
										newVarDeclStmt = {
											type: Syntax.VariableDeclaration,
											declarations: [{
												type: Syntax.VariableDeclarator,
												id: tmpVar, init: initExpr
											}],
											kind: 'var'
										};
										// Replace the current Expr Stmt with
										// the new variable declaration statement.
										statements[i] = newVarDeclStmt;

										// Decrement the loop counter to force visiting the
										// new statement.
										if (i >= 0)
											i--;
									}


									if (stmt.expression.right.type === Syntax.MemberExpression ||
										((stmt.expression.right.type === Syntax.CallExpression ||
										stmt.expression.right.type === Syntax.NewExpression) &&
										stmt.expression.right.callee.type === Syntax.MemberExpression)) {
										var memExpr = (stmt.expression.right.type === Syntax.MemberExpression ) ?
											stmt.expression.right : stmt.expression.right.callee;
										// If we have z = g().x; --> var $tmp=g(); z= $tmp.x;
										if (memExpr.object.type !== Syntax.Identifier &&
											memExpr.object.type !== Syntax.ThisExpression) {
											// Create new Variable Declaration statement
											newVarDeclStmt = common.buildVarDeclStmt(memExpr.object, true);
											memExpr.object = newVarDeclStmt.declarations[0].id;
											// Insert the new variable declaration statement before
											// the current statement
											statements.splice(i, 0, newVarDeclStmt);
											// Decrement the loop counter to force visiting the
											// new statement.
											if (i >= 0)
												i--;
											// force the loop to continue
											continue;

										}
										if (!common.isIdentOrLiteral(memExpr.property.type)) {
											// Create new Variable Declaration statement
											newVarDeclStmt = common.buildVarDeclStmt(memExpr.property);
											memExpr.property = newVarDeclStmt.declarations[0].id;
											// Insert the new variable declaration statement before
											// the current statement
											statements.splice(i, 0, newVarDeclStmt);
											// Decrement the loop counter to force visiting the
											// new statement.
											if (i >= 0)
												i--;
											// force the loop to continue
											continue;
										}
									}

									// Handling the case of hoisting function arguments and new expr args
									//a = g(x(),y(),z());
									//b = g(x(y(z())));
									//c = x.g(x(y(z())));
									//d = k[f](x(),y(),z());
									if (((stmt.expression.right.type === Syntax.CallExpression ||
										stmt.expression.right.type === Syntax.NewExpression)
										&&
										(stmt.expression.right.callee.type === Syntax.Identifier ||
										stmt.expression.right.callee.type === Syntax.ThisExpression)
										||
										((stmt.expression.right.type === Syntax.CallExpression ||
										stmt.expression.right.type === Syntax.NewExpression)
										&&
										stmt.expression.right.callee.type === Syntax.MemberExpression
										&&
										(stmt.expression.right.callee.object.type === Syntax.Identifier ||
										stmt.expression.right.callee.object.type === Syntax.ThisExpression)))) {
										var callExpr = stmt.expression.right;
										for (var j = 0; j < callExpr.arguments.length; j++) {
											if (!common.isIdentOrLiteral(callExpr.arguments[j].type)) {
												// Create new Variable Declaration statement
												newVarDeclStmt = common.buildVarDeclStmt(callExpr.arguments[j]);
												callExpr.arguments[j] = newVarDeclStmt.declarations[0].id;
												// Insert the new variable declaration statement before
												// the current statement
												statements.splice(i, 0, newVarDeclStmt);
												// Decrement the loop counter to force visiting the
												// new statement.
												if (i >= 0)
													i--;
												// force the loop to continue
												continue outerLoop;
											}
										}

									}

									// Handling the case of hoisting object properties
									// d = {a:g(x()),b:y(),c:z()};
									if (stmt.expression.right.type === Syntax.ObjectExpression) {
										var objExpr = stmt.expression.right;
										for (var j = 0; j < objExpr.properties.length; j++) {
											if (!common.isIdentOrLiteral(objExpr.properties[j].value.type)) {
												if (objExpr.properties[j].value.type === Syntax.FunctionExpression) {
													var b = common.astBuilder;
													var memExpr = b.memberExpression(stmt.expression.left,
														b.identifier(objExpr.properties[j].key.name), false);
													memExpr.instrumented = false;
													var assignStmt = b.assignmentStatement("=", memExpr, objExpr.properties[j].value);
													assignStmt.instrumented = false;
													// Add a new assignment statement after object Expression stmt
													statements.splice(i + 1, 0, assignStmt);
													// Remove the property init from object expression
													objExpr.properties.splice(j, 1);

												} else {
													// Create new Variable Declaration statement
													newVarDeclStmt = common.buildVarDeclStmt(objExpr.properties[j].value);
													objExpr.properties[j].value = newVarDeclStmt.declarations[0].id;
													// Insert the new variable declaration statement before
													// the current statement
													statements.splice(i, 0, newVarDeclStmt);
													// Decrement the loop counter to force visiting the
													// new statement.
												}

												if (i >= 0)
													i--;
												// force the loop to continue
												continue outerLoop;
											}
										}

									}
									// Handling the case of hoisting object properties
									// d = [g(x()),y(),z()];
									if (stmt.expression.right.type === Syntax.ArrayExpression) {
										var arrayExpr = stmt.expression.right;
										for (var j = 0; j < arrayExpr.elements.length; j++) {
											if (!common.isIdentOrLiteral(arrayExpr.elements[j].type)) {
												// Create new Variable Declaration statement
												newVarDeclStmt = common.buildVarDeclStmt(arrayExpr.elements[j]);
												arrayExpr.elements[j] = newVarDeclStmt.declarations[0].id;
												// Insert the new variable declaration statement before
												// the current statement
												statements.splice(i, 0, newVarDeclStmt);
												// Decrement the loop counter to force visiting the
												// new statement.
												if (i >= 0)
													i--;
												// force the loop to continue
												continue outerLoop;
											}
										}

									}

									// Handling the case of hoisting exprs in binary expressions
									// d = g() + z();
									if (stmt.expression.right.type === Syntax.BinaryExpression ||
										stmt.expression.right.type === Syntax.LogicalExpression) {
										var binaryExpr = stmt.expression.right;
										if (!common.isIdentOrLiteral(binaryExpr.left.type)) {
											// Create new Variable Declaration statement
											newVarDeclStmt = common.buildVarDeclStmt(binaryExpr.left);
											binaryExpr.left = newVarDeclStmt.declarations[0].id;
											// Insert the new variable declaration statement before
											// the current statement
											statements.splice(i, 0, newVarDeclStmt);
											// Decrement the loop counter to force visiting the
											// new statement.
											if (i >= 0)
												i--;
											// force the loop to continue
											continue outerLoop;
										} else if (!common.isIdentOrLiteral(binaryExpr.right.type)) {
											// Create new Variable Declaration statement
											newVarDeclStmt = common.buildVarDeclStmt(binaryExpr.right);
											binaryExpr.right = newVarDeclStmt.declarations[0].id;
											// Insert the new variable declaration statement before
											// the current statement
											statements.splice(i, 0, newVarDeclStmt);
											// Decrement the loop counter to force visiting the
											// new statement.
											if (i >= 0)
												i--;
											// force the loop to continue
											continue outerLoop;
										}
									}

									// Handling the case of hoisting of update exprs
									// d = x().t++; y = g()[t()]++;
									if (stmt.expression.right.type === Syntax.UpdateExpression) {
										var expr = stmt.expression.right;
										if (!common.isIdentOrLiteral(expr.argument.type)) {
											if (expr.argument.type === Syntax.MemberExpression &&
												expr.argument.object.type !== Syntax.Identifier &&
												expr.argument.object.type !== Syntax.ThisExpression) {
												// Create new Variable Declaration statement
												newVarDeclStmt = common.buildVarDeclStmt(expr.argument.object);
												expr.argument.object = newVarDeclStmt.declarations[0].id;
												// Insert the new variable declaration statement before
												// the current statement
												statements.splice(i, 0, newVarDeclStmt);
												// Decrement the loop counter to force visiting the
												// new statement.
												if (i >= 0)
													i--;
												// force the loop to continue
												continue outerLoop;
											} else if (expr.argument.type === Syntax.MemberExpression
												&& !common.isIdentOrLiteral(expr.argument.property.type)) {
												// Create new Variable Declaration statement
												newVarDeclStmt = common.buildVarDeclStmt(expr.argument.property);
												expr.argument.property = newVarDeclStmt.declarations[0].id;
												// Insert the new variable declaration statement before
												// the current statement
												statements.splice(i, 0, newVarDeclStmt);
												// Decrement the loop counter to force visiting the
												// new statement.
												if (i >= 0)
													i--;
												// force the loop to continue
												continue outerLoop;

											}
										}
									}

									// Handling the case of hoisting of unary exprs
									// d = !(x.t); or d = ~(g());
									if (stmt.expression.right.type === Syntax.UnaryExpression) {
										var expr = stmt.expression.right;
										if (!common.isIdentOrLiteral(expr.argument.type)) {
											if (expr.argument.type === Syntax.MemberExpression &&
												expr.argument.property.type === Syntax.Identifier &&
												expr.argument.object.type === Syntax.Identifier)
												continue outerLoop;

											if (expr.argument.type === Syntax.MemberExpression &&
												expr.argument.object.type === Syntax.MemberExpression) {

												// Create new Variable Declaration statement
												newVarDeclStmt = common.buildVarDeclStmt(expr.argument.object);
												expr.argument.object = newVarDeclStmt.declarations[0].id;
												// Insert the new variable declaration statement before
												// the current statement
												statements.splice(i, 0, newVarDeclStmt);
												// Decrement the loop counter to force visiting the
												// new statement.
												if (i >= 0)
													i--;
												// force the loop to continue
												continue outerLoop;

											} else {
												// Create new Variable Declaration statement
												newVarDeclStmt = common.buildVarDeclStmt(expr.argument);
												expr.argument = newVarDeclStmt.declarations[0].id;
												// Insert the new variable declaration statement before
												// the current statement
												statements.splice(i, 0, newVarDeclStmt);
												// Decrement the loop counter to force visiting the
												// new statement.
												if (i >= 0)
													i--;
												// force the loop to continue
												continue outerLoop;
											}
										}
									}

									// Handling the case of hoisting of Assign expr in the rhs of another
									// Assignment Expression
									// d = y = !(x.t); --> y = !(x.t); d = y;
									if (stmt.expression.right.type === Syntax.AssignmentExpression) {

										// Insert the rhs of Assign Stmt as a new Expr statement before
										// the current statement
										statements.splice(i, 0, {
											type: Syntax.ExpressionStatement,
											expression: stmt.expression.right
										});

										// Assign lhs of the Assign Expr to the rhs of current stmt
										stmt.expression.right = stmt.expression.right.left;

										// Decrement the loop counter to force visiting the
										// new statement.
										if (i >= 0)
											i--;
										// force the loop to continue
										continue outerLoop;
									}

									var initExpr;
									if (stmt.expression.right.type === Syntax.CallExpression &&
										stmt.expression.right.callee.type === Syntax.CallExpression) {
										tmpVar = {type: Syntax.Identifier, name: common.getTempVar()};
										initExpr = stmt.expression.right.callee;
										// Create new Variable Declaration statement
										newVarDeclStmt = {
											type: Syntax.VariableDeclaration,
											declarations: [{
												type: Syntax.VariableDeclarator,
												id: tmpVar, init: initExpr
											}],
											kind: 'var'
										};
										stmt.expression.right.callee = tmpVar;
										// Insert the new variable declaration statement before
										// the current statement
										statements.splice(i, 0, newVarDeclStmt);
										// Decrement the loop counter to force visiting the
										// new statement.
										if (i >= 0)
											i--;
										// force the loop to continue
										continue outerLoop;

									}
								}
								break;

						}
					}

				}
			}
		});

		return {
			result: result,
			modified: modified
		};
	}

	hoistExpressions.passName = Name;
	module.exports = hoistExpressions;
}());
/* vim: set sw=4 ts=4 et tw=80 : */

/**
 *
 * Created by b_sayed on 15-09-20.
 */

/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
	'use strict';

	var b, Syntax, common, modified;


	common = require('../common');
	Syntax = common.Syntax;
	b = common.astBuilder;


	function instrumentReturnStatement(node, idx, scope) {

		if (node.instrumented)
			return;

		if (node.parentNode.type === Syntax.BlockStatement) {
			var oldPCStmt = common.getOldPCStmt();
			var whileLoop = common.getWhileLoopStmtToLabel("FUNC");
			var lambdaStackMinusOne = common.getLambdaLenMinus(1);
			var cs = common.getCurrentScopeExpr(scope);
			var test = b.memberExpression(cs, b.identifier("InvokedAsContr"), false);
			var sigmaExpr = b.memberExpression(
				b.memberExpression(cs, b.identifier("$this"), false), b.identifier("Σ"), false);

			var oldPCDotL = b.memberExpression(b.identifier("$old_pc"), b.identifier("l"), false);

			var sigmaAssignStmt = b.assignmentStatement("=", sigmaExpr,
				common.getLubFuncCallExpr(sigmaExpr, oldPCDotL));

			var objectExpr = b.objectExpression([b.property("init", b.literal("l"),
				b.memberExpression(cs, b.identifier("$this"), false))]);
			var objectExprForElseStmt;
			if (node.argument)
				objectExprForElseStmt = b.objectExpression([b.property("init", b.literal("l"),
					common.getLubFuncCallExprWithArgsArray(
						[b.memberExpression(b.identifier("$old_pc"),
							b.identifier("l"), false), b.identifier("$rx")]))]);
			else
				objectExprForElseStmt = b.objectExpression([b.property("init", b.literal("l"),
					b.memberExpression(b.identifier("$old_pc"),
						b.identifier("l"), false))]);

			var lambdaAssignStmt = b.assignmentStatement("=", lambdaStackMinusOne, objectExpr);

			var lambdaAssignElseStmt = b.assignmentStatement("=", lambdaStackMinusOne, objectExprForElseStmt);

			var ifStmt, scopeStmt;
			ifStmt = b.ifStatement(test,
				b.blockStatement([sigmaAssignStmt, lambdaAssignStmt]),
				b.blockStatement([lambdaAssignElseStmt]));

			if (node.argument && node.argument.type === Syntax.Identifier) {
				var callExpr = b.callExpression(b.identifier("$scope"), [cs, b.literal(node.argument.name)]);
				scopeStmt = b.assignmentStatement("=", b.identifier("$rx"),
					b.memberExpression(callExpr, b.literal(node.argument.name), true));
				test = b.binaryExpression("instanceof", b.identifier("$rx"), b.identifier("Object"));
				sigmaExpr = b.memberExpression(b.identifier('$rx'), b.identifier("Σ"), false);
				sigmaAssignStmt = b.assignmentStatement("=", sigmaExpr,
					common.getLubFuncCallExpr(sigmaExpr, oldPCDotL));

				objectExpr = b.objectExpression([b.property("init", b.literal("l"), b.identifier("$rx"))]);
				lambdaAssignStmt = b.assignmentStatement("=", lambdaStackMinusOne, objectExpr);

				ifStmt = b.ifStatement(test, b.blockStatement([sigmaAssignStmt, lambdaAssignStmt]),
					b.blockStatement([ifStmt]));
			} else if (node.argument && node.argument.type !== Syntax.Identifier) {
				throw new
					Error("Return Stmt argument must be an identifier or null.");
			}

			node.parentNode.body.splice(idx, 0, ifStmt);
			if (node.argument && node.argument.type === Syntax.Identifier) {
				node.parentNode.body.splice(idx, 0, scopeStmt);
			}
			node.parentNode.body.splice(idx, 0, whileLoop);
			node.parentNode.body.splice(idx, 0, oldPCStmt);

		}
		// Labeling node as instrumented so that we don't instrument it twice.
		node.instrumented = true;
	}

	module.exports = instrumentReturnStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


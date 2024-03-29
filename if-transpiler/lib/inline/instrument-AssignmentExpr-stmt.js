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


	function instrumentAssignmentExprStatement(node, idx, scope) {

		if (node.instrumented)
			return;

		// We handle call and new expression in a separate way
		if (node.right.type === Syntax.CallExpression ||
			node.right.type === Syntax.NewExpression ||
			node.right.type === Syntax.FunctionExpression ||
			node.right.type === Syntax.ArrayExpression ||
			node.right.type === Syntax.ObjectExpression)
			return;

		var lhsName = [];
		var oldLHS;
		if (node.parentNode.parentNode.type !== Syntax.BlockStatement &&
			node.parentNode.parentNode.type !== Syntax.Program)
			throw new Error("Parent Node of Assignment expression must be Block or Program statement line:" + node.loc.start.line);

		// delete unary operator is a special operator that needs special
		// handling.
		if (node.left.type === Syntax.Identifier &&
			node.right.type === Syntax.UnaryExpression &&
			node.right.operator === 'delete') {
			oldLHS = node.left;
			node.left = node.right.argument;
		}

		if (node.left.type === Syntax.Identifier) {
			lhsName.push(node.left.name);
		} else if (node.left.type === Syntax.MemberExpression) {
			lhsName.push(node.left.object.name || 'this');
			lhsName.push(node.left.property.name || node.left.property.raw);
		}

		var pcDotL = common.getPCDotL();
		var cs = common.getCurrentScopeExpr(scope);

		var secLvlExpr = common.secLvlHelper(node.right, false, cs);
		var firstAssig;

		var lhsVar;
		if (node.left.type === Syntax.Identifier) {
			if (scope.length == 1)
				lhsVar = b.memberExpression(cs, b.literal(lhsName[0]), true);
			else
				lhsVar = common.getFindVarInScopeChainExpr(cs, lhsName[0], null, b.literal(true));
		} else if (node.left.type === Syntax.MemberExpression) {
			if (lhsName[0] === 'this') {
				var scopeCopy = common.deepCopy(scope);
				scopeCopy.push('$this');
				lhsVar = b.memberExpression(common.getCurrentScopeExpr(scopeCopy),
					node.left.computed ? b.identifier(lhsName[1]) : b.literal(lhsName[1]), true);
			} else {
				if (scope.length == 1) {
					lhsVar = b.memberExpression(b.memberExpression(cs, b.literal(lhsName[0]), true),
						node.left.computed ? b.identifier(lhsName[1]) : b.literal(lhsName[1]), true);
				} else {
					lhsVar = common.getFindVarInScopeChainExpr(cs, lhsName[0], lhsName[1],
						b.literal(false), node.left.computed);
				}
			}
		}
		firstAssig = b.assignmentStatement("=", lhsVar, secLvlExpr);


		if (node.left.type === Syntax.MemberExpression && node.left.computed === true) {

			var secLvl, tmpConseq, test, condExpr;
			if (node.left.property.type === Syntax.Identifier) {
				secLvl = common.secLvlHelper(b.identifier(lhsName[1]), false, cs);
				tmpConseq = b.memberExpression(secLvl, b.identifier("Σ"), false);
				test = b.binaryExpression("instanceof", secLvl, b.identifier("Object"));
				condExpr = b.conditionalExpression(test, tmpConseq, secLvl);
			} else {
				condExpr = b.literal(0);
			}
			var tmpAssigStmt = b.assignmentStatement("=", b.identifier("_$tmp"), condExpr);
		}

		var rxSigma = b.memberExpression(lhsVar, b.identifier("Σ"), false);
		var conseq;
		if (node.left.type === Syntax.MemberExpression && node.left.computed === true)
			conseq = b.assignmentExpression("=", rxSigma,
				common.getLubFuncCallExprWithArgsArray([rxSigma, b.identifier("_$tmp"), pcDotL]));
		else
			conseq = b.assignmentExpression("=", rxSigma,
				common.getLubFuncCallExprWithArgsArray([rxSigma, pcDotL]));

		var alternate;

		if (node.left.type === Syntax.MemberExpression && node.left.computed === true)
			alternate = b.assignmentExpression("=", lhsVar,
				common.getLubFuncCallExprWithArgsArray([lhsVar, b.identifier("_$tmp"), pcDotL]));
		else
			alternate = b.assignmentExpression("=", lhsVar,
				common.getLubFuncCallExprWithArgsArray([lhsVar, pcDotL]));
		var condStmt = common.getIsObjCondExprStmt(lhsVar, conseq, alternate);


		if (node.left.type === Syntax.MemberExpression) {
			var lhsObjSigma = common.getFindVarInScopeChainExpr(cs, lhsName[0], 'Σ',
				b.literal(false), false);
			var lhsPropSecLvl = common.secLvlHelper(node.left, true, cs);
			var updateStmt = b.assignmentStatement("=", lhsObjSigma, common.getLubFuncCallExprWithArgsArray(
				[lhsObjSigma, lhsPropSecLvl]));
			node.parentNode.parentNode.body.splice(
				node.parentNode.idx + 1, 0, updateStmt);
		}
		// 1st parentNode must be assignment stmt, 2nd must be an expression stmt, then a
		// block stmt.
		// OPTIMIZATION
		// Only add the following stmt if the rhs is not a literal.
		//if (node.right.type !== Syntax.Literal)
		node.parentNode.parentNode.body.splice(
			node.parentNode.idx + 1, 0, condStmt);


		if (node.left.type === Syntax.MemberExpression && node.left.computed === true) {
			node.parentNode.parentNode.body.splice(
				node.parentNode.idx + 1, 0, tmpAssigStmt);
		}


		node.parentNode.parentNode.body.splice(
			node.parentNode.idx + 1, 0, firstAssig);

		if (node.right.type === Syntax.UpdateExpression) {
			var updateExprVarName, updateExprVar, updateSecLvl;
			if (node.right.argument.type === Syntax.identifier) {
				updateExprVarName = node.right.argument.name;
				updateExprVar = common.getFindVarInScopeChainExpr(cs, updateExprVarName, null, b.literal(true));
				updateSecLvl = common.secLvlHelper(b.identifier(updateExprVarName), false, cs);
			} else if (node.right.argument.type === Syntax.MemberExpression) {
				debugger;
				updateExprVar = common.getFindVarInScopeChainExpr(cs, node.right.argument.object.name || 'this',
					node.right.argument.property.name, b.literal(true));
				updateSecLvl = common.secLvlHelper(node.right.argument, false, cs);
			}


			var condExpr = common.getLubFuncCallExprWithArgsArray([updateSecLvl, pcDotL]);

			var updateExprStmt = b.assignmentStatement("=", updateExprVar, condExpr);
			node.parentNode.parentNode.body.splice(
				node.parentNode.idx + 1, 0, updateExprStmt);


		}

		// Fix everything before exiting the function if we had a delete unary operator
		// in the rhs.
		if (node.right.type === Syntax.UnaryExpression &&
			node.right.operator === 'delete') {
			node.left = oldLHS;
		}

		// Labeling node as instrumented so that we don't instrument it twice.
		node.instrumented = true;
	}

	module.exports = instrumentAssignmentExprStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


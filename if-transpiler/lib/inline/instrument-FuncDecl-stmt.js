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


	function instrumentFuncDeclStatement(node, idx, scope) {

		if (node.instrumented)
			return;

		if (node.parentNode.type === Syntax.BlockStatement ||
			node.parentNode.type === Syntax.Program) {
			var cs = common.getCurrentScopeExpr(scope, [node.id.name]);
			var properties = [b.property("init", b.identifier("$fscope"), common.getPCDotL()),
				b.property("init", b.identifier("prototype"),
					b.objectExpression([b.property("init", b.identifier("Σ"), common.getPCDotL())])),
				b.property("init", b.identifier("Σ"), common.getPCDotL()),
				b.property("init", b.identifier("scope"), common.getCurrentScopeExpr(scope))];

			//var paramNames = [];
			for (var i = 0; i < node.params.length; i++) {
				//paramNames.push(node.params[i].name);
				properties.push(
					b.property("init", b.identifier(node.params[i].name),
						common.getPCDotL()));
			}

			// The key is the full path function name, and the value is
			// the parameter names.
			//common.Map[''+scope.concat(node.id.name)] = paramNames;

			var objectExpr = b.objectExpression(properties);
			var assignStmt = b.assignmentStatement("=", cs, objectExpr);

			var parentNode = node.parentNode;
			while (parentNode.type !== Syntax.FunctionDeclaration &&
			parentNode.type !== Syntax.FunctionExpression &&
			parentNode.type !== Syntax.Program) {

				parentNode = parentNode.parentNode;
			}

			if (parentNode.type === Syntax.FunctionDeclaration ||
				parentNode.type === Syntax.FunctionExpression) {
				parentNode.body.body.splice(0, 0, assignStmt);
				// Since we added a statement to the top of the list of statements
				// increment the index of all the statements by one.
				for (var e in parentNode.body.body)
					parentNode.body.body[e].idx += 1;
			}
			else {
				// Since we added a statement to the top of the list of statements
				// increment the index of all the statements by one.
				parentNode.body.splice(0, 0, assignStmt);
				for (var e in parentNode.body)
					parentNode.body[e].idx += 1;
			}


			//if(scope.length == 1 && scope[0] == 'global')
			//    node.parentNode.body.splice(0, 0, assignStmt);
			//else {
			//    node.parentNode.body.splice(idx, 0, assignStmt);
			//    // only add the stmt after the first VarDeclaration stmt
			//    //for (var j = 0; j < node.parentNode.body.length; j++) {
			//    //    if (node.parentNode.body[j].type === Syntax.VariableDeclaration) {
			//    //        node.parentNode.body.splice(j + 2, 0, assignStmt);
			//    //        break;
			//    //    }
			//    //}
			//}

			//// if we didn't find any VarDecl stmt in current body just added to the top
			//if (j == node.parentNode.body.length) {
			//    node.parentNode.body.splice(0, 0, assignStmt);
			//}


			//node.parentNode.body.splice(idx + 1, 0, assignStmt);
		}
		// Labeling node as instrumented so that we don't instrument it twice.
		node.instrumented = true;

	}

	module.exports = instrumentFuncDeclStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


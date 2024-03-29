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


    function instrumentTryStmt(node, idx, scope) {

        if (node.instrumented)
            return;

        if (node.parentNode.type === Syntax.BlockStatement
            || node.parentNode.type === Syntax.Program) {

            var pcDotL = common.getPCDotL();
            var pushExprStmt = common.getLambdaPushCallExprWithArg(b.objectExpression([
                b.property("init", b.identifier("l"), pcDotL),
                b.property("init", b.identifier("id"), b.literal("TRY"))]));

            node.block.body.splice(idx, 0, pushExprStmt);
            node.block.body.push(common.getLambdaPopCallExpr());

			var lhsExpr = common.getCurrentScopeExpr(scope,[node.handlers[0].param.name]);
			var test = b.binaryExpression("instanceof", b.identifier(node.handlers[0].param.name),
				b.identifier("Object"));
			var consequent = b.objectExpression([b.property("init", b.literal('Σ'),
				common.getPCDotL())]);
			var alternate = common.getPCDotL();
			var rhsCondExpr = b.conditionalExpression(test, consequent, alternate);
			var catchClauseParamStmt = b.assignmentStatement('=',lhsExpr,rhsCondExpr);

			node.handlers[0].body.body.splice(0,0,catchClauseParamStmt);

            node.handlers[0].body.body.push(common.getLambdaPopCallExpr());

        }
        // Labeling node as instrumented so that we don't instrument it twice.
        node.instrumented = true;
    }

    module.exports = instrumentTryStmt;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


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


    function instrumentIfStmt(node, idx, scope) {
        if (node.instrumented)
            return;

        if (node.parentNode.type === Syntax.BlockStatement
            || node.parentNode.type === Syntax.Program) {

            var xs = common.$collect(node.consequent);
            var ys = common.$collect(node.alternate);

            var shouldCompensateInConsequent = common.checkCompensation(node.consequent, node);
            var shouldCompensateInAlternate = common.checkCompensation(node.alternate, node);
            var cs = common.getCurrentScopeExpr(scope);
            var pcDotL = common.getPCDotL();
            var lubExpr = common.getLubFuncCallExpr(pcDotL,
                common.secLvlHelper(node.test, true, cs));
            var pushExprStmt = common.getLambdaPushCallExprWithArg(b.objectExpression([
                b.property("init", b.identifier("l"), lubExpr),
                b.property("init", b.identifier("id"), b.literal("IF"))]));

            var shouldCompDecl, arrayExpression, upgradeExprStmt;

            // if we collected anything in alternate, add an upgrade call in
            // consequent body.
            if (ys.length > 0) {
                arrayExpression = b.arrayExpression(ys);
                upgradeExprStmt = common.getUpgradeCallExpr(arrayExpression, pcDotL, cs);
                node.consequent.body.splice(0, 0, upgradeExprStmt);
            }
            // if we collected anything in consequent, add an upgrade call in
            // alternate body.
            if (xs.length > 0) {
                arrayExpression = b.arrayExpression(xs);
                upgradeExprStmt = common.getUpgradeCallExpr(arrayExpression, pcDotL, cs);
                node.alternate.body.splice(0, 0, upgradeExprStmt);
            }

			var lbl;
			if(shouldCompensateInConsequent)
				lbl = shouldCompensateInConsequent.lbl;
			else if(shouldCompensateInAlternate)
				lbl = shouldCompensateInAlternate.lbl

			if(lbl)
				var shouldCompExprStmt = common.getCompensateCallExpr(b.objectExpression([b.property("init", b.literal("lbl"),
					b.literal(lbl))]));

            node.parentNode.body.splice(idx + 1, 0, common.getLambdaPopCallExpr());

            if (shouldCompExprStmt)
                node.parentNode.body.splice(idx + 1, 0, shouldCompExprStmt);

            node.parentNode.body.splice(idx, 0, pushExprStmt);

        }
        // Labeling node as instrumented so that we don't instrument it twice.
        node.instrumented = true;
    }

    module.exports = instrumentIfStmt;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


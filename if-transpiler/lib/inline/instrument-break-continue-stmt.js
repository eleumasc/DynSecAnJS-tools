/**
 * Created by b_sayed on 2015-09-22.
 */
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


    function instrumentBreakContinueStatement(node, pnode, idx, scope) {
        if (node.instrumented)
            return;

        if (pnode.type === Syntax.BlockStatement) {
            var oldPCStmt = common.getOldPCStmt();
            var whileLoop = common.getWhileLoopStmtToLabel(node.label ? node.label.name : "LOOP");
            var lambdaStackMinusTwo = common.getLambdaLenMinus(2);
            var lambdaStackMinusTwoDotL =
                b.memberExpression(lambdaStackMinusTwo, b.identifier("l"), false);

            var assignStmt = b.assignmentStatement("=", lambdaStackMinusTwoDotL,
                common.getLubFuncCallExpr(lambdaStackMinusTwoDotL,
                    b.memberExpression(b.identifier("$old_pc"),b.identifier("l"), false)));

            pnode.body.splice(idx, 0, assignStmt);
            pnode.body.splice(idx, 0, whileLoop);
            pnode.body.splice(idx, 0, oldPCStmt);
        }
        // Labeling node as instrumented so that we don't instrument it twice.
        node.instrumented = true;
    }

    module.exports = instrumentBreakContinueStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


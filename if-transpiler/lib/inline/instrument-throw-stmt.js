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


    function instrumentThrowStatement(node, idx, scope) {
        if (node.instrumented)
            return;

        if (node.parentNode.type === Syntax.BlockStatement) {
            var oldPCStmt = common.getOldPCStmt();
            var pcCallExpr = b.callExpression(b.identifier("$pc"), []);
            pcCallExpr.instrumented = true;
            var bin1 = b.binaryExpression("!==",
                b.memberExpression(pcCallExpr,
                    b.identifier("id"), false), b.literal("FUNC"));
            var bin2 = b.binaryExpression("!==",
                b.memberExpression(pcCallExpr,
                    b.identifier("id"), false), b.literal("TRY"));
            var stmt = b.whileStatement(b.logicalExpression("&&",bin1,bin2)
                , b.blockStatement([b.expressionStatement(b.callExpression(
                        b.memberExpression(b.identifier("$Λ"), b.identifier("pop"), false), []))]
                ));
            stmt.instrumented = true;
            var whileLoop = stmt;
            var lambdaStackMinusOne = common.getLambdaLenMinus(1);


            var cs = common.getCurrentScopeExpr(scope);

            var objectExpr = b.objectExpression([b.property("init", b.literal("l"),
                b.callExpression(b.identifier("$lub"), [b.memberExpression(b.identifier("$old_pc"),
                    b.identifier("l"), false),common.secLvlHelper(node.argument,true,cs)]))]);

            var lambdaAssignStmt = b.assignmentStatement("=", lambdaStackMinusOne, objectExpr);

            node.parentNode.body.splice(idx, 0, lambdaAssignStmt);
            node.parentNode.body.splice(idx, 0, whileLoop);
            node.parentNode.body.splice(idx, 0, oldPCStmt);
        }
        // Labeling node as instrumented so that we don't instrument it twice.
        node.instrumented = true;

    }

    module.exports = instrumentThrowStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


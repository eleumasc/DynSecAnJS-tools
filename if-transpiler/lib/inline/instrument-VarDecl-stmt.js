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


    function instrumentVarDeclStatement(node, idx, scope) {

        if (node.instrumented)
            return;

        var cs = common.getCurrentScopeExpr(scope);

        var assigExpr = b.assignmentExpression("=", b.memberExpression(cs,
            b.literal(node.declarations[0].id.name),true), b.literal(0));
        for (var i = 1; i < node.declarations.length; i++) {
            assigExpr = b.assignmentExpression("=",
                b.memberExpression(cs,b.literal(node.declarations[i].id.name),true),assigExpr);
        }

        var assignStmt = b.expressionStatement(assigExpr);

        // 1st parentNode must be assignment stmt, 2nd must be an expression stmt, then a
        // block stmt.
        node.parentNode.body.splice(node.idx + 1, 0, assignStmt);


        // Labeling node as instrumented so that we don't instrument it twice.
        node.instrumented = true;
    }

    module.exports = instrumentVarDeclStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


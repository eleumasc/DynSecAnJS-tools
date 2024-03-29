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


    function instrumentLabeledStmt(node, idx, scope) {

        if (node.instrumented)
            return;

        if (node.parentNode.type === Syntax.BlockStatement
            || node.parentNode.type === Syntax.Program) {

            var pcDotL = common.getPCDotL();
            var pushExprStmt = common.getLambdaPushCallExprWithArg(b.objectExpression([
                b.property("init", b.identifier("l"), pcDotL),
                b.property("init", b.identifier("id"), b.literal(node.label.name))]));

            node.parentNode.body.splice(idx + 1, 0, common.getLambdaPopCallExpr());
            node.parentNode.body.splice(idx, 0, pushExprStmt);

        }
        // Labeling node as instrumented so that we don't instrument it twice.
        node.instrumented = true;
    }

    module.exports = instrumentLabeledStmt;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


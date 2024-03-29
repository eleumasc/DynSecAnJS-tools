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


    function instrumentArrayExprStatement(node, idx, scope) {

        if (node.instrumented)
            return;
        var objName = [];
        if (node.parentNode.type !== Syntax.AssignmentExpression)
            throw new Error("Parent Node of function expression must be Assignment Expression");
        if (node.parentNode.left.type === Syntax.Identifier) {
            objName.push(node.parentNode.left.name);
        } else if (node.parentNode.left.type === Syntax.MemberExpression) {
            objName.push(node.parentNode.left.object.name || 'this');
            objName.push(node.parentNode.left.property.name);
        }

        var pcDotL = common.getPCDotL();
        var cs = common.getCurrentScopeExpr(scope, objName);
        var currentScope = common.getCurrentScopeExpr(scope);

        var properties = [b.property("init", b.identifier("__proto__"), b.objectExpression([])),
            b.property("init", b.identifier("scope"), currentScope)];

        var secLvlExprs = [];
        for (var i = 0; i < node.elements.length; i++) {

            var secLvl = common.secLvlHelper(node.elements[i], false, currentScope);
            secLvlExprs.push(secLvl);
            var propValue = common.getLubFuncCallExpr(pcDotL, secLvl);
            properties.push(
                b.property("init", b.identifier("" + i), propValue));
        }

        secLvlExprs.push(pcDotL);
        var lub = common.getLubFuncCallExprWithArgsArray(secLvlExprs);
        properties.push(b.property("init", b.identifier("Σ"), lub));

        var objectExpr = b.objectExpression(properties);
        var assignStmt = b.assignmentStatement("=", cs, objectExpr);

        // 1st parentNode must be assignment stmt, 2nd must be an expression stmt, then a
        // block stmt.
        node.parentNode.parentNode.parentNode.body.splice(
            node.parentNode.parentNode.idx + 1, 0, assignStmt);
        // Labeling node as instrumented so that we don't instrument it twice.
        node.instrumented = true;
    }

    module.exports = instrumentArrayExprStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


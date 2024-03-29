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


    function instrumentFuncExprStatement(node, idx, scope) {

        if (node.instrumented)
            return;
        var funcName = [];
        if (node.parentNode.type !== Syntax.AssignmentExpression)
            throw new Error("Parent Node of function expression must be Assignment Expression");
        if (node.parentNode.left.type === Syntax.Identifier) {
            funcName.push(node.parentNode.left.name);
        } else if (node.parentNode.left.type === Syntax.MemberExpression) {
            funcName.push(node.parentNode.left.object.name || 'this');
            funcName.push(node.parentNode.left.property.name);
        }

        if(funcName[0] === 'this')
            funcName[0] = '$this';
        
        var cs = common.getCurrentScopeExpr(scope, funcName);

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
        //common.Map[''+scope.concat(funcName)] = paramNames;

        var objectExpr = b.objectExpression(properties);
        var assignStmt = b.assignmentStatement("=", cs, objectExpr);

        // 1st parentNode must be assignment stmt, 2nd must be an expression stmt, then a
        // block stmt.
        //node.body.body.splice(0,0,assignStmt);

        // Handling case temp = function(){}
        //if (funcName.length == 1)
            node.parentNode.parentNode.parentNode.body.splice(node.parentNode.parentNode.idx + 1, 0, assignStmt);
        //else
        //    // Handling x.y = funciotn(){}
        //    node.parentNode.parentNode.parentNode.body.splice(
        //        node.parentNode.parentNode.idx + 1, 0, assignStmt);
        // Labeling node as instrumented so that we don't instrument it twice.

        node.instrumented = true;
    }

    module.exports = instrumentFuncExprStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


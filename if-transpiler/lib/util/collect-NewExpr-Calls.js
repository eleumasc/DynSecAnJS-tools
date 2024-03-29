/**
 *
 * Created by b_sayed on 15-09-20.
 */

/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
    'use strict';

    var b, Syntax, common;


    common = require('../common');
    Syntax = common.Syntax;
    b = common.astBuilder;


    function collectNewExprCalls(node, idx, scope) {


        var lhsName = [];
        if (node.parentNode.type !== Syntax.AssignmentExpression)
            throw new Error("Parent Node of function expression must be Assignment Expression, line:"+node.loc.start.line);
        if (node.parentNode.left.type === Syntax.Identifier) {
            lhsName.push(node.parentNode.left.name);
        } else if (node.parentNode.left.type === Syntax.MemberExpression) {
            lhsName.push(node.parentNode.left.object.name || 'this');
            lhsName.push(node.parentNode.left.property.name || node.parentNode.left.property.raw);
        }

        var rhsName = [];
        var callee = node.callee, isMethodCall = false;

        if (callee.type === Syntax.Identifier) {
            rhsName.push(callee.name);
        } else if (callee.type === Syntax.MemberExpression) {
            isMethodCall = true;
            rhsName.push(callee.object.name || 'this');
            rhsName.push(callee.property.name || callee.property.raw);
        }

        var scopeCopy = common.deepCopy(scope);
        while (scopeCopy.length > 0) {
            //console.log(''+scopeCopy);
            //console.log(common.VarsInScopeMap);
            var varsInScope = common.VarsInScopeMap['' + scopeCopy];
            try {
                if (varsInScope.indexOf(lhsName[0]) != -1)
                    break;
            } catch(x) {};
            scopeCopy.pop();
        }
        common.Map['' + scopeCopy.concat(lhsName)] = '' + rhsName;

        console.log(common.Map)

    }

    module.exports = collectNewExprCalls;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


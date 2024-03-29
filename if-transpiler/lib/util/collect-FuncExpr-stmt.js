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


    function collectFuncExprStatement(node, idx, scope) {

        var funcName = [];
        if (node.parentNode.type !== Syntax.AssignmentExpression)
            throw new Error("Parent Node of function expression must be Assignment Expression");
        if (node.parentNode.left.type === Syntax.Identifier) {
            funcName.push(node.parentNode.left.name);
        } else if (node.parentNode.left.type === Syntax.MemberExpression) {
            funcName.push(node.parentNode.left.object.name || 'this');
            funcName.push(node.parentNode.left.property.name);
        }

        var paramNames = [];
        for (var i = 0; i < node.params.length; i++) {
            paramNames.push(node.params[i].name);
        }

        var funcNameCopy = common.deepCopy(funcName);
        // The key is the full path function name, and the value is
        // the parameter names.
        // If we have a mapping between the last scope name and a function prototype
        // use the function prototype instead.
        if(common.Map[funcName[0]]) {
            funcName[0] = common.Map[funcName[0]];
        } else if (funcName[0] == 'this')
            funcName.shift();

        common.Map[''+scope.concat(funcName)] = paramNames;

        var stmts = node.body.body,decls;
        common.VarsInScopeMap[''+scope.concat(funcNameCopy)] = [];
        for(var i =0;i<stmts.length;i++) {
            if(stmts[i].type === Syntax.VariableDeclaration) {
                decls = stmts[i].declarations;
                for(var j=0;j<decls.length;j++){
                    common.VarsInScopeMap[''+scope.concat(funcNameCopy)].push(decls[j].id.name);
                }
            }
        }

    }

    module.exports = collectFuncExprStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


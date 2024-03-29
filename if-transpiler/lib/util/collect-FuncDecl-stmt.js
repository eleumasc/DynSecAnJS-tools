/**
 *
 * Created by b_sayed on 15-09-20.
 */

/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
    'use strict';

    var Syntax, common;

    common = require('../common');
    Syntax = common.Syntax;

    function collectFuncDeclStatement(node, idx, scope) {

        if (node.parentNode.type === Syntax.BlockStatement ||
            node.parentNode.type === Syntax.Program) {

            var paramNames = [];
            for (var i = 0; i < node.params.length; i++) {
                paramNames.push(node.params[i].name);
            }

            // The key is the full path function name, and the value is
            // the parameter names.
            common.Map[''+scope.concat(node.id.name)] = paramNames;
            //console.log(common.Map)

            var stmts = node.body.body,decls;
            common.VarsInScopeMap[''+scope.concat(node.id.name)] = [];
            for(var i =0;i<stmts.length;i++) {
                if(stmts[i].type === Syntax.VariableDeclaration) {
                    decls = stmts[i].declarations;
                    for(var j=0;j<decls.length;j++){
                        common.VarsInScopeMap[''+scope.concat(node.id.name)].push(decls[j].id.name);
                    }
                }
            }
        }
    }

    module.exports = collectFuncDeclStatement;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


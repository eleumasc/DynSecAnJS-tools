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


    function collectVarsDeclsInGlobalScope(node, idx, scope) {

        var stmts = node.body,decls;
        common.VarsInScopeMap[''+scope] = [];
        for(var i =0;i<stmts.length;i++) {
            if(stmts[i].type === Syntax.VariableDeclaration) {
                decls = stmts[i].declarations;
                for(var j=0;j<decls.length;j++){
                    common.VarsInScopeMap[''+scope].push(decls[j].id.name);
                }
            }
        }
    }

    module.exports = collectVarsDeclsInGlobalScope;

}());
/* vim: set sw=4 ts=4 et tw=80 : */


/**
 *
 * Created by b_sayed on 15-09-20.
 */

/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
    'use strict';

    var Name, Syntax, common, modified;

    Name = 'concate-var-decls';

    common = require('../common');
    Syntax = common.Syntax;

    function concateVarDecls(tree, options) {
        var result;

        result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
        modified = false;

        common.traverse(result, {
            leave: function leave(node) {
                if (node.type === Syntax.Program || node.type === Syntax.BlockStatement) {
                    var statements = node.body;
                    var firstDeclStmt = null;
                    var prevIDs = [], j;
                    for (var i = 0; i < statements.length; i++) {
                        var stmt = statements[i];
                        if (stmt.type === Syntax.VariableDeclaration) {
                            // if the If-Stmt has no alternate add an empty blockstatement
                            if (!firstDeclStmt) {
                                firstDeclStmt = stmt;
                                for (j = 0; j < stmt.declarations.length; j++) {
                                    if (stmt.declarations[j].id.name !== "$tmp")
                                        prevIDs.push(stmt.declarations[j].id.name);
                                }
                            } else {
                                for (j = 0; j < stmt.declarations.length; j++) {
                                    // only add the declarator if we haven't seen it before.
                                    if (prevIDs.indexOf(stmt.declarations[j].id.name) == -1 &&
                                        stmt.declarations[j].id.name !== "$tmp") {
                                        firstDeclStmt.declarations.push(stmt.declarations[j]);
                                        prevIDs.push(stmt.declarations[j].id.name);
                                    }
                                }
                                statements.splice(i, 1);
                                if (i >= 0)
                                    i--;
                            }
                        }

                    }
                }
            }
        });

        return {
            result: result,
            modified: modified
        };
    }

    concateVarDecls.passName = Name;
    module.exports = concateVarDecls;
}());
/* vim: set sw=4 ts=4 et tw=80 : */


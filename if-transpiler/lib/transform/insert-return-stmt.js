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
    var b = common.astBuilder;

    function insertReturnStmt(tree, options) {
        var result;

        result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
        modified = false;

        common.traverse(result, {
            leave: function leave(node) {
                if (node.type === Syntax.FunctionDeclaration || node.type === Syntax.FunctionExpression) {
                    var statements = node.body.body;
                    if(statements.length == 0 || statements[statements.length -1].type !== Syntax.ReturnStatement) {
                        var ret = b.returnStatement(null);
                        ret.instrumented = false;
                        statements.push(ret);
                    }
                }
            }
        });

        return {
            result: result,
            modified: modified
        };
    }

    insertReturnStmt.passName = Name;
    module.exports = insertReturnStmt;
}());
/* vim: set sw=4 ts=4 et tw=80 : */


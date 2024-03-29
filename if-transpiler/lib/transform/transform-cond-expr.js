/**
 * Created by b_sayed on 15-09-20.
 */
/*
 Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*jslint bitwise:true */
/*global module:true, require:true*/
(function () {
        'use strict';

        var Name, Syntax, common, modified;

        Name = 'transform-cond-expr';

        common = require('../common');
        Syntax = common.Syntax;

        function transformConditionalExpr(tree, options) {
            var result;

            result = options.get('destructive', {pathName: Name}) ? tree : common.deepCopy(tree);
            modified = false;

            common.traverse(result, {
                    leave: function leave(node) {
                        var statements, stmt, i;
                        if (node.type === Syntax.Program || node.type === Syntax.BlockStatement) {
                            statements = node.body;
                            for (i = 0; i < statements.length; i++) {
                                stmt = statements[i];
                                if (stmt.type === Syntax.ExpressionStatement &&
                                    stmt.expression.type === Syntax.AssignmentExpression &&
                                    stmt.expression.right.type === Syntax.ConditionalExpression) {
                                    var condExpr = stmt.expression.right;
                                    var newIfStmt = {test: condExpr.test, type: Syntax.IfStatement};
                                    var newConsequent = {
                                        type: Syntax.BlockStatement,
                                        body: [{
                                            type: Syntax.ExpressionStatement,
                                            expression: (condExpr.consequent.type !== Syntax.AssignmentExpression) ? {
                                                type: Syntax.AssignmentExpression,
                                                left: stmt.expression.left,
                                                operator: stmt.expression.operator,
                                                right: condExpr.consequent
                                            } : condExpr.consequent
                                        }]
                                    };
                                    var newAlternate = {
                                        type: Syntax.BlockStatement,
                                        body: [{
                                            type: Syntax.ExpressionStatement,
                                            expression: (condExpr.alternate.type !== Syntax.AssignmentExpression) ? {
                                                type: Syntax.AssignmentExpression,
                                                left: stmt.expression.left,
                                                operator: stmt.expression.operator,
                                                right: condExpr.alternate
                                            } : condExpr.alternate
                                        }]
                                    };
                                    newIfStmt.consequent = newConsequent;
                                    newIfStmt.alternate = newAlternate;
                                    statements[i] = newIfStmt;
                                }
                            }
                        }
                    }
                }
            )
            ;

            return {
                result: result,
                modified: modified
            };
        }

        transformConditionalExpr.passName = Name;
        module.exports = transformConditionalExpr;
    }
    ()
)
;
/* vim: set sw=4 ts=4 et tw=80 : */


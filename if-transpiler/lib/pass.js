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
/*global exports:true*/

(function () {
    'use strict';

    var query, Registry, transform, inline, common;

    common = require('./common');
    query = require('./query');

    Registry = {};
    Registry.__direct = {};

    // initialization

    function initialize(kind, passes) {
        var i, iz, pass;
        Registry[kind] = {};
        for (i = 0, iz = passes.length; i < iz; ++i) {
            pass = passes[i];
            // It is OK in our case to have more than one pass with same name
            // it is basically running the same pass twice.
            //common.assert(Registry[kind][pass.passName] == null, 'don\'t create duplicate pass names');
            Registry[kind][pass.passName] = pass;
        }
        // It is OK in our case to have more than one pass with same name
        // it is basically running the same pass twice.
        //common.assert(Registry.__direct[pass.passName] == null, 'don\'t create duplicate pass names');
        Registry.__direct[pass.passName] = pass;
    }

    transform = [
        require('./transform/insert-return-stmt'),
        require('./transform/transform-loop-label-with-statement'),
        require('./transform/transform-if-statement'),
        require('./transform/hoist-Expressions'),
        require('./transform/transform-cond-expr'),
        require('./transform/transform-if-statement'),
        require('./transform/hoist-Expressions'),
        require('./transform/concate-var-decls')

    ];

    inline = {
        BreakStatement: require('./inline/instrument-break-continue-stmt'),
        ContinueStatement: require('./inline/instrument-break-continue-stmt'),
        ReturnStatement: require('./inline/instrument-return-stmt'),
        WhileStatement: require('./inline/instrument-do-while-for-stmt'),
        DoWhileStatement: require('./inline/instrument-do-while-for-stmt'),
        ForInStatement: require('./inline/instrument-do-while-for-stmt'),
        ForStatement: require('./inline/instrument-do-while-for-stmt'),
        IfStatement: require('./inline/instrument-if-stmt'),
        LabeledStatement: require('./inline/instrument-labeled-stmt'),
        ThrowStatement: require('./inline/instrument-throw-stmt'),
        TryStatement: require('./inline/instrument-try-stmt'),
        FunctionDeclaration: require('./inline/instrument-FuncDecl-stmt'),
        FunctionExpression: require('./inline/instrument-FuncExpr-stmt'),
        ObjectExpression: require('./inline/instrument-ObjectExpr-stmt'),
        ArrayExpression: require('./inline/instrument-ArrayExpr-stmt'),
        CallExpression: require('./inline/instrument-FuncCallExpr-stmt'),
        NewExpression: require('./inline/instrument-FuncCallExpr-stmt'),
        AssignmentExpression: require('./inline/instrument-AssignmentExpr-stmt'),
        VariableDeclaration: require('./inline/instrument-VarDecl-stmt')
    };

    initialize('transform', transform);

    function passRequire(name) {
        if (common.Object.has(Registry.__direct, name)) {
            return Registry.__direct[name];
        }
        return query.get(Registry, name.split('/'));
    }

    exports.require = passRequire;
    exports.Registry = Registry;

    exports.__defaultPipeline = {
        transform: transform,
        inline: inline
    };
}());

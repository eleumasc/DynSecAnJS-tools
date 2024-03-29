/*
 Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
 Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

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
(function () {
    'use strict';

    var Syntax,
        isArray,
        arrayFrom,
        arrayOf,
        has,
        sameValue,
        estraverse,
        escope,
        esutils,
        esrecurse,
        astTypes;

    estraverse = require('estraverse');
    escope = require('escope');
    esutils = require('esutils');
    esrecurse = require('./esrecurse/esrecurse');
    astTypes = require('./ast-types');

    Syntax = estraverse.Syntax;

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function isObject(obj) {
        return typeof obj === 'object' && obj !== null;
    }

    has = (function () {
        var method = {}.hasOwnProperty;
        return function has(obj, prop) {
            return method.call(obj, prop);
        };
    }());

    // ES6 Array.from
    arrayFrom = (function () {
        var slice = Array.prototype.slice;
        return function arrayFrom(array) {
            return slice.call(array);
        };
    }());

    // ES6 Array.of
    arrayOf = (function () {
        var slice = Array.prototype.slice;
        return function arrayOf() {
            return slice.call(arguments);
        };
    }());

    function arrayLast(array) {
        return array[array.length - 1];
    }

    function arrayEmpty(array) {
        return array.length === 0;
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    // see http://wiki.ecmascript.org/doku.php?id=harmony:egal
    // ECMA262 SameValue algorithm
    if (Object.is) {
        sameValue = Object.is;
    } else {
        sameValue = function sameValue(x, y) {
            if (x === y) {
                // 0 === -0, but they are not identical
                return x !== 0 || 1 / x === 1 / y;
            }

            // NaN !== NaN, but they are identical.
            // NaNs are the only non-reflexive value, i.e., if x !== x,
            // then x is a NaN.
            // isNaN is broken: it converts its argument to number, so
            // isNaN("foo") => true
            return x !== x && y !== y;
        };
    }

    function deepCopy(obj) {
        function deepCopyInternal(obj, result) {
            var key, val;
            for (key in obj) {
                if (key.lastIndexOf('__', 0) === 0) {
                    continue;
                }
                if (obj.hasOwnProperty(key)) {
                    val = obj[key];
                    if (typeof val === 'object' && val !== null) {
                        if (val instanceof RegExp) {
                            val = new RegExp(val);
                        } else {
                            val = deepCopyInternal(val, isArray(val) ? [] : {});
                        }
                    }
                    result[key] = val;
                }
            }
            return result;
        }

        return deepCopyInternal(obj, isArray(obj) ? [] : {});
    }

    function assert(cond, text) {
        if (!cond) {
            throw new Error(text);
        }
    }

    function unreachable() {
        throw new Error('Unreachable point. logically broken.');
    }

    function isIdentifier(name) {
        // fallback for ES3
        if (esutils.keyword.isKeywordES5(name, true) || esutils.keyword.isRestrictedWord(name)) {
            return false;
        }

        return esutils.keyword.isIdentifierName(name);
    }

    function mayBeCompletionValue(node, ancestors) {
        var i, ancestor;

        if (node.type !== Syntax.ExpressionStatement) {
            return true;
        }

        for (i = ancestors.length - 1; i >= 0; --i, node = ancestor) {
            ancestor = ancestors[i];

            switch (ancestor.type) {
                case Syntax.FunctionExpression:
                case Syntax.FunctionDeclaration:
                    return false;

                case Syntax.BlockStatement:
                case Syntax.Program:
                    if (arrayLast(ancestor.body) !== node) {
                        return false;
                    }
                    break;

                case Syntax.SwitchCase:
                    if (arrayLast(ancestor.consequent) !== node) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    function moveLocation(from, to) {
        if (from.loc == null) {
            return to;
        }
        to.loc = deepCopy(from.loc);
        return to;
    }

    function deleteLocation(node) {
        if (node.hasOwnProperty('loc')) {
            return delete node.loc;
        }
        return false;
    }

    function convertToEmptyStatement(node) {
        var i, iz, keys;
        keys = estraverse.VisitorKeys[node.type];
        for (i = 0, iz = keys.length; i < iz; ++i) {
            delete node[keys[i]];
        }
        node.type = Syntax.EmptyStatement;
        return node;
    }

    function isNegative(value) {
        return value === value && (value < 0 || (value === 0 && 1 / value < 0));
    }

    function isFunctionBody(node, parent) {
        return node.type === Syntax.BlockStatement && (parent.type === Syntax.FunctionDeclaration || parent.type === Syntax.FunctionExpression);
    }

    function isNumberLiteral(node) {
        return node.type === Syntax.Literal && typeof node.value === 'number';
    }

    function isOptimizedArgument(argument) {
        return isNumberLiteral(argument) && String(argument.value).length === 1;
    }

    function generateNegativeNode(value, node) {
        var result;
        result = {
            type: Syntax.UnaryExpression,
            operator: '-',
            argument: {
                type: Syntax.Literal,
                value: -value
            }
        };
        return (node) ? moveLocation(node, result) : result;
    }

    function isNegativeNode(node) {
        return node.type === Syntax.UnaryExpression && node.operator === '-' && isNumberLiteral(node.argument);
    }

    function generateUndefined(node) {
        var result = {
            type: Syntax.UnaryExpression,
            operator: 'void',
            argument: {
                type: Syntax.Literal,
                value: 0
            }
        };
        return (node) ? moveLocation(node, result) : result;
    }

    function isUndefined(node) {
        return node.type === Syntax.UnaryExpression && node.operator === 'void' && isOptimizedArgument(node.argument);
    }

    function generateNaN(node) {
        var result = {
            type: Syntax.BinaryExpression,
            operator: '/',
            left: {
                type: Syntax.Literal,
                value: 0
            },
            right: {
                type: Syntax.Literal,
                value: 0
            }
        };
        return (node) ? moveLocation(node, result) : result;
    }

    function isNaNNode(node) {
        if (node.type === Syntax.BinaryExpression) {
            if (isOptimizedArgument(node.left) && isOptimizedArgument(node.right)) {
                return node.left.value === 0 && node.right.value === 0;
            }
        }
        return false;
    }

    function generateFromValue(value) {
        if (typeof value === 'number') {
            if (isNaN(value)) {
                return generateNaN();
            }
            if (isNegative(value)) {
                return generateNegativeNode(value);
            }
        }
        if (value === undefined) {
            return generateUndefined();
        }
        return {
            type: Syntax.Literal,
            value: value
        };
    }

    function isReference(node) {
        var type = node.type;
        return type === Syntax.Identifier || type === Syntax.MemberExpression;
    }

    // @param last last element of SequenceExpression
    // @param parent parent element of SequenceExpression
    // @param scope scope
    function canExtractSequence(last, parent, scope) {
        var ref;
        if (parent.type === Syntax.CallExpression) {
            if (last.type === Syntax.Identifier) {
                if (last.name === 'eval') {
                    // This becomes direct call to eval.
                    return false;
                }
                ref = scope.resolve(last);
                return ref && ref.isStatic();
            }
            return last.type !== Syntax.MemberExpression;
        } else if (parent.type === Syntax.UnaryExpression) {
            if (parent.operator === 'delete') {
                return !isReference(last);
            } else if (parent.operator === 'typeof') {
                if (last.type === Syntax.Identifier) {
                    ref = scope.resolve(last);
                    return ref && ref.isStatic();
                }
            }
        } else if (parent.type === Syntax.UpdateExpression) {
            return !isReference(last);
        }
        return true;
    }

    function delegateVariableDeclarations(stmt, func) {
        var decls, target;

        decls = [];

        estraverse.traverse(stmt, {
            enter: function (node) {
                var i, iz, decl;
                if (node.type === Syntax.VariableDeclaration) {
                    if (node.kind === 'let' || node.kind === 'const') {
                        return;
                    }
                    for (i = 0, iz = node.declarations.length; i < iz; ++i) {
                        decl = node.declarations[i];
                        delete decl.init;
                        decls.push(decl);
                    }
                    return estraverse.VisitorOption.Skip;
                } else if (escope.Scope.isVariableScopeRequired(node)) {
                    return estraverse.VisitorOption.Skip;
                }
            }
        });

        if (!decls.length) {
            return null;
        }

        target = null;

        estraverse.traverse(func.body, {
            enter: function (node, parent) {
                if (node === stmt) {
                    return estraverse.VisitorOption.Skip;
                } else if (escope.Scope.isVariableScopeRequired(node)) {
                    return estraverse.VisitorOption.Skip;
                } else if (node.type === Syntax.VariableDeclaration && node.kind === 'var') {
                    // list is not allowed
                    if (parent.type !== Syntax.ForInStatement) {
                        target = node;
                        return estraverse.VisitorOption.Break;
                    }
                }
            }
        });

        if (target) {
            target.declarations = target.declarations.concat(decls);
            return null;
        } else {
            return {
                type: Syntax.VariableDeclaration,
                kind: 'var',
                declarations: decls
            };
        }
    }

    function isScopedDeclaration(node) {
        if (node.type === Syntax.VariableDeclaration && (node.kind === 'let' || node.kind === 'const')) {
            return true;
        } else if (node.type === Syntax.FunctionDeclaration) {
            return true;
        }
        return false;
    }

    var tmpVarCounter = 0;
    var tmpFuncCounter = 0;

    function getTempVar() {
        var tmpVar = '$tmp' + tmpVarCounter;
        tmpVarCounter++;
        return tmpVar;
    }

    function getTempFuncVar() {
        var tmpFuncVar = '$λ' + tmpFuncCounter;
        tmpFuncCounter++;
        return tmpFuncVar;
    }

    function isIdentOrLiteral(nodeType) {
        return (nodeType === Syntax.Identifier ||
        nodeType === Syntax.Literal);
    }

    function buildVarDeclStmt(init, flag) {
        // Get a new tmp variable
        var tmpId,key;
        if (flag) {
            if(init.type === Syntax.MemberExpression &&
                (init.object.type === Syntax.Identifier ||
                init.object.type === Syntax.ThisExpression) &&
                init.property.type === Syntax.Identifier && init.computed) {
                key = (init.object.name || 'this') + '[' + init.property.name+']';
            } else if(init.type === Syntax.MemberExpression &&
                (init.object.type === Syntax.Identifier ||
                init.object.type === Syntax.ThisExpression) &&
            init.property.type === Syntax.Identifier && !init.computed) {
                key = (init.object.name || 'this') +'.'+init.property.name;

            } else if(init.type === Syntax.MemberExpression &&
                (init.object.type === Syntax.Identifier ||
                init.object.type === Syntax.ThisExpression)  &&
                init.property.type === Syntax.Literal) {
                key = (init.object.name || 'this') + '.'+init.property.raw;
            } else {
                tmpId = '$tmp';
            }

            if(key)
                tmpId = Map[key];

            if(tmpId === undefined) {
                tmpId = getTempVar();
                Map[key] = tmpId;
                Map[tmpId] = key;
            }
        }
        else
            tmpId = getTempVar();
        // Tmp variable
        var tmpVar = {type: Syntax.Identifier, name: tmpId};
        // Create new Variable Declaration statement
        var newVarDeclStmt = {
            type: Syntax.VariableDeclaration,
            declarations: [{
                type: Syntax.VariableDeclarator,
                id: tmpVar, init: init
            }],
            kind: 'var'
        };

        return newVarDeclStmt;
    }

    function resetCounters() {
        tmpFuncCounter = 0;
        tmpVarCounter = 0;
    };

    function getLambdaLenMinus(n) {
        var b = astTypes.builders;
        var stmt = b.memberExpression(b.identifier("$Λ"),
            b.binaryExpression("-", b.memberExpression(b.identifier("$Λ"), b.identifier("length"), false),
                b.literal(n)), true);
        stmt.instrumented = true;
        return stmt;
    }

    function getOldPCStmt() {
        var b = astTypes.builders;
        var callExpr = b.callExpression(b.identifier("$pc"), []);
        callExpr.instrumented = true;
        var stmt = b.assignmentStatement("=", b.identifier("$old_pc"), callExpr);
        stmt.instrumented = true;
        return stmt;
    }

    function getWhileLoopStmtToLabel(label) {
        var b = astTypes.builders;
        var callExpr = b.callExpression(b.identifier("$pc"), []);
		var leftBinaryExpr = b.binaryExpression("!==",b.memberExpression(callExpr,
			b.identifier("id"), false), b.literal('global'));
		var rightBinaryExpr = b.binaryExpression("!==",
			b.memberExpression(callExpr, b.identifier("id"), false),
			b.literal(label));
        var stmt = b.whileStatement(b.logicalExpression("&&",leftBinaryExpr,rightBinaryExpr)
            , b.blockStatement([b.expressionStatement(b.callExpression(
                    b.memberExpression(b.identifier("$Λ"), b.identifier("pop"), false), []))]
            ));
        stmt.instrumented = true;
        return stmt;
    }

    // Constructs a $lub function call with the passed arguments.
    function getLubFuncCallExpr() {
        var b = astTypes.builders;
        var argsArray = [];
        for (var i = 0; i < arguments.length; i++)
            argsArray[i] = arguments[i];
        var stmt = getLubFuncCallExprWithArgsArray(argsArray);
        return stmt;
    }
        function deepCompare () {
            var i, l, leftChain, rightChain;

            function compare2Objects (x, y) {
                var p;

                // remember that NaN === NaN returns false
                // and isNaN(undefined) returns true
                if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                    return true;
                }

                // Compare primitives and functions.
                // Check if both arguments link to the same object.
                // Especially useful on step when comparing prototypes
                if (x === y) {
                    return true;
                }

                // Works in case when functions are created in constructor.
                // Comparing dates is a common scenario. Another built-ins?
                // We can even handle functions passed across iframes
                if ((typeof x === 'function' && typeof y === 'function') ||
                    (x instanceof Date && y instanceof Date) ||
                    (x instanceof RegExp && y instanceof RegExp) ||
                    (x instanceof String && y instanceof String) ||
                    (x instanceof Number && y instanceof Number)) {
                    return x.toString() === y.toString();
                }

                // At last checking prototypes as good a we can
                if (!(x instanceof Object && y instanceof Object)) {
                    return false;
                }

                if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                    return false;
                }

                if (x.constructor !== y.constructor) {
                    return false;
                }

                if (x.prototype !== y.prototype) {
                    return false;
                }

                // Check for infinitive linking loops
                if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                    return false;
                }

                // Quick checking of one object beeing a subset of another.
                // todo: cache the structure of arguments[0] for performance
                for (p in y) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }
                }

                for (p in x) {
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }

                    switch (typeof (x[p])) {
                        case 'object':
                        case 'function':

                            leftChain.push(x);
                            rightChain.push(y);

                            if (!compare2Objects (x[p], y[p])) {
                                return false;
                            }

                            leftChain.pop();
                            rightChain.pop();
                            break;

                        default:
                            if (x[p] !== y[p]) {
                                return false;
                            }
                            break;
                    }
                }

                return true;
            }

            if (arguments.length < 1) {
                return true; //Die silently? Don't know how to handle such case, please help...
                // throw "Need two or more arguments to compare";
            }

            for (i = 1, l = arguments.length; i < l; i++) {

                leftChain = []; //Todo: this can be cached
                rightChain = [];

                if (!compare2Objects(arguments[0], arguments[i])) {
                    return false;
                }
            }

            return true;
        }

    // Constructs a $lub function call with the passed arguments.
    function getLubFuncCallExprWithArgsArray(argsArray) {
        var b = astTypes.builders;
        if(argsArray.length == 0)
            return b.literal(0);
        else if(argsArray.length == 1) {
            return argsArray[0];
        } else if(argsArray.length == 2) {
			try {
				// compare the elements of the argsArray, if they are equal return
				// the first one otherwise must return conditional expression.
				if (JSON.stringify(argsArray[0]) === JSON.stringify(argsArray[1]))
					return argsArray[0];
			} catch(e){}

            var test = b.binaryExpression(">=",argsArray[0],argsArray[1]);
            return b.conditionalExpression(test, argsArray[0],argsArray[1]);
        } else {
            // compare the elements of the argsArray, if they are equal return
            // the first one otherwise must call $lub
            // NOTE: turning deepCompare off until finding a proper implementation
            //if(deepCompare(argsArray))
            //    return argsArray[0];

            var stmt = b.callExpression(b.identifier("$lub"), argsArray);
            return stmt;
        }
    }

    function secLvlHelper(node, getValue, $$cs) {
        var b = astTypes.builders,objName;

		// Special case handling of undefined
		if(node.type === Syntax.Identifier && node.name === 'undefined')
			return getPCDotL();

        switch (node.type) {
            case Syntax.Literal:
                return getPCDotL();
			case Syntax.MemberExpression:
                // A special case for handling of build-in JS objects.
				// This is a very bad hack until IF-Traspiler supports Runtime APIs.
                var runtimeObjectsNames = "StringNumberArrayObjectFunctionDateBoolean";
				// the length of 4 is for the smallest length of runtime objects which is "Date" 4 chars.
                if(runtimeObjectsNames.indexOf(node.object.name || 'this') != -1 && node.object.name.length >= 4)
                    return b.objectExpression([b.property("init", b.identifier("Σ"), b.literal(0)),
                            b.property("init", b.identifier("prototype"),
                                b.objectExpression([b.property("init", b.identifier("Σ"), getPCDotL())]))]);
                // Handling this.prop
                if(!node.object.name) {
                    if($$cs.object.type === Syntax.Identifier)
                        objName = 'global';
                    else {
                        //console.log(JSON.stringify($$cs,null,4))
						objName = '$this';
                        //objName = $$cs.object.property.value;
                        //$$cs = $$cs.object;
                    }
                } else
                    objName = node.object.name;
                if(node.computed)
                    return getSecLvlCallExpr([b.literal(objName),
                        node.property, b.literal(getValue), $$cs]);
                else
                    return getSecLvlCallExpr([b.literal(objName),
                        b.literal(node.property.name || node.property.raw), b.literal(getValue), $$cs]);
            case Syntax.Identifier:
                return getSecLvlCallExpr([b.literal(node.name),
                    b.literal(null), b.literal(getValue), $$cs]);
            case Syntax.BinaryExpression:
            case Syntax.LogicalExpression:
                return getLubFuncCallExprWithArgsArray(
                    [secLvlHelper(node.left, true, $$cs),
                        secLvlHelper(node.right, true, $$cs)]);
            case Syntax.UnaryExpression:
                return secLvlHelper(node.argument, getValue, $$cs);
            case Syntax.UpdateExpression:
                return secLvlHelper(node.argument, getValue, $$cs);
            case Syntax.ArrayExpression:
                if (node.elements.length === 0)
                    return b.literal(0);
                var elems = [];
                for (var i = 0; i < node.elements.length; i++) {
                    elems.push(secLvlHelper(node.elements[i], getValue, $$cs));
                }
                return getLubFuncCallExprWithArgsArray(elems);

            case Syntax.ObjectExpression:
                if (node.properties.length === 0)
                    return b.literal(0);
                var elems = [];
                for (i = 0; i < node.properties.length; i++) {
                    if (node.properties[i].value.type !== Syntax.Literal)
                        elems.push(secLvlHelper(node.properties[i].value, getValue, $$cs));
                }
                return getLubFuncCallExprWithArgsArray(elems);
            case Syntax.ThisExpression:
                return b.memberExpression($$cs, b.identifier("$this"),false);
            default :
                throw new Error("Unsupported Node Type " + node.type);
        }
    }

    function getSecLvlCallExpr(args) {
        var b = astTypes.builders;

        var callExpr = b.callExpression(b.identifier("sec_lvl"), args);
        return callExpr;
    }

    function getLambdaPopCallDotLExpr() {
        var b = astTypes.builders;

        var callExpr = b.callExpression(
            b.memberExpression(b.identifier("$Λ"), b.identifier("pop"), false), []);
        return b.memberExpression(callExpr, b.identifier("l"), false);
    }

    function getLambdaPopCallExpr() {
        var b = astTypes.builders;

        var callExpr = b.callExpression(
            b.memberExpression(b.identifier("$Λ"), b.identifier("pop"), false), []);
        var stmt = b.expressionStatement(callExpr);
        return stmt;
    }

    function getPCDotL() {
        var b = astTypes.builders;
        var binExpr = b.binaryExpression("-", b.memberExpression(b.identifier("$Λ"),
            b.identifier("length"),false), b.literal(1));
        var stmt = b.memberExpression(b.identifier("$Λ"), binExpr, true);
        return b.memberExpression(stmt, b.identifier("l"),false);
    }

    function getDeltaPushCallExprWithArg(arg) {
        var b = astTypes.builders;

        var callExpr = b.callExpression(
            b.memberExpression(b.identifier("$Δ"), b.identifier("push"), false), [arg]);
        callExpr.instrumented = true;
        var stmt = b.expressionStatement();
        stmt.instrumented = true;
        return stmt;
    }

    function getLambdaPushCallExprWithArg(arg) {
        var b = astTypes.builders;
        var callExpr = b.callExpression(
            b.memberExpression(b.identifier("$Λ"), b.identifier("push"), false), [arg]);
        callExpr.instrumented = true;
        var stmt = b.expressionStatement(callExpr);
        stmt.instrumented = true;
        return stmt;
    }

    function getUpgradeCallExpr(xs, lvl, currentScope) {
        var b = astTypes.builders;

        var callExpr = b.callExpression(b.identifier("$upgrade"), [xs, lvl, currentScope]);
        callExpr.instrumented = true;
        var stmt = b.expressionStatement(callExpr);
        stmt.instrumented = true;
        return stmt;
    }

    function getCompensateCallExpr(label) {
        var b = astTypes.builders;
        var pcDotL = getPCDotL();

        var callExpr = b.callExpression(b.identifier("$comp"), [label, pcDotL]);
        callExpr.instrumented = true;
        var stmt = b.expressionStatement(callExpr);
        stmt.instrumented = true;
        return stmt;
    }

    function getCurrentScopeExpr(scopePath, addedPath) {
        var b = astTypes.builders;
        var csExpr = b.memberExpression(b.identifier("$Γ"), b.literal(scopePath[0]), true);
        assert(scopePath.length >= 1, "scopePath array object must have at least one element.");
        for (var i = 1; i < scopePath.length; i++) {
            csExpr = b.memberExpression(csExpr, b.literal((scopePath[i]==='this')?'$this':scopePath[i]), true);
        }
        if (addedPath) {
            for (i = 0; i < addedPath.length; i++) {
                csExpr = b.memberExpression(csExpr, b.literal(addedPath[i]), true);
            }
        }
        csExpr.instrumented = true;
        return csExpr;
    }

    function getScopeCallExpr($$cs, varName, isLHS) {
        var b = astTypes.builders;

            return b.callExpression(b.identifier("$scope"), [$$cs, b.literal(varName), isLHS]);
    }

    function getFindVarInScopeChainExpr($$cs, varName, propName, isLHS,isComputed) {
        var b = astTypes.builders;
        // Handling this.prop
        if(varName === 'this') {
            if($$cs.object.type === Syntax.Identifier)
                varName = 'global';
            else {
                //console.log(JSON.stringify($$cs,null,4))
                //varName = $$cs.object.property.value;
				if(!propName)
                	return b.memberExpression($$cs, b.literal("$this"),true);
				else
					return b.memberExpression(
						b.memberExpression($$cs, b.literal("$this"),true), b.literal(propName),true);
                //$$cs = $$cs.object;
            }
        }
        if (propName) {
            if(varName.indexOf("$tmp")==0)
                return b.memberExpression(b.memberExpression($$cs, b.literal(varName),true), b.literal(propName), true);
            else
                return b.memberExpression(b.memberExpression(getScopeCallExpr($$cs, varName, isLHS),
					b.literal(varName),true), isComputed? b.identifier(propName):b.literal(propName), true);
        }else {
            if(varName.indexOf("$tmp")==0)
                return b.memberExpression($$cs, b.literal(varName),true);
            else
                return b.memberExpression(getScopeCallExpr($$cs, varName, isLHS),
					b.literal(varName), true);
        }
    }

    function getFindPropInProtoChainExpr(objName, propName, $$cs) {
        var b = astTypes.builders;
        // Handling this.prop
        if(objName === 'this') {
            if($$cs.object.type === Syntax.Identifier)
                objName = 'global';
            else {
                //console.log(JSON.stringify($$cs,null,4))
                objName = $$cs.object.property.value;
                //$$cs = $$cs.object;
            }
        }
        var callexpr = b.callExpression(b.identifier("$prop"),
            [b.literal(objName), b.literal(propName), $$cs]);
        return callexpr;
    }


    // This function corresponds to collect function in the paper
    function $collect(ast) {
        var result = [];
        // we use the names list so that we don't add same var twice
        var names = [];

        function pushOnStack(name) {
            var b = astTypes.builders;
            if (names.indexOf(name) === -1) {
                names.push(name);
                result.push(b.literal(name));
            }
        }

        estraverse.traverse(ast, {
            leave: function leave(node) {

				// Ignore IFC nodes, they don't need to be upgraded.
                if (node.ifc_node)
                    return;

                if (node.type === Syntax.AssignmentExpression) {
                    if (node.left.type === Syntax.Identifier) {
                        pushOnStack(node.left.name);
                    } else if (node.left.type === Syntax.MemberExpression) {
                        pushOnStack(node.left.object.name || 'this');
						pushOnStack((node.left.object.name || 'this')+'.'+
							(node.left.property.name || node.left.property.value));
                    }
                } else if (node.type === Syntax.CallExpression || node.type === Syntax.NewExpression) {
                    if (node.callee.type === Syntax.Identifier)
                        pushOnStack(node.callee.name);
                    else if (node.callee.type === Syntax.MemberExpression) {
                        var propertyName;
                        if (node.callee.property.type === Syntax.Identifier)
                            propertyName = node.callee.property.name;
                        else if (node.callee.property.type === Syntax.Literal)
                            propertyName = node.callee.property.value;
                        else
                            throw new Error("Property of object must be an Identifier or Literal.")

                        pushOnStack((node.callee.object.name || 'this') + '.' + propertyName);
                    }
                }
            }
        });

        return result;

    }


    function checkCompensation(blockStmt, node) {
        var shouldComp;
        forLoop:for (var i = 0; i < blockStmt.body.length; i++) {
            var stmtType = blockStmt.body[i].type;
            if (stmtType === Syntax.ReturnStatement) {
                shouldComp = {lbl: 'FUNC'};
                break;
            } else if (stmtType === Syntax.ThrowStatement) {
                var parentNode = node.parentNode;
                // Check if we are inside a TryStatement
                while (parentNode) {
                    if (parentNode.type === Syntax.TryStatement) {
                        shouldComp = {lbl: 'TRY'};
                        break forLoop;
                    }
                    parentNode = parentNode.parentNode;
                }
                // Otherwise compensate tell the nearest function
                shouldComp = {lbl: 'FUNC'};
                break;
            } else if (stmtType === Syntax.BreakStatement ||
                stmtType === Syntax.ContinueStatement) {
                // Check if the break|continue have a label, if so,
                // compensate tell that label
                if (blockStmt.body[i].label) {
                    shouldComp = {lbl: blockStmt.body[i].label};
                    break;
                }
                // Otherwise compensate tell the nearest loop
                shouldComp = {lbl: 'LOOP'};
                break;
            }

        }

        return shouldComp;
    }

    function getIsObjCondExprStmt(testObj, consequent, alternate) {
        var b = astTypes.builders;

        var test = b.binaryExpression("instanceof", testObj, b.identifier("Object"));
        return b.expressionStatement(b.conditionalExpression(test, consequent, alternate));
    }

        function insertUpdateStmtBeforeContinue(cb, newVarDeclStmt) {
            for (var i = 0; i < cb.length; i++) {
                if (cb[i].type === Syntax.ContinueStatement) {
                    cb.splice(i, 0, deepCopy(newVarDeclStmt));
                    // increment i to skip over the continue stmt itself.
                    i++;
                } else if (cb[i].type === Syntax.IfStatement) {
                    if(cb[i].consequent.body)
                        insertUpdateStmtBeforeContinue(cb[i].consequent.body, newVarDeclStmt);
                    if(cb[i].alternate && cb[i].alternate.body)
                        insertUpdateStmtBeforeContinue(cb[i].alternate.body, newVarDeclStmt);
                } else if (cb[i].type === Syntax.TryStatement)  {
                    insertUpdateStmtBeforeContinue(cb[i].block.body,newVarDeclStmt);
                    if(cb[i].finalizer)
                        insertUpdateStmtBeforeContinue(cb[i].finalizer.body,newVarDeclStmt);
                }
            }
        }

        function unMapIntermediaryScopes(scopeCopy) {
            // if any of the intermediary scopes is mapped, use
            // the mapped value. e.g. global,$tmp2,blah --> global,Scheduler,blah
            for(var j=1;j<scopeCopy.length;j++) {
                if(Map[''+scopeCopy[j]]) {
                    scopeCopy[j] = Map[''+scopeCopy[j]];
                }
            }
        }

        exports.unMapIntermediaryScopes = unMapIntermediaryScopes;


        var Map = {};
        exports.Map = Map;

        var VarsInScopeMap = {};
        exports.VarsInScopeMap = VarsInScopeMap;

        exports.insertUpdateStmtBeforeContinue = insertUpdateStmtBeforeContinue;

        exports.secLvlHelper = secLvlHelper;
        exports.getIsObjCondExprStmt = getIsObjCondExprStmt;
        exports.getLambdaPopCallDotLExpr = getLambdaPopCallDotLExpr;
        exports.getFindPropInProtoChainExpr = getFindPropInProtoChainExpr;
        exports.getFindVarInScopeChainExpr = getFindVarInScopeChainExpr;
        exports.getScopeCallExpr = getScopeCallExpr;
        exports.getLubFuncCallExprWithArgsArray = getLubFuncCallExprWithArgsArray;
        exports.getSecLvlCallExpr = getSecLvlCallExpr;
        exports.getPCDotL = getPCDotL;
        exports.getDeltaPushCallExprWithArg = getDeltaPushCallExprWithArg;
        exports.getCompensateCallExpr = getCompensateCallExpr;
        exports.getUpgradeCallExpr = getUpgradeCallExpr;
        exports.getLambdaPopCallExpr = getLambdaPopCallExpr;
        exports.getLambdaPushCallExprWithArg = getLambdaPushCallExprWithArg;
        exports.checkCompensation = checkCompensation;
        exports.$collect = $collect;
        exports.getCurrentScopeExpr = getCurrentScopeExpr;
        exports.getLubFuncCallExpr = getLubFuncCallExpr;
        exports.getLambdaLenMinus = getLambdaLenMinus;
        exports.getOldPCStmt = getOldPCStmt;
        exports.getWhileLoopStmtToLabel = getWhileLoopStmtToLabel;

        exports.resetCounters = resetCounters;

        exports.getTempVar = getTempVar;
        exports.getTempFuncVar = getTempFuncVar;
        exports.isIdentOrLiteral = isIdentOrLiteral;
        exports.buildVarDeclStmt = buildVarDeclStmt;

        exports.deepCopy = deepCopy;
        exports.stringRepeat = stringRepeat;
        exports.sameValue = sameValue;

        exports.Array = {
            isArray: isArray,
            from: arrayFrom,
            of: arrayOf,
            last: arrayLast,
            empty: arrayEmpty
        };

        exports.Object = {
            isObject: isObject,
            has: has
        };

        exports.Syntax = Syntax;
        exports.traverse = estraverse.traverse;
        exports.replace = estraverse.replace;
        exports.VisitorKeys = estraverse.VisitorKeys;
        exports.VisitorOption = estraverse.VisitorOption;

        exports.visit = esrecurse.visit;
        exports.astBuilder = astTypes.builders;

        exports.assert = assert;
        exports.unreachable = unreachable;

        exports.isIdentifier = isIdentifier;

        exports.moveLocation = moveLocation;
        exports.deleteLocation = deleteLocation;
        exports.convertToEmptyStatement = convertToEmptyStatement;

        exports.mayBeCompletionValue = mayBeCompletionValue;

        exports.isNegative = isNegative;

        exports.isFunctionBody = isFunctionBody;
        exports.SpecialNode = {
            generateNegative: generateNegativeNode,
            isNegative: isNegativeNode,
            generateUndefined: generateUndefined,
            isUndefined: isUndefined,
            generateNaN: generateNaN,
            isNaN: isNaNNode,
            isReference: isReference,
            canExtractSequence: canExtractSequence,
            generateFromValue: generateFromValue
        };

        exports.delegateVariableDeclarations = delegateVariableDeclarations;

        exports.isScopedDeclaration = isScopedDeclaration;
    }());
/* vim: set sw=4 ts=4 et tw=80 : */

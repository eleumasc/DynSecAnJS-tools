/*
 Copyright (C) 2014 Yusuke Suzuki <utatane.tea@gmail.com>

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
(function () {
	'use strict';

	var estraverse,
		isArray,
		objectKeys,
		common;

	estraverse = require('estraverse');
	common = require('../common');

	isArray = Array.isArray;
	if (!isArray) {
		isArray = function isArray(array) {
			return Object.prototype.toString.call(array) === '[object Array]';
		};
	}

	objectKeys = Object.keys || function (o) {
			var keys = [], key;
			for (key in o) {
				keys.push(key);
			}
			return keys;
		};

	function isNode(node) {
		if (node == null) {
			return false;
		}
		return typeof node === 'object' && typeof node.type === 'string';
	}

	function isProperty(nodeType, key) {
		return (nodeType === estraverse.Syntax.ObjectExpression || nodeType === estraverse.Syntax.ObjectPattern) && key === 'properties';
	}

	function Visitor(visitor) {
		this.__visitor = visitor || this;
	}

	/* Default method for visiting children.
	 * When you need to call default visiting operation inside custom visiting
	 * operation, you can use it with `this.visitChildren(node)`.
	 */
	Visitor.prototype.visitChildren = function (node) {
		var type, children, i, iz, j, jz, child;

		if (node == null) {
			return;
		}

		type = node.type || estraverse.Syntax.Property;

		children = estraverse.VisitorKeys[type];
		if (!children) {
			children = objectKeys(node);
		}

		for (i = 0; i < children.length; ++i) {
			child = node[children[i]];
			if (child) {
				if (Array.isArray(child)) {
					for (j = 0; j < child.length; ++j) {
						//console.log('child node type:'+child[j].type+ '   child length: '+child.length);
						if (child[j]) {
							if (isNode(child[j]) || isProperty(type, children[i])
							) {
								child[j].parentNode = node;
								this.visit(child[j], j);
							}
						}
					}
				} else if (isNode(child)) {
					child.parentNode = node;
					this.visit(child, i);
				}
			}
		}
	};

	var scope = ['global'];

	/* Dispatching node. */
	Visitor.prototype.visit = function (node, idx) {
		var type;

		if (node == null) {
			return;
		}

		// case function foo(){}
		if (node.type === common.Syntax.FunctionDeclaration)
			scope.push(node.id.name);
		// case foo = function(){};
		else if (node.type === common.Syntax.FunctionExpression) {
			//case foo = function(){}
			if (node.parentNode.left.type === common.Syntax.Identifier)
				scope.push(node.parentNode.left.name);
			else if (node.parentNode.left.type === common.Syntax.MemberExpression) {
				scope.push(node.parentNode.left.object.name || 'this');
				scope.push(node.parentNode.left.property.name);
			} else
				throw new Error("Unknown left side of function assignment.")
		}

		type = node.type || estraverse.Syntax.Property;


		node.idx = idx;

		// Basic Handling of with statements
		if(node.type === common.Syntax.WithStatement &&
			node.object.type === common.Syntax.Identifier &&
			node.object.name !== 'NaN') {
			scope.push(node.object.name);
		}
		this.visitChildren(node);

		if(node.type === common.Syntax.WithStatement &&
			node.object.type === common.Syntax.Identifier &&
			node.object.name !== 'NaN') {
			scope.pop();
		}

		if (node.type === common.Syntax.FunctionDeclaration
			|| node.type === common.Syntax.FunctionExpression) {

			if (scope.length > 1) {
				scope.pop();
				// We need to pop twice if we pushed twice.
				if (node.type === common.Syntax.FunctionExpression
					&& node.parentNode.left.type === common.Syntax.MemberExpression)
					scope.pop();
			}
			else
				throw new Error("Popping from empty scope stack.")
		}

		if (this.__visitor[type]) {
			this.__visitor[type].call(this, node, node.idx, scope);
		}
	};

	exports.version = require('./package.json').version;
	exports.Visitor = Visitor;
	exports.visit = function (node, visitor) {
		var v = new Visitor(visitor);
		node.parentNode = null;
		node.idx = 0;
		v.visit(node, 0);
	};
}());
/* vim: set sw=4 ts=4 et tw=80 : */

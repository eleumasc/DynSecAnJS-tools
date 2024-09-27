let Jalangi;
(function (_Jalangi) {
  let Yuantijs;
  (function (_Yuantijs) {
    (function (J$) {
      const global = window;

      const trackingResult = {
        flowCollection: [],
        storageLabelCollection: [],
      };

      function __ytjs_getTrackingResult() {
        function simplifyTaint(taint) {
          const labelSet = new Set();
          const visitQueue = [taint];
          const visitedTaintSet = new WeakSet();
          while (visitQueue.length > 0) {
            const currentTaint = visitQueue.pop();
            if (visitedTaintSet.has(currentTaint)) continue;
            visitedTaintSet.add(currentTaint);
            if (isBaseTaint(currentTaint)) {
              labelSet.add(currentTaint.label);
            } else if (isJoinTaint(currentTaint)) {
              visitQueue.push(currentTaint.l, currentTaint.r);
            }
          }
          return [...labelSet];
        }

        const labelSet = new Set();
        function registerLabel(label) {
          return labelSet.add(label), label.id;
        }

        const compactFlowCollection = trackingResult.flowCollection.map(
          (flow) => ({
            taint: simplifyTaint(flow.taint).map((label) =>
              registerLabel(label)
            ),
            sinkLabel: registerLabel(flow.sinkLabel),
          })
        );

        const compactStorageLabelCollection =
          trackingResult.storageLabelCollection.map((label) =>
            registerLabel(label)
          );

        const labelMap = Object.fromEntries(
          [...labelSet].map((label) => [label.id, label])
        );

        return {
          labelMap,
          flowCollection: compactFlowCollection,
          storageLabelCollection: compactStorageLabelCollection,
        };
      }
      global.__ytjs_getTrackingResult = __ytjs_getTrackingResult;

      function collectFlow(taint, sinkLabel) {
        if (isBottom(taint)) return;
        trackingResult.flowCollection.push({
          taint,
          sinkLabel,
        });
      }

      function collectStorageLabel(label) {
        trackingResult.storageLabelCollection.push(label);
      }

      const isNaN = global.isNaN;

      const Reflect_defineProperty = global.Reflect.defineProperty;
      const Reflect_getOwnPropertyDescriptor =
        global.Reflect.getOwnPropertyDescriptor;
      const Reflect_getPrototypeOf = global.Reflect.getPrototypeOf;
      const Reflect_ownKeys = global.Reflect.ownKeys;
      const Reflect_setPrototypeOf = global.Reflect.setPrototypeOf;

      const Object_prototype = global.Object.prototype;
      const Array_prototype = global.Array.prototype;

      const Storage_prototype_getItem = global.Storage.prototype.getItem;
      const Storage_prototype_setItem = global.Storage.prototype.setItem;
      const localStorage = global.localStorage;
      const sessionStorage = global.sessionStorage;
      const document = global.document;
      const location = global.location;
      const navigator = global.navigator;
      const navigator_sendBeacon = global.navigator.sendBeacon;
      const XMLHttpRequest_prototype = global.XMLHttpRequest.prototype;
      const XMLHttpRequest_prototype_open =
        global.XMLHttpRequest.prototype.open;
      const XMLHttpRequest_prototype_send =
        global.XMLHttpRequest.prototype.send;
      const fetch = global.fetch;
      const HTMLElement = global.HTMLElement;

      const Promise = global.Promise;
      const Promise_prototype = global.Promise.prototype;
      const Promise_prototype_then = global.Promise.prototype.then;

      function Location(iid, sid) {
        sid = sid || J$.sid;
        const entry = J$.smap[sid];
        if (entry) {
          return {
            iid,
            sid,
            url: entry.url || "null",
            loc: entry[iid],
            sub:
              entry.evalIid && entry.evalSid
                ? Location(entry.evalIid, entry.evalSid)
                : null,
          };
        } else {
          throw new Error("Entry not found in script map");
        }
      }

      function getScriptUrl(sid) {
        sid = sid || J$.sid;
        const entry = J$.smap[sid];
        if (entry) {
          return entry.url || "null";
        } else {
          throw new Error("Entry not found in script map");
        }
      }

      let freshLabelId = 1;

      function Label(type, location, info) {
        return {
          id: freshLabelId++,
          type,
          location,
          info,
        };
      }

      function Taint(label) {
        return {
          type: "base",
          label,
        };
      }

      const BOTTOM = {
        type: "bottom",
      };

      function join(l, r) {
        if (l === BOTTOM) {
          return r;
        } else if (r === BOTTOM) {
          return l;
        }
        return {
          type: "join",
          l,
          r,
        };
      }

      function isBottom(taint) {
        return taint.type === "bottom";
      }

      function isBaseTaint(taint) {
        return taint.type === "base";
      }

      function isJoinTaint(taint) {
        return taint.type === "join";
      }

      function isObject(value) {
        return (
          (typeof value === "object" && value !== null) ||
          typeof value === "function"
        );
      }

      function isFunction(value) {
        return typeof value === "function";
      }

      function findPropertyOwner(object, key) {
        let descriptor;
        for (
          ;
          object &&
          !(descriptor = Reflect_getOwnPropertyDescriptor(object, key));
          object = Reflect_getPrototypeOf(object)
        );
        if (object) {
          return {
            object: object,
            descriptor: descriptor,
          };
        } else {
          return null;
        }
      }

      function toShadowName(name) {
        return typeof name === "symbol" ? name : "$" + name;
      }

      const INTRINSIC = Symbol();

      class Memory {
        constructor() {
          this.shadowMap = new WeakMap();
          this.userFunctionMap = new WeakMap();
        }

        getShadow(object) {
          return this.shadowMap.get(object) || null;
        }

        getOrCreateShadow(object) {
          let shadow = this.shadowMap.get(object);
          if (!shadow) {
            this.shadowMap.set(object, (shadow = {}));
          }
          return shadow;
        }

        get(target, key) {
          if (!isObject(target)) {
            return BOTTOM;
          }
          const ownerInfo = findPropertyOwner(target, key);
          if (ownerInfo) {
            const descriptor = ownerInfo.descriptor;
            if (descriptor.get && descriptor.set) {
              return BOTTOM;
            } else {
              return this.getOwn(ownerInfo.object, key);
            }
          } else {
            return BOTTOM;
          }
        }

        getOwn(targetObj, key) {
          const shadow = this.getShadow(targetObj);
          if (!shadow) {
            return BOTTOM;
          }
          if (this.isUserObject(targetObj)) {
            return shadow[toShadowName(key)] || BOTTOM;
          } else {
            return shadow[INTRINSIC] || BOTTOM;
          }
        }

        set(target, key, taint) {
          if (!isObject(target)) {
            return true;
          }
          const ownerInfo = findPropertyOwner(target, key);
          if (ownerInfo) {
            const descriptor = ownerInfo.descriptor;
            if (descriptor.get || descriptor.set) {
              return true;
            } else if (!descriptor.writable) {
              return false;
            } else {
              return this.setOwn(target, key, taint);
            }
          } else {
            return this.setOwn(target, key, taint);
          }
        }

        setOwn(targetObj, key, taint) {
          const shadow = this.getOrCreateShadow(targetObj);
          if (this.isUserObject(targetObj)) {
            shadow[toShadowName(key)] = taint;
          } else {
            shadow[INTRINSIC] = join(shadow[INTRINSIC] || BOTTOM, taint);
          }
          return true;
        }

        delete(target, key) {
          if (!isObject(target)) {
            return true;
          }
          const descriptor = Reflect_getOwnPropertyDescriptor(target, key);
          if (descriptor) {
            if (descriptor.configurable) {
              const shadow = this.getShadow(target);
              if (shadow) {
                delete shadow[toShadowName(key)];
              }
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }

        getIntrinsic(target) {
          if (!isObject(target)) {
            return BOTTOM;
          }
          const shadow = this.getShadow(target);
          if (!shadow) {
            return BOTTOM;
          }
          if (this.isUserObject(target)) {
            let taint = BOTTOM;
            const keys = Reflect_ownKeys(target);
            for (let i = 0; i < keys.length; ++i) {
              taint = join(taint, shadow[toShadowName(keys[i])] || BOTTOM);
            }
            return taint;
          } else {
            return shadow[INTRINSIC] || BOTTOM;
          }
        }

        updateIntrinsic(target, taint) {
          if (!isObject(target)) {
            return true;
          }
          if (taint === BOTTOM) {
            return true;
          }
          const shadow = this.getOrCreateShadow(target);
          if (this.isUserObject(target)) {
            const keys = Reflect_ownKeys(target);
            for (let i = 0; i < keys.length; ++i) {
              const $key = toShadowName(keys[i]);
              shadow[$key] = join(shadow[$key] || BOTTOM, taint);
            }
            return true;
          } else {
            shadow[INTRINSIC] = join(shadow[INTRINSIC] || BOTTOM, taint);
            return true;
          }
        }

        isUserObject(targetObj) {
          if (targetObj === global) {
            return true;
          } else {
            const prototype = Reflect_getPrototypeOf(targetObj);
            return (
              !prototype ||
              prototype === Object_prototype ||
              prototype === Array_prototype ||
              (prototype.constructor &&
                this.userFunctionMap.has(prototype.constructor))
            );
          }
        }

        addUserFunction(f, meta) {
          this.userFunctionMap.set(f, meta);
        }

        isUserFunction(f) {
          return this.userFunctionMap.has(f);
        }

        getUserFunctionMeta(f) {
          return this.userFunctionMap.get(f);
        }
      }

      const memory = new Memory();

      class FunctionEnvironment {
        constructor(parentEnv) {
          if (parentEnv instanceof FunctionEnvironment) {
            this.foreignEnv = parentEnv.foreignEnv;
            Reflect_setPrototypeOf((this.bindings = {}), null);
          } else {
            this.foreignEnv = parentEnv;
            Reflect_setPrototypeOf((this.bindings = {}), null);
          }
          this.store = {};
          this.args = null;
        }

        get(identifier) {
          return (
            this.bindings[toShadowName(identifier)] ||
            this.foreignEnv.get(identifier)
          );
        }

        set(identifier, taint) {
          const $identifier = toShadowName(identifier);
          if ($identifier in this.bindings) {
            this.bindings[$identifier] = taint;
          } else {
            this.foreignEnv.set(identifier, taint);
          }
        }

        declareVariable(identifier, taint) {
          const $identifier = toShadowName(identifier);
          this.store[$identifier] = taint;
          const thisEnv = this;
          Reflect_defineProperty(this.bindings, $identifier, {
            configurable: true,
            enumerable: true,

            get: function () {
              return thisEnv.store[$identifier];
            },

            set: function (taint) {
              thisEnv.store[$identifier] = taint;
            },
          });
        }

        initArguments(args) {
          this.args = args;
          this.declareVariable("arguments", BOTTOM);
        }

        declareArgument(identifier, index) {
          if (!this.args) {
            throw new Error(
              "Declaring argument, but arguments has not been initialized"
            );
          }
          const thisEnv = this;
          Reflect_defineProperty(this.bindings, toShadowName(identifier), {
            configurable: true,
            enumerable: true,

            get: function () {
              return memory.get(thisEnv.args, "" + index);
            },

            set: function (taint) {
              memory.set(thisEnv.args, "" + index, taint);
            },
          });
        }
      }

      class GlobalEnvironment {
        get(identifier) {
          return memory.get(global, identifier);
        }

        set(identifier, taint) {
          memory.set(global, identifier, taint);
        }

        declareVariable(identifier, taint) {
          memory.set(global, identifier, taint);
        }

        initArguments(args) {
          throw new Error("Initializing arguments in global environment");
        }

        declareArgument(identifier, index) {
          throw new Error("Declaring argument in global environment");
        }
      }

      class Frame {
        constructor(env, ctx) {
          this.stack = [];
          this.env = env;
          this.ctx = ctx;
          this.calleeCtx = BOTTOM_CONTEXT;
          this.retTaint = BOTTOM;
        }

        setCalleeContext(ctx) {
          this.calleeCtx = ctx;
        }

        resetCalleeContext() {
          this.calleeCtx = BOTTOM_CONTEXT;
        }
      }

      class YuantijsAnalysis {
        constructor() {
          this.frameStack = [];
          this.currentFrame = new Frame(
            new GlobalEnvironment(),
            new UserFunctionContext(BOTTOM, [])
          );
          this.excTaint = BOTTOM;
          this.auxTaint = BOTTOM;
          this.readWithStmtObject = null;

          const thisAnalysis = this;

          const defaultLast = J$._;
          J$._ = function () {
            thisAnalysis.last();
            return defaultLast();
          };

          _setupTrackablePromise(this);
        }

        push(taint) {
          this.currentFrame.stack.push(taint);
        }

        peek() {
          return this.currentFrame.stack.at(-1);
        }

        take() {
          return this.currentFrame.stack.pop();
        }

        takeMany(takeLength) {
          return takeLength > 0
            ? this.currentFrame.stack.splice(-takeLength)
            : [];
        }

        remove() {
          --this.currentFrame.stack.length;
        }

        removeMany(removeLength) {
          this.currentFrame.stack.length -= removeLength;
        }

        isObjectLiteral(value) {
          if (isObject(value)) {
            const prototype = Reflect_getPrototypeOf(value);
            return (
              !prototype ||
              prototype === Object_prototype ||
              (prototype.constructor &&
                memory.isUserFunction(prototype.constructor))
            );
          } else {
            return false;
          }
        }

        isArrayLiteral(value) {
          return (
            isObject(value) && Reflect_getPrototypeOf(value) === Array_prototype
          );
        }

        initObjectLiteral(target) {
          const keys = Reflect_ownKeys(target);
          const dataKeys = [];
          let getterSetterCount = 0;
          let hasNumericKey = false;
          for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            const descriptor = Reflect_getOwnPropertyDescriptor(target, key);
            if (descriptor.get || descriptor.set) {
              if (descriptor.get && descriptor.set) {
                getterSetterCount += 2;
              } else {
                getterSetterCount += 1;
              }
            } else {
              dataKeys[dataKeys.length] = key;
            }
            if (!isNaN(+key)) {
              hasNumericKey = true;
            }
          }
          this.removeMany(getterSetterCount);
          let overridesPrototype =
            Reflect_getPrototypeOf(target) !== Object_prototype;
          if (hasNumericKey || overridesPrototype) {
            let taint = BOTTOM;
            for (
              let i = dataKeys.length + (overridesPrototype ? 1 : 0) - 1;
              i >= 0;
              --i
            ) {
              taint = join(this.take(), taint);
            }
            for (let i = dataKeys.length - 1; i >= 0; --i) {
              memory.setOwn(target, dataKeys[i], taint);
            }
          } else {
            for (let i = dataKeys.length - 1; i >= 0; --i) {
              memory.setOwn(target, dataKeys[i], this.take());
            }
          }
        }

        initArrayLiteral(target) {
          const keys = Reflect_ownKeys(target);
          for (let i = keys.length - 2; i >= 0; --i) {
            memory.setOwn(target, keys[i], this.take());
          }
        }

        initFunctionLiteral(target) {
          memory.addUserFunction(target, {
            env: this.currentFrame.env,
          });
        }

        invokeFunPre(
          iid,
          f,
          base,
          args,
          isConstructor,
          isMethod,
          functionIid,
          functionSid
        ) {
          let argsTaint = this.takeMany(args.length);
          this.remove();
          let baseTaint = BOTTOM;
          if (isMethod) {
            baseTaint = this.take();
          }
          if (memory.isUserFunction(f)) {
            this.currentFrame.setCalleeContext(
              new UserFunctionContext(baseTaint, argsTaint)
            );
          } else {
            invokeFunAsSink(iid, f, base, baseTaint, args, argsTaint);
            let inputTaint = isObject(base)
              ? memory.getIntrinsic(base)
              : baseTaint;
            for (let i = 0; i < args.length; ++i) {
              inputTaint = join(
                inputTaint,
                isObject(args[i]) ? memory.getIntrinsic(args[i]) : argsTaint[i]
              );
            }
            this.currentFrame.setCalleeContext(
              new NativeFunctionContext(inputTaint)
            );
          }
        }

        invokeFun(
          iid,
          f,
          base,
          args,
          result,
          isConstructor,
          isMethod,
          functionIid,
          functionSid
        ) {
          this.push(
            this.currentFrame.calleeCtx.apply(
              result,
              invokeFunAsSource(iid, f, base, args, result)
            )
          );
          this.currentFrame.resetCalleeContext();
        }

        literal(iid, val, hasGetterSetter) {
          if (isFunction(val)) {
            this.initFunctionLiteral(val);
          } else if (this.isObjectLiteral(val)) {
            this.initObjectLiteral(val);
          } else if (this.isArrayLiteral(val)) {
            this.initArrayLiteral(val);
          }
          this.push(BOTTOM);
        }

        forinObject(iid, val) {
          this.remove();
        }

        declare(iid, name, val, isArgument, argumentIndex, isCatchParam) {
          if (isArgument) {
            if (argumentIndex === -1) {
              for (let i = 0; i < val.length; ++i) {
                memory.setOwn(
                  val,
                  "" + i,
                  this.currentFrame.ctx.getCalleeArgument(i, val[i])
                );
              }
              this.currentFrame.env.initArguments(val);
            } else {
              this.currentFrame.env.declareArgument(name, argumentIndex);
            }
          } else if (isCatchParam) {
            this.currentFrame.env.declareVariable(name, this.excTaint);
            this.currentFrame.resetCalleeContext();
            this.currentFrame.stack.length = 0;
            this.excTaint = BOTTOM;
          } else {
            this.currentFrame.stack.length = 0;
            this.currentFrame.env.declareVariable(name, BOTTOM);
          }
        }

        getFieldPre(iid, base, offset, isComputed, isOpAssign, isMethodCall) {
          let baseTaint;
          let offsetTaint = BOTTOM;
          if (isComputed) {
            offsetTaint = this.take();
          }
          baseTaint = this.take();
          this.currentFrame.setCalleeContext(
            new GetFieldContext(baseTaint, memory.get(base, offset))
          );
          if (isOpAssign) {
            this.push(baseTaint);
            if (isComputed) {
              this.push(offsetTaint);
            }
          } else if (isMethodCall) {
            this.push(baseTaint);
          }
        }

        getField(iid, base, offset, val, isComputed, isOpAssign, isMethodCall) {
          this.push(
            this.currentFrame.calleeCtx.apply(
              val,
              getFieldAsSource(iid, base, offset, val)
            )
          );
          this.currentFrame.resetCalleeContext();
        }

        putFieldPre(iid, base, offset, val, isComputed, isOpAssign) {
          if (this.currentFrame.stack.length < (isComputed ? 3 : 2)) {
            this.push(BOTTOM);
          }
          let valTaint = this.take();
          let offsetTaint = BOTTOM;
          if (isComputed) {
            offsetTaint = this.take();
          }
          let baseTaint = this.take();
          this.push(valTaint);
          putFieldAsSink(iid, base, offset, val, valTaint);
          this.currentFrame.setCalleeContext(
            new PutFieldContext(baseTaint, valTaint)
          );
        }

        putField(iid, base, offset, val, isComputed, isOpAssign) {
          memory.set(base, offset, this.currentFrame.calleeCtx.apply(val));
          this.currentFrame.resetCalleeContext();
        }

        read(iid, name, val, isGlobal, isScriptLocal) {
          if (name === "this") {
            this.push(this.currentFrame.ctx.getCalleeThis(val));
          } else if (this.readWithStmtObject) {
            this.push(memory.get(this.readWithStmtObject, name));
            this.readWithStmtObject = null;
          } else {
            this.push(this.currentFrame.env.get(name));
          }
        }

        write(iid, name, val, lhs, isGlobal, isScriptLocal) {
          if (this.currentFrame.stack.length < 1) {
            this.push(BOTTOM);
          }
          if (this.readWithStmtObject) {
            memory.set(this.readWithStmtObject, name, this.peek());
            this.readWithStmtObject = null;
          } else {
            this.currentFrame.env.set(name, this.peek());
          }
        }

        _return(iid, val) {
          if (this.currentFrame.stack.length < 1) {
            this.push(BOTTOM);
          }
          this.currentFrame.retTaint = this.peek();
        }

        _throw(iid, val) {
          this.excTaint = this.peek();
        }

        _with(iid, val) {
          this.remove();
          const thisAnalysis = this;
          return {
            result: new Proxy(val, {
              get(target, key) {
                thisAnalysis.readWithStmtObject = val;
                return target[key];
              },
            }),
          };
        }

        functionEnter(iid, f, thisVal, args) {
          const oldCurrentFrame = this.currentFrame;
          this.frameStack[this.frameStack.length] = oldCurrentFrame;
          this.currentFrame = new Frame(
            new FunctionEnvironment(memory.getUserFunctionMeta(f).env),
            oldCurrentFrame.calleeCtx
          );
          this.currentFrame.ctx.enterCallee(thisVal, args);
        }

        functionExit(iid, returnVal, wrappedExceptionVal) {
          if (!wrappedExceptionVal) {
            this.currentFrame.ctx.leaveCallee(
              returnVal,
              this.currentFrame.retTaint
            );
          }
          this.currentFrame = this.frameStack[this.frameStack.length - 1];
          --this.frameStack.length;
        }

        scriptEnter(iid, instrumentedFileName, originalFileName) {}

        scriptExit(iid, wrappedExceptionVal) {
          if (wrappedExceptionVal) {
            this.currentFrame.resetCalleeContext();
            this.currentFrame.stack.length = 0;
            this.excTaint = BOTTOM;
          }
        }

        binaryPre(
          iid,
          op,
          left,
          right,
          isOpAssign,
          isSwitchCaseComparison,
          isComputed
        ) {
          if (isComputed) {
            this.remove();
            this.remove();
          } else {
            let rightTaint = this.take();
            let leftTaint;
            if (isSwitchCaseComparison) {
              leftTaint = BOTTOM;
            } else {
              leftTaint = this.take();
            }
            this.currentFrame.setCalleeContext(
              new UnaryOrBinaryContext(leftTaint, rightTaint)
            );
          }
        }

        binary(
          iid,
          op,
          left,
          right,
          result,
          isOpAssign,
          isSwitchCaseComparison,
          isComputed
        ) {
          if (isComputed) {
            memory.delete(left, right);
            this.push(BOTTOM);
          } else {
            this.push(this.currentFrame.calleeCtx.apply(result));
            this.currentFrame.resetCalleeContext();
          }
        }

        unaryPre(iid, op, left) {
          if (op === "void") {
            return;
          } else {
            let leftTaint = this.take();
            this.currentFrame.setCalleeContext(
              new UnaryOrBinaryContext(leftTaint)
            );
          }
        }

        unary(iid, op, left, result) {
          if (op === "void") {
            this.remove();
            this.push(BOTTOM);
          } else {
            this.push(this.currentFrame.calleeCtx.apply(result));
            this.currentFrame.resetCalleeContext();
          }
        }

        conditional(iid, result) {
          this.auxTaint = this.peek();
        }

        last() {
          this.push(this.auxTaint);
          this.auxTaint = BOTTOM;
        }

        endExpression(iid) {
          this.remove();
        }

        endExecution() {}

        onReady(cb) {
          cb();
        }
      }

      class UserFunctionContext {
        constructor(baseTaint, argsTaint) {
          this.baseTaint = baseTaint;
          this.argsTaint = argsTaint;
          this.resultTaint = BOTTOM;
        }
        enterCallee(thisValue, argsValue) {}
        getCalleeThis(thisValue) {
          return this.baseTaint;
        }
        getCalleeArgument(argumentIndex, argumentValue) {
          return this.argsTaint[argumentIndex];
        }
        leaveCallee(resultValue, resultTaint) {
          this.resultTaint = resultTaint;
        }
        apply(resultValue) {
          return this.resultTaint;
        }
      }

      class NativeFunctionContext {
        constructor(inputTaint) {
          this.taint = inputTaint;
        }
        enterCallee(thisValue, argsValue) {}
        getCalleeThis(thisValue) {
          return !isObject(thisValue) ? this.taint : BOTTOM;
        }
        getCalleeArgument(argumentIndex, argumentValue) {
          return !isObject(argumentValue) ? this.taint : BOTTOM;
        }
        leaveCallee(resultValue, resultTaint) {
          this.taint = join(this.taint, resultTaint);
        }
        apply(resultValue, externalTaint) {
          const taint = join(this.taint, externalTaint || BOTTOM);
          if (!isObject(resultValue)) {
            return taint;
          } else {
            memory.updateIntrinsic(resultValue, taint);
            return BOTTOM;
          }
        }
      }

      class GetFieldContext {
        constructor(baseTaint, storedTaint) {
          this.baseTaint = baseTaint;
          this.resultTaint = join(baseTaint, storedTaint);
        }
        enterCallee(thisValue, argsValue) {}
        getCalleeThis(thisValue) {
          return this.baseTaint;
        }
        getCalleeArgument(argumentIndex, argumentValue) {
          return BOTTOM;
        }
        leaveCallee(resultValue, resultTaint) {
          this.resultTaint = join(this.resultTaint, resultTaint);
        }
        apply(resultValue, externalTaint) {
          const taint = join(this.resultTaint, externalTaint || BOTTOM);
          if (!isObject(resultValue)) {
            return taint;
          } else {
            return BOTTOM;
          }
        }
      }

      class PutFieldContext {
        constructor(baseTaint, valueTaint) {
          this.baseTaint = baseTaint;
          this.valueTaint = valueTaint;
        }
        enterCallee(thisValue, argsValue) {}
        getCalleeThis(thisValue) {
          return this.baseTaint;
        }
        getCalleeArgument(argumentIndex, argumentValue) {
          return this.valueTaint;
        }
        leaveCallee(resultValue, resultTaint) {}
        apply(resultValue) {
          return this.valueTaint;
        }
      }

      class UnaryOrBinaryContext {
        constructor(leftTaint, rightTaint) {
          this.resultTaint = join(leftTaint, rightTaint || BOTTOM);
        }
        enterCallee(thisValue, argsValue) {}
        getCalleeThis(thisValue) {
          return BOTTOM;
        }
        getCalleeArgument(argumentIndex, argumentValue) {
          return BOTTOM;
        }
        leaveCallee(resultValue, resultTaint) {}
        apply(resultValue) {
          return this.resultTaint;
        }
      }

      class BottomContext {
        enterCallee(thisValue, argsValue) {}
        getCalleeThis(thisValue) {
          return BOTTOM;
        }
        getCalleeArgument(argumentIndex, argumentValue) {
          return BOTTOM;
        }
        leaveCallee(resultValue, resultTaint) {}
        apply(resultValue) {
          return BOTTOM;
        }
      }

      const BOTTOM_CONTEXT = new BottomContext();

      function __ytjs_source_test(value) {
        return value;
      }
      global.__ytjs_source_test = __ytjs_source_test;

      function __ytjs_sink_test(value) {
        return value;
      }
      global.__ytjs_sink_test = __ytjs_sink_test;

      function normalizeUrl(value) {
        try {
          return new URL("" + value, document.baseURI).toString();
        } catch (_) {
          return void 0;
        }
      }

      function invokeFunAsSource(iid, f, base, args, result) {
        if (f === __ytjs_source_test) {
          return Taint(
            Label("__ytjs_source_test", Location(iid), {
              value: JSON.stringify(args[0]),
            })
          );
        } else if (f === Storage_prototype_getItem) {
          const instance =
            base === localStorage ? "localStorage" : "sessionStorage";
          const label = Label(`${instance}.getItem`, Location(iid), {
            key: "" + args[0],
            value: "" + result,
            ownership: getStorageItemOwnership(base, "" + args[0]),
          });
          collectStorageLabel(label);
          return Taint(label);
        } else if (f === fetch) {
          const url = normalizeUrl(args[0]);
          if (!url) return BOTTOM;
          return Taint(
            Label("fetch_1", Location(iid), {
              method: (args[1] && args[1]["method"]) || "GET",
              url,
            })
          );
        }
        return BOTTOM;
      }

      function invokeFunAsSink(iid, f, base, baseTaint, args, argsTaint) {
        if (f === __ytjs_sink_test) {
          const taint = join(argsTaint[0], memory.getIntrinsic(args[0]));
          const sinkLabel = Label("__ytjs_sink_test", Location(iid), {
            value: JSON.stringify(args[0]),
          });
          console.log(taint, sinkLabel);
          collectFlow(taint, sinkLabel);
        } else if (f === Storage_prototype_setItem) {
          const instance =
            base === localStorage ? "localStorage" : "sessionStorage";
          const label = Label(`${instance}.setItem`, Location(iid), {
            key: "" + args[0],
            value: "" + args[1],
          });
          setStorageItemOwnership(base, "" + args[0], getScriptUrl());
          collectStorageLabel(label);
          collectFlow(join(argsTaint[1], memory.getIntrinsic(args[1])), label);
        } else if (f === navigator_sendBeacon) {
          const url = normalizeUrl(args[0]);
          if (!url) return;
          collectFlow(
            join(
              args[0]
                ? join(argsTaint[0], memory.getIntrinsic(args[0]))
                : BOTTOM,
              args[1]
                ? join(argsTaint[1], memory.getIntrinsic(args[1]))
                : BOTTOM
            ),
            Label("navigator.sendBeacon", Location(iid), { url })
          );
        } else if (
          (f === XMLHttpRequest_prototype_open ||
            f === XMLHttpRequest_prototype_send) &&
          Reflect_getPrototypeOf(base) === XMLHttpRequest_prototype
        ) {
          if (f === XMLHttpRequest_prototype_send) {
            collectFlow(
              join(
                join(baseTaint, memory.getIntrinsic(base)),
                args[0]
                  ? join(argsTaint[0], memory.getIntrinsic(args[0]))
                  : BOTTOM
              ),
              Label("XMLHttpRequest_2", Location(iid), {
                ...XMLHttpRequest_META.get(base),
              })
            );
          }
        } else if (f === fetch) {
          const url = normalizeUrl(args[0]);
          if (!url) return;
          collectFlow(
            join(
              argsTaint[0],
              args[1]
                ? join(
                    memory.getIntrinsic(args[1]),
                    args[1]["body"]
                      ? memory.getIntrinsic(args[1]["body"])
                      : BOTTOM
                  )
                : BOTTOM
            ),
            Label("fetch_2", Location(iid), {
              method: (args[1] && args[1]["method"]) || "GET",
              url,
            })
          );
        }
      }

      function getFieldAsSource(iid, base, offset, val) {
        if (base === localStorage || base === sessionStorage) {
          if (Reflect_getOwnPropertyDescriptor(base, offset)) {
            const instance =
              base === localStorage ? "localStorage" : "sessionStorage";
            const label = Label(`${instance}.getItem`, Location(iid), {
              key: "" + offset,
              value: val,
              ownership: getStorageItemOwnership(base, "" + offset),
            });
            collectStorageLabel(label);
            return Taint(label);
          }
        } else if (base === document) {
          if (offset === "cookie") {
            return Taint(
              Label("document.cookie_1", Location(iid), {
                value: val,
              })
            );
          } else if (offset === "URL") {
            return Taint(
              Label(`document.URL`, Location(iid), {
                value: val,
              })
            );
          }
        } else if (base === location) {
          if (typeof val === "string") {
            return Taint(
              Label("location", Location(iid), {
                key: "" + offset,
                value: val,
              })
            );
          }
        } else if (base === navigator) {
          if (
            offset === "language" ||
            offset === "platform" ||
            offset === "userAgent"
          ) {
            return Taint(
              Label(`navigator.${offset}`, Location(iid), {
                value: val,
              })
            );
          }
        } else if (
          (offset === "response" ||
            offset === "responseText" ||
            offset === "responseURL" ||
            offset === "responseXML") &&
          Reflect_getPrototypeOf(base) === XMLHttpRequest_prototype
        ) {
          return Taint(
            Label("XMLHttpRequest_1", Location(iid), {
              ...XMLHttpRequest_META.get(base),
            })
          );
        }
        return BOTTOM;
      }

      function putFieldAsSink(iid, base, offset, val, valTaint) {
        if (base === localStorage || base === sessionStorage) {
          const instance =
            base === localStorage ? "localStorage" : "sessionStorage";
          const label = Label(`${instance}.setItem`, Location(iid), {
            key: "" + offset,
            value: "" + val,
          });
          setStorageItemOwnership(base, "" + offset, getScriptUrl());
          collectStorageLabel(label);
          collectFlow(join(valTaint, memory.getIntrinsic(val)), label);
        } else if (base === document) {
          if (offset === "cookie") {
            collectFlow(
              join(valTaint, memory.getIntrinsic(val)),
              Label("document.cookie_2", Location(iid), {
                value: "" + val,
              })
            );
          }
        } else if (offset === "src" && base instanceof HTMLElement) {
          collectFlow(
            join(valTaint, memory.getIntrinsic(val)),
            Label(`HTMLElement[src]`, Location(iid), {
              value: "" + val,
            })
          );
        }
      }

      function _setupTrackablePromise(monitor) {
        const completionTaintMap = new Map();

        class TrackablePromise extends Promise {
          #id;

          constructor(executor) {
            const id = Symbol();
            super(function (resolve, reject) {
              executor(
                function (value) {
                  const completionTaint =
                    monitor.currentFrame.calleeCtx.getCalleeArgument(0, value);
                  completionTaintMap.set(id, completionTaint);
                  resolve(value);
                },
                function (reason) {
                  const completionTaint =
                    monitor.currentFrame.calleeCtx.getCalleeArgument(0, reason);
                  completionTaintMap.set(id, completionTaint);
                  reject(reason);
                }
              );
            });
            this.#id = id;
          }

          then(onfulfilled, onrejected) {
            const id = this.#id;
            return super.then(
              onfulfilled &&
                function (value) {
                  monitor.currentFrame.setCalleeContext(
                    new UserFunctionContext(BOTTOM, [
                      completionTaintMap.get(id),
                    ])
                  );
                  const result = onfulfilled(value);
                  monitor.currentFrame.resetCalleeContext();
                  return result;
                },
              onrejected &&
                function (reason) {
                  monitor.currentFrame.setCalleeContext(
                    new UserFunctionContext(BOTTOM, [
                      completionTaintMap.get(id),
                    ])
                  );
                  const result = onrejected(reason);
                  monitor.currentFrame.resetCalleeContext();
                  return result;
                }
            );
          }
        }

        global.Promise = TrackablePromise;

        Promise_prototype.then = function (onfulfilled, onrejected) {
          const thisPromise = this;
          return Promise_prototype_then.call(
            thisPromise,
            onfulfilled &&
              function (value) {
                monitor.currentFrame.setCalleeContext(
                  new UserFunctionContext(BOTTOM, [
                    memory.getIntrinsic(thisPromise),
                  ])
                );
                const result = onfulfilled(value);
                monitor.currentFrame.resetCalleeContext();
                return result;
              },
            onrejected &&
              function (reason) {
                monitor.currentFrame.setCalleeContext(
                  new UserFunctionContext(BOTTOM, [
                    memory.getIntrinsic(thisPromise),
                  ])
                );
                const result = onrejected(reason);
                monitor.currentFrame.resetCalleeContext();
                return result;
              }
          );
        };
      }

      const XMLHttpRequest_META = new WeakMap();

      XMLHttpRequest_prototype.open = function (
        method,
        rawUrl,
        async,
        username,
        password
      ) {
        const url = normalizeUrl(rawUrl);
        if (url) {
          XMLHttpRequest_META.set(this, {
            method: method,
            url,
          });
        }
        return XMLHttpRequest_prototype_open.call(
          this,
          method,
          rawUrl,
          async || true,
          username,
          password
        );
      };

      const localStorage_OWNERSHIP = new Map();

      const sessionStorage_OWNERSHIP = new Map();

      function getStorageItemOwnership(storage, key) {
        return (
          (storage === localStorage
            ? localStorage_OWNERSHIP
            : sessionStorage_OWNERSHIP
          ).get(key) || ""
        );
      }

      function setStorageItemOwnership(storage, key, ownership) {
        (storage === localStorage
          ? localStorage_OWNERSHIP
          : sessionStorage_OWNERSHIP
        ).set(key, ownership);
      }

      window.addEventListener("error", (event) => {
        const error = event.error;
        if (error instanceof Error) {
          console.error(error.stack);
        }
      });

      J$.analysis = new YuantijsAnalysis();
    })(window.J$);
  })(Yuantijs || (Yuantijs = _Jalangi.Yuantijs || (_Jalangi.Yuantijs = {})));
})(Jalangi || (Jalangi = {}));

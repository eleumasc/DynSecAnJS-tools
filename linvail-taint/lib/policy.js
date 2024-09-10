(function () {
  const global = window;

  if (global._aran_policyLoaded_) return;
  global._aran_policyLoaded_ = true;

  // Sources //

  const DocumentProto = global.Document.prototype;
  const d = Object.getOwnPropertyDescriptor(DocumentProto, "cookie");
  Object.defineProperty(DocumentProto, "cookie", {
    ...d,
    get: function () {
      return _aran_source_(
        Reflect.apply(d.get, this, []),
        "document.cookie",
        undefined
      );
    },
  });

  const StorageProto = global.Storage.prototype;
  const StorageProto_getItem = StorageProto.getItem;
  const localStorage = global.localStorage;
  StorageProto.getItem = function () {
    const keyString = (arguments[0] = String(arguments[0]));
    const value = Reflect.apply(StorageProto_getItem, this, arguments);
    if (this === localStorage) {
      return _aran_source_(value, "localStorage.getItem", keyString);
    } else {
      return value;
    }
  };

  // Sinks //

  const XMLHttpRequestProto = global.XMLHttpRequest.prototype;
  const XMLHttpRequestProto_open = XMLHttpRequestProto.open;
  const XMLHttpRequestProto_send = XMLHttpRequestProto.send;
  XMLHttpRequestProto.open = function () {
    const urlString = (arguments[1] = String(arguments[1]));
    const targetUrl = new URL(urlString, document.URL).toString();
    this._aran_targetUrl_ = targetUrl;
    _aran_sink_(urlString, "XMLHttpRequest.prototype.open", targetUrl);
    return Reflect.apply(XMLHttpRequestProto_open, this, arguments);
  };
  XMLHttpRequestProto.send = function () {
    const body = arguments[0];
    if (typeof body === "string") {
      _aran_sink_(body, "XMLHttpRequest.prototype.send", this._aran_targetUrl_);
    }
    return Reflect.apply(XMLHttpRequestProto_send, this, arguments);
  };

  const fetch = global.fetch;
  global.fetch = function () {
    const urlString = (arguments[0] = String(arguments[0]));
    const targetUrl = new URL(urlString, document.URL).toString();
    _aran_sink_(urlString, "fetch.url", targetUrl);
    const fetchOptions = arguments[1];
    if (
      fetchOptions &&
      typeof fetchOptions === "object" &&
      typeof fetchOptions.body === "string"
    ) {
      _aran_sink_(fetchOptions.body, "fetch.body", targetUrl);
    }
    return Reflect.apply(fetch, this, arguments);
  };
})();

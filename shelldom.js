function shellDOM(obj) {
  for(let k in obj)
    setShellElement(k, obj[k]);
  
  return new Proxy(obj, {
    set : function(self, key, val) {
      self[key] = val;
      setShellElement(key, val);
      return self;
    }
  })
}

function setShellElement(key, x) {
  let dom = getShellElement(key);
  if(!dom)
    return false;

  if(dom.value)
    return dom.value = x;

  return dom.innerText = x;
}

function getShellElement(key) {
  return document.querySelector(`[shell-${key}]`);
}

// object.watch
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;

			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

// object.unwatch
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}

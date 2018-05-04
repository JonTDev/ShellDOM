const ShellDOM = {
  changeHappening: false,
  refreshData : function(data) {
    if(!this.data)
      return this.set(data);
    for(let key in data) {
      if(typeof this.data[key] !== 'undefined') {
        this.data[key] = data[key];
      }
    }
  },
  set : function(obj) {
    this.startWhenReady(obj);
    obj = new Proxy(obj, {
      set : function(self, key, val) {
        ShellDOM.updateData(self, key, val, 'obj');
        return self;
      }
    });
    this.data = obj;
    return obj;
  },
  updateData : function(self, key, val, type) {
    if(this.changeHappening && type !== 'obj')
      return;
    this.changeHappening = type;
    self[key] = val;
    ShellDOM.setShellElement(key, val);
    ShellDOM.setSShell(key, val);
    this.changeHappening = null;
  },
  startWhenReady: function(obj) {
    let waitingForWindow = setInterval(function() {
      if(document.readyState === 'complete') {
        clearInterval(waitingForWindow);
        for(let k in obj) {
          ShellDOM.setShellElement(k, obj[k]);
          ShellDOM.setSShell(k, obj[k]);
          ShellDOM.readSShell(k, obj[k]);
        }
      }
    },10)
  },
  setSShell : function(key, val) {
    let dom = document.querySelector(`[SShell="${key}"]`);
    if(typeof dom.value !== 'undefined')
      dom.value = val;
    else
      dom.innerText = val;
  },
  readSShell : function(obj) {
    let doms = document.querySelectorAll('[SShell]')
    for(let dom of doms) {
      dom.addEventListener('keyup', function(evnet) {
        let val = this.attributes.SShell.value;
        let data = ShellDOM.data[val];
        if(typeof this.value !== 'undefined')
          ShellDOM.updateData(data, val, this.value, this.tagName);
        else
          ShellDOM.updateData(data, val, this.innerText, this.tagName);
      });
    }
  },
  setShellElement : function(key, x) {
    let dom = this.getShellElement(key);
    if(!dom)
      return false;

    if(dom.value)
      return dom.value = x;

    return dom.innerText = x;
  },
  getShellElement : function(key) {
    return document.querySelector(`[shell-${key}]`);
  },
  extend : function(name, extension) {
    this[name] = {};
    for(let k in extension) {
      this[name][k] = extension[k];
    }
  }
}

const SDOM = {
  objectLoaded : {},
  proceed : true,
  getCode : function(objName, filePath, cb) {
    if(this.objectLoaded[objName]) {
      cb(this);
    } else {
      this.proceed = false;
      let script = document.createElement('script');
      script.setAttribute('src', `/front/${filePath}.js`);
      document.querySelector('body').append(script);

      script.outerHTML = '';
      script = null;
      this.objectLoaded[objName] = true;

      this.waitFor(cb);
    }
  },
  waitFor : function(cb) {
    if(this.proceed === false) {
      setTimeout(() => {
        this.waitFor(cb);
      }, 10);
    } else {
      cb();
    }
  },

  init : function(obj = null) {
    this.getFiles(() => {
      if(!obj) {
        if(typeof io === 'undefined')
          return false;
        return this.io.setup();
      }

      switch(obj.constructor) {
        case String:
          return this.ajax.setup(obj);


        case Object:
          this.input(obj, null, (err) => {
            if(err)
              console.log(err);
          });
          break;


        default:
          return false;
      }
    });
  },
  getFiles(cb) {
    function fileOne() {
      SDOM.getCode('input','input', fileTwo);
    }
    function fileTwo() {
      SDOM.getCode('output', 'output', fileThree);
    }
    function fileThree() {
      SDOM.getCode('io', 'io', cb);
    }
    function fileZero() {
      SDOM.getCode('EM', 'ElementManipulator', fileOne);
    }
    SDOM.getCode('forEach', 'forEach', fileZero);
  }
};


SDOM.forEach = function(obj, cb) {
  if(!obj.k) {
    obj = {
      k : Object.keys(obj),
      v : Object.values(obj)
    };
  }

  let done = () => {
    if(obj.k.length === 0)
      return false;

    this.forEach(obj, cb);
  };

  cb(obj.k.shift(), obj.v.shift(), done);
};

SDOM.proceed = true;
SDOM.elements = {};
SDOM.input = function(obj, cb) {
  if(!obj)
    return false;

  if(obj.constructor !== Object)
    return false;

  this.forEach(obj, (query, val, finished) => {
    function data(q, v, cb) {
      if(typeof this.data[q] === 'undefined') {
        this.data[q] = {
          value: v,
          elements: null
        };
      }
    }
  })
};

SDOM.proceed = true;
const EM = {
  prefix : 's',
  get : function(query, cb = null) {
    try {
      results = document.querySelector(query)
      err = null;
    } catch(err) {
      results = null;
      err = err.message;
    }
    if(!cb)
      return results;

    cb(err, results);
  },
  getAll : function(query, cb = null) {
    let err = null;
    let results = null;

    try {
      results = document.querySelectorAll(query)
      if(!results)
        throw new Error('Unable to find results');
    } catch(error) {
      results = null;
      err = error.message;
    }

    if(!cb) {
      return results;
    }

    if(!results)
      cb(err, results);
    else {
      SDOM.forEach(results, (key, ele, done) => {
        cb(err, ele, done);
      })
    }
  },
  writer : function(query, cb = null) {
    if(!cb)
      return this.get(`[w${this.prefix}-${query}]`);

    this.get(`[w${this.prefix}-${query}]`, cb);
  },
  writers : function(query, cb = null) {
    if(!cb)
      return this.getAll(`[w${this.prefix}-${query}]`);

    this.getAll(`[w${this.prefix}-${query}]`, cb);
  },
  reader : function(query, cb = null) {
    if(!cb)
      return this.get(`[r${this.prefix}-${query}]`);

    this.get(`[r${this.prefix}-${query}]`, cb);
  },
  readers : function(query, cb = null) {
    if(!cb)
      return this.getAll(`[r${this.prefix}-${query}]`);

    this.getAll(`[r${this.prefix}-${query}]`, cb);
  }
};

SDOM.em = EM;

SDOM.proceed = true;
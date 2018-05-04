// AJAX Variables
ShellDOM.extend('ajax', {
  Timer : 0,
  URL : '',
  Interval : false,
  Attempts : 0,

  // AJAX Functions
  start : function(timer, url) {
    this.Timer = timer;
    this.URL = url;
    this.Interval = true;
    this.run();
  },

  pause : function() {
    this.Interval = false;
  },

  run : function() {
    if(!this.Interval)
      return false;

    this.Attempts += 1;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = this.handleResponse;

    xhr.open('GET', ShellDOM.ajax.URL);

    xhr.send();
  },

  handleResponse : function() {
    switch(this.readyState) {
      case 1:
        // Opened
        break;
      case 2:
        // Headers Received
        break;
      case 3:
        // Loading
        break;
      case 4:
        if(this.status !== 200) {
          ShellDOM.ajax.pause();
        } else {
          if(!ShellDOM.data) {
            ShellDOM.set(JSON.parse(this.responseText));
            setTimeout(function() {
              ShellDOM.ajax.run();
            }, ShellDOM.ajax.Timer * 1000)
          } else {
            ShellDOM.refreshData(JSON.parse(this.responseText));
            setTimeout(function() {
              ShellDOM.ajax.run();
            }, ShellDOM.ajax.Timer * 1000)
          }
        }
        break;
      default:
        // Misc or not sent yet.
        break;
    }
  }
});

ShellDOM.extend('io', {
  socket : null,
  start : function(url = '') {
    if(!io)
      throw new Error('Socket.IO is not loaded.  Cannot continue.');

    this.socket = io(url);

    this.getData();
  },
  getData : function() {
    this.socket.on('data', (data) => {
      if(typeof ShellDOM.data !== 'undefined')
        return ShellDOM.set(data);
      return ShellDOM.refreshData(data);
    })
    this.socket.emit('getData');
  }
})

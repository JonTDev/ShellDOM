module.exports = function(io) {
  io.on('connection', function(socket) {
    let postData = {};
    setInterval(function() {
      console.log(io.ShellDOM, postData);
      if(postData !== io.ShellDOM) {
        postData = io.ShellDOM;
        socket.emit('data', io.ShellDOM);
      }
    }, 1000);
  })
}

let obj = {
  header : ''
}

obj = ShellDOM.start(obj);

timer('ShellDOM');

function timer(word, start = 0) {
  setTimeout(function() {
    if(word.length === start)
      return;
    obj.header += word[start];
    start += 1;
    timer(word, start);
  }, 250);
}

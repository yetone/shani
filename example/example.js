// example
window.onload = function() {
  var data = {
    name: 'yetone',
    age: 23,
    skills: [
      'Python',
      'Golang',
      'JavaScript'
    ],
    say: function() {
      return 'It works!';
    }
  };
  var tpl = document.getElementById('tpl').innerHTML;
  var render = shani.compile(tpl);
  document.getElementsByTagName('body')[0].innerHTML = render(data);
};

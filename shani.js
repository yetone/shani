;(function(window, undefined) {
  window.shani = {
    acc: '',
    code: '',
    compile: function(tpl) {
      var self = this;
      tpl = tpl.replace(/(\n|\r)/g, '');
      tpl = tpl.replace(/(%\}|^)(.*?)(\{%|$)/g, function(_, a, b, c) {
        return a + 'self.acc += \'' + b + '\'; ' + c;
      });
      tpl = tpl.replace(/\{%\s*(if|else if)\s+(.*?)\s*%\}/g, function(_, a, b) {
        var sf = (a === 'if') ? '' : ' } ';
        return sf + a + ' (' + b + ') { ';
      });
      tpl = tpl.replace(/\{%\s*(for\s+.*?)\s*%\}(.*?)(\{%\s*end\s*%\})/g, function(_, exp, content, end) {
        exp = exp.replace(/for\s+([a-zA-Z_]+),\s*(\w+)\s+in\s+(\w+)/, function(_, k, v, lst) {
          return 'for (var ' + k + ' in ' + lst + ') { var ' + v + ' = ' + lst + '[' + k + ']; ';
        });
        return exp + content + end;
      });
      tpl = tpl.replace(/\{%\s*else\s*%\}/g, ' } else { ');
      tpl = tpl.replace(/\{%\s*end\s*%\}/g, ' } ');
      this.code = tpl.replace(/\{\{\s*(.*?)\s*\}\}/g, function(_, k) {
        return '\' + (' + k + ') + \'';
      });
      return function(scope) {
        for (var i in scope) {
          this[i] = scope[i];
        }
        return eval(self.code);
      };
    },
  };
})(window);

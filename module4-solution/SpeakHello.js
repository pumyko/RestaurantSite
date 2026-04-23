(function (window) {
  'use strict';

  function SpeakHello() {}

  SpeakHello.prototype.sayHello = function (name) {
    console.log("Hello " + name);
  };

  window.$hello = new SpeakHello();

})(window);
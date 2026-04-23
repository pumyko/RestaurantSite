(function (window) {
  'use strict';

  // Array of names to loop over
  var names = [
    "Yaakov",
    "John",
    "Jen",
    "Jason",
    "Paul",
    "Frank",
    "Larry",
    "Paula",
    "Jackie",
    "Raymond"
  ];

  // Loop over each name:
  // If name starts with 'j' or 'J'  → say goodbye
  // Otherwise                        → say hello
  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      window.$goodbye.sayGoodBye(names[i]);
    } else {
      window.$hello.sayHello(names[i]);
    }
  }

})(window);
var wdio = require("webdriverio");
var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};
var browser = wdio.remote(options);

browser
  .init()
  .url("http://learn.visualregressiontesting.com")
  .getTitle().then(function(title) {
      console.log('Title is: ' + title);
  })
  .end();
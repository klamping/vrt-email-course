var wdio = require("webdriverio");
var browser = wdio.remote({
  desiredCapabilities: {
    browserName: "chrome"
  }
}).init();

browser.url("http://learn.visualregressiontesting.com")
  .getTitle().then(function(title) {
      console.log("Title is: " + title);
  })
  .end();
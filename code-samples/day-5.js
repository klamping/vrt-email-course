var assert = require("assert");
var wdio = require("webdriverio");

var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};

var browser = wdio.remote(options);

require('webdrivercss').init(browser, {
  screenWidth: [320,480,640,1024]
});

function assertShots (err, shot) {
  assert.ifError(err);
  // much more complex code assertion goes here
}

browser
  .url("http://visualregressiontesting.com")
  .getTitle()
  .then(function(title){
    assert.equal(title, "Visual Regression Testing");
  })
  .isVisible(".main-nav")
  .then(function(isNavVisible){
    assert.ok(isNavVisible);
  })
  .webdrivercss("Login Default", loginForm, assertShots)
  .setValue(".login .username", "admin")
  .webdrivercss("Login Username", loginForm,  assertShots)
  .setValue(".login .password", "hunter2")
  .webdrivercss("Login Username Password", loginForm, assertShots);
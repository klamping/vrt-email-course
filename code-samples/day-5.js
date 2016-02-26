var assert = require("assert");
var wdio = require("webdriverio");

var options = {
  desiredCapabilities: {
    browserName: "firefox"
  }
};

var browser = wdio.remote(options);

require("webdrivercss").init(browser, {
  screenWidth: [320,480,640,1024]
});

function assertShots (err, shots) {
  assert.ifError(err);

  Object.keys(shots).forEach(function(element) {
    shots[element].forEach(function(shot) {
      assert.ok(shot.isWithinMisMatchTolerance, shot.message);
    })
  });
};

var loginForm = {
  name: "Login",
  selector: "form.login"
};

var mainNav = ".header .nav";

browser
  .init()
  .url("http://visualregressiontesting.com")
  .getTitle()
  .then(function(title){
    assert.equal(title, "Visual Regression Testing - Home");
  })
  .isVisible(mainNav)
  .then(function(isNavVisible){
    assert.ok(isNavVisible);
  })
  .webdrivercss("Login Default", loginForm, assertShots)
  .setValue(".login .username", "admin")
  .webdrivercss("Login Username", loginForm,  assertShots)
  .setValue(".login .password", "hunter2")
  .webdrivercss("Login Username Password", loginForm, assertShots)
  .end();
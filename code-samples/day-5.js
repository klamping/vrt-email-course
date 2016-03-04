var wdio = require("webdriverio");
var assert = require("assert");

var options = {
  desiredCapabilities: {
    browserName: "firefox"
  }
};

var browser = wdio.remote(options);

require("webdrivercss").init(browser, {
  screenWidth: [320,640,1024]
});

function assertShots (err, shots) {
  assert.ifError(err);

  Object.keys(shots).forEach(function(element) {
    shots[element].forEach(function(shot) {
      assert.ok(shot.isWithinMisMatchTolerance, shot.message);
    })
  });
};

var emailSignup = {
  name: "Form",
  elem: ".email-signup"
};

var emailField = ".email"

browser
  .init()
  .url("http://learn.visualregressiontesting.com")
  .getTitle()
  .then(function(title){
    assert.equal(title, "Learn Visual Regression Testing");
  })
  .isVisible(emailSignup.elem)
  .then(function(isFormVisible){
    assert.ok(isFormVisible);
  })
  .webdrivercss("Signup", emailSignup, assertShots)
  .scroll(emailField)
  .setValue(emailField, "learn@visualregressiontesting.com")
  .webdrivercss("Signup with email", emailSignup, assertShots)
  .end();
# Catching Failures

So far, we've been doing our fair share of manual work when running the tests. Every time we execute our test suite, we have to check the screenshots folder for diffs and read the console logs to verify the right messages appear.

In our attempt to automate our work, we haven't really automated it yet, because the program does not report errors and prevent mistakes from being deployed. Thankfully, we can steal a trick from the unit testing book and use a technique called "assertions."

## What are Assertions

Assertions allow us to programmatically compare values. They're no different than regular if statements. You can say "x should equal y" or "z should be larger than x".

In functional testing, we can use assertions to validate page titles, element visibility, screenshot matches and so much more.

For example, if you navigate from the home page to the about page, you'd want to assert that the page title has been updated. You would say, "The browser page title should equal 'About Us'".

Assertions are very similar to website requirements. "The link should change color on hover" is a simple functional test assertion. In fact, if you have a requirements doc for you site, that's a great place to determine what tests you should write.

## Writing Assertions

[Node comes with an assertion library built-in](https://nodejs.org/docs/latest/api/assert.html), so we're going to use it to keep things simple. We can load it the same way we loaded WebdriverIO, by using a `require` statement:

```js
var assert = require("assert");
```

Once loaded, we can make basic assertions like:

```js
var x = 1;
assert.equal(x, 1); // Passes
```

This validates that the value of `x` is `1`. If we instead asserted:

```js
var x = 1;
assert.equal(x, 2);
```

That would fail and the code would error out. We could instead assert that `x` does not equal 2:

```js
var x = 1;
assert.notEqual(x, 2);
```

And this would pass, as 1 does not equal 2 (at least not in this universe).

## WebdriverIO and Assertions

How does this relate to our needs? We can throw an assert in our `getTitle` and `isVisible` checks:

```js
var assert = require("assert");

var emailSignup = {
    name: "Form",
    elem: ".email-signup"
};

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
    .end();
```

`assert.ok` checks that the value passed in is truthy, which is what we want `isFormVisible` to be.

So, what's the different between this and just running `console.log`? Well, if there's an assertion error, your test will throw an error and fail, without you having to read anything. That makes it incredibly easy to know if your functional tests passed.

As an added bonus, Node will send a failing [exit code](http://bencane.com/2014/09/02/understanding-exit-codes-and-how-to-use-them-in-bash-scripts/) back to the computer, which can be tied in to a Continuous Integration tool like Jenkins to mark a build as failed (if you're interested in more on the CICD process, the in-depth visual regression testing course covers it all).

## Asserting Screenshots

We mentioned having to check for screenshot diffs at the beginning of today's lesson. Does that imply that we can "assert" our way out of it? Why yes, yes it does!

The `webdrivercss` command has a special option which allows you to run a function after the screenshot and comparison are done. It will pass the results of the test to that function, and we can use those results in our assertions.


```js
browser
    .init()
    .url("http://learn.visualregressiontesting.com")
    .webdrivercss("Signup", emailSignup, function (err, shots) {
        assert.ifError(err);
        assert.ok(shots.Form[0].isWithinMisMatchTolerance);
    })
    .end();
```

We assert two things:

1. That `err` isn't an error (if it is something went wrong)
2. The `shots.Form[0].isWithinMisMatchTolerance` value is true, which means that the comparison passed the test. Yippee!

That's fairly simple, but if it looks complex to you, we have bad news. Because of the way WebdriverCSS passes in the `shots` value, and the fact that you can define multiple elements to screen capture per `webdrivercss` call, things get even more complicated. 

It would be a waste of email to get in to the real details of it all, so you're going to have to take our word for it ([or read about it in the docs](https://github.com/webdriverio/webdrivercss/pull/140) if you must). This next code snippet is a little code heavy. Take a deep breath and let's plunge in (don't worry, you don't have to memorize all of this):

```js
var emailSignup = {
    name: "Form",
    elem: ".email-signup"
};

browser
    .init()
    .url("http://learn.visualregressiontesting.com")
    .webdrivercss("Signup", emailSignup, function (err, shots) {
        assert.ifError(err);

        Object.keys(shots).forEach(function(element) {
            shots[element].forEach(function(shot) {
              assert.ok(shot.isWithinMisMatchTolerance, shot.message);
            })
        });
    })
    .end();
```

While this is a much more adaptable solution, it's pretty verbose. Seeing as we don't want to repeat that same snippet of code throughout our tests, we can make it a standalone function and call it when needed:

```js
function assertShots (err, shots) {
  assert.ifError(err);

  Object.keys(shots).forEach(function(element) {
    shots[element].forEach(function(shot) {
      assert.ok(shot.isWithinMisMatchTolerance, shot.message);
    })
  });
};

var emailField = ".email"

browser
    .init()
    .url("http://learn.visualregressiontesting.com")
    .webdrivercss("Signup", emailSignup, assertShots)
    .scroll(emailField)
    .setValue(emailField, "learn@visualregressiontesting.com")
    .webdrivercss("Signup with email", emailSignup, assertShots)
    .end();
```

In each of our WebdriverCSS calls we pass in our assertion function, which programmatically handles checking that everything turned out as planned.

If you'd like the function as an easy copy/paste solution, have a look at [the special gist created just for you](https://gist.github.com/klamping/cd32298696ee92b50819).

## Summing up

```js
assert.equal(theEnd, true);
```

Okay, apologies for the nerd humor there. That was a lot of content to go through and we're happy to have it over. Assertions are a very powerful tool to bring in to your testing arsenal.

While Node's `assert` library is useful for getting started, it's missing a lot of great features. Check out these tools to really take advantage of the "assertion" concept:

- [Chai Assertion Library](http://chaijs.com/)
- [Chai Webdriver](http://chaijs.com/plugins/chai-webdriver)
- [Should.js](https://github.com/shouldjs/should.js)
- [Mocha Test Runner](http://mochajs.org/)
- [WebdriverCSS example with Mocha assertions](https://github.com/webdriverio/webdrivercss/blob/master/examples/webdrivercss.browserstack.with.mocha.js) written by [The Great Chris Ruppel](https://twitter.com/rupl)
- [Jasmine Test Runner](http://jasmine.github.io/)

Tomorrow we'll wrap up the week with a "what's next" outlook. Until then, give yourself a pat on the back for completing the meat and potatoes of this course!

Okay, one last bit of fun:

```js
assert.equal(youAreAwesome, true);
```

*If you enjoyed these lessons, consider sharing this course with your friends*

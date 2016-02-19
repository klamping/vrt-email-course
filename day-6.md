# The Final Day

First off, congratulations on making it to the final day. Your reward is an email with no code in it. Exciting, huh?

There are quite a few topics I'd like to briefly touch upon to get your gears turning on what to do next. We'll stray away from the specific technical implementations to talk general ideas.

Without further ado, here's your Top 10 list of "Ways to Test Better":

1. Know that you are not limited to a single browser when testing. Pass in an array of browsers in your `desiredCapabilities` configuration and WebdriverIO will run your tests in each browser.
2. WebdriverIO has [built in support](http://webdriver.io/guide/testrunner/cloudservices.html) for Selenium cloud tools like [Sauce Labs](https://saucelabs.com/) and [Browserstack](https://www.browserstack.com/). These services are great for testing in a multitude of browsers, and provide consistency when snapping screenshots through WebdriverCSS.
3. Automation and Continuous Integration go hand in hand. [Getting hooked in to a tool like Jenkins](http://webdriver.io/guide/testrunner/jenkins.html) or TravisCI is a great next step in improving the value of your tests.
4. If you get set up with Jenkins, have your tests run nightly to ensure that hiccups in the internet don't affect your site.
5. If you'd like a more visual way to check screenshot diffs, take a look at [the WebdriverCSS Admin Panel](https://github.com/webdriverio/webdrivercss-adminpanel). Set up is as simple as starting a node server via grunt.
6. Sometimes you just need to see how someone else did it. The WebdriverIO code repo contains [several examples to browse through](https://github.com/webdriverio/webdriverio/tree/master/examples).
7. Get your tests organized by using a test framework like [Mocha](http://mochajs.org/) or [Jasmine](https://github.com/jasmine/jasmine). These frameworks make working with large test suites a breeze, and offer a deep set of features.
8. Once you start building out several test files, you'll end up with that same WebdriverIO configuration scattered across all of them. Switch over to using [the WebdriverIO Test Runner](http://webdriver.io/guide/testrunner/gettingstarted.html) to simplify your test setup.
9. Get your team on board with functional testing by bribing them with cookies and donuts. Okay, that's not really a tip, but now I'm hungry.
10. Need more help? The [WebdriverIO](https://gitter.im/webdriverio/webdriverio) and [WebdriverCSS](https://gitter.im/webdriverio/webdrivercss) chat rooms are open at all hours for questions and help with the journey. Reach out to @micahgodbolt and @klamping to let us know you've joined the fun.

## That's It

Again, thanks for reading through these emails and kudos on finishing the course. Stayed tuned for more details on the upcoming in-depth Visual Regression Testing online course and be sure to check out the main website at [visualregressiontesting.com](http://visualregressiontesting.com)

*If you enjoyed these lessons, consider sharing this course with your friends*

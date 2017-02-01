# Today you're going to write your first regression test

Day 2 is here; we hope you're ready to dig in. Let's start with some installs!

First, create a folder to store all of your code. You can name it whatever you want.

Then, open a command line and navigate to that folder. From there, you'll create a new `package.json` file by running the command:

```sh
npm init -y
```

If you're new to NodeJS or unfamiliar with NPM, have a look at [their about page for a quick intro video](https://docs.npmjs.com/getting-started/what-is-npm).

This file just stores information about your project and the software you need. It's useful to have on hand if you need to set the project up again later.

Now to run the actual installation:

```sh
npm install --save webdriverio visualregressiontesting/webdrivercss chromedriver
```

## WebdriverIO 

WebdriverIO is a JavaScript functional test library. It lets you write test instructions in JavaScript, then passes them along to Selenium, which tells the browser what actions to take.

For us, writing tests in JavaScript is awesome. We don't have to learn Java for test automation! 

## WebdriverCSS

WebdriverCSS is a Visual Regression Testing plugin for WebdriverIO. It's a pretty basic tool that boils down to two basic functions:

1. Capture images of the specified portion of the website.
2. Compare those images to previous ones, creating a "diff" version if differences are found.

You can do a fair amount of configuration with the tool, but for now, those two concepts are all you need to know.

# ChromeDriver

We're testing in real browsers folks, which is really quite awesome. But it does require some set up. While getting Selenium running is easier than ever, it's too complex for a single email.

As a worthy alternative, we're going to use ChromeDriver. ChromeDriver is a Selenium-like tool that allows us to run tests on a real Chrome browser.

To get it going, just open a new command line window (making sure you're in your project folder), and run:

```sh
./node_modules/.bin/chromedriver --url-base=/wd/hub --port=4444
```

This will be a constantly-running service. You can stop the it by pressing `Ctrl-C`.

* If you're interested in why we reference `./node_modules/bin/` and a way around that, [read up on npm scripts](http://firstdoit.com/npm-scripts/).

## Let's make a test!

Now that we have ChromeDriver running, we can use it to run some tests. In your project folder, create a new file called `tests.js`. Open it up in your favorite code editor.

The first thing we'll do is load WebdriverIO in to the file. To do that, we'll use a require statement:

```js
var wdio = require("webdriverio");
```

> **Disclaimer** For the rest of this course we're going to leave out repetitive bits of the code in our examples. To see the full code, [check out the code samples for each day](http://learn.visualregressiontesting.com/code-samples.zip).

With that loaded, our next step is to set up a browser instance.

```js
var browser = wdio.remote({
	desiredCapabilities: {
		browserName: "chrome"
	}
}).init();
```

What just happened here? Well, we told WebdriverIO to start a new Chrome browser. If you want to read more about it, [check out the documentation](http://webdriver.io/guide/getstarted/configuration.html).

### Get to our page

Now that we have a browser to play around with, let's do some damage. We're going to request a website by using the `url` browser command.

```js
browser.url("http://learn.visualregressiontesting.com");
```

### Check the title

Now that we have a page loaded, we can do stuff with it. Let's validate it's actually the right place.

How about checking the title of the page and logging it through `console.log`? Here's what the syntax looks like:

```js
browser.url("http://learn.visualregressiontesting.com")
	.getTitle().then(function(title) {
	    console.log("Title is: " + title);
	});
```

Here we asked our browser to get the title of the page (the aptly named `getTitle` command), and then logged that value out using the generic `then` command.

*Note: If you're not familiar with JavaScript Promises, this syntax may look a little strange. For the sake of brevity, we're not going to get into the details of it in this email. Fortunately there are [a lot of resources on JavaScript Promises](http://lmgtfy.com/?q=javascript+promise+tutorials) already out there for you to find*.

### End the test

Finally, we need to tell WebdriverIO to shut things down. That's as simple as adding `.end()` at the bottom of our commands:

```js
browser.url("http://learn.visualregressiontesting.com")
	... tests are here ...
	.end();
```

Just to recap, here's what your `tests.js` file should look like:

```js
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
```

Now it's time to run the test! You can do so by asking Node (via the command line) to ever so kindly execute your code:

```sh
node tests.js
```

If all went well, you should have seen the following message in your command line:

```sh
Title is: Learn Visual Regression Testing
```

### Tomorrow's outlook  

So, how does it feel to have programmatically taken control of a browser? A little awesome, right?

Okay, if you're underwhelmed, that's because we didn't really test much. We only peeked at the page title then closed everything down before we got ourselves in to real trouble.

We promise that over the next couple of days we'll get our hands extra dirty with mouse clicks, keyboard taps, HTML checks and very real visual tests.

If you can't wait until then, take a look at [the WebdriverIO API page](http://webdriver.io/api.html) to see a full list of commands available for use.
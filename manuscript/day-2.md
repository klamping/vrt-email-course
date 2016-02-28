# Writing Your First Test

Day 2 is here; I hope you're ready to dig in. Let's get started with some installations!

Assuming you have Node.js set up and a folder created to store all of our work, open up a command line in that folder.

The first task is to create a `package.json` file, so that we can save the dependency information. You can easily do that by running:

```sh
npm init -y
```

If your new to NodeJS or unfamiliar with NPM, have a look at [their about page](https://docs.npmjs.com/getting-started/what-is-npm) for a quick intro video.

Now that we've got a place to store our dependency information, let's get them installed (which will also update the `package.json` file with our dependency information). In the same command line, run:

```sh
npm install --save webdriverio@3.3.0 webdrivercss@2.0.0beta-rc1 selenium-standalone
```

This will install the needed tools to run your tests. They are:

## WebdriverIO 

WebdriverIO works by taking our JavaScript test instructions and passing them along to Selenium, which will tell the browser what actions to take.

WebdriverIO's docs say that it "makes it possible to write super easy Selenium tests" and I have to agree. Being able to construct tests in JavaScript is empowering; I don't have to learn Java to write automation!

## WebdriverCSS

WebdriverCSS is an automatic visual regression-testing plugin for WebdriverIO. It's a pretty basic tool that boils down to two basic functions:

1. Capture images of the specified portion of the website (you can configure it to hide or mask certain areas as needed).
2. Compare those images to previous ones, creating a "diff" version if differences are found.

You can do a fair amount of configuration with the tool, but for now, those two concepts are all you need to know.

### Selenium Standalone

It was a mess the first time I tried setting up Selenium. I had to scour the official site and determine whether I needed the standalone server or the browser plugins or maybe even something called "the grid". I didn't get far.

Luckily, this has been incredibly simplified for us with the Selenium-Standalone NPM module. On our command, it will spin up a selenium standalone server (which is the tool we want). This server will be used by WebdriverIO to run our tests.

Let's go ahead and do that now. Back in the command line, you'll first install the server locally*:

```sh
./node_modules/.bin/selenium-standalone install
```

After that is complete, start the server:

```sh
./node_modules/.bin/selenium-standalone start
```

This will be a constantly-running service, so you'll need to open a new command line window to continue work. You can stop the server by pressing `Ctrl-C`.

* If you're interested in why we reference `./node_modules/bin/` and a way around that, read up [npm scripts](http://firstdoit.com/npm-scripts/).

## Disclaimer

In the code examples for the rest of the course, for brevity's sake we'll sometimes leave out repetitive bits of the code. To see the full examples, [check out the full code samples for each day](http://learn.visualregressiontesting.com/code-samples.zip).

## Let's write some tests

Now that we have a local Selenium server running, we can use it to run some tests. In the same folder you used to install the dependencies, create a new file called `tests.js`. Open it up in your favorite code editor.

The first thing we're going to do is load WebdriverIO. We do this by using a standard Node.js `require` statement:

```
var wdio = require("webdriverio");
```

Now that we have our `wdio` object, our next step is to set up our browser instance.

```
var options = {
	desiredCapabilities: {
		browserName: "firefox"
	}
};
var browser = wdio.remote(options);
```

What just happened here? Well, we defined the characteristics of our browser (we want firefox, don't really care about the version or other details), then passed that information to WebdriverIO. WebdriverIO then creates a `browser` object with all the details ready to go.

We're not quite done with the set up phase. We have to kick everything off for good by calling `init`:

```
browser.init();
```

That will open our browser and make it ready for action.

Here's everything we have so far:

```
var wdio = require("webdriverio");
var options = {
	desiredCapabilities: {
		browserName: "firefox"
	}
};
var browser = wdio.remote(options);

browser.init();
```

### Get to our page

Now that we have a browser to play around with, let's do some damage. Load the page you want to test with the `url` browser command.

```
browser
	.init()
	.url("http://learn.visualregressiontesting.com");
```

A few things:

1. I reorganized the code to have each command on a separate line. This helps with readability.
2. I "chained" the `url` command to the `init` command. This is the same method of chaining you may have seen with [jQuery commands](http://tobiasahlin.com/blog/quick-guide-chaining-in-jquery/) (or [JavaScript promises](https://davidwalsh.name/promises), if you're familiar with those).
3. I used the `url` command to do something in the browser. How awesome!

### Check the title

We're getting close to running our test to try it out. Just one more thing and I'll let you know the secret command to make the magic happen.

We've got the page loaded, but let's validate that it's actually the right place. We can do that by checking the title of the page and logging it through `console.log`. Let's take a look at the syntax:

```
browser
	.init()
	.url("http://learn.visualregressiontesting.com")
	.getTitle().then(function(title) {
	    console.log("Title is: " + title);
	});
```

Here we asked our browser to get the title of the page (the aptly named `getTitle` command), and then logged that value out using the generic `then` command.

*Note: If you're not familiar with JavaScript Promises, this syntax may look a little strange. For the sake of brevity, we're not going to get into the details of it in this email. Fortunately there are [a lot of resources on JavaScript Promises](http://lmgtfy.com/?q=javascript+promise+tutorials) already out there for you to find*.

Okay, we need to see all this in action to really grasp what's going on. Just to recap, here's what your `tests.js` file should look like:

```
var wdio = require("webdriverio");
var options = {
	desiredCapabilities: {
		browserName: "firefox"
	}
};
var browser = wdio.remote(options);

browser
	.init()
	.url("http://learn.visualregressiontesting.com")
	.getTitle().then(function(title) {
	    console.log("Title is: " + title);
	});
```

Hopefully yours matches that. If so, it's time to run the test! You can do so by asking node (via the command line) to ever so kindly execute your code:

```
node tests.js
```

If all went well, you should have seen the following logged out:

```
Title is: welcome
```

### Cleaning up

Okay, I have a confession to make. I may have left the browser just sitting there after the tests finished, and now it's wondering what in the world is going on. You should go ahead and close that window and let the browser be at peace.

I forgot to tell you to lets WebdriverIO know that the tests are over and it can shut things down. That's okay though, it's really simple to do that. Just use the `end` command. Here's what the basic structure of your tests will look like:

```
browser
	.init()
	// all your test commands go in between init and end
	.end();
```

Tack `.end()` as the final command of your script, so it looks like:

```
browser
	.init()
	.url("http://learn.visualregressiontesting.com")
	.getTitle().then(function(title) {
	    console.log("Title is: " + title);
	})
	.end();
```

Run the same Node command and your tests will run, but this time the browser will close automatically, leaving you with a clean screen.

### Tomorrow's outlook  

So, how does it feel to have programmatically taken control of a  browser? A little awesome, right? Okay, if you're underwhelmed, that's because we didn't really test much. We only peaked at the page title then closed everything down before we got ourselves in trouble.

I promise tomorrow that we'll get our hands extra dirty with mouse clicks, keyboard taps, HTML checks and a very simple visual test.

If you can't wait until then, take a look at [the WebdriverIO API page](http://webdriver.io/api.html) to see a full list of commands available for use.

*If you enjoyed these lessons, consider sharing this course with your friends*

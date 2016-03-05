# Real Visual Regression Testing with WebdriverCSS

It's Day 3! We've spent the past two days getting things in place. Today is the day we finally get into WebdriverCSS!

Before we get going, we need to install some dependencies. GraphicsMagick is a piece of computer software required to perform image manipulation and comparison. It'll allow us to crop and compare our baseline images with current images, and tell us if there are any differences between the two.

## Installation

1. [Install GraphicsMagick](https://github.com/webdriverio/webdrivercss#install)
2. You should have WebdriverCSS, WebdriverIO and selenium-standalone installed already. If not, go back and look at day 2.


## Setting Up WebdriverCSS

We are going to need to make a couple changes to our `tests.js` file, the first one being adding a require statement to load WebdriverCSS.

```js
var wdio = require("webdriverio");
var webdrivercss = require("webdrivercss");
```

We are now leveraging the power of WebdriverIO along with our visual regression framework, WebdriverCSS.

## Initializing the Browser...Again

In order to get our `webdrivercss` command into the browser instance we created in our last lesson, we need to pass that instance into `webdrivercss.init()` like:

```js
webdrivercss.init(browser);
```

We are going to just leave WebdriverCSS at its default settings, but if you wanted to update the instance options like we did with `wdio.remote(options)` you can pass those options in as an object after the browser variable.

```js
webdrivercss.init(browser, {
    screenshotRoot: "my-shots",
    failedComparisonsRoot: "diffs",
    misMatchTolerance: 0.05,
    screenWidth: [320,480,640,1024],
    updateBaseline: false
});
```

If you want to learn more about those options you can read about them on the [WebdriverCSS Github Repo](https://github.com/webdriverio/webdrivercss/tree/beta-rc1#setup).

## Writing our first visual regression tests

We're almost there! We've got all of the pieces in place, and we are ready to write our first WebdriverCSS test.

Lets first look at the anatomy of the WebdriverCSS command.

Just like the `.url()` and the `.getTitle()` function we used yesterday, `.webdrivercss()` is a chainable, promise based function that is typically placed directly after the `.url()` call.

```js
browser
  .init()
  .url("https://learn.visualregressiontesting.com")
  .webdrivercss("some_id", [{options}], callback);
```

The function takes 3 different parameters:

1. __An ID__: Each webdriverCSS test needs to have a unique ID. This value will be the prefix for all of the screenshot file names, and should therefore follow traditional naming conventions like no spaces, dashes, or special characters.
2. __Options__: an array of option objects, each one representing a different part of the page that you would like to test. Properties in the objects include:
  1. __name__: Name of the captured element
  2. __elem__: Selector of the element you want to capture
  3. __width__: You can specify a fixed width for your screenshot
  4. __height__: You can specify a fixed height for your screenshot
  5. __x__: You can specify a fixed x coordinate for your screenshot (requires width/height)
  6. __y__: You can specify a fixed y coordinate for your screenshot (requires width/height)
  7. __screenWidth__: Pass through an array of screen widths to test this element at
  8. Various other [properties to hide, remove or exclude](https://github.com/webdriverio/webdrivercss/tree/beta-rc1#usage) parts of the page, which can be useful in order to ignore dynamic components such as advertisements.
3. __The Callback__: This function answers the "Ok I've got all of these images, what do I do now"? We'll leave it alone for now, but in a later lessons we are going to be use it to ensure that the image WebdriverCSS returns matches our baseline images.

### Putting it all together

Now that we've explained the parts of this function, let's see webdriverCSS in action capturing images:

```js
browser
  .init()
  .url("https://learn.visualregressiontesting.com")
  .webdrivercss("homepage",[
        {
            name: "header",
            elem: ".header"
        },
        {
            name: "benefits",
            elem: ".benefits",
            screenWidth: [320,640,1024]
        }
    ])
  .end();
```

We've decided to capture two different elements on our homepage: the header and the benefits section.

The header doesn't change over different breakpoints, but the benefits section does. So to make sure we test each of those breakpoints we use the `screenWidth` parameter in the second set of options. This will produce a total of three images, one for each viewport size.

### Checking the Results

To view the results of this test we first need to make sure that we have selenium running. If you haven't installed selenium yet make sure that you have the selenium-standalone node package installed and run:

```sh
./node_modules/.bin/selenium-standalone install
```
### Start Selenium

Once selenium is installed we can start it up by running this command in your terminal:

```sh
./node_modules/.bin/selenium-standalone start
```
### Run Our Tests

> If you need to catch up, or check your work, take a look at `day-3.js` in [the course code samples](http://learn.visualregressiontesting.com/code-samples.zip).

With selenium started we can run our tests!

```sh
node tests.js
```

To see the results of our tests, take a look in the `webdrivercss` folder. In this folder you'll see the following files:

```
homepage.320px.png
homepage.640px.png
homepage.1024px.png
homepage.png
homepage.benefits.320px.baseline.png
homepage.benefits.640px.baseline.png
homepage.benefits.1024px.baseline.png
homepage.header.baseline.png
```

The first four images listed (without baseline in the name) are the full page screenshots WebdriverCSS captures from Firefox. Once those images are captured WebdriverCSS crops the image down to your specified areas giving you the four baseline images. It's the baseline images we are concerned with, and those that we will be keeping.

## Storing Baseline Images


These baseline images should get stored in the Git repo like any other file (although you may want to [use a `.gitignore` file](https://github.com/webdriverio/webdrivercss/blob/master/examples/.gitignore) to skip the `.regression.` and `diff` images). This makes it simple to share baseline images across teams. It also allows for changes in the baseline to be tracked over time and viewed in pull requests.


Be aware that if team members or testing platforms are not using the same OS, the baseline images might differ slightly. A common example is that a baseline will work for local testing on OSX, but the same baseline image fails when TravisCI runs the same visual regression test since it is Linux-based.

## Updating baseline images

Eventually our design is going to change, and when it does, we need to make sure that our new baseline images accompany our style changes.

If we increase the font size of our main header, our commit should include not just the new css, but the new baseline file as well. The reason for this is so that the next person that downloads our new CSS will also have a baseline image of our header with that larger text.

## Up next

WebdriverCSS allows us to do much more than just snapping pictures. In our next lesson we'll start looking at the advanced features of WebdriverIO to see how we can test interactive elements like a mobile navigation, or login forms.

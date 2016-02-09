It's Day 3! We've spent the past two days getting things in place. Today is the day we finally get into Visual Regression Testing!

Before we get going, we need to install some dependencies. GraphicsMagick is a piece of computer software required to perform image manipulation and comparison. It'll allow us to compare our baseline images with current images, and tell us if there are any differences between the two.

We'll also be installing two specific versions of WebdriverIO and WebdriverCSS that are the most compatible and offer the most features.



Installation

1. [Install GraphicsMagick](https://github.com/webdriverio/webdrivercss#install)
2. npm i webdriverio@3.x
3. npm i webdrivercss@2.0.0beta-rc1


## Setting Up WebdriverCSS

We are going to need to make a couple changes to our `tests.js` file, the first one being adding a couple more require statements.

```js
var wdio = require("webdriverio");
var webdrivercss = require('webdrivercss');
var assert = require('assert');
```

We are now leveraging the power of WebdriverIO along with our visual regression framework, WebdriverCSS. Along for the ride is the assert framework which contains the logic for creating or true or false test.

## Initializing the Browser...Again

In order to get our `webdrivercss` command into the browser instance we created yesterday, we simply need to pass that instance into `webdrivercss.init()` like:

```js
webdrivercss.init(browser);
```

We are going to just leave webdriverCSS at its default settings, but if you wanted to update the instance options like we did with `wdio.remote(options)` you can pass those options in as an object after the browser variable.

```js
require('webdrivercss').init(client, {
    screenshotRoot: 'my-shots',
    failedComparisonsRoot: 'diffs',
    misMatchTolerance: 0.05,
    screenWidth: [320,480,640,1024],
    updateBaseline: false
});
```

If you want to learn more about those options you can read about them on the [WebdriverCSS Github Repo](https://github.com/webdriverio/webdrivercss/tree/beta-rc1#setup).

## Writing our first visual regression tests

We're almost there! We've got all of the pieces in place, and we are ready to write our first WebdriverCSS test.

Lets first look at the anatomy of the webdriverCSS command.

Just like the `.url()` and the `.getTitle()` function we used yesterday, `.webdrivercss()` is a chainable, promise based function that is typically placed directly after the `.url()` call.

```
browser
  .init()
  .url("https://learn.visualregressiontesting.com")
  .webdrivercss('some_id', [{options}], callback);
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
  8. Various other [properties to hide, remove or exclude](https://github.com/webdriverio/webdrivercss/tree/beta-rc1#usage) parts of the page
3. __The Callback__: This function answers the "Ok I've got all of these images, what do I do now"? In our case, we are going to be using the assert library to make sure that the image webdriverCSS returned matches our baseline images.

### Putting it all together

Now that we've explained the parts of this function, let's see it in action:

```
browser
  .init()
  .url("https://learn.visualregressiontesting.com")
  .webdrivercss('homepage',[
        {
            name: 'header',
            elem: '.header'
        },
        {
            name: 'benefits',
            elem: '.benefits',
            screenWidth: [320,640,1024]
        }
    ], function(err, res) {
        assert.ifError(err);
        assert.ok(res.header[0].isWithinMisMatchTolerance);
        assert.ok(res.benefits[0].isWithinMisMatchTolerance);
        assert.ok(res.benefits[1].isWithinMisMatchTolerance);
        assert.ok(res.benefits[2].isWithinMisMatchTolerance);
    })
  .end();
```

We've decided to test two different elements on our homepage, the header and the benefits section.

The header doesn't change over different breakpoints, but the benefits section does. So to make sure we test each of those breakpoints we use the `screenWidth` parameter in the second set of options. This will produce a total of three images, and has an impact on the way we write our callback tests.

### Asserting the results

Our testing first checks to make sure there aren't any general errors during the testing run. If that tests passes then we check the results of the visual regression suite:

Since there is only a single header breakpoint being capture, we only need to assert that the first (zero based index) image `isWithinMisMatchTolerance` of our baseline image.

```
assert.ok(res.header[0].isWithinMisMatchTolerance);
```

Our benefits tests, on the other hand, are testing three different breakpoints, creating three different images. Two of them might pass, while the third fails. Therefore we need to run three different assertion:

```
assert.ok(res.benefits[0].isWithinMisMatchTolerance);
assert.ok(res.benefits[1].isWithinMisMatchTolerance);
assert.ok(res.benefits[2].isWithinMisMatchTolerance);
```

These assertions can get a bit repetitive and redundant, so if you're like me and you want to automate these lines, be sure to check out [this gist](https://gist.github.com/klamping/bd2303f3431028d457f9).


## Storing Baseline Images

Images are stored in the Git repo like any other file. This makes is simple to share baseline images across the teams. It also allows for changes in the baseline to be tracked over time.

### Accepting/Rejecting changes

Whether or not updates to the baseline images are accepted depends on the goal of the changes. Here are a few scenarios:

#### No visual changes

If no visual changes occur (and none were expected), then nothing needs to be checked in.

#### Unwanted visual changes

If visual changes occurred (new images in the `diff` directory), but they weren't intended, that means there was a regression in the UI output. Review the diffs and fix the visual changes that occurred. No files should be checked in.

#### Wanted visual changes

If visual changes occur and are warranted, the following steps will need to be taken to update the baseline images:

1. Delete the contents of the baseline & diff image directories.
2. Run the test suite again.
3. Add/commit all updated images.
4. Have another team member review the new images. [Github has useful image diff tools](https://github.com/blog/817-behold-image-view-modes) to help compare the changes.


*If you enjoyed these lessons, consider sharing this course with your friends*

# What to know about Visual Regression Testing

Hey Folks, Micah and Kevin here from visualregressiontesting.com. 

Over the next week, you're going to learn the essentials Visual Regression Testing.

You may be surprised by how much fun writing these tests will be. After all, you're teaching a computer how to use your website! That's pretty neat in our book.

## Some Terminology

Let's kick it off by expanding our vocabulary. We'll be using these terms throughout the course:

### Regression Testing

Change hurts. Especially when it's unwanted.

"Regressions" are changes, bad ones, to the functionality of your site. To say you've found a "regression" means you found code that used to work but no longer does.

"Regression Testing" is a type of testing that checks for these bugs in existing functionality after an update. 

While you definitely want to put new code through the wringer, it's also important to look at existing features to ensure they weren't adversely affected by the updates. That's what regression testing does.

### Automated Testing

Automation comes in many forms, whether through robots or driverless cars. For us, it's writing code that "automates" actions on a website, similar to how AI is written to "automate" driving a car.

While the goal of website automation is to test without a human clicking links and entering text, in no way can it take the place of hard-working people.

First of all, someone has to write the automation and know how to keep it up to date. That can easily be a full-time job on a large enough application.

But there is also a lot of nuance to websites. Checking to see if an animation worked as designed is very difficult with automated tests. Automation simply aims to handle the boring, repetitive tasks, leaving you time to test the hard stuff.

### Functional Testing

There are many types of software testing out there; [Wikipedia has an extensive list of the various definitions](https://en.wikipedia.org/wiki/Software_testing#Testing_types).

We're focusing on "functional" testing, which checks the UI functionality of a website and ensures that it works properly. This is not the same as testing JavaScript functions (that would be unit testing).

Functional testing also goes by "system testing", "end-to-end tests" and many other monikers, but for our course we'll use the term "functional testing".

### Visual Testing

There's one last term to cover, and that's the concept of "visual testing." In this course, we'll talk about both standard testing (e.g. make sure certain text is on the page) and visual testing (e.g. make sure the page looks the same as before).

Visual Regression Testing has a unique set of benefits. Just because an element is on a page does not mean it's in the right location (or the right size or the right color).

With visual testing, we take screenshots of various parts of the page to serve as the "baseline" of how the site should work. Then in subsequent test runs, we take new screenshots and compare to those baselines. Any differences are flagged for review.

## The Benefits of Functional Testing

Why take the time to learn all of this? Is it really worth it to write code that only tests the code you really should be writing? 

Here's the thing: you're already doing this. Every time you refresh your page to see a change you've made, you're running a manual regression test. Throughout the lifetime of a website, hundreds of hours are spent regression testing it.

But the truth is, we're bad at this. We either get lazy and skip a few tests, or we unknowingly miss a defect or two ([we're especially bad at detecting small visual changes](https://en.wikipedia.org/wiki/Change_blindness)).

With automation, regression testing the site becomes less of a repetitious chore, so we're more likely to do it on a consistent basis. You can even set up hooks to automatically test your code after every change.

And computers are much better at spotting pixel changes. It's all numbers to the computer, and numbers are easy to compare. 

## Some Disclaimers

We really believe in the benefits of automated testing, so we should probably throw out some disclaimers before we get you too excited:

- Functional testing can be finicky, because websites are complicated.
- You can't test everything because, again, websites are complicated.
- Automation doesn't work in all browsers, because some browsers just don't support it. You're best bets are going to be Firefox, Chrome and Internet Explorer.

Basically, it's not magic (although it feels like it at times). There are certain things you just won't be able to automate testing for, so it's best not to fight that fact. 

## The Technology

We'll go in to installation of the tools tomorrow, but here's what we'll be using:

- [Selenium](https://en.wikipedia.org/wiki/Selenium_(software)) - A browser automation tool
- [WebdriverIO](http://webdriver.io/) - A Node.js library to talk to Selenium
- [WebdriverCSS](https://github.com/visualregressiontesting/webdrivercss) - An add-on to WebdriverIO to help with Visual Regression Testing

## Course Requirements (aka today's homework)

There are a few requirements you'll need to have going before getting started:

- [A working NodeJS environment](https://github.com/creationix/nvm#node-version-manager-) ([Learn about Node and NPM if you are new to it](https://docs.npmjs.com/getting-started/what-is-npm))
- [A light understanding of the command line](https://www.codecademy.com/learn/learn-the-command-line)
- [An understanding of JavaScript fundamentals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics)

## What's Next?

Phew, you've made it through the entire first day without any code being shown. Don't worry, we've saved all that for tomorrow, where we'll take a look at writing your very first automated test (we're so excited for you!)
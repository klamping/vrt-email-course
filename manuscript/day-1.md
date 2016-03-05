# What you Need to Know about Visual Regression Testing

Welcome to the first day of six in the "Visual Regression Testing" e-mail course.

Over the next week, we'll get you started understanding the essentials of writing automated functional tests using WebdriverIO.

At the end of the week, you will have all the knowledge you need to write an elementary set of tests, and you may be surprised just how handy they are during your next site update.

You may also be surprised by how much fun writing these tests will be. After all, you're teaching a computer how to use your website! That's pretty neat in our book.

## Some Terminology

Let's kick off day one by expanding your vocabulary with a few new terms that we'll be repeating over and over throughout the course:

### Regressions

Change hurts. Especially when it's unwanted.

"Regressions" are changes, bad ones, to the functionality of your site. To say you've found a "regression" means there is code that used to be working as expected, but is no longer meeting expectations.

"Regression Testing" relates to the type of tests that check for new bugs in existing functionality after a new feature or fix goes in.

While you definitely want to put new code through the wringer, it's also important to look at existing features to ensure they weren't adversely affected by the updates.

### Automation

Do you hear automation and think of robots replacing assembly line workers? Does it make you think that some automated script will replace your job?

While the goal of automation is to test a website without a human clicking links and entering text, in no way can it take the place of hard-working people.

First of all, someone has to write the automation and know how to keep it up to date. That can easily be a full-time job on a large enough application.

But there is also a lot of nuance to tests. Checking to see if an animation worked as designed is difficult (and maybe impossible) right now with automated tests.

There are so many moving parts to our sites (and they're becoming more complex each day) that automation simply aims to handle the boring, repetitive tasks, leaving you time to dig deep in to the details of the implementation.

### Functional Testing

There are many types of software testing out there; [Wikipedia has an extensive list of the various definitions](https://en.wikipedia.org/wiki/Software_testing#Testing_types).

In this course, we're focused on "functional" testing. This type of testing checks the functionality of your website and ensures that it works properly. It does not mean you're testing JavaScript "functions" (that would be unit testing).

Frankly, you could probably call it "system testing" or "end-to-end tests," but for our course we'll be using the term "functional testing."

### Visual Testing

There's one last term to cover, and that's the concept of "visual testing." In this course, we'll talk about both standard testing (e.g. make sure certain text is on the page) and visual testing (e.g. make sure the page looks the same as before).

Visual regression testing opens up a lot of benefits to us. Just because an element is on a page does not mean it's in the right location (or the right size or color).

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
- [WebdriverIO](http://webdriver.io/) - A Node.js library to drive Selenium
- [WebdriverCSS](https://github.com/webdriverio/webdrivercss) - An add-on to WebdriverIO to help with visual regression testing

## Course Requirements (aka today's homework)

There are a few requirements you'll need to have going before getting started:

- [A working NodeJS environment](https://github.com/creationix/nvm#node-version-manager-) ([Learn about Node and NPM if you are new to it](https://docs.npmjs.com/getting-started/what-is-npm))
- [A light understanding of the command line](https://www.codecademy.com/learn/learn-the-command-line)
- [An understanding of JavaScript fundamentals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Basics)

## What's Next?

Phew, you've made it through the entire first day without any code being shown. Don't worry, we've saved all that for tomorrow, where we'll take a look at writing your very first automated test (we're so excited for you!)
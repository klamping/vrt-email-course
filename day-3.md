It's Day 3!

Installation

1. [Install GraphicsMagick](https://github.com/webdriverio/webdrivercss#install)
1. Run `npm install --save webdrivercss`

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
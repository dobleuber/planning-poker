# planning-poker

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>

I created this project in order to put into practice my recent stydies about Reactjs echosystem.
I am using the followings technologies:

- React 16
- Relay Modern
- GraphCool
- i18Next
- webpack
- SASS

I need to learn how to build tests for Relay, I actually have some examples, I hope to improve the test coverage soon.

Feel free of navigate in this code, I appreciate a lot any feedbag or suggestions. Thanks in advance.

I hope to put this tool online in the begining of the next year 2018.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run build-css](#npm-run-build-css)
  - [npm run watch-css](#npm-run-watch-css)
  - [npm run relay](#npm-run-relay)
  - [npm run relay-temp](#npm-run-relay-temp)
  - [npm run relay-schema](#npm-run-relay-schema)

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      App/
        App.scss
        App.test.js
        index.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run build-css`

Builds the css, I am using SASS

### `npm run watch-css`

Builds and watches the scss files. TODO include this task in webpack.

### `npm run relay] `
### `npm run relay-temp`

Build the relay generated files. Actually I'm using `relay-temp` because this [bug of relay](https://github.com/facebook/relay/issues/1740). If you want build these files please follow these steps [PR #2142](https://github.com/facebook/relay/pull/2142#issuecomment-345327113)

### `npm run relay-schema`

Generates the schema file: Beware right now you must to backup the subscription section. I can't find how to generate the subscriptions so, I am creating manually.


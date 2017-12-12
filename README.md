# AntoKara.me

## Status Badges

[![FOSSA Status][licenses]][licenses-url]
[![Dependencies][deps]][deps-url]

## Requirements

1. [Node.js ~8.9.1 LTS](https://nodejs.org/en/)

## Installation

`$npm install`

### Chrome Tools

1. [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
1. [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## Production Environment

### Build

`$npm run build`

* *In prod. env. all code (html, css, js) is getting minified / uglified and source maps are getting generated as separate files*
* output directory of the build is `dist`

## Development Environment

### Execution of local server with hot reloading

`$npm start`

<http://localhost:9000/>

## Standards/Linting Rules

1. [Airbnb JavaScript Style Guide](http://airbnb.io/javascript/)
1. [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
    1. [babel-preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react)
1. [Stylelint](https://stylelint.io/user-guide/rules/)
    1. [config-standard](https://github.com/stylelint/stylelint-config-standard)
    1. [scss](https://github.com/kristerkari/stylelint-scss)
1. [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
1. [eslint](https://eslint.org/)
    1. [airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
    1. [plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y>)

## Git Commit

To commit a message using the correct format, run:

`$npm run cm`

If you would like a shorter syntax, you can install

`#npm install -g commitizen cz-conventional-changelog`

now, all you need to type to commit a message is:

`$git cz`

see <http://commitizen.github.io/cz-cli/> for more

## CSS/PostCSS

1. [postcss-import](https://github.com/postcss/postcss-import)
1. [css-next](http://cssnext.io/features/)
1. [autoprefixer](https://github.com/postcss/autoprefixer) (already included by postcss-cssnext)
1. [css-nano](http://cssnano.co/) (only in prod)
1. [stylelint](https://stylelint.io/) (only in prod)
1. [stylelint-scss](https://github.com/kristerkari/stylelint-scss) (only in prod)
1. [doiuse](https://github.com/anandthakker/doiuse) (only in prod)
1. [postcss-mixins](https://github.com/postcss/postcss-mixins)
1. [postcss-nested](https://github.com/postcss/postcss-nested)
1. [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes)
1. [lost grid](https://github.com/peterramsing/lost)
1. [PostCssFontMagician](https://github.com/jonathantneal/postcss-font-magician)

## Module Aliases

Unfortunately, I couldn't find a single place to declare Modules Aliases, which can be properly shared between all components/tools used in this project. There are some packages available on the internet such as `eslint-import-resolver-webpack`, `jest-webpack-alias`, `babel-plugin-module-resolver`, `babel-plugin-webpack-alias`, etc. but none of them proved to work properly across all components/tools.

Thus, I decided unfortunately, to repeat Module Alias declarations for each component/tool separately and in some cases, modified accordingly, to match the correct environment in use...

This means that whenever an Alias needs to be Added/Removed or Modified, these are the places that need to be adjusted:

1. Webpack (for development and production)
    1. file `/config/webpack/common.js`
    1. key `resolve.alias`
1. Jest (for testing)
    1. file `package.json`
    1. key `jest.moduleNameMapper`
1. esLint (for development)
    1. file `package.json`
    1. key `eslintConfig.settings.import/resolver.alias`

## Config

### App

create a `.env` file on the project directory, with the following keys:

* CONTENTFUL_SPACE
* CONTENTFUL_ACCESS_TOKEN

## Testing

### Run all tests

`$npm test`

### Run all tests and provide coverage report

`$npm run test-coverage`

_note: output will be printer on console, as well as in the `coverage` directory_

### Reference

1. [Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
1. [Enzyme](http://airbnb.io/enzyme/)

[deps]: https://david-dm.org/antokara/antokara.me.svg
[deps-url]: https://david-dm.org/antokara/antokara.me

[licenses]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fantokara%2Fantokara.me.svg?type=shield
[licenses-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fantokara%2Fantokara.me?ref=badge_shield

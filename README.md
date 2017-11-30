# AntoKara.me

## Status Badges

[![FOSSA Status][licenses]][licenses-url]
[![Dependencies][deps]][deps-url]

## Requirements

1. [Node.js ~8.9.1 LTS](https://nodejs.org/en/)

## Installation

`$npm install`

## Production Environment

### Build

`$npm run build`

* *In prod. env. all code (html, css, js) is getting minified / uglified and source maps are getting generated as separate files*
* output directory of the build is `dist`

## Development Environment

### Execution of local server with hot reloading

`$npm start`

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

[deps]: https://david-dm.org/antokara/antokara.me.svg
[deps-url]: https://david-dm.org/antokara/antokara.me

[licenses]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fantokara%2Fantokara.me.svg?type=shield
[licenses-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fantokara%2Fantokara.me?ref=badge_shield

# AntoKara.me

## Status Badges

[![FOSSA Status][licenses]][licenses-url]
[![Dependencies][deps]][deps-url]

## Requirements

1. [Node.js ~6.11.5 LTS](https://nodejs.org/en/)

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

## Standards

1. <http://airbnb.io/javascript/>
1. <https://github.com/airbnb/javascript/tree/master/react>
1. <https://stylelint.io/user-guide/rules/>
1. <https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits>

## Git Commit

To commit a message using the correct format, run:

`$npm start cm`

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
1. [doiuse](https://github.com/anandthakker/doiuse) (only in prod)
1. [postcss-nested](https://github.com/postcss/postcss-nested)

[deps]: https://david-dm.org/antokara/antokara.me.svg
[deps-url]: https://david-dm.org/antokara/antokara.me

[licenses]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fantokara%2Fantokara.me.svg?type=shield
[licenses-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fantokara%2Fantokara.me?ref=badge_shield

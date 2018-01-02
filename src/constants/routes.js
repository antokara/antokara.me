/**
 * our Routes defined as "key":"path"
 * few reasons why this constant object exists are
 *  - easier URL/path redirection in the future if needed
 *  - ability to map content such as "menu title" dynamically using the "key"
 */
const routes = {
  home: {
    path: '/',
    exact: true,
  },
  demos: {
    path: '/demos',
    exact: true,
  },
  skills: {
    path: '/skills',
    exact: true,
  },
  contact: {
    path: '/contact',
    exact: true,
  },
};

export default routes;

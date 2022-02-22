import account from './account';
import topics from './topics';
import images from './images';

var routes = [];

var load = (router) => {
  router.routes.forEach((route) => {
    route.path = "/public" + router.path + route.path;
  });
  routes = routes.concat(router.routes);
}

load(account);
load(topics);
load(images);


export default routes;
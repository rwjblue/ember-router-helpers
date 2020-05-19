import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('parent', { path: '/' }, function() {
    this.route('child');
    this.route('sister');
    this.route('brother');
  });
  this.route('dynamic', { path: '/dynamic/:dynamic_id' });
});

import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  //this.route('home', { path: '/' });
  this.route('demos', { path: '/' }, function() {
    this.route('checkboxeditor');
    this.route('toggle');
    this.route('treeview');
    this.route('select-editor');
    this.route('listview');
  });
});

export default Router;

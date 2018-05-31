import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('project', { path: '/:id' }, function() {
    this.route('models');
    this.route('settings');
  });

  this.route('organization.create');
  this.route('organization', { path: '/org/:id' }, function() {
    this.route('projects', function() {
      this.route('create');
    });
    this.route('team');
  });

  this.route('project', { path: '/project/:id' }, function() {
    this.route('team');
    this.route('structure');
    this.route('content');
    this.route('settings');
  });

  this.route('login');
  this.route('logout');

  this.route('settings');
  this.route('signup');
  this.route('reset');
  this.route('token', { path: '/token/:token/:dest' });
  this.route('organization.accept');
});

export default Router;

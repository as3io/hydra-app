import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  session: inject('session'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch((e) => {
      this.get('error-processor').show(e);
      this.get('session').invalidate();
    });
  },

  setupController(controller, model) {
    controller.set('session', this.get('session'));
    this._super(controller, model);
  },

  _loadCurrentUser() {
    return this.user.load();
  },
});

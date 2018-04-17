import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {

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

  /**
   * Ref https://github.com/simplabs/ember-simple-auth/issues/802#issuecomment-166377794
   */
  sessionInvalidated() {
    if (this.get('session.skipRedirectOnInvalidation')) {
      this.set('session.skipRedirectOnInvalidation', false);
    } else {
      this._super(...arguments);
    }
  },

  setupController(controller, model) {
    controller.set('session', this.get('session'));
    this._super(controller, model);
  },

  _loadCurrentUser() {
    return this.user.load();
  },
});

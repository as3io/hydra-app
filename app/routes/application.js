import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import LoadingMixin from 'hydra-app/mixins/loading-mixin';

export default Route.extend(LoadingMixin, ApplicationRouteMixin, {
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


  /**
   *
   */
  actions: {
    showLoading() {
      this.showLoading();
    },

    hideLoading() {
      this.hideLoading();
    },

    /**
     *
     * @param {string} name The route name to transition to.
     */
    transitionTo(name) {
      return this.transitionTo(name);
    },

    /**
     *
     * @param {*} transition
     */
    loading(transition) {
      this.showLoading();
      transition.finally(() => this.hideLoading());
    },

    /**
     *
     * @param {Error} e
     */
    error(e) {
      if (this.get('errorProcessor').isReady()) {
        this.get('errorProcessor').show(e);
      } else {
        this.intermediateTransitionTo('application_error', e);
      }
    },
  },
});

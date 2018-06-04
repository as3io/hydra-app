import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {

  beforeModel({ params }) {
    this.send('showLoading');
    const { token } = params['actions.magic-login'];

  }
});

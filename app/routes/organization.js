import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'hydra-app/gql/queries/organization';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  beforeModel({ params }) {
    const id = params.organization.id;
    this.get('user').setOrg({ id });
    this._super(...arguments);
  },

  resetController(_controller, isExiting, transition) {
    if (isExiting && transition && transition.targetName !== 'error') {
      this.get('apollo').unsubscribeAll();
    }
  },

  model({ id }) {
    const variables = { input: { id } };
    const resultKey = 'organization';
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey)
      .catch(e => this.get('errorProcessor').show(e))
    ;
  },

  renderTemplate() {
    this.render();
    this.render('organization.nav', { outlet: 'navigation', into: 'application' });
  },

})

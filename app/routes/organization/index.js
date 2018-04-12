import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'hydra-app/gql/queries/organization';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    const { id } = this.modelFor('organization');
    const variables = { input: { id } };
    const resultKey = 'organization';
    return this.get('apollo').watchQuery({ query, variables }, resultKey)
      .catch(e => this.get('errorProcessor').show(e))
    ;
  },

})

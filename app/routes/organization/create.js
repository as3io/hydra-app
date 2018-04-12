import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'hydra-app/gql/mutations/create-organization';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    return { name: '' };
  },

  actions: {
    create() {
      const { name } = this.modelFor('organization.create');
      const variables = { input: { payload: { name } } };
      const resultKey = 'createOrganization';
      const refetchQueries = ['currentUser'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('organization.index', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})

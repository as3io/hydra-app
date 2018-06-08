import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'hydra-app/gql/mutations/create-project';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model(_params, { params }) {
    const organization = params.organization.id;
    return {
      name: '',
      organization,
    };
  },

  actions: {
    create() {
      const { name } = this.modelFor('organization.create-project');
      const variables = { input: { name } };
      const resultKey = 'createProject';
      const refetchQueries = ['AllProjects'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('project.index', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})

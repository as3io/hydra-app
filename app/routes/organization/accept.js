import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'hydra-app/gql/mutations/organization-invite-accept';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    const orgs = this.get('user.organizations');
    return orgs.findBy('accepted', false);
  },

  afterModel(model) {
    if (!model) this.transitionTo('index');
  },

  actions: {
    accept() {
      const organization = this.modelFor('organization.accept').id;
      const variables = { input: { organization } };
      const resultKey = 'organization';
      const refetchQueries = ['currentUser', 'OrganizationMembers'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.transitionTo('organization.index', organization))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  }

})

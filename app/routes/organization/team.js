import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'hydra-app/gql/queries/organization-members';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model(_params, { params }) {
    const id = params.organization.id;
    const input = { id };
    const variables = { input };
    const resultKey = 'organization';
    return this.get('apollo').watchQuery({ query, variables }, resultKey)
      .then(organization => {
        this.controllerFor('organization.team').set('organization', organization);
        return organization.members;
      })
      .catch(e => this.get('errorProcessor').show(e))
    ;
  },
})

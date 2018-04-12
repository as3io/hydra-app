import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'hydra-app/gql/queries/project';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model({ id }) {
    const variables = { input: { id } };
    const resultKey = 'project';
    return this.get('apollo').watchQuery({ query, variables }, resultKey)
      .catch(e => this.get('errorProcessor').show(e))
    ;
  },

  renderTemplate() {
    this.render();
    this.render('project.nav', { outlet: 'navigation', into: 'application' });
  },
});

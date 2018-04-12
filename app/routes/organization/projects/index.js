import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'hydra-app/gql/queries/all-projects';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  queryParams: {
    first: {
      refreshModel: true
    },
    after: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  totalCount: 0,
  endCursor: null,

  setPagination(pagination) {
    const { totalCount } = pagination;
    const { hasNextPage, hasPrevPage, endCursor } = pagination.pageInfo;
    this.controllerFor('organization.projects.index').setProperties({ totalCount, hasNextPage, hasPrevPage, endCursor });
    return pagination.edges.map(node => node.node);
  },

  resetController(_controller, isExiting, transition) {
    if (isExiting && transition && transition.targetName !== 'error') {
      this.get('apollo').unsubscribeAll();
    }
  },

  model({ first, after, sortBy, ascending }, { params }) {
    const organization = params.organization.id;
    const criteria = { organization };
    const pagination = { first, after };
    const sort = { field: sortBy, order: ascending ? 1 : -1 };
    const variables = { criteria, pagination, sort };
    if (!sortBy) delete variables.sort.field;
    const resultKey = 'allProjects';
    return this.get('apollo').watchQuery({ query, variables }, resultKey)
      .then(pagination => this.setPagination(pagination))
      .catch(e => this.get('errorProcessor').show(e))
    ;
  },
});

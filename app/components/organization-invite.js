import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { inject } from '@ember/service';

import mutation from 'hydra-app/gql/mutations/organization-invite';

export default Component.extend(ComponentQueryManager, {
  flashMessages: inject(),

  organization: null,
  model: null,

  roles: null,
  projectRoles: null,

  init() {
    this.setModel();
    this.set('roles', [ 'Owner', 'Administrator', 'Member' ]);
    this.set('projectRoles', [ 'Administrator', 'Developer', 'Editor' ]);
    this._super(...arguments);
  },

  setModel() {
    const toMap = this.get('organization.projects') || [];
    const projects = toMap.map(project => ({ project }))
    this.set('model', {
      email: '',
      givenName: '',
      familyName: '',
      role: 'Member',
      projects,
    })
  },

  actions: {
    invite() {
      const { email, givenName, familyName, role, projects } = this.get('model');
      const projectRoles = projects.map(project => {
        if (project.role) {
          return { id: project.id, role: project.role }
        }
      });
      const organization = this.get('organization.id');

      const variables = { input: { organization, payload: { email, givenName, familyName, role, projectRoles } } };
      const resultKey = 'organization';
      const refetchQueries = ['OrganizationMembers'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.get('flashMessages').info('Invitation sent!'))
        .then(() => this.setModel())
        .catch(e => this.get('errorProcessor').show(e))
      ;

    },
  }
});

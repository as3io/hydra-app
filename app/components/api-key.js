import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

import CreateOrganizationKey from 'hydra-app/gql/mutations/create-organization-key';
import UpdateOrganizationKey from 'hydra-app/gql/mutations/update-organization-key';
import CreateProjectKey from 'hydra-app/gql/mutations/create-project-key';
import UpdateProjectKey from 'hydra-app/gql/mutations/update-project-key';
// import CreateUserKey from 'hydra-app/gql/mutations/create-user-key';
// import UpdateUserKey from 'hydra-app/gql/mutations/update-user-key';

export default Component.extend(ComponentQueryManager, {
  flashMessages: inject(),
  errorProcessor: inject(),

  type: null,
  model: null,
  key: null,

  isModalOpen: false,

  purpose: 'Public',
  enabled: true,
  description: null,

  isUpdating: computed.bool('key'),

  action: computed('isUpdating', function() {
    if (this.get('isUpdating')) return 'update';
    return 'create';
  }),

  title: computed('isUpdating', function() {
    if (this.get('isUpdating')) return 'Update key';
    return 'Create key';
  }),

  status: computed('enabled', function() {
    return this.get('enabled') ? 'success' : 'danger';
  }),

  statusTitle: computed('enabled', function() {
    return this.get('enabled') ? 'Active' : 'Inactive';
  }),


  init() {
    this.set('purposes', ['Public', 'Private'])
    this.set('purpose', this.get('key.purpose') || 'Public');
    this.set('enabled', this.get('key.id') ? this.get('key.enabled') : true);
    this.set('description', this.get('key.description'));
    this._super(...arguments);
  },

  getMutation(action) {
    const type = this.get('type');
    if (type === 'project' && action === 'Create') return CreateProjectKey;
    if (type === 'project' && action === 'Update') return UpdateProjectKey;
    if (type === 'organization' && action === 'Create') return CreateOrganizationKey;
    if (type === 'organization' && action === 'Update') return UpdateOrganizationKey;
    if (type === 'user' && action === 'Create') return CreateUserKey;
    if (type === 'user' && action === 'Update') return UpdateUserKey;
    // const key = type.charAt(0).toUpperCase() + type.slice(1);
    // return [`${action}${type}Key`];
  },

  actions: {
    showModal() {
      this.set('isModalOpen', true);
    },
    create() {
      const modelId = this.get('model.id');
      const { purpose, description } = this.getProperties([ 'purpose', 'description' ]);
      const payload = { purpose, description };
      const variables = { input: { modelId, payload } };
      const mutation = this.getMutation('Create');
      return this.get('apollo').mutate({ mutation, variables })
        .then(() => {
          this.set('isModalOpen', false);
          this.get('flashMessages').success('Key created successfully.');
          this.set('purpose', 'Public');
          this.set('description', '');
        })
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
    update() {
      const modelId = this.get('key.id');
      const { purpose, description, enabled } = this.getProperties([ 'purpose', 'description', 'enabled' ]);
      const payload = { purpose, description, enabled };
      const variables = { input: { modelId, payload } };
      const mutation = this.getMutation('Update');
      return this.get('apollo').mutate({ mutation, variables })
        .then(() => {
          this.set('isModalOpen', false);
          this.get('flashMessages').success('Organization updated successfully.');
        })
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  },

});

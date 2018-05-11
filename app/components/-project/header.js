import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  user: inject(),

  classNames: ['card', 'mb-5'],

  project: null,
  organization: computed.reads('project.organization'),

  isConfigurationOpen: false,

  // @todo this should check the project.Administrator role, not the org admin
  canConfigure: computed.or('user.{isOwner,isAdmin}'),

  size: 'large',
  imageClasses: computed('size', function() {
    let size = 'lg';
    switch (this.get('size')) {
      case 'medium':
        size = 'md';
        break;
      case 'small':
        size = 'sm';
        break;
      default:
        break;
    }
    return `icon icon-${size} mr-4`;
  }),

  actions: {
    displayConfiguration() {
      this.set('isConfigurationOpen', true);
    },
  }

});

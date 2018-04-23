import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  flashMessages: inject(),
  classNames: 'input-group',

  value: null,

  clipboardTarget: computed('elementId', function() {
    const target = this.get('elementId');
    return `#${target} input`;
  }),

  actions: {
    success() {
      this.get('flashMessages').success('Text copied to clipboard');
    },
    error() {
      this.get('flashMessages').success('Text copied to clipboard');
    },
  }

});

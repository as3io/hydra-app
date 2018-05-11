import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNames: 'list-group-item',
  classNameBindings: ['_isDisabled'],

  completed: false,
  title: null,
  description: null,

  _isDisabled: computed('completed', function() {
    if (this.get('completed')) return 'disabled';
  }),

});

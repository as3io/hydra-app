import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  password: '',
  confirm: '',
  showPassword: false,

  onChange: null,

  strength: computed('password', function() {
    return window.owaspPasswordStrengthTest.test(this.get('password'));
  }),

  matches: computed('password', 'showPassword', 'confirm', function() {
    return this.get('showPassword') || this.get('password') === this.get('confirm');
  }),

  strengthText: computed('password', 'strength', 'matches', function() {
    const { password, strength, matches } = this.getProperties(['password', 'strength', 'matches']);
    if (!password) return 'Enter a new password.';
    if (!matches) return 'Passwords do not match.';
    if (!strength.strong && isEmpty(strength.requiredTestErrors)) return 'Password is ok.'
    return strength.strong ? 'Password is excellent!' : 'Password is not complex enough.';
  }),

  strengthClass: computed('password', 'strength', 'matches', function() {
    const { password, strength, matches } = this.getProperties(['password', 'strength', 'matches']);
    if (!password) return 'text-muted';
    if (!matches || !isEmpty(strength.requiredTestErrors)) return 'text-danger';
    return strength.strong ? 'text-success' : 'text-warning';

  }),

  isDisabled: computed('matches', 'strength', function() {
    return !this.get('matches') || !isEmpty(this.get('strength.requiredTestErrors'));
  }),

  // @todo make better
  strengthClasses: computed('strengthClass', function() {
    const className = this.get('strengthClass');
    return `form-control-plaintext ${className}`;
  }),

  buttonClasses: computed('isDisabled', function() {
    const dClass = this.get('isDisabled') ? 'btn-disabled' : '';
    return `btn btn-primary btn-block ${dClass}`;
  }),

  init() {
    window.owaspPasswordStrengthTest.config({
      allowPassphrases       : true,
      minLength              : 6,
      minPhraseLength        : 12,
    });
    this._super(...arguments);
  },

  actions: {
    togglePassword() {
      this.set('showPassword', !this.get('showPassword'));
    },
    setPassword() {
      this.onChange(this.get('password'));
      this.set('password', '');
      this.set('confirm', '');
    }
  }

});

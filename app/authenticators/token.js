import Base from './application';

export default Base.extend({
  authenticate({ token }) {
    return this.get('auth').submitToken(token)
  },
});

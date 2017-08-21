import Ember from 'ember';

export default Ember.Helper.extend({
  router: Ember.inject.service(),

  compute(params) {
    return (maybeEvent) => {
      if (maybeEvent !== undefined && typeof maybeEvent.preventDefault === 'function') {
        maybeEvent.preventDefault();
      }

      return this.get('router').transitionTo(...params);
    };
  }
});

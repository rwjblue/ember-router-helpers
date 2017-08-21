import Ember from 'ember';
import restructureQP from '../utils/restructure-query-params';

export default Ember.Helper.extend({
  router: Ember.inject.service(),

  compute(params) {
    return (maybeEvent) => {
      if (maybeEvent !== undefined && typeof maybeEvent.preventDefault === 'function') {
        maybeEvent.preventDefault();
      }

      const paramsWithFixedQP = restructureQP(params);
      return this.get('router').transitionTo(...paramsWithFixedQP);
    };
  }
});

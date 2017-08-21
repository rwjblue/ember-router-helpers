import Ember from 'ember';

export default Ember.Helper.extend({
  router: Ember.inject.service(),

  compute(params) {
    const paramsWithFixedQP = restructureQP(params);
    return this.get('router').isActive(...paramsWithFixedQP);
  }
});

import Ember from 'ember';

export default Ember.Helper.extend({
  router: Ember.inject.service(),

  compute(params) {
    return this.get('router').urlFor(...params);
  }
});

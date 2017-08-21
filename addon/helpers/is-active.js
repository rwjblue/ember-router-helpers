import Ember from 'ember';
import handleQueryParams from '../utils/handle-query-params';

export default Ember.Helper.extend({
  router: Ember.inject.service(),

  currentURLObserver: Ember.observer('router.currentURL', function() {
    this.recompute();
  }),

  compute(_params) {
    let params = handleQueryParams(_params);
    return this.get('router').isActive(...params);
  }
});

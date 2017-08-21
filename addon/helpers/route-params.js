import Ember from 'ember';
import _RouteParams from '../utils/route-params';

let RouteParams = _RouteParams;
export function setRouteParamsClass(klass) {
  RouteParams = klass;
}

export default Ember.Helper.extend({
  router: Ember.inject.service(),

  currentURLObserver: Ember.observer('router.currentURL', function() {
    this.recompute();
  }),

  compute(params) {
    return new RouteParams(this.get('router'), params);
  }
});

import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import _RouteParams from '../utils/route-params';

let RouteParams = _RouteParams;
export function setRouteParamsClass(klass) {
  RouteParams = klass;
}

export default Helper.extend({
  router: service(),

  compute(params) {
    return new RouteParams(this.get('router'), params);
  },

  init() {
    this._super(...arguments);
    this.addObserver('router.currentURL', this, 'recompute');
  }
});

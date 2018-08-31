import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import handleQueryParams from '../utils/handle-query-params';

export default Helper.extend({
  router: service(),

  init() {
    this._super(...arguments);
    this.addObserver('router.currentURL', this, 'recompute');
  },

  compute(_params) {
    let params = handleQueryParams(_params);
    return this.get('router').isActive(...params);
  },
  
  init() {
    this._super(...arguments);
    this.addObserver('router.currentURL', this, 'recompute');
  }
});

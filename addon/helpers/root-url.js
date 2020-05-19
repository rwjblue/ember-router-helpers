import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default Helper.extend({
  router: service('router'),

  compute() {
    return this.router.rootURL;
  }
});

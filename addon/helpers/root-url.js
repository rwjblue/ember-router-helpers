import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class RootURLHelper extends Helper {
  @service router;

  compute() {
    return this.router.rootURL;
  }
}

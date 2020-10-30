import Ember from 'ember';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import LinkComponent from '@ember/routing/link-component';

export default class HTMLAnchorEventDispatcher extends Ember.EventDispatcher {
  @service router;

  findAnchorElement(event) {
    let target = event.target;
    let element = null;

    do {
      if (target instanceof HTMLAnchorElement) {
        element = target;
        break;
      }

      target = target.parentNode;
    } while (target && target.nodeType === 1);

    return element;
  }

  recognizeAnchorURL(event, element) {
    // Re-implements [isSimpleClick](https://github.com/emberjs/ember.js/blob/1b08b25d0ecb23f35781343d5ab0223955f02166/packages/%40ember/-internals/views/lib/system/utils.ts#L12-L17),
    // which is used by [LinkTo](https://github.com/emberjs/ember.js/blob/a6b2eb84b56ac23fca75645e9520966b358bb61a/packages/%40ember/-internals/glimmer/lib/components/link-to.ts#L675-L677). 
    if (
      (event.shiftKey || event.metaKey || event.altKey || event.ctrlKey)
      ||
      (event.which > 1)
    ) {
      return null;
    }

    if (element.getAttribute('target') === '_blank') {
      return null;
    }

    if (element.hasAttribute('download')) {
      return null;
    }

    if (element.hasAttribute('data-ember-action')) {
      return null;
    }

    let view = getOwner(this).lookup('-view-registry:main')[element.id];
    if (view && view instanceof LinkComponent) {
      return null;
    }

    let href = element.getAttribute('href');
    if (!href || href.indexOf(this.router.rootURL) !== 0) {
      return null;
    }

    if (!this.router.recognize(href)) {
      return null;
    }

    return href.replace(this.router.rootURL, '/');
  }

  @action
  handleAnchorClick(event) {
    let element = this.findAnchorElement(event);
    if (element === null) {
      return;
    }

    let url = this.recognizeAnchorURL(event, element);
    if (url === null) {
      return;
    }

    event.preventDefault();
    this.router.transitionTo(url);
  }

  setup() {
    super.setup(...arguments);
    let rootElement = document.querySelector(this.rootElement);
    rootElement.addEventListener('click', this.handleAnchorClick);
  }

  willDestroy() {
    let rootElement = document.querySelector(this.rootElement);
    rootElement.removeEventListener('click', this.handleAnchorClick);
    super.willDestroy(...arguments);
  }
}

import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | EventDispatcher', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function(assert) {
    this.passthrough = (event) => {
      assert.step(`${event.target.id}:${event.defaultPrevented}`);
      event.preventDefault();
    };

    let { rootElement } = this.owner.lookup('application:main');
    this.rootElement = document.querySelector(rootElement);
    this.rootElement.addEventListener('click', this.passthrough);
  });

  hooks.afterEach(function() {
    this.rootElement.removeEventListener('click', this.passthrough);
  })

  test('anchor works', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    await click('#anchor');
    assert.equal(currentURL(), '/child');

    assert.verifySteps(['anchor:true']);
  });

  test('LinkTo works', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    await click('#LinkTo');
    assert.equal(currentURL(), '/child');

    assert.verifySteps(['LinkTo:true']);
  });

  test('passthrough works', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    await click('#download');
    assert.equal(currentURL(), '/');

    await click('#unknown');
    assert.equal(currentURL(), '/');

    await click('#blank');
    assert.equal(currentURL(), '/');

    await click('#action');
    assert.equal(currentURL(), '/');

    await click('#absolute');
    assert.equal(currentURL(), '/');

    await click('#shiftKey', { shiftKey: true });
    assert.equal(currentURL(), '/');

    await click('#metaKey', { metaKey: true });
    assert.equal(currentURL(), '/');

    await click('#altKey', { altKey: true });
    assert.equal(currentURL(), '/');

    await click('#ctrlKey', { ctrlKey: true });
    assert.equal(currentURL(), '/');
  
    assert.verifySteps([
      'download:false',
      'unknown:false',
      'blank:false',
      'action:false',
      'absolute:false',
      'shiftKey:false',
      'metaKey:false',
      'altKey:false',
      'ctrlKey:false'
    ])
  });
});

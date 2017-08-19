import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import $ from 'jquery';

moduleForAcceptance('Acceptance | transition');

test('route params usage', async function(assert) {
  await visit('/');

  assert.equal(currentURL(), '/');
  assert.equal($('.active').length, 0, 'there are no active links');

  // --- Regular link --- //
  const $asia = $('[data-test-link-asia]');
  assert.notOk($asia.hasClass('active'), 'asia link is not active yet');

  await click($asia);

  assert.ok($asia.hasClass('active'), 'asia link is active');
  assert.equal($('.active').length, 1, 'there is only one active link');
  assert.equal(currentURL(), '/asia');
  assert.ok($('h2').text().includes('Asia'), 'Asia is in title');

  // --- Dynamic Segment --- //
  const $helsinki = $('[data-test-link-helsinki]');
  assert.notOk($helsinki.hasClass('active'), 'helsinki link is not active yet');

  await click($helsinki);

  assert.ok($helsinki.hasClass('active'), 'heslinki link is active');
  assert.equal(currentURL(), '/europe/Helsinki');
  assert.equal($('.active').length, 2, 'there are two active links');
  // ---> if as-active should check for queryParam
  // assert.equal($('.active').length, 1, 'there are two active links');
  assert.notOk($('[query-param-welcome]').length, 'Query Param welcome is not rendered');
  assert.ok($('h2').text().includes('Europe'), 'Europe is in title');
  assert.ok($('h2').text().includes('Helsinki'), 'Helsinki is in title');

  // --- Dynamic Segment + Active Query Param --- //
  const $helsinkiFirstTime = $('[data-test-link-helsinki-first-time]');

  await click($helsinkiFirstTime);

  assert.ok($helsinkiFirstTime.hasClass('active'), 'heslinki(f) link is active');
  assert.equal(currentURL(), '/europe/Helsinki?firstTime=true');
  assert.equal($('.active').length, 2, 'there are two active links');
  // ---> if as-active should check for queryParam
  // assert.equal($('.active').length, 1, 'there are two active links');
  assert.ok($('[query-param-welcome]').length, 'Query Param welcome is rendered');
  assert.ok($('h2').text().includes('Helsinki'), 'Helsinki is in title');

  // --- Dynamic Segment + No Query Param (Again) --- //

  await click($helsinki);

  assert.ok($helsinki.hasClass('active'), 'heslinki link is active');
  assert.equal(currentURL(), '/europe/Helsinki');
  assert.equal($('.active').length, 2, 'there are two active links');
  // ---> if as-active should check for queryParam
  // assert.equal($('.active').length, 1, 'there are two active links');
  assert.notOk($('[query-param-welcome]').length, 'Query Param welcome is not rendered (again)');

  // --- Different Dynamic Segment + QP --- //

  const $rome = $('[data-test-link-rome-first-time]');

  await click($rome);

  assert.ok($rome.hasClass('active'), 'heslinki link is active');
  assert.equal(currentURL(), '/europe/Rome?firstTime=true');
  assert.equal($('.active').length, 1, 'there is just one active link');
  // ---> if as-active should check for queryParam
  // assert.equal($('.active').length, 1, 'there are two active links');
  assert.ok($('[query-param-welcome]').length, 'Query Param welcome is rendered');

  // --- Parent route --- //

  const $america = $('[data-test-link-america]');

  await click($america);

  assert.ok($america.hasClass('active'), 'america link is active');
  assert.equal(currentURL(), '/america');
  assert.equal($('.active').length, 1, 'there is just one active link');
  assert.ok($('h2').text().includes('America'), 'America is in title');

  // --- Child route --- //

  const $southAmerica = $('[data-test-link-south-america]');

  await click($southAmerica);

  assert.ok($southAmerica.hasClass('active'), 'south america link is active');
  assert.ok($america.hasClass('active'), 'america link is active (still)');
  assert.equal(currentURL(), '/america/south');
  assert.ok($('h2').text().includes('America'), 'America is in title');
});

test('explicit usage (passing params to is-active and transition)', async function(assert) {
  await visit('/');

  assert.equal($('.active').length, 0, 'there are no active links');

  const $parisExplicit = $('[data-test-link-paris-explicit]');

  await click($parisExplicit);

  assert.ok($parisExplicit.hasClass('active'), 'parisExplicit link is active');
  assert.equal(currentURL(), '/europe/Paris?firstTime=true');
  assert.ok($('h2').text().includes('Paris'), 'Paris is in title');
  // explicit usage allows to check for queryParams correctly
  assert.equal($('.active').length, 1, 'there is just one active link');
});

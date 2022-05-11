export default function trackActiveRoute(router) {
  // ensure we recompute anytime `router.currentURL` changes
  router.currentURL;

  // ensure we recompute whenever the `router.currentRouteName` changes
  // this is slightly overlapping with router.currentURL but there are
  // cases where route.currentURL doesn't change but the
  // router.currentRouteName has (e.g. loading and error states)
  router.currentRouteName;
}

export default allParams => {
  let routeParams = allParams.concat();
  const last = allParams.length - 1;
  const maybeQP = allParams[last];

  if(maybeQP && maybeQP.values) {
    routeParams[last] = {
      queryParams: maybeQP.values
    }
  }
  
  return routeParams;
};
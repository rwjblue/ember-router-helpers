export default function(params) {
  let possibleQueryParams = params[params.length - 1];

  if (possibleQueryParams && possibleQueryParams.isQueryParams) {

    // ensure to handle potentially frozen arrays
    params = params.slice();

    params[params.length - 1] = {
      queryParams: possibleQueryParams.values
    }
  }

  return params;
}

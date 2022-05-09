export function defer() {
  let deferred = { resolve: undefined, reject: undefined };

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}


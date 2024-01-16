function myRace(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve).catch(reject);
      });
    });
  }
  
  function myAny(promises) {
    return new Promise((resolve, reject) => {
      let fulfilled = false;
      promises.forEach(promise => {
        promise.then(result => {
          if (!fulfilled) {
            fulfilled = true;
            resolve(result);
          }
        }).catch(() => {
          if (--count == 0) {
            reject('all promises rejected');
          }
        });
      });
    });
  }
  
  function myAll(promises) {
    return new Promise((resolve, reject) => {
      let results = [];
      let count = promises.length;
      promises.forEach((promise, index) => {
        promise.then(result => {
          results[index] = result;
          if (--count == 0) {
            resolve(results);
          }
        }).catch(reject);
      });
    });
  }
  
  function myAllSettled(promises) {
    return new Promise((resolve) => {
      let results = [];
      let count = promises.length;
      promises.forEach((promise, index) => {
        promise.then(result => {
          results[index] = { status: 'fulfilled', value: result };
          if (--count == 0) {
            resolve(results);
          }
        }).catch(error => {
          results[index] = { status: 'rejected', error: error };
          if (--count == 0) {
            resolve(results);
          }
        });
      });
    });
  }
  module.exports = {
    myRace,
    myAny,
    myAll,
    myAllSettled
  };
  
  
  
  
    
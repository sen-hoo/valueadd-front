const getRequestPromise = (params) => {
  const defaultParams = {
    type: 'POST',
    dataType: 'json',
    cache: false,
    async: true
  };
  if (!params.url) {
    throw new Error("url is empty");
  }
  const config = {
    ...defaultParams,
    ...params
  };
  return new Promise((resolve, reject) => {
    console.log(config);
    $.ajax({
      ...config,
      success: function (json) {
        if (json.code == 0) {
          var result = json.data;
          resolve(result);
        } else if (json.code == 10002) {
          reject(10002);
        } else {
          reject(json.message);
        }

      },
      error: function (error) {
        reject(error);
      }
    });
  });
};

export default getRequestPromise;

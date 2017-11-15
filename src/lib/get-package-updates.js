import request from 'request';

export const shouldUpdate = (packageMeta) => {
  let shouldUpdate = false;

  request(
    'https://registry.npmjs.org/' + packageMeta.name,
    (err, response, body) => {
      if (err) {
        throw new Error(err);
      }

      json = JSON.parse(body);

      if (json.value['dist-tags'].latest !== packageMeta.data.version) {
        shouldUpdate = true;
      }
    });

    return shouldUpdate
};

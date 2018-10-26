const FixerIO = require('fixer-io-utility');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.sourceNodes = async (
  { boundActionCreators: { createNode }, createNodeId, createContentDigest },
  { plugins, ...options }
) => {
  const {apiKey, endpoint, query} = options;
  const fixerio = new FixerIO(apiKey);
  const data =
    options.query != null
      ? await fixerio.reqQuery(endpoint, query)
      : await fixerio.reqQuery(endpoint);
  const querySuffix = capitalizeFirstLetter(endpoint);
  console.log(data);
  createNode({
    ...data,
    id: createNodeId(`fixer-io-${data.timestamp}`),
    parent: null,
    children: [],
    internal: {
      type: `FixerIOData${querySuffix}`,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data),
    },
  });
};

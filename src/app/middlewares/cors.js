module.exports = (request, response, next) => {
  if (response) {
    response.setHeader('Access-Control-Allow-Origin', `${process.env.URL_ROTAAEREA}`);
    response.setHeader('Access-Control-Allow-Origin', `${process.env.URL_CMS}`);
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }
  next();
};

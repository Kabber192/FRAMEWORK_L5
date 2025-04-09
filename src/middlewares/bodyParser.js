const parseBody = (req, callback) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        if (body) {
          req.body = JSON.parse(body);
        } else {
          req.body = {};
        }
        callback(null);
      } catch (err) {
        callback(err);
      }
    });
  };
  
  module.exports = { parseBody };
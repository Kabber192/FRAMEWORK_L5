const errorHandler = (err, res) => {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  };
  
  module.exports = { errorHandler };
const helmet = require('helmet');
const server = require('./api/server');

server.use(helmet);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

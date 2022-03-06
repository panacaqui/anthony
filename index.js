const port = 8082;
const server = require("./src/server");

server.listen(port, () => { console.log(`Server sucefully started at ${port}`); });

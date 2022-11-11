const app = require("./app");

const port = 5555;
// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));
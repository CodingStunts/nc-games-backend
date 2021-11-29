const app = require("./app");
const port = 9090;
app.listen(port, () => {
  console.log(`Currently listening on port ${port}.`);
});

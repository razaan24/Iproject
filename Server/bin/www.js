const port = 3001;
const app = require("../app");

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

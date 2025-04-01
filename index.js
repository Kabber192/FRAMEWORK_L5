const Framework = require("./framework/Application.js");
const Router = require("./framework/Router.js");

const server = new Framework();
const port = 3000;

server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

server.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Custom Framework');
  next();
});

server.listen(port, () => console.log(`Server started on port ${port}`));

const userRouter = new Router();

userRouter.get("/users", (req, res) => {
  res.end(JSON.stringify({ id: 1, name: "ROMAN", age: 19 }));
});

server.addRouter(userRouter);

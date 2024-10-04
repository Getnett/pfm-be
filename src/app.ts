import express from "express";

export default () => {
  const app = express();
  app.use(express.json());

  // app.use(usersRouter);

  return app;
};

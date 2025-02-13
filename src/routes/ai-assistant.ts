import express, { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middleware/async-error-handler";
import AssistantBot from "../integration/bot/assistant";
import { marked } from "marked";

const router = express.Router();
router.post(
  "/api/assistant",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { message } = req.body;
      const resData = await AssistantBot.runAssistantBot(message);
      // const htmlOutput = marked(resData);
      res.status(200).send(JSON.stringify(resData));
    }
  )
);

export default router;

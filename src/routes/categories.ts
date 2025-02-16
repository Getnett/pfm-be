import express, { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../middleware/async-error-handler";
import CategoriesRepo from "../repos/categories";

const router = express.Router();

router.get(
  "/api/categories",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const resData = await CategoriesRepo.getAllCategories();
      res.status(200).send(resData);
    }
  )
);

router.post(
  "/api/categories",
  asyncErrorHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { categoryName } = req.body;
      const resData = await CategoriesRepo.addCategory(categoryName);
      res.status(200).send(resData);
    }
  )
);

export default router;

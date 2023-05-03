import express, { NextFunction, Request, Response } from "express";
import logic from "../logic/userLogic";
import User from "../model/user";

const router = express.Router();

// GET
// All Vacations
router.get(
  "/api/users",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await logic.getAllUsers();
      response.json(users);
    } catch (err: any) {
      next(err);
    }
  }
);

// One user
router.get(
  "/api/user/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const user = await logic.getOneUser(userId);
      response.json(user);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST
router.post(
  "/api/addUser",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let user = new User(request.body);
      const newUser = await logic.addUser(user);
      response.status(201).json(newUser);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;

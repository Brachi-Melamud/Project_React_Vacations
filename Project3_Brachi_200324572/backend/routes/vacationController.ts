import express, { NextFunction, Request, Response } from "express";
import logic from "../logic/vacationLogic";
import Vacation from "../model/vacation";

const router = express.Router();

// GET
// All Vacations
router.get(
  "/api/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await logic.getAllVacations();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// One Vacation
router.get(
  "/api/vacation/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = +request.params.vacationId;
      const vacation = await logic.getOneVacation(vacationId);
      response.json(vacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// get user vacations
router.get(
  "/api/myVacations/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = +request.params.userId;
      const vacations = await logic.getUserVacations(vacationId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// get followers
router.get(
  "/api/vacationFollowers/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = +request.params.vacationId;
      const vacations = await logic.getFollowers(vacationId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// get pagination vacations
router.get(
  "/api/vacations/:pageNumber",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const pageNumber = +request.params.pageNumber;
      const vacations = await logic.getAllVacationsPagination(pageNumber);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST
router.post(
  "/api/addVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      let vacation = new Vacation(request.body);
      const newVacation = await logic.addVacation(vacation);
      response.status(201).json(newVacation);
    } catch (error: any) {
      next(error);
    }
  }
);

// DELETE
router.delete(
  "/api/delete/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = +request.params.vacationId;
      await logic.deleteVacation(vacationId);
      response.status(202).json("delete");
    } catch (error: any) {
      next(error);
    }
  }
);

// unFollow
router.delete(
  "/api/unFollow/:userId/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      await logic.unFollow(userId, vacationId);
      response.status(202).json("unFollow");
    } catch (error: any) {
      next(error);
    }
  }
);

// PUT
router.post(
  "/api/update/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacation = request.body;
      const vacationId = +request.params.vacationId;
      await logic.updateVacation(vacation, vacationId);
      const vacations = await logic.getAllVacations();
      response.status(202).json(vacations);
    } catch (error: any) {
      next(error);
    }
  }
);

// follow
router.post(
  "/api/follow/:userId/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacationId = +request.params.vacationId;
      const follow = await logic.follow(userId, vacationId);
      response.status(202).json(follow);
    } catch (error: any) {
      next(error);
    }
  }
);

// unFollow
router.post(
  "/api/unFollow/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacation = request.body;
      const vacationId = +request.params.vacationId;
      await logic.unFollow(vacation, vacationId);
      const vacations = await logic.getAllVacations();
      response.status(202).json(vacations);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
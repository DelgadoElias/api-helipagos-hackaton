import { Router } from "express";
import ExamController from "../controllers/exam.controller";

const routes = Router();

routes.post("/create", ExamController.setNewExamSolved);

export default routes;

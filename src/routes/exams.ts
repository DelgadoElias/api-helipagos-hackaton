import { Router } from "express";
import ExamController from "../controllers/exam.controller";

const routes = Router();

routes.post("/create", ExamController.setNewExamSolved);
routes.get("/list", ExamController.getExams);

export default routes;

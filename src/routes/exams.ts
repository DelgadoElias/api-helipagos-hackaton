import { Router } from "express";
import ExamController from "../controllers/exam.controller";

const routes = Router();

routes.post("/create", ExamController.setNewExam);

export default routes;

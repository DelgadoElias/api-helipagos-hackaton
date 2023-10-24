import { Request } from "express";
import ResponseHandler from "../lib/responsehandler";
import { ExamModel } from "../models/exams";

class ExamController {
  static async setNewExam(req: Request, res: any) {
    const githubName = req.body.github;
    const personId = req.body.personId;
    const personName = req.body.name ?? "not-provided";

    if (!githubName) {
      res.status(400).json(ResponseHandler.BadRequest("githubName"));
    }
    if (!personId) {
      res.status(400).json(ResponseHandler.BadRequest("personName"));
    }

    const newExamSetted = await ExamModel.create({
      githubName,
      personId,
      name: personName,
    });

    res.status(201).json(ResponseHandler.Accepted(newExamSetted));
  }
}

export default ExamController;

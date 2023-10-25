import { Request } from "express";
import ResponseHandler from "../lib/responsehandler";
import { ExamModel } from "../models/exams";
import UtilTools from "../lib/utils";
import { PersonModel } from "../models/person";

class ExamController {
  static async setNewExamSolved(req: Request, res: any) {
    const isMissingProperties = UtilTools.hasMissingProperties(req.body, [
      "githubName",
      "personId",
      "repoName",
    ]);

    if (isMissingProperties.value === true) {
      res
        .status(400)
        .json(ResponseHandler.BadRequest(isMissingProperties.message));
      return;
    }

    const { githubName, personId, repoName } = req.body;

    try {
      const personWhoFinish = await PersonModel.findById(personId);

      const newExamSetted = await ExamModel.create({
        githubName,
        personId,
        name: personWhoFinish?.name,
        repoName,
      });

      res.status(201).json(ResponseHandler.Accepted(newExamSetted));
    } catch (error) {
      res.status(500).json(ResponseHandler.InternalError);
    }
  }
}

export default ExamController;

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

  static async getExams(req: Request, res: any) {
    try {
      const filter: any = {};

      if (req.query.text) {
        filter.githubName = req.query.text;
      }

      // Realiza la consulta en la base de datos utilizando el modelo de Mongoose
      const exams = await ExamModel.find(filter);

      // Devuelve el resultado como JSON
      res.json({
        content: exams,
        status: 200,
        length: exams.length,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Hubo un error al obtener la lista de personas" });
    }
  }
}

export default ExamController;

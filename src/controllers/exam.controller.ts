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

  static async reactiveHowManyFinish(req: Request, res: any) {
    // Configura el middleware para habilitar Server-Sent Events (SSE) solo en esta ruta
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let intervalNumber = 0;

    const allSuccessfully = (await PersonModel.find({ isSuccessfully: true }))
      .length;

    const sendEvent = (data: number) => {
      res.write(JSON.stringify(allSuccessfully));
    };

    const interval = setInterval(() => {
      sendEvent(intervalNumber);
      intervalNumber++;
    }, 1000);

    res.on("close", () => {
      clearInterval(interval);
    });
  }
}

export default ExamController;

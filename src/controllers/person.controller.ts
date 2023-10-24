import { Request } from "express";
import { PersonModel } from "../models/person";
import Person from "../entities/person.entity";
import ResponseHandler from "../lib/responsehandler";

class PersonController {
  static async createUser(req: Request, res: any) {
    const name = req.body.name;
    const email = req.body.email ?? "mockemail@email.com";
    const stack = req.query.stack?.toString() ?? "flutter";

    const newPerson = new Person(name, email, stack);

    PersonModel.create(newPerson);

    res.status(201).json(ResponseHandler.ResourceCreated);
  }

  static async setPresent(req: Request, res: any) {
    const id = req.body.id;

    if (!id) {
      res.status(400).json(ResponseHandler.BadRequest("id"));
    }
    try {

      const updatedPerson = await PersonModel.findByIdAndUpdate(id, {
        isPresent: true
      });

      res
        .status(202)
        .json(ResponseHandler.ResourceUpdated(updatedPerson));
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async setConfirmed(req: Request, res: any) {
    const id = req.body.id;
    if (!id) {
      res.status(400).json(ResponseHandler.BadRequest("id"));
    }

    const updatedPerson = await PersonModel.findByIdAndUpdate(id, {
      isConfirmed: true,
    });


    res
    .status(202)
    .json(ResponseHandler.ResourceUpdated(updatedPerson));
  }

  static async setSuccessfully(req: Request, res: any) {
    const id = req.body.id;
    if (!id) {
      res.status(400).json(ResponseHandler.BadRequest("id"));
    }

    const updatedPerson = await PersonModel.findByIdAndUpdate(id, {
      isSuccessfully: true,
    });

    res
    .status(202)
    .json(ResponseHandler.ResourceUpdated(updatedPerson));
  }

  static async getPersons(req: Request, res: any) {
    try {
      const filter: any = {};

      // Verifica si se proporcionan parámetros de búsqueda en la consulta
      if (req.query.name) {
        filter.name = req.query.name;
      }
      if (req.query.email) {
        filter.email = req.query.email;
      }
      if (req.query.stack) {
        filter.stack = req.query.stack;
      }
      if (req.query.isConfirmed) {
        filter.isConfirmed = req.query.isConfirmed;
      }
      if (req.query.isPresent) {
        filter.isConfirmed = req.query.isPresent;
      }
      if (req.query.isSuccessfully) {
        filter.isConfirmed = req.query.isSuccessfully;
      }

      // Realiza la consulta en la base de datos utilizando el modelo de Mongoose
      const persons = await PersonModel.find(filter);

      // Devuelve el resultado como JSON
      res.json({
        content: persons,
        status: 200,
        length: persons.length
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Hubo un error al obtener la lista de personas" });
    }
  }

  static async getPersonDetail(req: Request, res: any) {
    const id = req.params.person;

    if (!id) {
      res.status(400).json(ResponseHandler.BadRequest("id"));
    }

    const person = await PersonModel.findById(id);

    res.status(200).json(ResponseHandler.Accepted(person));
  }
}

export default PersonController;

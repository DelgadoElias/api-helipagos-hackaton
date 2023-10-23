import { Request } from "express";
import { PersonModel } from "../models/person";
import Person from "../entities/person.entity";
import { getMaxListeners } from "events";

class PersonController {
    static async createUser(req: Request, res: any){
        const name = req.body.name;
        const email = req.body.email ?? 'mockemail@email.com';
        const stack = req.query.stack?.toString() ?? 'flutter';

        const newPerson = new Person(name, email, stack)

        PersonModel.create(newPerson);

        res.status(201).json(ResponseHandler.ResourceCreated);
    }

    static async setPresent(req: Request, res: any){
        const id = req.body.id;

        if(!id){
            res.status(400).json(ResponseHandler.BadRequest('id'));
        }
        const person = await PersonModel.findById(id);

        const updatedPerson = await PersonModel.findByIdAndUpdate(id, { ...person, isPresent: true});

        return updatedPerson;
    }

    static async setConfirmed(req: Request, res: any){
        const id = req.body.id;
        if(!id){
            res.status(400).json(ResponseHandler.BadRequest('id'));
        }
        const person = await PersonModel.findById(id);

        const updatedPerson = await PersonModel.findByIdAndUpdate(id, { ...person, isConfirmed: true});

        return updatedPerson;
    }

    static async setSuccessfully(req: Request, res: any){
        const id = req.body.id;
        if(!id){
            res.status(400).json(ResponseHandler.BadRequest('id'));
        }
        const person = await PersonModel.findById(id);

        const updatedPerson = await PersonModel.findByIdAndUpdate(id, { ...person, isSuccessfully: true});

        return updatedPerson;
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
          if(req.query.isConfirmed) {
            filter.isConfirmed = req.query.isConfirmed;
          }
          if(req.query.isPresent) {
            filter.isConfirmed = req.query.isPresent;
          }
          if(req.query.isSuccessfully) {
            filter.isConfirmed = req.query.isSuccessfully;
          }
    
          // Realiza la consulta en la base de datos utilizando el modelo de Mongoose
          const persons = await PersonModel.find(filter);
    
          // Devuelve el resultado como JSON
          res.json({
            content: persons,
            status: 200
          });
        } catch (error) {
          res.status(500).json({ error: "Hubo un error al obtener la lista de personas" });
        }
      }
}

export default PersonController;
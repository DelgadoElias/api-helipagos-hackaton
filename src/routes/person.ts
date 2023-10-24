import { Router } from "express";
import PersonController from "../controllers/person.controller";

const routes = Router();

routes.post("/present", PersonController.setPresent);
routes.post("/confirmed", PersonController.setConfirmed);
routes.post("/successfull", PersonController.setSuccessfully);
routes.post("/create", PersonController.createUser);
routes.get("/list", PersonController.getPersons);
routes.get("/:person", PersonController.getPersonDetail);
routes.post("/reset", PersonController.resetProperties);


export default routes;

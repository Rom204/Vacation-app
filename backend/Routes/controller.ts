// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import logic from '../Logic/logic';
import {Urls} from '../Utils/urls';

// generic router 
const router = express.Router();
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("controller working");
})

// gets information from DB
router.get(Urls.getAllSomethingURL, async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json( await logic.getFunction())
})

// gets single piece of information from DB
router.get(Urls.getSingleSomethingURL, async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(200).json( await logic.getSingleFunction(id))
})


// sends information to DB
router.post(Urls.addSomethingURL, async (request: Request, response: Response, next: NextFunction) => {
  const someData = request.body;
  response.status(201).json( await logic.postFunction(someData))
})


// update information in DB
router.put(Urls.updateSomethingURL, async (request: Request, response: Response, next: NextFunction) => {
  const someData = request.body;
  response.status(201).json( await logic.updateFunction(someData));
})

// delete information from DB
router.delete(Urls.deleteSomethingURL, async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(204).json( await logic.deleteFunction(someData))
})
export default router;
// All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from 'express';
import vacation_logic from '../Controllers/vacation_controller';
import { Vacations } from '../Utils/urls';
import path from 'path';

// generic router 
const router = express.Router();
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("vacation controller is working");
})

// gets information from DB
router.get(Vacations.getAllVacationsURL, async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await vacation_logic.getAllVacations())
})

router.get("/single-followers/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(200).json(await vacation_logic.singleVacationFollowers(id))
})

// gets single piece of information from DB
router.get(Vacations.getSingleVacation, async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(200).json(await vacation_logic.getSingleVacation(id))
})

router.get("/image/:imageName", async (request: Request, response: Response, next: NextFunction) => {
  const imageName = request.params.imageName;
  const fullPath = path.join(__dirname, "..", "uploadPics", imageName)
  response.status(200).sendFile(fullPath);
})

// sends information to DB
router.post(Vacations.addVacation, async (request: Request, response: Response, next: NextFunction) => {
  console.log(request.body);
  const newVacation = request.body;
  newVacation.image = request.files.image;
  console.log(newVacation.image.name);
  response.status(201).json(await vacation_logic.addVacation(newVacation, next))
})

// update information in DB
router.put(Vacations.updateVacation, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const newVacation = request.body;
    const file: any = request.files?.image;
    if (file) {
      newVacation.image = request.files.image;
      const result = await vacation_logic.updateVacation(newVacation)
      response.status(201).json(result);

    } if (!file) {
      const result = await vacation_logic.updateVacation(newVacation)
      response.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
  }
})

// delete information from DB
router.delete(Vacations.deleteVacation, async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(204).json(await vacation_logic.deleteVacation(someData))
})
export default router;
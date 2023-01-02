// All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from 'express';
import user_logic from '../Controllers/user_controller';
import { Users } from '../Utils/urls';
import { getJWT } from '../MiddleWare/jwt';
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// generic router 
const router = express.Router();
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json("Users controller is working properly");
})

// gets information from DB
router.get(Users.getAllUsersURL, async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await user_logic.getAllUsers())
})

// gets single piece of information from DB
router.get(Users.getSingleUserUrl, async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(200).json(await user_logic.getSingleUser(id))
})


router.post(Users.addUserURL, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userData = request.body;
    response.status(201).json(await user_logic.addNewUser(userData));
  } catch (err) {
    console.log(err);
    if (err.errno === 1062) {
      console.log(err.errno, err.sqlMessage);
      response.status(409).json(err.sqlMessage);
    } else {
      response.status(500).json("sorry we fucked up")
    }
  }
})


router.post(Users.checkLogin, async (request: Request, response: Response, next: NextFunction) => {
  try {
    // console.log(request.body);
    const userData = request.body;
    const result = await user_logic.checkLogin(userData);
    if (result) {
      const token = await getJWT(result);
      response.set("authorization", `Bearer ${token}`)
      response.status(200).json(result)
    }
  } catch (err) {
    console.log(err);
    response.status(404).json("username or password incorrect")
  }
})

router.post("/checkToken", (request: Request, response: Response, next: NextFunction) => {
  // console.log(request.headers.authorization);
  try {
    const auth = request.headers.authorization
    const result = user_logic.checkToken(auth)
    console.log(result)
    // response.set("Authorization",`Bearer ${auth}`)
    response.status(200).json(result)
  } catch (err) {
    // console.log(err);
    response.status(404).json("username or password incorrect")
  }
})

// update information in DB
router.put(Users.updateUserURL, async (request: Request, response: Response, next: NextFunction) => {
  const someData = request.body;
  response.status(201).json(await user_logic.updateUser(someData));
})

// delete information from DB
router.delete(Users.deleteUserURL, async (request: Request, response: Response, next: NextFunction) => {
  const someData = +request.params.id;
  response.status(204).json(await user_logic.deleteUser(someData))
})

// __________________________________________________________________
// vacations and user table routes 
router.post("/allVacations/:vacationID/:user_id/:vacation_name", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationID = +request.params.vacationID;
    const user_id = +request.params.user_id;
    const vacationName = request.params.vacation_name;
    response.status(201).json(await user_logic.allVacationsUser(vacationID, user_id, vacationName));
  } catch (err) {
    response.status(409).json("something went wrong")
  }
})

router.delete("/allVacationsDelete/:vacationID/:user_id", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationID = +request.params.vacationID;
    const user_id = +request.params.user_id;
    response.status(201).json(await user_logic.allVacationsUserDelete(vacationID, user_id));
  } catch (err) {
    response.status(409).json("something went wrong")
  }
})

router.get("/vacationsID/:id", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = +request.params.id;
    console.log(id);
    response.status(200).json(await user_logic.vacationsID(id));
  } catch (err) {
    console.log(err);
    response.status(404).json("something went wrong")
  }
})
export default router;
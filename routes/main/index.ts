import { Router } from "express";
import battleController from "../../controllers/battleController";
import rankingController from "../../controllers/rankingController";
import battleMiddleware from "../../middlewares/battleMiddleware";

const main = Router();
main.post('/battle', battleMiddleware, battleController);
main.get('/ranking', rankingController);

export default main;
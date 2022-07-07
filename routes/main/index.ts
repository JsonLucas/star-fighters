import { Router } from "express";
import battleController from "../../controllers/battleController";
import battleMiddleware from "../../middlewares/battleMiddleware";

const main = Router();
main.post('/battle', battleMiddleware, battleController);
main.post('/ranking');

export default main;
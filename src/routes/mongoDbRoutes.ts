import express, { NextFunction, Request, Response } from "express";
import MongoDbConnection from "../MongoDbConnection";

const router = express.Router();

var mongoDb = MongoDbConnection.getInstance();

/**
 * @swagger
 * /api/v1/:userId/favorite/:favoriteUserId/:
 *   post:
 *     summary: List of all Dota heroes
 *     description: Gets an array list of all heroes in dota2.
 *     responses:
 *       200:
 *         description: if successful returns an array of all heroes in the game.
 */
router.post(
  "/:userId/favorite/:favoritedUserId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // post DB object
      mongoDb.connect();
    } catch (error) {
      console.error("Error fetching rankings:", error);
      next(error); // Pass error to Express's error handler
    }
  }
);

router.post(
  "/:userId/favorite/:matchId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    } catch (error) {
      console.error("Error fetching rankings:", error);
      next(error); // Pass error to Express's error handler
    }
  }
);

export default router;

import { Request, Response } from "express";
import passport from "passport";

// Steam authentication controller
export const steamAuth = (req: Request, res: Response) => {
  passport.authenticate("steam", { failureRedirect: "/" })(req, res);
};

// Steam return controller
export const steamReturn = (req: Request, res: Response) => {
  passport.authenticate("steam", { failureRedirect: "/" })(req, res, () => {
    res.send("You are logged in with Steam!");
  });
};

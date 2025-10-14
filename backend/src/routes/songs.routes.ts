import { Router } from "express";
import { body, param } from "express-validator";
import { createSong, deleteSong, getSong, listSongs, updateSong } from "../controllers/songs.controller";
import { validate } from "../middleware/validate";

const router = Router();

const songBodyValidators = [
  body("title").isString().trim().isLength({ min: 1, max: 200 }),
  body("artist").isString().trim().isLength({ min: 1, max: 200 }),
  body("album").isString().trim().isLength({ min: 1, max: 200 }),
  body("genre").isString().trim().isLength({ min: 1, max: 200 }),
];

router.get("/", listSongs);
router.get("/:id", [param("id").isMongoId(), validate], getSong);
router.post("/", songBodyValidators, validate, createSong);
router.put("/:id", [param("id").isMongoId(), ...songBodyValidators, validate], updateSong);
router.delete("/:id", [param("id").isMongoId(), validate], deleteSong);

export default router;

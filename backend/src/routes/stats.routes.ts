import { Router } from "express";
import { overviewStats, statsByAlbum, statsByArtist, statsByGenre } from "../controllers/stats.controller";

const router = Router();

router.get("/overview", overviewStats);
router.get("/by-genre", statsByGenre);
router.get("/by-artist", statsByArtist);
router.get("/by-album", statsByAlbum);

export default router;

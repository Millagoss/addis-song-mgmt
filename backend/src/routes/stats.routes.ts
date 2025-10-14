import { Router } from "express";
import { overviewStats, statsByAlbum, statsByArtist, statsByGenre, distinctGenres, distinctArtists, distinctAlbums } from "../controllers/stats.controller";

const router = Router();

router.get("/overview", overviewStats);
router.get("/by-genre", statsByGenre);
router.get("/by-artist", statsByArtist);
router.get("/by-album", statsByAlbum);

// Distinct lists for filter dropdowns
router.get("/distinct/genres", distinctGenres);
router.get("/distinct/artists", distinctArtists);
router.get("/distinct/albums", distinctAlbums);

export default router;

import { Request, Response } from "express";
import { Song } from "../models/Song";
import { parseLimit, parsePage } from "../utils/pagination";

export async function listSongs(req: Request, res: Response) {
  const page = parsePage(req.query.page as string);
  const limit = parseLimit(req.query.limit as string);
  const skip = (page - 1) * limit;

  const { genre, artist, album, q } = req.query as Record<string, string | undefined>;
  const sortByRaw = (req.query.sortBy as string) || "createdAt";
  const sortOrderRaw = (req.query.sortOrder as string) || "desc";

  const allowedSort = new Set(["title", "artist", "album", "genre", "createdAt", "updatedAt"]);
  const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : "createdAt";
  const sortOrder = sortOrderRaw === "asc" ? 1 : -1;

  const filter: any = {};
  if (genre) filter.genre = new RegExp(`^${escapeRegExp(genre)}$`, "i");
  if (artist) filter.artist = new RegExp(`^${escapeRegExp(artist)}$`, "i");
  if (album) filter.album = new RegExp(`^${escapeRegExp(album)}$`, "i");
  if (q) {
    const re = new RegExp(escapeRegExp(q), "i");
    filter.$or = [
      { title: re },
      { artist: re },
      { album: re },
      { genre: re }
    ];
  }

  const [data, total] = await Promise.all([
    Song.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit).lean(),
    Song.countDocuments(filter)
  ]);

  return res.json({ data, page, limit, total, totalPages: Math.ceil(total / limit) });
}

export async function getSong(req: Request, res: Response) {
  const song = await Song.findById(req.params.id).lean();
  if (!song) return res.status(404).json({ message: "Song not found" });
  return res.json(song);
}

export async function createSong(req: Request, res: Response) {
  const song = await Song.create(req.body);
  return res.status(201).json(song);
}

export async function updateSong(req: Request, res: Response) {
  const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
  if (!song) return res.status(404).json({ message: "Song not found" });
  return res.json(song);
}

export async function deleteSong(req: Request, res: Response) {
  const song = await Song.findByIdAndDelete(req.params.id).lean();
  if (!song) return res.status(404).json({ message: "Song not found" });
  return res.json({ message: "Deleted" });
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

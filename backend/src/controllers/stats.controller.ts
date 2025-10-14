import { Request, Response } from "express";
import { Song } from "../models/Song";

export async function overviewStats(_req: Request, res: Response) {
  const [songsCount, artists, albums, genres] = await Promise.all([
    Song.countDocuments({}),
    Song.distinct("artist"),
    Song.distinct("album"),
    Song.distinct("genre"),
  ]);
  return res.json({
    songsCount,
    artistsCount: artists.length,
    albumsCount: albums.length,
    genresCount: genres.length,
  });
}

export async function statsByGenre(_req: Request, res: Response) {
  const data = await Song.aggregate([
    { $group: { _id: { $toLower: "$genre" }, songsCount: { $sum: 1 } } },
    { $project: { _id: 0, genre: "$_id", songsCount: 1 } },
    { $sort: { songsCount: -1 } },
  ]);
  return res.json(data);
}

export async function statsByArtist(_req: Request, res: Response) {
  const data = await Song.aggregate([
    { $group: { _id: { $toLower: "$artist" }, songsCount: { $sum: 1 }, albums: { $addToSet: { $toLower: "$album" } } } },
    { $project: { _id: 0, artist: "$_id", songsCount: 1, albumsCount: { $size: "$albums" } } },
    { $sort: { songsCount: -1 } },
  ]);
  return res.json(data);
}

export async function statsByAlbum(_req: Request, res: Response) {
  const data = await Song.aggregate([
    { $group: { _id: { $toLower: "$album" }, songsCount: { $sum: 1 } } },
    { $project: { _id: 0, album: "$_id", songsCount: 1 } },
    { $sort: { songsCount: -1 } },
  ]);
  return res.json(data);
}

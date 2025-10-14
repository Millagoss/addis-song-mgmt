import { Schema, model, Document } from "mongoose";

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema = new Schema<ISong>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    artist: { type: String, required: true, trim: true, maxlength: 200 },
    album: { type: String, required: true, trim: true, maxlength: 200 },
    genre: { type: String, required: true, trim: true, maxlength: 200 },
  },
  { timestamps: true }
);

SongSchema.index({ title: 1 });
SongSchema.index({ artist: 1 });
SongSchema.index({ album: 1 });
SongSchema.index({ genre: 1 });

export const Song = model<ISong>("Song", SongSchema);

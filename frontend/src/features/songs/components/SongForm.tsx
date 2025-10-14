import { FormEvent, useState } from "react";
import { Box } from "../../../components/Box";
import { useAppDispatch } from "../../../app/hooks";
import { createSongRequested } from "../slice";

export function SongForm() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim() || !album.trim() || !genre.trim())
      return;
    dispatch(
      createSongRequested({
        title: title.trim(),
        artist: artist.trim(),
        album: album.trim(),
        genre: genre.trim(),
      })
    );
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
  };

  return (
    <form onSubmit={onSubmit}>
      <Box mb={2} fontWeight={600} color="muted">Add new song</Box>
      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          disabled={
            !title.trim() || !artist.trim() || !album.trim() || !genre.trim()
          }
        >
          Add
        </button>
      </Box>
      {(!title.trim() || !artist.trim() || !album.trim() || !genre.trim()) && (
        <Box color="muted" fontSize={12} mb={3}>
          Fill all fields to add a song.
        </Box>
      )}
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid #1f2937",
  background: "#0b1220",
  color: "#e5e7eb",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px 30px",
  borderRadius: 8,
  border: "1px solid #0ea5b5",
  background: "#06b6d4",
  color: "#0b1220",
  cursor: "pointer",
  opacity: 1,
  transition: "all 160ms ease",
};

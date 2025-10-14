import { ChangeEvent, useEffect, useState } from "react";
import { Box } from "../../components/Box";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setAlbum,
  setArtist,
  setGenre,
  setLimit,
  setQuery,
  setSort,
} from "./slice";
import { fetchSongsRequested } from "../songs/slice";
import type { RootState } from "../../app/store";

export function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s: RootState) => s.filters);
  const [qLocal, setQLocal] = useState(filters.q);

  useEffect(() => {
    setQLocal(filters.q);
  }, [filters.q]);

  // Debounce query to reduce API calls while typing
  useEffect(() => {
    const id = setTimeout(() => {
      if (qLocal !== filters.q) {
        dispatch(setQuery(qLocal));
      }
      dispatch(fetchSongsRequested());
    }, 300);
    return () => clearTimeout(id);
  }, [qLocal]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "q":
        setQLocal(value);
        return;
      case "genre":
        dispatch(setGenre(value));
        break;
      case "artist":
        dispatch(setArtist(value));
        break;
      case "album":
        dispatch(setAlbum(value));
        break;
      case "sortBy":
        dispatch(
          setSort({ sortBy: value as any, sortOrder: filters.sortOrder })
        );
        break;
      case "sortOrder":
        dispatch(setSort({ sortBy: filters.sortBy, sortOrder: value as any }));
        break;
      case "limit":
        dispatch(setLimit(parseInt(value, 10) || 10));
        break;
    }
    dispatch(fetchSongsRequested());
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      bg="surface"
      p={3}
      borderRadius={8}
      border="1px solid #1f2937"
      style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
    >
      <input
        name="q"
        placeholder="Search"
        value={qLocal}
        onChange={onChange}
        style={inputStyle}
      />
      <input
        name="genre"
        placeholder="Genre"
        value={filters.genre}
        onChange={onChange}
        style={inputStyle}
      />
      <input
        name="artist"
        placeholder="Artist"
        value={filters.artist}
        onChange={onChange}
        style={inputStyle}
      />
      <input
        name="album"
        placeholder="Album"
        value={filters.album}
        onChange={onChange}
        style={inputStyle}
      />

      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={onChange}
        style={inputStyle}
      >
        <option value="createdAt">Created</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="album">Album</option>
        <option value="genre">Genre</option>
      </select>

      <select
        name="sortOrder"
        value={filters.sortOrder}
        onChange={onChange}
        style={inputStyle}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>

      <select
        name="limit"
        value={filters.limit}
        onChange={onChange}
        style={inputStyle}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </Box>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #1f2937",
  background: "#111827",
  color: "#e5e7eb",
  minWidth: 100,
};

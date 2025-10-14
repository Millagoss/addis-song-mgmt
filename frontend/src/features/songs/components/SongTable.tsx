import { useMemo, useState } from "react";
import { Box } from "../../../components/Box";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteSongRequested,
  fetchSongsRequested,
  updateSongRequested,
} from "../slice";
import type { Song } from "../types";
import { setPage } from "../../filters/slice";
import type { RootState } from "../../../app/store";
import { width } from "styled-system";

export function SongTable() {
  const dispatch = useAppDispatch();
  const { items, loading, error, page, totalPages } = useAppSelector(
    (s: RootState) => s.songs
  );
  const [editId, setEditId] = useState<string>("");
  const [form, setForm] = useState<Partial<Song>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const startEdit = (song: Song) => {
    setEditId(song._id!);
    setForm({
      title: song.title,
      artist: song.artist,
      album: song.album,
      genre: song.genre,
    });
  };
  const cancelEdit = () => {
    setEditId("");
    setForm({});
  };
  const saveEdit = () => {
    if (!editId) return;
    dispatch(
      updateSongRequested({
        id: editId,
        update: {
          title: form.title?.trim() || "",
          artist: form.artist?.trim() || "",
          album: form.album?.trim() || "",
          genre: form.genre?.trim() || "",
        },
      })
    );
    cancelEdit();
  };

  const onDelete = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const table = useMemo(
    () => (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Artist</Th>
            <Th>Album</Th>
            <Th>Genre</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && !loading ? (
            <tr style={{ textAlign: "center" }}>
              <Td colSpan={5}>No data to display</Td>
            </tr>
          ) : (
            items.map((s: Song) => (
              <tr key={s._id}>
                <Td>
                  {editId === s._id ? (
                    <Input
                      value={form.title || ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                      }
                    />
                  ) : (
                    s.title
                  )}
                </Td>
                <Td>
                  {editId === s._id ? (
                    <Input
                      value={form.artist || ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, artist: e.target.value }))
                      }
                    />
                  ) : (
                    s.artist
                  )}
                </Td>
                <Td>
                  {editId === s._id ? (
                    <Input
                      value={form.album || ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, album: e.target.value }))
                      }
                    />
                  ) : (
                    s.album
                  )}
                </Td>
                <Td>
                  {editId === s._id ? (
                    <Input
                      value={form.genre || ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, genre: e.target.value }))
                      }
                    />
                  ) : (
                    s.genre
                  )}
                </Td>
                <Td>
                  {editId === s._id ? (
                    <>
                      <IconBtn title="Save" onClick={saveEdit}>
                        {IconCheck()}
                      </IconBtn>
                      <IconBtn
                        title="Cancel"
                        variant="muted"
                        onClick={cancelEdit}
                      >
                        {IconX()}
                      </IconBtn>
                    </>
                  ) : (
                    <>
                      <IconBtn title="Edit" onClick={() => startEdit(s)}>
                        {IconEdit()}
                      </IconBtn>
                      <IconBtn
                        title="Delete"
                        variant="danger"
                        onClick={() => onDelete(s._id!)}
                      >
                        {IconTrash()}
                      </IconBtn>
                    </>
                  )}
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    ),
    [items, editId, form, loading]
  );

  return (
    <Box>
      {loading && <Box my={3}>Loading...</Box>}
      {error && (
        <Box my={3} color="danger">
          {error}
        </Box>
      )}
      <Box
        bg="#0b1220"
        border="1px solid #1f2937"
        borderRadius={10}
        p={2}
        style={{ overflowX: "auto", boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}
      >
        {table}
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <SmallBtn
          disabled={page <= 1}
          onClick={() => {
            dispatch(setPage(page - 1));
            dispatch(fetchSongsRequested());
          }}
        >
          ‹ Previous
        </SmallBtn>
        <Box>
          Page {page} of {totalPages || 1}
        </Box>
        <SmallBtn
          disabled={totalPages === 0 || page >= totalPages}
          onClick={() => {
            dispatch(setPage(page + 1));
            dispatch(fetchSongsRequested());
          }}
        >
          Next ›
        </SmallBtn>
      </Box>
      <ConfirmDialog
        open={confirmOpen}
        variant="danger"
        title="Delete song?"
        message="This will permanently delete the selected song. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (deleteId) {
            dispatch(deleteSongRequested({ id: deleteId }));
          }
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </Box>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "12px 10px",
        borderBottom: "1px solid #1f2937",
        color: "#cbd5e1",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.6,
        background: "#0f172a",
      }}
    >
      {children}
    </th>
  );
}
function Td({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <td
      {...props}
      style={{
        padding: "12px 10px",
        borderBottom: "1px solid #1f2937",
        color: "#e5e7eb",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        padding: 8,
        borderRadius: 8,
        border: "1px solid #1f2937",
        background: "#0b1220",
        color: "#e5e7eb",
        ...(props.style || {}),
      }}
    />
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  variant = "primary",
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "muted";
  title?: string;
}) {
  const colors: Record<string, string> = {
    primary: "#1f2937",
    danger: "#3b1d1d",
    muted: "#1f2937",
  };
  const borders: Record<string, string> = {
    primary: "#374151",
    danger: "#7f1d1d",
    muted: "#374151",
  };
  const hoverBg: Record<string, string> = {
    primary: "#2a3546",
    danger: "#5b2525",
    muted: "#2a3546",
  };
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: 34,
        height: 34,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        border: `1px solid ${borders[variant]}`,
        background: colors[variant],
        color: "#e5e7eb",
        cursor: disabled ? "not-allowed" : "pointer",
        marginRight: 8,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = hoverBg[variant])
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = colors[variant])}
    >
      {children}
    </button>
  );
}

function IconEdit() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
        fill="#cbd5e1"
      />
      <path
        d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"
        fill="#cbd5e1"
      />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 7h12m-9 4v6m6-6v6M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0h12l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7z"
        stroke="#fca5a5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="#a7f3d0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L18 6M6 6l12 12"
        stroke="#fde68a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallBtn({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #374151",
        background: disabled ? "#111827" : "#0b1220",
        color: disabled ? "#9ca3af" : "#e5e7eb",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        transition: "all 160ms ease",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "#111827";
          e.currentTarget.style.borderColor = "#4b5563";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = disabled ? "#111827" : "#0b1220";
        e.currentTarget.style.borderColor = "#374151";
      }}
    >
      {children}
    </button>
  );
}

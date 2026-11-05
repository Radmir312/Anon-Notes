import { useState, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import SearchBar from "./components/SearchBar";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import VersionHistory from "./components/VersionHistory";

/*
1. СРЕДНЕЕ ВРЕМЯ ОТКЛИКА 0.5СЕК
    НЕ ОБНОВЛЯТЬ ТО ЧТО НЕ НУЖНО, ОПТИМИЗИРОВАТЬ ПРИЛОЖЕНИЕ
2. ЗАЩИТА ОТ XSS АТАКИ
3. МОДУЛЬНАЯ СТРУКТУРА
    ПЕРЕХОД ОТ СТРУКТУРНОЙ К МОДУЛЬНОЙ СТРУКТУРЕ
*/

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [historyNote, setHistoryNote] = useState(null);

  const handleSave = ({ id, theme, text }) => {
    const now = new Date().toISOString();

    if (id) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                theme,
                text,
                updatedAt: now,
                history: [
                  ...n.history,
                  { theme: n.theme, text: n.text, savedAt: n.updatedAt },
                ],
              }
            : n
        )
      );
    } else {
      setNotes((prev) => [
        {
          id: crypto.randomUUID(),
          theme,
          text,
          createdAt: now,
          updatedAt: now,
          history: [],
        },
        ...prev,
      ]);
    }
    setEditingNote(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Удалить заметку?")) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.theme.toLowerCase().includes(q) || n.text.toLowerCase().includes(q)
    );
  }, [notes, search]);

  return (
    <div className="app">
      <h1>Анонимные заметки</h1>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <button
          className="btn btn-primary"
          onClick={() => setEditingNote({ id: null, theme: "", text: "" })}
        >
          + Новая заметка
        </button>
      </div>

      {editingNote && (
        <NoteForm
          initial={editingNote}
          onSave={handleSave}
          onCancel={() => setEditingNote(null)}
        />
      )}

      <NoteList
        notes={filteredNotes}
        onEdit={setEditingNote}
        onDelete={handleDelete}
        onShowHistory={setHistoryNote}
      />

      {historyNote && (
        <VersionHistory
          note={historyNote}
          onClose={() => setHistoryNote(null)}
        />
      )}
    </div>
  );
}

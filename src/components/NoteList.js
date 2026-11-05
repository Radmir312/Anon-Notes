import NoteItem from "./NoteItem";

export default function NoteList({ notes, onEdit, onDelete, onShowHistory }) {
  if (notes.length === 0) {
    return <p className="empty">Заметки не найдены</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onShowHistory={onShowHistory}
        />
      ))}
    </div>
  );
}

export default function NoteItem({ note, onEdit, onDelete, onShowHistory }) {
  const fmt = (iso) =>
    new Date(iso).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <article className="note-item">
      <h3>{note.theme}</h3>

      <div className="note-dates">
        <span>Создано: {fmt(note.createdAt)}</span>
        {note.updatedAt !== note.createdAt && (
          <span>Изменено: {fmt(note.updatedAt)}</span>
        )}
      </div>

      <p className="note-text">{note.text}</p>

      <div className="note-actions">
        <button className="btn" onClick={() => onEdit(note)}>
          Редактировать
        </button>
        <button className="btn" onClick={() => onShowHistory(note)}>
          История ({note.history.length})
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(note.id)}>
          Удалить
        </button>
      </div>
    </article>
  );
}

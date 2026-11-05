export default function VersionHistory({ note, onClose }) {
  const fmt = (iso) => new Date(iso).toLocaleString("ru-RU");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>История: {note.theme}</h3>

        {note.history.length === 0 ? (
          <p className="empty">Предыдущих версий нет</p>
        ) : (
          <ul className="history-list">
            {[...note.history].reverse().map((v, i) => (
              <li key={i}>
                <div className="history-date">{fmt(v.savedAt)}</div>
                <strong>{v.theme}</strong>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        )}

        <button className="btn btn-primary" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

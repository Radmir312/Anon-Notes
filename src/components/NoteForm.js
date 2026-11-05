import { useState } from "react";

export default function NoteForm({ initial, onSave, onCancel }) {
  const [theme, setTheme] = useState(initial.theme || "");
  const [text, setText] = useState(initial.text || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theme.trim() || !text.trim()) {
      setError("Заполните тему и текст");
      return;
    }
    onSave({ id: initial.id, theme: theme.trim(), text: text.trim() });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h3>{initial.id ? "Редактировать заметку" : "Новая заметка"}</h3>

      <div>
        <label>Тема</label>
        <input
          type="text"
          placeholder="О чём заметка?"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
      </div>

      <div>
        <label>Текст</label>
        <textarea
          rows={4}
          placeholder="Введите текст..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
}

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Поиск по заметкам..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

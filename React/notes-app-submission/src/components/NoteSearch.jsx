import React from "react";

function NoteSearch({ searchQuery, onSearchChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Cari catatan..."
        value={searchQuery} // Controlled component menggunakan props
        onChange={(e) => onSearchChange(e.target.value)} // Meneruskan perubahan ke parent
      />
    </div>
  );
}

export default NoteSearch;

import React from "react";

function ArchiveButton() {
  return (
    <button className="note-item__archive-button" onClick={() => onDelete(id)}>
      Archive
    </button>
  );
}

export default ArchiveButton;

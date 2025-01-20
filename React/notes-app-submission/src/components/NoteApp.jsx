import React from "react";
import { getInitialData } from "../utils";
import NoteList from "./NoteList";
import NoteInput from "./NoteInput";
import NoteSearch from "./NoteSearch";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchNote: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          },
        ],
      };
    });
  }

  onSearchChange(searchQuery) {
    this.setState({ searchNote: searchQuery });
  }

  render() {
    // Filter catatan berdasarkan pencarian
    const filteredNotes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.searchNote.toLowerCase())
    );

    return (
      <>
        <div className="note-app__header">
          <h1>Notes</h1>
          <NoteSearch
            searchQuery={this.state.searchNote}
            onSearchChange={this.onSearchChange}
          />
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          {filteredNotes.length > 0 ? (
            <NoteList notes={filteredNotes} onDelete={this.onDeleteHandler} />
          ) : (
            <p className="notes-list__empty-message">Tidak ada catatan</p>
          )}
          <h2>Arsip</h2>
          <div className="notes-list">
            <p className="notes-list__empty-message">empty...</p>
          </div>
        </div>
      </>
    );
  }
}

export default NoteApp;

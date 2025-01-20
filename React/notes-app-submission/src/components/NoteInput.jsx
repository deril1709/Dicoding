import React, { Component } from "react";

export default class NoteInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      titleLimit: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const maxLength = this.state.titleLimit;
    const input = event.target.value;

    if (input.length <= maxLength) {
      this.setState(() => {
        return {
          title: input,
        };
      });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);

    this.setState(() => ({
      title: "",
      body: "",
    }));
  }

  render() {
    const remainingCharacters = this.state.titleLimit - this.state.title.length;

    return (
      <form className="note-input" onSubmit={this.onSubmitEventHandler}>
        <h2>Buat Catatan</h2>
        <p className="note-input__title__char-limit">
          Sisa karakter: {remainingCharacters}
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder="Tuliskan judul ..."
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
          required
        />
        <textarea
          className="note-input__body"
          type="text"
          placeholder="Tuliskan catatanmu di sini ..."
          value={this.state.body}
          onChange={this.onBodyChangeEventHandler}
          required
        />
        <button type="submit">Buat Catatan</button>
      </form>
    );
  }
}

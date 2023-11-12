import React from "react";
import NoteList from "./NoteList";
import { getInitialData } from "../utils";
import NoteInput from "./NoteInput";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      query: ''
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onSeacrEventHandler = this.onSeacrEventHandler.bind(this);
  }

  onDeleteHandler(id){
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({ notes })
  }

  onArchiveHandler(id){
    const updatedNotes = this.state.notes;
    const noteIndex = updatedNotes.findIndex(note => note.id == id);

    if(updatedNotes[noteIndex].archived == true){
      updatedNotes[noteIndex].archived = false;
    }else{
      updatedNotes[noteIndex].archived = true;
    }

    this.setState({
      notes: updatedNotes
    })
  }

  activeNotes(){
    const activeNotes = this.state.notes.filter(note => note.archived == false);
    const searchActiveNotes = activeNotes.filter(note => note.title.toLowerCase().includes(this.state.query.toLowerCase()));
    return searchActiveNotes;
  }

  archiveNotes(){
    const archiveNotes = this.state.notes.filter(note => note.archived == true);
    const searcArchiveNotes = archiveNotes.filter(note => note.title.toLowerCase().includes(this.state.query.toLowerCase()))
    return searcArchiveNotes;
  }

  onSeacrEventHandler(event){
    this.setState(() => {
      return {
        query: event.target.value
      };
    });
  }

  onAddNoteHandler({ title, body }){
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString()
          }
        ]
      }
    })
  }

  render() {
    console.log(this.state.notes);
    return (
      <div className="note-app">
        <div className="note-app__header">
          <h1>Notes</h1>
          <input type="search" placeholder="Cari catatan" value={ this.state.query } onChange={this.onSeacrEventHandler}/>
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler}/>
          <h2>Catatan Aktif</h2>
          <NoteList notes={this.activeNotes()} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler}/>
          <h2>Arsip</h2>
          <NoteList notes={this.archiveNotes()} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler}/>
        </div>
      </div>
    );
  }
}

export default NoteApp;

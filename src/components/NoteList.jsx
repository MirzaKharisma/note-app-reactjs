import React from 'react';
import NoteItem from './NoteItem';
import { showFormattedDate } from '../utils';

function NoteList({ notes, onDelete, onArchive }){
    if(notes.length != 0){
        return (
            <div className="notes-list">
                {
                    notes.map((note) => (
                        <NoteItem
                        key={note.id}
                        {...note}
                        createdAt={showFormattedDate(note.createdAt)}
                        id={note.id}
                        onDelete={onDelete}
                        onArchive={onArchive}
                        />
                    ))
                }
            </div>
        );
    }else{
        return (
            <div className="notes-list__empty-message">
                <p>Tidak ada catatan</p>
            </div>
        );
    }
}

export default NoteList;
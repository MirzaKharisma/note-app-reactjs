import React from 'react';

class NoteInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            body: ''
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(e){
        this.setState(() => {
            return {
                title: e.target.value
            };
        });
    }

    onBodyChangeEventHandler(e){
        this.setState(() => {
            return {
                body: e.target.value
            }
        })
    }

    onSubmitEventHandler(e){
        e.preventDefault();
        this.props.addNote(this.state);
    }

    render(){
        return(
            <form className="note-input" onSubmit={this.onSubmitEventHandler}>
                <h2>Buat Catatan</h2>
                <input type="text" value={this.state.title} onChange={this.onTitleChangeEventHandler} placeholder='Judul' className="note-input__title" />
                <textarea placeholder='Body' value={this.state.body} onChange={this.onBodyChangeEventHandler} className="note-input__body"/>
                <button type="submit">Tambah</button>
            </form>
        );
    }
}

export default NoteInput;
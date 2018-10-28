import React, {Component } from 'react';
import './FormNota.css';

class NoteForm extends Component{
    constructor() {
        super();
        this.state={
            nuevaNota:''
        };
        this.entradaUser = this.entradaUser.bind(this);
        this.addNota = this.addNota.bind(this);
    }
    entradaUser(e){
        this.setState({
            nuevaNota: e.target.value
        })
    }
    addNota(){
        this.props.addNota(this.state.nuevaNota);
        this.setState({
            nuevaNota:''
        });
        this.textInput.focus();
    }
    componentDidMount() {
        this.textInput.focus();
    }
    render() {
        return (
        <div className="NoteForm">
            <div className="centerForm">
            <div>
            <input 
            placeholder="Escribe una Nota"
            ref={entrada =>{this.textInput = entrada;}}
            value={this.state.nuevaNota}
            onChange={this.entradaUser}
            type= "text"/>
            <br/>
            <button className ="buttonCrear"onClick={this.addNota}>
            Crear Nota</button>
            </div>
            </div>
        </div>
        )
    }
} export default NoteForm;
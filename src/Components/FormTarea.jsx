import React, {Component } from 'react';
import './FormNota.css';

class FormTarea extends Component{
    constructor() {
        super();
        this.state={
            nuevaTarea:'',
            descripcion:'',
        };
        this.entradaUser = this.entradaUser.bind(this);
        this.addTarea = this.addTarea.bind(this);
    }
    entradaUser(e){
        const{value, name}=e.target;
        this.setState({
            [name]: value
        })
    }
    
    addTarea(){
        this.props.addTarea(this.state);
        // this.setState({
        //     nuevaTarea:''
        // });
        // this.textInput.focus();
    }
    // componentDidMount() {
    //     this.textInput.focus();
    // }
    render() {
        return (
        <div className="NoteForm">
            <form  onSubmit={this.addTarea}>
                <input 
                name="nuevaTarea"
                placeholder="Escribe una Tarea"
                // ref={entrada =>{this.textInput = entrada;}}
                // value={this.state.nuevaTarea}
                onChange={this.entradaUser}
                type= "text"/>
                <input 
                name ="descripcion"
                placeholder="Escribe una Tarea"
                // ref={entrada =>{this.textInput = entrada;}}
                // value={this.state.nuevaTarea}
                onChange={this.entradaUser}
                type= "text"/>
                <button type="submit">
                Crear Tarea</button>
            </form>
         </div>
        )
    }
} export default FormTarea;
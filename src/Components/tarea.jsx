import React, { Component } from 'react';
import '../App.css';
import firebase from 'firebase';
// import { DB_CONFIG }from '../Config/Config';
import 'firebase/database';

// data
// import { tareas } from '../tareas.json';

// subcomponents
import TodoForm from './FormTareas';

class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      tareas: []
    }
    this.handleAddTodo = this.handleAddTodo.bind(this);
    
  }

  componentDidMount(){
    const {tareas} = this.state;
    firebase.database().ref('tareas').on('child_added', snapshot=>{
      tareas.push({
        tareaId: snapshot.key,
        tarea: snapshot.val().tarea
      })
      this.setState({tareas});
    });
    firebase.database().ref('tareas').on('child_removed', snapshot => {
      for(let i =0; i < tareas.length; i++){
        if(tareas[i].tareaId=snapshot.key) {
          tareas.splice(i, 1);
        }
      }
      this.setState({tareas});
    });
    
  }
  

  
  

  removeTodo(tareaId) {
    this.setState({
      tareas: this.state.tareas.filter((e, i) => {
        return i !== tareaId
      })
    });
    firebase.database().ref('tareas').child(tareaId).remove();
  }
  

  handleAddTodo(tarea) {
    firebase.database().ref('tareas').push({
      tarea: tarea
    });
        this.setState({
      tareas: [...this.state.tareas, tarea]
    })
    
  }

  render() {
    const todos = this.state.tareas.map((tarea, i) => {
      return (
        <div className="col-md-4" key={i}>
            <div className="Tarea">
            <div className="tareaTextHeader">
              <h4>{tarea.titulo}</h4>
            
            </div>
            <div className="tareaText">
              <p>{tarea.descripcion}</p>
              <span className="tareaPriotity">
                {tarea.prioridad}
              </span>
            </div>
            <br/>
            <div className="tareaText">
             {tarea.responsable}
            </div>
            <div className="tareaFoot">
          
             <br/>
              <button
                className="tareaBtn"
                onClick={this.removeTodo.bind(this, i)}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      )
    });

    // RETURN THE COMPONENT
    return (
      <div className="App">
        <div className="container">
          <div className="row mt-4">
            <div className="todoform-md-4 text-center">
              <TodoForm onAddTodo={this.handleAddTodo}></TodoForm>
              <p className="divCount">
               Tareas
                <span className="iconCounter ml-2">
                {this.state.tareas.length}
               </span>
              </p>
            </div>

            <div className="col-md-9">
              <div className="row">
                {todos}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;

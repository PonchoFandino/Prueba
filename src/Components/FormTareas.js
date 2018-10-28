import React, { Component } from 'react';
import './FormTareas.css'

class TodoForm extends Component {
  constructor () {
    super();
    this.state = {
      titulo: '',
      responsable: '',
      descripcion: '',
      prioridad: 'baja'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddTodo(this.state);
    this.setState({
      titulo: '',
      responsable: '',
      descripcion: '',
      prioridad: 'baja'
    });
  }

  handleInputChange(e) {
    const {value, name} = e.target;
    console.log(value, name);
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="todoform">
          <div className="todoImput">
            <input
              type="text"
              name="titulo"
              className="inputext"
              value={this.state.titulo}
              onChange={this.handleInputChange}
              placeholder="Titúlo"
              />
          </div>
          <div className="todoImput">
            <input
              type="text"
              name="responsable"
              className="inputext"
              value={this.state.responsable}
              onChange={this.handleInputChange}
              placeholder="Responsable"
              />
          </div>
          <div className="todoImput">
            <input
              type="text"
              name="descripcion"
              className="inputext"
              value={this.state.descripcion}
              onChange={this.handleInputChange}
              placeholder="Descripción"
              />
          </div>
          <div className="todoImput">
            <select
                name="prioridad"
                className="inputext"
                value={this.state.prioridad}
                onChange={this.handleInputChange}
              >
              <option>baja</option>
              <option>media</option>
              <option>alta</option>
            </select>
          </div>
          <button type="submit" className="BtnCrear">
            Crear tarea
          </button>
        </form>
      </div>
    )
  }

}

export default TodoForm;
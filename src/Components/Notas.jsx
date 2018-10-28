import React, {Component} from 'react';
import '../App.css';

class Nota extends Component {
    constructor(props){
        super(props);
        this.notaContent = props.notaContent;
        this.notaId = props.notaId;
    }
    noteRemove(id){
        
        const response = window.confirm('Estas a punto de eliminar tu Nota, estas seguro?')
        if (response) {
            this.props.elimNota(id);
        }
        return;
    }
    render(){
        return(
            <div className="col-md-4">
        <div className="Nota mt-4">
        <div>
        <span className="trash"
        onClick={() => this.noteRemove(this.notaId) }
        ><i className="fa fa-trash"></i></span>
        <p>{this.notaContent}</p>
        </div>
        </div>
        </div>
        )
    }
}export default Nota;
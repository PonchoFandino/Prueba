import React, {Component} from 'react';
// import firebase from 'firebase';

class FileUpload extends Component{
    constructor(props){
        super(props);
        this.state = {
            uploadValue: 0,
            // picture:null
        };
        // this.handleUpload=this.handleUpload.bind(this)
    }
    //
    render() {
        return(
        <div>
            <progress value={this.state.uploadValue} max="100"></progress>
            <br/>
            <input type="file" onChange={this.props.onUpload}/>
            <br/>
            
        </div>
        )
    }
}export default FileUpload;
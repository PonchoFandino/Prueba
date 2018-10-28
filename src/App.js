import React, { Component } from 'react';
import './App.css';
import Nota from './Components/Notas';
import NoteForm from './Components/FormNota';
import firebase from 'firebase';
import 'firebase/database';
import Tasks from './Components/tarea'
// import FileUpload from './uploadFiles'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null,
        notas: [],
        pictures:[]
    };
    
    // this.app = firebase.initializeApp(DB_CONFIG,'NoTasks');
    // this.db = this.app.database().ref().child('notas');
    // this.db2 = this.app.database().ref().child('tareas');
    
    this.addNota = this.addNota.bind(this);
    this.iniSesion = this.iniSesion.bind(this);
    this.finSesion = this.finSesion.bind(this);
    // this.handleUpload = this.handleUpload.bind(this); 
    this.elimNota = this.elimNota.bind(this);
    
   
  };

 componentWillMount(){
  firebase.auth().onAuthStateChanged(user =>{
    this.setState({user});
  });
 
  
 }

  componentDidMount(){
    const {notas} = this.state;
    firebase.database().ref('notas').on('child_added', snapshot=>{
      notas.push({
        notaId: snapshot.key,
        notaContent: snapshot.val().notaContent
      })
      this.setState({notas});
    });
    firebase.database().ref('notas').on('child_removed', snapshot => {
      for(let i =0; i < notas.length; i++){
        if(notas[i].notaId=snapshot.key) {
          notas.splice(i, 1);
        }
      }
      this.setState({notas});
    });
  // firebase.database().ref('pictures').on('child_added', snapshot =>{
  //   this.setState({
  //     pictures: this.state.pictures.concat(snapshot.val())
  //   });
  // });
  }
  

  
  elimNota(notaId){
    firebase.database().ref('notas').child(notaId).remove();
  }
  iniSesion(){
    const provider=new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    
  }
  finSesion(){
    firebase.auth().signOut()
  }
  
 
   
  addNota(nota){
    this.setState({ nota });
    firebase.database().ref('notas').push({
      nota
    });
    let { notas } = this.state;
    notas.push({
      notaId:notas.length + 1,
      notaContent: nota,
    });
    
  }
  // handleUpload(event){
  //       const file = event.target.files[0];
  //       const storageRef= firebase.storage().ref(`/images/${file.name}`);
  //       const task= storageRef.put(file);

  //       task.on('state_changed', snapshot =>{
  //           let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
  //           this.setState({
  //               uploadValue: percentage
  //           })
  //       }, error => {
  //           console.log(error.message)
  //       }, () => {
  //         const record = {
  //           photoURL: this.state.user.photoURL,
  //           displayName: this.state.user.displayName,
  //           image: task.snapshot.downloadURL
  //         };
  //        firebase.database().ref(`pictures`).push({picture});
                  
  //       });
  //   }
  

  render() {
      
      return (
      <div className="App">
            <nav className="Nav">
                <h2 className="notasks">Notasks</h2>
                <div>
                    {this.state.user? 
                  <div className="ulNav">
                   <input type="checkbox" id="main"/>
                   <label for="main" className="menu"><img className="avatar" src={this.state.user.photoURL} alt={this.state.user.displayName}/></label>
                    <nav className="navMenu">
                      
                      <li><p className="pA2">{ this.state.user.displayName}</p></li>
                      <li><button className="button2"onClick={this.finSesion}>Salir</button></li>
                    </nav>
                  </div>:
                     <div className="Login">
                <button className="LoginBtn" onClick={this.iniSesion}>Empezar</button>
                <br/>
                <p className="pA">inicia sesion con tu cuenta de google</p>
                     </div>   
                  }
                </div>
            </nav>
         <div>
            {this.state.user? 
           <div>
            <Tasks/>
              <div className="notesContainer">
                  <div className="col-md-12">
                    <div className="row">
                      {this.state.notas.map(nota =>{
                          return(
                            <Nota
                            notaContent={nota.notaContent}
                            notaId={nota.notaId}
                            key={nota.notaId}
                            elimNota={this.elimNota} />
                          )
                        })}
                    </div>
                  </div>
              </div> 
              <div className="row">
                <div className="noteFooter">
                  <div className="tareasForm-md-2 text-center">
                    <NoteForm addNota={this.addNota}/>
                        {/* <p className="">
                          Notas
                        <span className="badge badge-pill badge-light ml-2">
                        { this.state.notas.length}
                        </span>
                        </p> */}
                  </div>
                </div>
              </div>
           </div>
            : <div className="preWellcome">
                <div className="wellcome">
                  <h1>Bienvenido</h1>
                  <br/>
                  <h4 className="h4A">administra tu tiempo con nuestra app de</h4>
                  <br/>
                  <h2 className="notarea">Notas & Tareas!</h2>
                </div>
                {/* <div className="Login">
                  <br/>
                  <p className="LoginBtn">inicia sesion con tu cuenta de google</p>
                </div> */}
              </div>
               
            }   
               {/* <FileUpload onUpload={this.handleUpload}/>
               {this.state.pictures.map(picture =>(
                <div>
                  <img src={picture.image} alt=""/>
                  <br/>
                  <img src={picture.photoURL} alt={picture.displayName}/>
                  <br/>
                  <span>{picture.displayName} </span>
                </div>
              )).reverse()
              }     */}
        </div>
      </div>
    );
  }
}

export default App;

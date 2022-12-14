import React from "react";
import Rotas from "./rotas";
import '../custom.css'
import 'bootswatch/dist/sketchy/bootstrap.min.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends React.Component{

  render(){
    return (
      <div>
        <Rotas/>
      </div>
    );
  }  
}

export default App

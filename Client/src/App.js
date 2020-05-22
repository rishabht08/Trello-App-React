import React from 'react';

import './App.css';

import { connect } from "react-redux";
import Categories from "./components/categories"



class App extends React.Component {


  render() {

    return (
      <div>
        <Categories/>

      </div>
     
    )
  }
}





// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
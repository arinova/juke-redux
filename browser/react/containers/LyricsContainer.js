import React from 'react';
import {store} from '../store';


/*subscribes and dispatches actions to our store, and uses the store's state values.*/


export default class LyricsContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      value: store.getState()
    }
  }
  componentsDidMount (){
    this.unsubscribe = store.subscribe(function(){
      console.log('state Changed!!', store.getState())
    })
  }

  componentWillUnmount (){
  this.unsubscribe()
}

render() {
  return(
    <h1>Just a container, more to come!</h1>
  )
  }
}



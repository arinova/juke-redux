import React from 'react';
import {store} from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics} from '../action-creators/lyrics.js';
import axios from 'axios';
/*subscribes and dispatches actions to our store, and uses the store's state values.*/


export default class LyricsContainer extends React.Component {
  constructor(){
    super();

    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this._setArtist=this._setArtist.bind(this);
    this._setSong=this._setSong.bind(this);
    this._handleSubmit=this._handleSubmit.bind(this);
  }

  componentDidMount (){
    this.unsubscribe = store.subscribe(function(){
      console.log('state Changed!!', store.getState())
    })
  }

  componentWillUnmount (){
    this.unsubscribe();
  }

  _setArtist(artist){
    this.setState({artistQuery: artist});
  }

  _setSong(song){
    this.setState({songQuery: song});
  }

  _handleSubmit(){
    let artist= this.state.artistQuery;
    let song= this.state.songQuery;
    console.log("artist:" ,artist , " song:", song);
    if(this.state.artistQuery && this.state.songQuery){
      console.log("submitted:", this.state);
      axios.get(`/api/lyrics/${artist}/${song}`)
        .then(res => {
          console.log("response from ajax jfkla;jfiaw;jfoiwjfoiw");
          const setLyricsAction= setLyrics(res.data.lyric);
          store.dispatch(setLyricsAction);
          console.log("store text state:", store.getState());
          console.log("this.state", this.state);

         })
        .catch((error)=> console.log(error));
      }
  }

  render() {
    return(
      <Lyrics
        text={this.state.text}
        setArtist={this._setArtist}
        setSong={this._setSong}
        artistQuery= {this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this._handleSubmit} />
    );
  }
}

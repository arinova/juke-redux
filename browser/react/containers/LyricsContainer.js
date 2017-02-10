import React from 'react';
import {store} from '../store';
import Lyrics from '../components/Lyrics';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics.js';
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
  //  console.log("LYRICS CONTINER STATES:",  this.state);
    const container=this;
    this.unsubscribe = store.subscribe(function(){
      console.log('state Changed!!', store.getState())
      const newLyrics= store.getState().lyrics;
      container.setState({lyrics: newLyrics});
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
      // console.log("submitted:", this.state);
      // axios.get(`/api/lyrics/${artist}/${song}`)
      //   .then(res => {
      //     const setLyricsAction= setLyrics(res.data.lyric);
      //     store.dispatch(setLyricsAction);
      //     console.log("store text state:", store.getState());
      //
      //    })
      //   .catch((error)=> console.log(error));

      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));


    }
  }

  render() {
    return(
      <Lyrics
        text={this.state.lyrics.text}
        setArtist={this._setArtist}
        setSong={this._setSong}
        artistQuery= {this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this._handleSubmit} />
    );
  }
}

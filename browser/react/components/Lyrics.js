import React from 'react';

/* View and handle inputs from user DUMB COMPONENT*/

const Lyrics = (props) => {

  const artistChange = e => {
    props.setArtist(e.target.value);
  };

  const songChange = e => {
    props.setSong(e.target.value);
  };

  const text = props.text;
  const setArtist = props.setArtist;
  const artistQuery = props.artistQuery;
  const setSong = props.setSong;
  const songQuery = props.songQuery;
  const submit = props.submit;

  return (
     <div id="lyrics">
      <form onSubmit={props.handleSubmit}>
        <div>
          <input type="text" value={artistQuery} placeholder="Artist" onChange={artistChange}/>
          <input type="text" value={songQuery} placeholder="Song" onChange={songChange}/>
        </div>
        <pre>{props.text || 'Search above!'}</pre>
        <button type="submit">Search for Lyrics</button>
      </form>
    </div>
  )
}

export default Lyrics;

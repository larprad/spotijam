import React from 'react';
import { PlaylistChunk } from '../PlaylistChunk/PlaylistChunk';
import loading from './refresh.svg';
import './YourPlaylist.css';

export class YourPlaylist extends React.Component {
  componentDidMount() {
    console.log('I am here');
    this.props.getPlaylist();
  }

  displayList() {
    return this.props.playlists.map(x => (
      <PlaylistChunk
        deletePlaylist={this.props.deletePlaylist}
        key={x.id}
        playlist={x.name}
        id={x.id}
      />
    ));
  }

  updateList() {
    this.props.getPlaylist();
    console.log('Your Playlists have been updated');
  }

  render() {
    return (
      <div className="YourPlaylist niceBox">
        <h2 className="sectionTitle">Your Playlists</h2>
        <img
          onClick={this.updateList.bind(this)}
          className="update"
          src={loading}
          alt="loading"
        />
        <div>{this.displayList()}</div>
        <button onClick={this.props.onSave} className="Playlist-save">
          Create new Playlist
        </button>
      </div>
    );
  }
}

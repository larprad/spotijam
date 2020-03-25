import React from 'react';
import './PlayList.css';
import { TrackList } from '../TrackList/TrackList';

export class PlayList extends React.Component {
  handleInput(e) {
    this.props.updateName(e.target.value);
  }

  onSave() {
    this.props.onSave();
  }
  render() {
    return (
      <div className="Playlist niceBox">
        <h2 className="sectionTitle">Make your Playlist</h2>
        <input
          placeholder={'Enter Playlist Name'}
          // defaultValue={'Enter Playlist Name'}
          onChange={this.handleInput.bind(this)}
        />
        <TrackList
          tracks={this.props.playListTracks}
          isRemoval={false}
          removeTrack={this.props.removeTrack}
        />
        <button onClick={this.props.onSave} className="Playlist-save">
          Save to Spotify
        </button>
      </div>
    );
  }
}

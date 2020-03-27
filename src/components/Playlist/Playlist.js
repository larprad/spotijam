import React from 'react';
import './PlayList.css';
import { TrackList } from '../TrackList/TrackList';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';

export class PlayList extends React.Component {
  handleInput(e) {
    this.props.updateName(e.target.value);
  }

  onSave() {
    this.props.onSave();
  }

  onExit() {
    this.props.onExit();
  }
  render() {
    return (
      <div className="Playlist niceBox">
        <h2 className="sectionTitle">
          {this.props.edit === 'edit'
            ? 'Edit your PlayList'
            : 'Create a Playlist'}
        </h2>
        <div className="playlistFlexContainer">
          <div className="flexChild">
            <SearchBar onSearch={this.props.search} />
            <SearchResults
              addTrack={this.props.addTrack}
              searchResults={this.props.searchResults}
            />
          </div>
          <div className="flexChild">
            <input
              placeholder={'Your Playlist Name'}
              value={this.props.playListName}
              // defaultValue={'Enter Playlist Name'}
              onChange={this.handleInput.bind(this)}
            />
            <div className="trackListContainer">
              <TrackList
                tracks={this.props.playListTracks}
                isRemoval={false}
                removeTrack={this.props.removeTrack}
              />
            </div>
            <div className="buttonSaveContainer">
              <button onClick={this.props.onSave} className="Playlist-save">
                Save
              </button>
              <button onClick={this.props.onExit} className="Playlist-save">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

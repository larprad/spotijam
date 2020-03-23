import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // connected: false,
      searchResults: [],
      playListName: 'New Playlist',
      trackURIs: [],
      playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    // this.connect = this.connect.bind(this);
  }

  displayPlaylist() {
    if (this.state.searchResults.length === 0) {
      return <div className="nothingFound"></div>;
    } else {
      return (
        <div className="App-playlist">
          <SearchResults
            addTrack={this.addTrack}
            searchResults={this.state.searchResults}
          />
          <PlayList
            onSave={this.savePlaylist}
            updateName={this.updatePlaylistName}
            removeTrack={this.removeTrack}
            playListName={this.state.playListName}
            playListTracks={this.state.playListTracks}
          />
        </div>
      );
    }
  }

  savePlaylist() {
    this.setState(
      {
        trackURIs: this.state.playListTracks.map(x => x.uri)
      },
      () => Spotify.savePlaylist(this.state.playListName, this.state.trackURIs)
    );
  }

  addTrack(track) {
    console.log('add Track clicked!');
    if (this.state.playListTracks.filter(x => x.id === track.id).length === 0) {
      console.log('track is not yet existing in Playlist');
      console.log(track);
      this.setState({ playListTracks: [...this.state.playListTracks, track] });
    } else {
      console.log(
        'track is already existing in Playlist, nothing will be done'
      );
    }
  }

  removeTrack(track) {
    console.log('removing track');
    let tmpTrack = this.state.playListTracks.filter(x => x.id !== track.id);
    this.setState({ playListTracks: tmpTrack });
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name });
  }

  // connect() {
  //   Spotify.getAccessToken();
  //   this.setState({ connected: Spotify.connected });
  // }

  search(item) {
    Spotify.getAccessToken();
    console.log(`looking for ${item}`);
    Spotify.searchTrack(item).then(x => {
      console.log(x);
      this.setState({ searchResults: x });
    });
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div className="App">
        <h1>
          Spoti<span className="highlight">jam</span>
        </h1>
        <SearchBar
          onSearch={this.search}
          // onConnect={this.connect}
          connected={Spotify.connected}
        />
        {this.displayPlaylist()}
        {/* <div className="App-playlist">
          <SearchResults
            addTrack={this.addTrack}
            searchResults={this.state.searchResults}
          />
          <PlayList
            onSave={this.savePlaylist}
            updateName={this.updatePlaylistName}
            removeTrack={this.removeTrack}
            playListName={this.state.playListName}
            playListTracks={this.state.playListTracks}
          />
        </div> */}
      </div>
    );
  }
}

export default App;

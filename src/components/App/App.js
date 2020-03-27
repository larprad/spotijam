import React from 'react';
import './App.css';
// import { SearchBar } from '../SearchBar/SearchBar';
// import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';
import { YourPlaylist } from '../YourPlaylist/YourPlaylist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: 'none',
      searchResults: [],
      playListName: '',
      playListId: '',
      trackURIs: [],
      playListTracks: [],
      yourPlaylists: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.editPlaylist = this.editPlaylist.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.onExit = this.onExit.bind(this);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  displayPlaylist() {
    if (this.state.edit === 'none') {
      return null;
    } else {
      return (
        <PlayList
          onExit={this.onExit}
          onSave={
            this.state.edit === 'create'
              ? this.savePlaylist
              : this.updatePlaylist
          }
          updateName={this.updatePlaylistName}
          removeTrack={this.removeTrack}
          playListName={this.state.playListName}
          playListTracks={this.state.playListTracks}
          edit={this.state.edit}
          search={this.search}
          addTrack={this.addTrack}
          searchResults={this.state.searchResults}
        />
      );
    }
  }

  savePlaylist() {
    this.setState(
      {
        trackURIs: this.state.playListTracks.map(x => x.uri)
      },
      () => {
        Spotify.savePlaylist(
          this.state.playListName,
          this.state.trackURIs
        ).then(this.getPlaylist());
        this.onExit();
      }
    );
  }

  deletePlaylist(playlistId) {
    const newPlaylist = this.state.yourPlaylists.filter(
      x => x.id !== playlistId
    );
    Spotify.deletePlayList(playlistId)
      .then(this.setState({ yourPlaylists: newPlaylist }))
      .catch(e => console.error(e));
  }

  editPlaylist(playlistId, playListName) {
    // this.setState({ edit: true });
    console.log('in getPlaylist');
    console.log(playlistId);
    Spotify.getThisPlaylist(playlistId)
      .then(response => {
        this.setState({
          playListTracks: response,
          edit: 'edit',
          playListName: playListName,
          playListId: playlistId
        });
      })
      .catch(e => console.error('failure ' + e));
    // this.setState({ playListName: playListName });
  }

  createPlaylist() {
    this.setState({ edit: 'create' });
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

  getPlaylist() {
    console.log('in getPlaylist');
    Spotify.getPlaylist().then(response => {
      console.log(response);
      this.setState({ yourPlaylists: response });
    });
  }

  updatePlaylist() {
    console.log('UPADTE');
    this.setState(
      {
        trackURIs: this.state.playListTracks.map(x => x.uri)
      },
      () =>
        Spotify.editPlaylist(this.state.playListId, this.state.trackURIs).then(
          this.onExit()
        )
    );
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name });
  }

  search(item) {
    Spotify.getAccessToken();
    console.log(`looking for ${item}`);
    Spotify.searchTrack(item).then(x => {
      console.log(x);
      this.setState({ searchResults: x });
    });
  }

  onExit() {
    this.setState({
      edit: 'none',
      playListName: '',
      playListId: '',
      trackURIs: [],
      playListTracks: [],
      searchResults: []
    });
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div className="App">
        <h1>
          Spoti<span className="highlight">jam</span>
        </h1>
        {/* <SearchBar onSearch={this.search} connected={Spotify.connected} /> */}
        <div className="App-playlist">
          <YourPlaylist
            getPlaylist={this.getPlaylist}
            deletePlaylist={this.deletePlaylist}
            playlists={this.state.yourPlaylists}
            editPlaylist={this.editPlaylist}
            createPlaylist={this.createPlaylist}
          />
          {/* <SearchResults
            addTrack={this.addTrack}
            searchResults={this.state.searchResults}
          /> */}
          {this.displayPlaylist()}
          {/* <PlayList
            onExit={this.onExit}
            onSave={
              this.state.edit === 'create'
                ? this.savePlaylist
                : this.updatePlaylist
            }
            updateName={this.updatePlaylistName}
            removeTrack={this.removeTrack}
            playListName={this.state.playListName}
            playListTracks={this.state.playListTracks}
            edit={this.state.edit}
            search={this.search}
            addTrack={this.addTrack}
            searchResults={this.state.searchResults}
          /> */}
        </div>
      </div>
    );
  }
}

export default App;

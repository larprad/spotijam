import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'yt', album: 'ey', id: 2, artist: 'ey', uri: 'kghfsmpk' },
        { name: 'yt', album: 'ey', id: 1, artist: 'ey', uri: 'jhsgpiQG' }
      ],
      playListName: 'New Playlist',
      trackURIs: [],
      playListTracks: [
        {
          name: 'yo',
          album: 'ekzjghmy',
          id: 2324,
          artist: 'plop',
          uri: 'kqmjhgmkjsdhgmkqhsmg'
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  savePlaylist() {
    this.setState({ trackURIs: this.state.playListTracks.map(x => x.uri) });
    console.log('URI saved');
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

  search(item) {
    console.log(`looking for ${item}`);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
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
        </div>
      </div>
    );
  }
}

export default App;

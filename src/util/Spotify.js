const clientId = 'fda3dbd984a14a6ea8e9d75434e28d7b';
let accessToken = '';
let expirationTime;
// const clientSecret = '3b1b242035334f398ad428bb47979af1';
// const CORSProxy = 'https://cors-anywhere.herokuapp.com/';
const tokenReg = /access_token=([^&]*)/;
const expReg = /expires_in=([^&]*)/;
const baseURL = 'https://api.spotify.com/v1/search?type=track&q=';
const userId = '';
const scope = encodeURIComponent('playlist-modify-public');

const authEndpoint =
  'https://accounts.spotify.com/authorize?' +
  'client_id=' +
  clientId +
  '&response_type=token' +
  '&redirect_uri=https://larprad.github.io/spotijam&scope=' +
  scope;

export const Spotify = {
  // connected: false,

  getHeader() {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };
    return myInit;
  },

  getAccessToken() {
    if (accessToken) {
      console.log('token detected');
      return accessToken;
    } else if (window.location.href.match(tokenReg)) {
      console.log('access token is in URL');
      const token = window.location.href.match(tokenReg);
      expirationTime = window.location.href.match(expReg)[1];
      accessToken = token[1];
      window.setTimeout(() => (accessToken = ''), expirationTime * 1000);
      window.history.pushState('', null, '/');
      return accessToken;
    } else {
      console.log('need to get the token');
      window.location = authEndpoint;
    }
  },

  async getUserId() {
    const myInit = this.getHeader();
    try {
      const response = await fetch('https://api.spotify.com/v1/me?id', myInit);
      if (response.ok) {
        const responseJson = await response.json();
        console.log('user ID');
        console.log(responseJson.id);
        return responseJson.id;
      } else {
        throw new Error('user info fectch failed');
      }
    } catch (err) {
      console.log(err);
    }
  },

  async searchTrack(track) {
    if (track) {
      const myInit = this.getHeader();
      try {
        const response = await fetch(baseURL + track, myInit);
        if (response.ok) {
          const responseJson = await response.json();
          const tracks = responseJson.tracks.items.map((x) => {
            return {
              name: x.name,
              album: x.album.name,
              artist: x.artists.map((x) => x.name),
              uri: x.uri,
              id: x.id,
            };
          });
          return tracks;
        } else {
          throw new Error('failed fetch');
        }
      } catch (e) {
        return console.error(e);
      }
    } else {
      return [];
    }
  },

  async getPlaylist() {
    const myHeader = this.getHeader();
    try {
      const uID = !userId ? await this.getUserId() : userId;
      const request = `https://api.spotify.com/v1/users/${uID}/playlists`;
      const response = await fetch(request, myHeader);
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson.items;
    } catch (e) {
      console.error(e);
    }
  },

  async getThisPlaylist(playlistId) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
        cache: 'default',
      });
      const responseJson = await response.json();
      console.log(responseJson);
      const tracks = responseJson.items.map((x) => {
        return {
          name: x.track.name,
          album: x.track.album.name,
          artist: x.track.artists.map((x) => x.name),
          uri: x.track.uri,
          id: x.track.id,
        };
      });
      console.log(tracks);
      return tracks;
    } catch (e) {
      console.error(e);
    }
  },

  async savePlaylist(playlistName, tracksUris) {
    console.log('save new playlist');
    console.log(`playlistName: ${playlistName}`);
    console.log('tracksUris');
    console.log(tracksUris);
    if (!playlistName || !tracksUris) {
      console.log('no args');
    } else {
      try {
        const uID = !userId ? await this.getUserId() : userId;
        const idResponse = await fetch(
          `https://api.spotify.com/v1/users/${uID}/playlists?scope=playlist-modify-public`,
          {
            headers: {
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({ name: playlistName }),
          }
        );
        const responseJson = await idResponse.json();
        const playlistID = responseJson.id;
        console.log('playlist ID');
        console.log(playlistID);
        await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify({ uris: tracksUris }),
        });
      } catch (err) {
        console.log(err);
      }
    }
  },

  async editPlaylist(playlistId, tracksUris) {
    console.log('edit playlist');
    console.log(`playlist ID: ${playlistId}`);
    console.log('tracksUris');
    console.log(tracksUris);
    if (!playlistId || !tracksUris) {
      console.log('no args');
    } else {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify({ uris: tracksUris }),
        });
        console.log('edit response');
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  },

  async deletePlayList(playlistId) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + accessToken },
        mode: 'cors',
        cache: 'default',
      });
      response.ok ? console.log('delete success') : console.log('potato in the sauasage');
    } catch (e) {
      console.log(e);
    }
  },
};

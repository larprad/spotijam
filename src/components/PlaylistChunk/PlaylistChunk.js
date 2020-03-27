import React from 'react';
import './PlaylistChunk.css';
import delet from './delete.svg';
import edit from './edit.svg';

export class PlaylistChunk extends React.Component {
  handleDeleteClick() {
    this.props.deletePlaylist(this.props.id);
  }

  handleEditClick() {
    this.props.editPlaylist(this.props.id, this.props.playlist);
  }

  render() {
    return (
      <div className="PlaylistChunk">
        <h2 className="PlaylistTitle">{this.props.playlist}</h2>
        <div className="buttonContainer">
          <div className="chunkButtonDiv">
            <img
              src={edit}
              alt="edit"
              onClick={this.handleEditClick.bind(this)}
            />
          </div>
          <div className="chunkButtonDiv">
            <img
              onClick={this.handleDeleteClick.bind(this)}
              src={delet}
              alt="delete"
            />
          </div>
        </div>
      </div>
    );
  }
}

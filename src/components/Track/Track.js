import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

export class Track extends React.Component {
  renderAction() {
    console.log('isRemoval');
    console.log(this.props.isRemoval);
    if (this.props.isRemoval === true) {
      return '+';
    } else {
      return '-';
    }
  }

  handleClickEvent() {
    this.props.isRemoval
      ? this.props.addTrack(this.props.track)
      : this.props.removeTrack(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <button
          onClick={this.handleClickEvent.bind(this)}
          className="Track-action"
        >
          {this.renderAction()}
        </button>
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  isRemoval: PropTypes.bool
};

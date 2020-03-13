import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.tracks === this.props.tracks) {
  //     console.log('Tracklist should not update');
  //     return false;
  //   } else {
  //     console.log('Tracklist should update');
  //     return true;
  //   }
  // }

  // componentDidMount() {}

  makeTrack() {
    if (this.props.tracks) {
      return this.props.tracks.map(x => (
        <Track
          key={x.id}
          track={x}
          addTrack={this.props.addTrack}
          isRemoval={this.props.isRemoval}
          removeTrack={this.props.removeTrack}
        />
      ));
    } else {
      return null;
    }
  }
  render() {
    return <div className="TrackList">{this.makeTrack()}</div>;
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array
};

// TrackList.defaultProps = {
//   tracks: [{ id: 'template', name: ' ', album: ' ', artist: ' ' }]
// };

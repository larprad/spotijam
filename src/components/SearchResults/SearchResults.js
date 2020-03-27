import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h3 className="searchTitle">Search results</h3>
        <TrackList
          addTrack={this.props.addTrack}
          tracks={this.props.searchResults}
          isRemoval={true}
        />
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired
};

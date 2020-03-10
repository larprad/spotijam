import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  handleTermChange(e) {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange.bind(this)}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

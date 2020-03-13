import React from 'react';
import './SearchBar.css';
export class SearchBar extends React.Component {
  handleTermChange(e) {
    this.props.onSearch(e.target.value);
  }

  handleClick() {
    console.log('click');
    this.props.onConnect();
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange.bind(this)}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button
          onClick={this.handleClick.bind(this)}
          className={this.props.connected ? 'connected' : 'SearchButton'}
        >
          {this.props.connected ? 'connected' : 'Log in'}
        </button>
      </div>
    );
  }
}

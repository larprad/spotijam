import React from 'react';
import './SearchBar.css';
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }
  handleTermChange(e) {
    this.setState({ input: e.target.value });
  }

  handleClick() {
    console.log('click');
    this.props.onSearch(this.state.input);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('Enter is pressed');
      this.props.onSearch(this.state.input);
    }
  }

  render() {
    return (
      <div onKeyPress={this.handleKeyPress.bind(this)} className="SearchBar">
        <input
          onChange={this.handleTermChange.bind(this)}
          placeholder="Look for songs here!"
        />
        <button onClick={this.handleClick.bind(this)} className="SearchButton">
          Search
        </button>
      </div>
    );
  }
}

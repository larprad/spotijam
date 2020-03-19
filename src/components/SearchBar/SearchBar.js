import React from 'react';
import './SearchBar.css';
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }
  handleTermChange(e) {
    this.setState({ input: e.target.value });
    // this.props.onSearch(e.target.value);
  }

  handleClick() {
    console.log('click');
    this.props.onSearch(this.state.input);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange.bind(this)}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button onClick={this.handleClick.bind(this)} className="SearchButton">
          Search!
        </button>
      </div>
    );
  }
}

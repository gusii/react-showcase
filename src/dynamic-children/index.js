import React, { Component } from 'react';
import fetch from 'unfetch'

export default class DynamicChildrenDemo extends Component {

  constructor (...args) {
    super(...args)
    this.state = {
      total: 0,
      results: [],
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() =>
      fetch('http://www.omdbapi.com/?s=fantastic')
        .then(res => res.json())
        .then(res => {
          console.log(res)
          this.setState({
            total: res.totalResults,
            results: res.Search,
            isLoading: false
          })
        })
      , 1000
    )
  }


  render () {
    return (
      <div>
        <h1>{this.state.total}</h1>
        {
          this.state.isLoading &&
          <div>Loading...</div>
        }
        {
          !this.state.isLoading &&
          this.state.results.map((item, idx) =>
            <div key={idx}>
              <h2>{item.Title}</h2>
              <img src={item.Poster} />
            </div>
          )
        }
      </div>
    )
  }
}

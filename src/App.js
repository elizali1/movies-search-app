import logo from './logo.svg';
import './App.css';
import MovieInfo from './components/MovieInfo';
import {Component} from 'react'

class App extends Component {
  state= {
    baseURL:'http://www.omdbapi.com/?',
    apiKey:'apikey=' + 'acc961aa',
    query:'&t=',
    movieTitle:'',
    searchURL:'',
    movie: null
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({searchURL: this.state.baseURL + this.state.apiKey + this.state.query + this.state.movieTitle}, () => {
      console.log(this.state.searchURL)
      fetch(this.state.searchURL)
      .then(res => res.json())
      .then(json=>this.setState({movie: json}), err => console.log(err))
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Movies App</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='movieTitle'>Title</label>
          <input
          id='movieTitle'
          type='text'
          value={this.state.movieTitle}
          onChange={this.handleChange} />
          <input
          type='submit' 
          value='Find Movie Info'/>
        </form>
        <a href={this.state.searchURL}>{this.state.searchURL}</a>

        {this.state.movie && <MovieInfo movie={this.state.movie} />}
      </div>
    )
  }
}


export default App;

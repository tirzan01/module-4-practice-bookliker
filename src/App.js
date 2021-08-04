import React from "react";
import {
  Container,
  Menu
} from "semantic-ui-react";

import SelectedBook from "./SelectedBook";

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      books: [],
      selectedBook: undefined,
      user: [],
    }
  }

  selectBook = id => {
    this.setState({
      selectedBook: this.state.books.filter(book => book.id === id)[0]
    })
  }

  likeBook = id => {
    let books = [...this.state.books]
    if(this.state.books[id - 1].users.filter(user => user.id === this.state.user.id).length > 0){
      books[id - 1].users = books[id - 1].users.filter(user => user.id !== this.state.user.id)
    }else{
      books[id - 1].users.push(this.state.user)
    }
    console.log(books[id - 1].users)
    this.setState({books})
    fetch(`http://localhost:3001/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"users": books[id - 1].users})
    })
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            {this.state.books.map(book => <Menu.Item as={"a"} onClick={e => this.selectBook(book.id)} key={book.id}>{book.title}</Menu.Item>)}
          </Menu>
          <Container text>
            {this.state.selectedBook ? <SelectedBook book={this.state.selectedBook} likeBook={this.likeBook} /> : null}
          </Container>
        </main>
      </div>
    );
  }

  componentDidMount() {
    fetch('http://localhost:3001/books')
      .then(resp => resp.json())
      .then(books => {this.setState({books})})

      fetch('http://localhost:3001/users/1')
        .then(resp => resp.json())
        .then(user => {this.setState({user})})
  }
}

export default App;

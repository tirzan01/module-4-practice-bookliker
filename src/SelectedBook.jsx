import React from 'react'
import {
    Header,
    Button,
    List,
    Image
  } from "semantic-ui-react";

const SelectedBook = ({ book, likeBook }) => {
    return (
        <React.Fragment>
            <Header>{book.title}</Header>
            <Image
            src={book.img_url}
            size="small"
            />
            <p>{book.description}</p>
            <Button
            color="red"
            content="Like"
            icon="heart"
            label={{
                basic: true,
                color: "red",
                pointing: "left",
                content: "2,048"
            }}
            onClick={() => likeBook(book.id)}
            />
            <Header>Liked by</Header>
            <List>
            {book.users.map(user => <List.Item icon="user" content={user.username} key={user.id} />)}
            </List>
        </React.Fragment>
    )
}

export default SelectedBook
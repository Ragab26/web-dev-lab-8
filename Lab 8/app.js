const express = require('express');
const app = express();

app.use(express.json());

const books = [
    {id: 1, title: "gg", author:"r"},
    {id: 2, title: "ee", author:"s"},
    {id: 3, title: "ff", author:"t"}
]

let nextId = 4;


app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }
    res.send(book);
});

app.post('/books', (req, res) => {

    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    const newBook = {
        id: nextId++,
        title: title,
        author: author
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

app.delete('/books/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(index, 1);

    res.json({
       message: "Book deleted"
    });

});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

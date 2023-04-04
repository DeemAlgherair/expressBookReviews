const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// // Get the book list available in the shop
// public_users.get('/',function (req, res) {
//     res.send(JSON.stringify(books,null,4));
// });
public_users.get('/',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books, null, 4)));
      });
      get_books.then(() => console.log("Promise for Task 10 resolved"));
  });



// // Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//     const isbn = req.params.isbn;
//     res.send(books[isbn])
//  });
public_users.get('/isbn/:isbn',function (req, res) {
    const get_bookD = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        resolve(res.send(books[isbn]));
      });
      get_bookD.then(() => console.log("Promise for Task 11 resolved"));
  });


// // Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//     const author = req.params.author;
//     for (var i in books) {
//         if (author == books[i].author){
//         res.send(Object.entries(books[i]))
//         }
//     }
// });

public_users.get('/author/:author',function (req, res) {
    const get_auth = new Promise((resolve, reject) => {
        const author = req.params.author;
        for (var i in books) {
            if (author == books[i].author){
                var result = Object.entries(books[i]);
                }
            }
            resolve(res.send(result));
      });
      get_auth.then(() => console.log("Promise for Task 12 resolved"));
  });

// Get all books based on title
/*public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    for (var i in books) {
    if (title == books[i].title){
        res.send(Object.entries(books[i]))
    }
    }
});*/
public_users.get('/title/:title',function (req, res) {
    const get_title = new Promise((resolve, reject) => {
        const title = req.params.title;
            for (var i in books) {
            if (title == books[i].title){
                var result = Object.entries(books[i]);
                } 
            }
            resolve(res.send(result));
      });
      get_title.then(() => console.log("Promise for Task 13 resolved"));
  });



 //Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});



module.exports.general = public_users;


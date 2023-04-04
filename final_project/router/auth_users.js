const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  
}

const authenticatedUser = (username,password)=>{  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
 const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
        accessToken,username
    }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});


regd_users.put("/auth/review/:isbn", (req, res) => {
    const review = req.params.review;
    const isbn = req.params.isbn;
    const auth = req.params.auth;
    if (auth) { 
        let username = req.body.username;
        let password = req.body.password;
        if(review) {
            books["reviews"] = review
        }
        books[isbn]=review;
    }
    res.send(`the review for the book with isbn  ${isbn} added/updated.`);

    
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const auth = req.params.auth;
    let username = req.body.username;
    let password = req.body.password;
    if (auth) { 
       
        if (authenticatedUser(username,password)) {
            let accessToken = jwt.sign({
              data: password
            }, 'access', { expiresIn: 60 * 60 });
            req.session.authorization = {
                accessToken,username
            }
    review = review.filter((isbn) => books[isbn] != isbn);
        }
    }
    res.send(`Review with the isbn  ${isbn} for user ${username} has been deleted.`);

    
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;


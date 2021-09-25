

const db = require("./database/index.js");

const express = require("express");
const { json } = require("express");
const app = express();
app.use(express.json());

//http://localhost:3000
app.get("/",(req,res)=>{
    const getAllBooks = db.books;
    return res.json({"welcome":"to my backend softwar for book API"});
});

//http://localhost:3000/books
app.get("/books",(req,res)=>{
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});

//http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn",(req,res)=>{
    const isbn = req.params.isbn;
    console.log(req.params.isbn);
    const getSpecificBook = db.books.filter((book)=> book.ISBN === isbn);
    if(getSpecificBook.length===0){
    return res.json({"error":`No book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
});

//http://localhost:3000/book-category/programming
app.get("/book-category/:category",(req,res)=>{
    const category = req.params.category;
    const getSpecificBook = db.books.filter((book)=>book.category.includes(category));
    if(getSpecificBook.length===0){
    return res.json({"error":`No book found for the category of ${category}`});
    }
    return res.json(getSpecificBook);
});

//http://localhost:3000/authors
app.get("/authors",(req,res)=>{
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});

//http://localhost:3000/author-id/1
app.get("/authors/:id",(req,res)=>{
   const id = req.params.id;
   const  getSpecificAuthor = db.authors.filter((author)=> author.id == id);
   if(getSpecificAuthor.length===0){
    return res.json({"error":`No author found for the ID of ${id}`});
    }
    return res.json(getSpecificAuthor[0]);
});

//http://localhost:3000/author-isbn/12345ONE
app.get("/authors-isbn/:isbn",(req,res)=>{
    const isbn = req.params.isbn;
    const getSpecificAuthor = db.authors.filter((author)=>author.books.includes(isbn));
    if(getSpecificAuthor.length===0){
    return res.json({"error":`No Author found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificAuthor);
});

//http://localhost:3000/publications
app.get("/publications",(req,res)=>{
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

//http://localhost:3000/publication-id/1
app.get("/publications-id/:id",(req,res)=>{
    const id = req.params.id;
    const  getSpecificPublications = db.publications.filter((publication)=> publication.id == id);
    if(getSpecificPublications.length===0){
     return res.json({"error":`No publication found for the ID of ${id}`});
     }
     return res.json(getSpecificPublications[0]);
 });

 //http://localhost:3000/publication-isbn/12345ONE
app.get("/publication-isbn/:isbn",(req,res)=>{
    const isbn = req.params.isbn;
    const getSpecificPublication = db.publications.filter((publication)=>publication.books.includes(isbn));
    if(getSpecificPublication.length===0){
    return res.json({"error":`No publication found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificPublication);
});


//http://localhost:3000/book
app.post("/book",(req,res)=>{
db.books.push( req.body);
 return res.json(db.books);
});

//http://localhost:3000/author
app.post("/author",(req,res)=>{
    db.authors.push( req.body);
     return res.json(db.authors);
    });
    
//http://localhost:3000/publication
app.post("/publication",(req,res)=>{
        db.publications.push( req.body);
         return res.json(db.publications);
        });

//http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn",(req,res)=>{
    const {isbn} = req.params;
    console.log(req.params);
    db.books.forEach((book)=>{
        if(book.ISBN === isbn){
            return {...book,...req.body};
        }
        return book;
    });
    return res.json(db.books);
    });


//http://localhost:3000/author-update/2
app.put("/author-update/:id",(req,res)=>{
    const {id} = req.params;
    console.log(req.body);
    db.authors.forEach((author)=>{
        if(author.id === id){
            console.log({...author,...req.body});
            return {...author,...req.body};
        }
        return author;
    });
    return res.json(db.authors);
    });


//http://localhost:3000/publication-update/2
app.put("/publication-update/:id",(req,res)=>{
    const {id} = req.params;
    console.log(req.body);
    db.publications.forEach((publication)=>{
        if(publication.id === id){
            console.log({...publication,...req.body});
            return {...publication,...req.body};
        }
        return publication;
    });
    return res.json(db.publications);
    });
    
//http://localhost:3000/book-delete/12345ONE
 app.delete("/book-delete/:isbn",(req,res)=>{
     const {isbn} = req.params;
    const filterBooks = db.books.filter((book)=> book.ISBN !== isbn);
    db.books =filterBooks;
    return res.json(db.books);
    });

//http://localhost:3000/author-delete/12345ONE
app.delete("/author-delete/:id",(req,res)=>{
    const {id} = req.params;
   const filterAuthor = db.authors.filter((author)=> author.id !== id);
   db.books =filterAuthor;
   return res.json(db.authors);
   });


//http://localhost:3000/publication-delete/12345ONE
app.delete("/publication-delete/:id",(req,res)=>{
    const {id} = req.params;
   const filterPublication = db.publications.filter((publication)=> publication.id !== id);
   db.books =filterPublication;
   return res.json(db.publications);
   });


//http://localhost:3000/book-author-delete/12345ONE/2
app.delete("/book-author-delete/:isbn/:id",(req,res)=>{
    let {isbn,id} = req.params;
    id = Number(id);
    db.books.forEach((book)=>{
        if(book.ISBN === isbn){
        
            if(!book.authors.includes(id)){
                return
            }
            book.authors = book.authors.filter((author)=>author !== id);
            return book;
            
        }
        return book;
    })
   return res.json(db.books);
   });
    


app.listen(3000, ()=>{
   console.log("duh jurv");
});





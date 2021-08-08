process.env.NODE_ENV = "test"
const request = require("supertest");
const app = require("../app");
const db = require("../db");


let book;

beforeEach(async function () {
  const newEdition = await db.query(`
    INSERT INTO books (isbn, amazon_url,author,language,pages,publisher,title,year)   
    VALUES('4868986512', 'https://amazon.com/books', 'Mr.O', 'English', 50,  
          'Mr.O publishing', 'Mr.O Adventures', 2012) 
    RETURNING isbn, author`);

  book = newEdition.rows[0]
  console.log(book)
});


describe("GET /books", function () {
  test("List all books", async function () {
    const res = await request(app).get(`/books`);
    const { books }  = res.body;
    expect(books).toHaveLength(1);
  });
});


describe("GET /books/:isbn", function () {
  test("Return 1 book", async function () {
    const res = await request(app).get(`/books/${book.isbn}`)
    expect(res.body.book.isbn).toBe(book.isbn);
  });

  test("404 book not found", async function () {
    const res = await request(app).get(`/books/10`)
    expect(res.statusCode).toBe(404);
  });
});


describe("POST /books", function () {
  test("Creates a new book", async function () {
    const res = await request(app)
        .post(`/books`)
        .send({
          isbn: '7894682489',
          amazon_url: "https://amazon.com/moon",
          author: "Mr.P",
          language: "English",
          pages: 80,
          publisher: "Mr.P publishing",
          title: "Mr.P Adventures",
          year: 2012
        });
    expect(res.statusCode).toBe(201);
  });
});

describe("PUT /books/:isbn", function () {
  test("Updates a single book", async function () {
    const res = await request(app)
        .put(`/books/${book.isbn}`)
        .send({
        isbn: book.isbn,
        amazon_url: "https://amazon.com/moon",
        author: "Mr.P",
        language: "English",
        pages: 80,
        publisher: "Mr.P publishing",
        title: "Mr.P Adventures",
        year: 2012
     });
    expect(res.statusCode).toBe(200);
    console.log(res.body.book)
    expect(res.body.book.author).toBe("Mr.P");
  });
});


describe("DELETE /books/:id", function () {
  test("Deletes a single a book", async function () {
    const res = await request(app).delete(`/books/${book.isbn}`)
    expect(res.body).toEqual({message: "Book deleted"});
  });
});


afterEach(async function () {
  await db.query("DELETE FROM BOOKS");
});


afterAll(async function () {
  await db.end()
});

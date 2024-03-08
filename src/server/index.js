import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "reactbook_db"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("hello this is the backend")
})

app.get("/books", (req, res) => {
  const q = "select * from books"
  db.query(q, (err, data) => {
    if(err) {
      return res.json(err)
    }
    return res.json(data)
  })
})

app.post("/books", (req, res) => {
  const q = "insert into books (`book_title`, `book_desc`, `book_cover`, `book_price`) values (?)"
  const values = [
    req.body.book_title,
    req.body.book_desc,
    req.body.book_cover,
    req.body.book_price
  ]

  db.query(q, [values], (err, data) => {
    if(err) {
      return res.json(err)
    }
    return res.json("Book successfully added")
  })
})

app.delete("/books/:id", (req, res) => {
  const book_id = req.params.id
  const q = "delete from books where book_id = ?"

  db.query(q, [book_id], (err, data) => {
    if(err) {
      return res.json(err)
    }
    return res.json("Book successfully deleted!")
  })
})

app.put("/books/:id", (req, res) => {
  const book_id = req.params.id
  const q = "update  books set `book_title` = ?, `book_desc` = ?, `book_cover` = ?, `book_price` = ? where book_id = ?"

  const values = [
    req.body.book_title,
    req.body.book_desc,
    req.body.book_cover,
    req.body.book_price
  ]

  db.query(q, [...values, book_id], (err, data) => {
    if(err) {
      return res.json(err)
    }
    return res.json("Book successfully updated!")
  })
})

app.listen(8800, () => {
  console.log("Connect to backend!");
});
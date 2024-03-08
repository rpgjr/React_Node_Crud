import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data)
      } catch(err) {
        console.log(err);
      }
    }
    fetchAllBooks()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id)
      window.location.reload()
    } 
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          Book Cover
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Book Title
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Book Description
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Book Price
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {books.map(book => (
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td class="px-6 py-4">
                        {/* <img src={book.book_cover} alt="book cover" /> */}
                        {book.book_cover}
                      </td>
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={book.book_id}>
                          {book.book_title}
                      </th>
                      <td class="px-6 py-4">
                          {book.book_desc}
                      </td>
                      <td class="px-6 py-4">
                          {book.book_price}
                      </td>
                      <td class="px-6 py-4">
                          <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"><Link to={`/update/${book.book_id}`}>Edit</Link></button>
                          <button class="ms-2 font-medium text-red-600 dark:text-blue-500 hover:underline" onClick={() => handleDelete(book.book_id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>

    </div>
  )
}

export default Books
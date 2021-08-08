const BASE_URL = "http://localhost:3000/books";

async function getBooks(){

try{
	const res = await axios.get(BASE_URL);
	// console.log(res);

	$(".data").empty();

	res.data.books.forEach(book => { 
	let $books = $(`
		<tr>
        <td>${book.isbn}</td>
        <td>${book.amazon_url}</td>
        <td>${book.author}</td>
        <td>${book.language}</td>
        <td>${book.pages}</td>
        <td>${book.publisher}</td>
        <td>${book.title}</td>
        <td>${book.year}</td>
        <tr>
   `)

	$(".data").append($books);
 });
} catch(error){
	console.log(error);
}
}


async function getBookID(){

try{
	const input = $("#search").val();
	const res = await axios.get(`${BASE_URL}/${input}`);

  console.log(input)
    $(".data").empty();

    let $result = (`
       <center>
         <h1 style="margin-top: 20px; margin-bottom: 20px;">
            Book Found 
         </h1>
       </center>
       
       <table class="table">
       <thead>
        <tr>
         <th scope="col">isbn</th>
         <th scope="col">Amazon_url</th>
         <th scope="col">Author</th>
         <th scope="col">Language</th>
         <th scope="col">Pages</th>
         <th scope="col">Publisher</th>
         <th scope="col">Title</th>
         <th scope="col">Year</th>
        </tr>
       </thead>
     <tbody>
       <tr>
        <td>${res.data.book.isbn}</td>
        <td>${res.data.book.amazon_url}</td>
        <td>${res.data.book.author}</td>
        <td>${res.data.book.language}</td>
        <td>${res.data.book.pages}</td>
        <td>${res.data.book.publisher}</td>
        <td>${res.data.book.title}</td>
        <td>${res.data.book.year}</td>
      </tr>
     </tbody>
    </table>
    
    `);

    $(".data").append($result);


 } catch(error){
 console.log(error);

 	if (error.response.status == 404) {
    $(".data").empty();

    	let $msg = (`
    		<center>
          <h1 style="margin-top: 20px; margin-bottom: 20px;">
            No book found
          </h1>
        </center>

        `);

        $(".data").append($msg);
  }
 }
}


$('#formFindBook').on('submit' ,function(e){
    e.preventDefault();
    getBookID();
});


async function addBook(){

  const isbn = $("#isbn").val();
  const amazon_url = $("#amazon_url").val();
  const author = $("#author").val();
  const language = $("#language").val();
  const pages = $("#pages").val();
  const publisher = $("#publisher").val();
  const title = $("#title").val();
  const year = $("#year").val();

  const content = {
          isbn: isbn,
          amazon_url: amazon_url,
          author: author,
          language: language,
          pages: Number(pages),
          publisher: publisher,
          title: title,
          year: Number(year)
        }

try{
  const res = await axios.post(BASE_URL, content);

  $(".data").empty();

  let $result = (`
       <center>
         <h1 style="margin-top: 20px; margin-bottom: 20px;">
            Book Added go to all books to view results
         </h1>
       </center>
       `);

  $(".data").append($result);

  // console.log($result);

} catch(error){
  console.log(error)
  if (error.response.status == 500) {
    $(".data").empty();

      let $msg = (`
        <center>
          <h1 style="margin-top: 20px; margin-bottom: 20px;">
            ISBN already in use
          </h1>
        </center>

        `)

        $(".data").append($msg);
  }
}

}


$('#formAddBook').on('submit' ,function(e){
    e.preventDefault();
    addBook();
});



async function deleteBook(){

try{
	const input = $("#search").val();
	const res = await axios.delete(`${BASE_URL}/${input}`);

	 $(".data").empty()

  let $result = (`
       <center>
         <h1 style="margin-top: 20px; margin-bottom: 20px;">
            Book Deleted
         </h1>
       </center>
       `);

  $(".data").append($result)

} catch(error){
	if (error.response.status == 404) {
    $(".data").empty();

    	let $msg = (`
    		<center>
          <h1 style="margin-top: 20px; margin-bottom: 20px;">
            ISBN does not exist
          </h1>
        </center>

        `)

        $(".data").append($msg);
  }
}

}


$('#formDeleteBook').on('submit' ,function(e){
    e.preventDefault();
    deleteBook();
});





























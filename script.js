const addModalWindow = document.getElementById("addModalWindowId"); 
const closeModalWindowButton = document.getElementById("closeModalButton"); 
const openModalWindowButton = document.getElementById("addModalButton"); 
const bookSave = document.getElementById("bookSave"); 

const catalog_create = document.getElementById("catalog"); 

closeModalWindowButton.addEventListener("click", closeModalWindow); 
openModalWindowButton.addEventListener("click", openModalWindow); 
bookSave.addEventListener("click", saveBook); 

function closeModalWindow() {
  addModalWindow.style.display = "none"; 
}
  
function openModalWindow() {
  addModalWindow.style.display = "flex"; 
}

let books = [
    {
      id: 1,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
      year: '1994',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
    },
    {
      id: 2,
      title: 'JavaScript: The Good Parts',
      authors: 'Douglas Crockford',
      year: '2008',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
    },
    {
      id: 3,
      title:
      'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
      authors: 'Stoyan Stefanov',
      year: 2008,
      image:
      'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
    },
    {
      id: 4,
      title:
      'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
      authors: 'David Flanagan',
      year: 2011,
      image:
      'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg'
    },
];

function renderBooks() {
  
  catalog_create.innerHTML = ""; 

    books.forEach((book) => {
      
      catalog_create.innerHTML += ` 
      <div class="book_style"> 
        <div class="book">
          <div class="book_image"><img src="${book.image}" class="book_image_style"/></div>
          <div class="book_title">${book.title}</div>
          <div class="book_year">${book.year}</div>
          <div class="book_author">${book.authors}</div>
          
          <div class="book_buttons">
          
            <button id="openWindowUpdate-${book.id}" class="book_button">Изменить</button>
            <button id="deleteBookButton-${book.id}" class="book_button">Удалить</button>
            
          </div>
        </div>
      </div>
    `;
  });

    books.forEach((book) => {
      document
        .getElementById(`deleteBookButton-${book.id}`)
        .addEventListener("click", () => {
          deleteBook(book.id); 
        });
    });

    books.forEach((book) => {
      document
        .getElementById(`openWindowUpdate-${book.id}`)
        .addEventListener("click", () => {
          openUpdateWindow(book.id); 
        });
    });

  saveToLocalStorage(); 
}

function saveBook() {
  
  const bookNameValue = document.getElementById("bookName").value; 
  const bookAuthorValue = document.getElementById("bookAuthor").value; 
  const bookYearValue = document.getElementById("bookYear").value; 
  const bookImageValue = document.getElementById("bookImage").value;

  const book = {
    id: books.length +1,
    title: bookNameValue,
    authors: bookAuthorValue,
    year: bookYearValue,
    image: getImage(bookImageValue),
  };

  books.push(book); 
  renderBooks(); 
  clearField(); 
  closeModalWindow();
  saveToLocalStorage(); 
}

function saveToLocalStorage() {
  
  const booksJson = JSON.stringify(books); 
  localStorage.setItem("books", booksJson); 

}

function deleteBook(id) {
  
  const bookDel = books.find((findBook) => {
    return findBook.id === id; 
  });
  const bookIndex = books.indexOf(bookDel); 
  books.splice(bookIndex, 1); 

  renderBooks();
  saveToLocalStorage();
}

function clearField() {
  document.getElementById("bookName").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookYear").value = "";
  document.getElementById("bookImage").value = "";
}

function getImage(bookImageValue) {
  let checkImage;

  if (bookImageValue) {
    checkImage = bookImageValue;
  } else {
    checkImage = "./none-image.jpg";
  }
  return checkImage;
}

const booksJson = localStorage.getItem("books"); 

if (booksJson) {
  books = JSON.parse(booksJson);
}

const updateWindow = document.getElementById("addUpdateWindow"); 
const updateCloseButton = document.getElementById("updateCloseButton"); 
const updateBookButton = document.getElementById("updateBookButton"); 

updateCloseButton.addEventListener("click", closeUpdateWindow); 

function closeUpdateWindow() {
  updateWindow.style.display = "none"; 
}

function updateInput(book) {
  document.getElementById("bookNameUpdate").value = book.title;
  document.getElementById("bookAuthorUpdate").value = book.authors;
  document.getElementById("bookYearUpdate").value = book.year;
  document.getElementById("bookImageUpdate").value = book.image;
}

function openUpdateWindow(id) {
  
  updateWindow.style.display = "flex";

  const book = books.find((findBook) => {
    return findBook.id === id; 
  });

  updateInput(book); 
  const makeUpdate = () => updateBook(book.id, makeUpdate);
  updateBookButton.addEventListener("click", makeUpdate);
}

function updateBook(id, makeUpdate) {
  
  let book = books.find((findBook) => {
    
    return findBook.id === id; 
  });

  const bookIndexUp = books.indexOf(book); 

  const nameUpdate = document.getElementById("bookNameUpdate").value;
  const authorUpdate = document.getElementById("bookAuthorUpdate").value;
  const yearUpdate = document.getElementById("bookYearUpdate").value;
  const imageUpdate = document.getElementById("bookImageUpdate").value;

  const newBook = {
    id,
    title: nameUpdate,
    authors: authorUpdate,
    year: yearUpdate,
    image: getImage(imageUpdate),
  };

  updateBookButton.removeEventListener("click", makeUpdate); 
  books.splice(bookIndexUp, 1, newBook); 
  renderBooks();
  saveToLocalStorage();
  closeUpdateWindow();
}

renderBooks();

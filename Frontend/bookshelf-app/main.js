const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('bookForm');
  const checkbox = document.getElementById('bookFormIsComplete');
  const submitButtonText = submitForm.querySelector('span');

  if (isStorageExist()) {
    loadDataFromStorage();
  }

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      submitButtonText.innerText = 'Selesai dibaca';
    } else {
      submitButtonText.innerText = 'Belum selesai dibaca';
    }
  });

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});

function addBook() {
  const bookTitle = document.getElementById('bookFormTitle').value;
  const bookAuthor = document.getElementById('bookFormAuthor').value;
  const bookYear = Number(document.getElementById('bookFormYear').value);
  const bookIsComplete = document.getElementById('bookFormIsComplete').checked; // Ambil status checkbox

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, bookIsComplete); // Gunakan nilai checkbox
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  const unreadBookList = document.getElementById('incompleteBookList');
  unreadBookList.innerHTML = '';

  const readBookList = document.getElementById('completeBookList');
  readBookList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = publishBook(bookItem);

    if (!bookItem.isComplete) {
      unreadBookList.append(bookElement);
    } else {
      readBookList.append(bookElement);
    }
  }
});

function publishBook(bookObject) {
  const publishedTitle = document.createElement('h3');
  publishedTitle.innerText = bookObject.title;
  publishedTitle.setAttribute('data-testid', 'bookItemTitle');

  const publishedAuthor = document.createElement('p');
  publishedAuthor.innerText = `Penulis: ${bookObject.author}`;
  publishedAuthor.setAttribute('data-testid', 'bookItemAuthor');

  const publishedYear = document.createElement('p');
  publishedYear.innerText = `Tahun: ${bookObject.year}`;
  publishedYear.setAttribute('data-testid', 'bookItemYear');

  const listContainer = document.createElement('div');
  listContainer.classList.add('inner');
  listContainer.append(publishedTitle, publishedAuthor, publishedYear);

  const container = document.createElement('div');
  container.classList.add('book-item');
  container.append(listContainer);
  container.setAttribute('data-bookid', `${bookObject.id}`);
  container.setAttribute('data-testid', 'bookItem');

  if (bookObject.isComplete) {
    const incompleteButton = document.createElement('button');
    incompleteButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    incompleteButton.innerHTML = 'Belum Selesai dibaca';
    incompleteButton.addEventListener('click', function () {
      sendBookToIncomplete(bookObject.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.innerHTML = 'Hapus buku';
    deleteButton.addEventListener('click', function () {
      sendBookToTrash(bookObject.id);
    });
    container.append(incompleteButton, deleteButton);
  } else {
    const completedButton = document.createElement('button');
    completedButton.setAttribute('data-testid', 'bookItemNotCompleteButton');
    completedButton.innerHTML = 'Selesai dibaca';
    completedButton.addEventListener('click', function () {
      sendBookToComplete(bookObject.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.innerHTML = 'Hapus buku';
    deleteButton.addEventListener('click', function () {
      sendBookToTrash(bookObject.id);
    });
    container.append(completedButton, deleteButton);
  }

  return container;
}

function sendBookToComplete(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function sendBookToIncomplete(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function sendBookToTrash(bookId) {
  const bookIndex = findBookIndex(bookId);

  if (bookIndex === -1) return;

  books.splice(bookIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}


function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function saveData(){
    if(isStorageExist()){
        const parsed = JSON.stringify(books)
        localStorage.setItem(STORAGE_KEY, parsed)
        document.dispatchEvent(new Event(SAVED_EVENT))
    }
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(STORAGE_KEY)
    let data = JSON.parse(serializedData)

    if (data !== null){
        for (const book of data){
            books.push(book)
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }
  document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });
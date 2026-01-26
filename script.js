if (localStorage.getItem("books") === null) {
  localStorage.setItem(
    "books",
    JSON.stringify([
      {
        id: 1,
        title: "JavaScript для початківців",
        author: "Іван Петренко",
        year: 2021,
        description:
          "Книга знайомить з основами JavaScript та пояснює ключові поняття простою мовою.",
      },
      {
        id: 2,
        title: "Сучасний JavaScript",
        author: "Олена Коваль",
        year: 2020,
        description:
          "Посібник з сучасних можливостей JavaScript та прикладів їх використання.",
      },
      {
        id: 3,
        title: "Веб-розробка з нуля",
        author: "Андрій Мельник",
        year: 2019,
        description:
          "Книга про створення веб-застосунків з використанням HTML, CSS та JavaScript.",
      },
    ]),
  );
}

const root = document.querySelector("#root");

const title = document.createElement("h1");
title.textContent = "Список книг";

const markup = document.createElement("div");
markup.style.display = "flex";
markup.style.justifyContent = "space-between";
root.append(markup);

const border = "2px solid black";
const padding = "20px";

const bookListContainer = document.createElement("div");
bookListContainer.style.border = border;
bookListContainer.style.padding = padding;
markup.append(bookListContainer);
bookListContainer.append(title);

const bookList = document.createElement("ul");
bookListContainer.append(bookList);

const addBookBtn = document.createElement("button");
addBookBtn.textContent = "Add Book";
bookListContainer.append(addBookBtn);

const bookDescContainer = document.createElement("div");
bookDescContainer.style.maxWidth = "50%";
markup.append(bookDescContainer);

const notification = document.createElement("div");

function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function showBookList() {
  bookList.innerHTML = "";

  getBooks().forEach(book => {
    const listItem = document.createElement("li");
    listItem.style.marginBottom = "10px";

    const bookTitle = book.title + " ";

    const detailsButton = document.createElement("button");
    detailsButton.textContent = "View Details";
    detailsButton.style.marginRight = "5px";
    detailsButton.addEventListener("click", () => showDetails(book));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete book";
    deleteButton.addEventListener("click", () => deleteBook(book));

    listItem.append(bookTitle, detailsButton, deleteButton);
    bookList.appendChild(listItem);
  });
}

function showDetails(book) {
  bookDescContainer.innerHTML = "";
  bookDescContainer.style.border = border;
  bookDescContainer.style.padding = padding;

  bookDescContainer.innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Автор:</strong> ${book.author}</p>
    <p><strong>Рік видання:</strong> ${book.year}</p>
    <p><strong>Опис:</strong> ${book.description}</p>
  `;
}

function deleteBook(book) {
  const filteredBooks = getBooks().filter(item => item.id !== book.id);
  localStorage.setItem("books", JSON.stringify(filteredBooks));
  showBookList();
  bookDescContainer.innerHTML = "";
  bookDescContainer.style.border = "none";
  showNotification();
}

function showNotification() {
  notification.innerHTML = "";
  setTimeout(() => {
    notification.innerHTML = "<strong>Книгу успішно видалено!</strong>";
    notification.style.width = "25%";
    notification.style.textAlign = "center";
    notification.style.padding = padding;
    notification.style.border = border;
    markup.append(notification);
  }, 1000);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function addDescription() {
  bookDescContainer.innerHTML = "";
  bookDescContainer.style.border = border;
  bookDescContainer.style.padding = padding;

  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "30px";

  form.innerHTML = `
    <label>Title <input name="title"></label>
    <label>Author <input name="author"></label>
    <label>Year <input name="year"></label>
    <label>Description <textarea name="desc", rows="5", cols="40"></textarea></label>
    <button type="submit">Submit</button>
  `;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(e.target);

    const book = {
      //
      id: Date.now() + Math.random(),
      title: data.get("title"),
      author: data.get("author"),
      year: data.get("year"),
      description: data.get("desc"),
    };

    if (Object.values(book).includes("")) {
      alert("Поля не мають бути пустими!");
    } else if (Number.isNaN(Number(book.year))) {
      alert("Рік має бути числом");
    } else {
      const newBooks = getBooks();
      newBooks.push(book);
      localStorage.setItem("books", JSON.stringify(newBooks));
      showBookList();
      bookDescContainer.innerHTML = "";
      bookDescContainer.style.border = "none";
    }
  });

  bookDescContainer.append(form);
}

addBookBtn.addEventListener("click", addDescription);

showBookList();

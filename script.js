const BASE_URL = "https://6971cf4a32c6bacb12c49096.mockapi.io/books";

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

function showBookList() {
  bookList.innerHTML = "";

  fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {
      data.forEach(book => {
        const listItem = document.createElement("li");
        listItem.id = book.id;
        listItem.style.marginBottom = "10px";

        const bookTitle = book.title + " ";

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "View Details";
        detailsButton.style.marginRight = "5px";
        detailsButton.addEventListener("click", () => showDetails(book));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete book";
        deleteButton.addEventListener("click", event => deleteBook(event));

        listItem.append(bookTitle, detailsButton, deleteButton);
        bookList.appendChild(listItem);
      });
    })
    .catch(error => console.log(error));
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

function deleteBook(e) {
  const id = e.target.parentNode.id;
  console.log(id);
  const options = {
    method: "DELETE",
  };
  fetch(`${BASE_URL}/${id}`, options)
    .then(() => {
      showBookList();
      showNotification();
    })
    .catch(error => console.log(error));
}

function showNotification() {
  notification.innerHTML = "";
  bookDescContainer.innerHTML = "";
  bookDescContainer.style.border = "none";
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
      title: data.get("title"),
      author: data.get("author"),
      year: data.get("year"),
      description: data.get("desc"),
      id: Date.now() + Math.random(),
    };

    if (Object.values(book).includes("")) {
      alert("Поля не мають бути пустими!");
    } else if (Number.isNaN(Number(book.year))) {
      alert("Рік має бути числом");
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json; charset = UTF-8",
        },
      };

      fetch(BASE_URL, options)
        .then(() => {
          showBookList();
          bookDescContainer.innerHTML = "";
          bookDescContainer.style.border = "none";
        })
        .catch(error => console.log(error));
    }
  });

  bookDescContainer.append(form);
}

addBookBtn.addEventListener("click", addDescription);

showBookList();

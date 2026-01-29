const BASE_URL = "https://6971cf4a32c6bacb12c49096.mockapi.io/books";

const root = document.querySelector("#root");

const title = document.createElement("h1");

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
  title.textContent = "LOADING...";

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
        detailsButton.addEventListener("click", event => {
          showDetails(event);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete book";
        deleteButton.addEventListener("click", event => deleteBook(event));

        listItem.append(bookTitle, detailsButton, deleteButton);
        bookList.appendChild(listItem);
      });
    })
    .catch(error => console.log(error))
    .finally(() => {
      title.textContent = "Список книг";
    });
}

function showDetails(e) {
  bookDescContainer.innerHTML = "";
  bookDescContainer.style.border = border;
  bookDescContainer.style.padding = padding;

  const id = e.target.parentNode.id;
  const button = e.target;
  button.textContent = "Loading...";

  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(data => {
      bookDescContainer.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Автор:</strong> ${data.author}</p>
        <p><strong>Рік видання:</strong> ${data.year}</p>
        <p><strong>Опис:</strong> ${data.description}</p>
      `;
    })
    .catch(error => console.log(error))
    .finally(() => (button.textContent = "View Details"));
}

function deleteBook(e) {
  const id = e.target.parentNode.id;
  const options = {
    method: "DELETE",
  };
  e.target.textContent = "Deleteing...";
  fetch(`${BASE_URL}/${id}`, options)
    .then(() => {
      showBookList();
      showNotification();
    })
    .catch(error => console.log(error))
    .finally(() => (e.target.textContent = "Delete book"));
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
    };

    if (
      Object.values(book).some(value => value === null || value.trim() === "")
    ) {
      alert("Поля не мають бути пустими!");
    } else if (!Number.isInteger(Number(book.year))) {
      alert("Рік має бути числом");
    } else {
      const options = {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json; charset = UTF-8",
        },
      };

      const submitButton = form.querySelector("button");
      submitButton.textContent = "Submiting...";

      fetch(BASE_URL, options)
        .then(() => {
          showBookList();
          bookDescContainer.innerHTML = "";
          bookDescContainer.style.border = "none";
        })
        .catch(error => console.log(error))
        .finally(() => (submitButton.textContent = "Submit"));
    }
  });

  bookDescContainer.append(form);
}

addBookBtn.addEventListener("click", addDescription);

showBookList();

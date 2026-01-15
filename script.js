const books = [
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
];

const root = document.querySelector("#root");

const title = document.createElement("h1");
title.textContent = "Список книг";

const markup = document.createElement("div");
markup.style.display = "flex";
markup.style.gap = "40px";
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

function showBookList() {
  bookList.innerHTML = "";

  books.forEach(book => {
    const listItem = document.createElement("li");
    listItem.style.marginBottom = "10px";

    const bookTitle = book.title + " ";

    const button = document.createElement("button");
    button.textContent = "View Details";
    button.addEventListener("click", () => showDetails(book));

    listItem.append(bookTitle, button);
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
      id: books.length > 0 ? books.length + 1 : 1,
      title: data.get("title"),
      author: data.get("author"),
      year: data.get("year"),
      desc: data.get("desc"),
    };

    if (Object.values(book).includes("")) {
      console.warn("Поля не мають бути пустими!");
    } else if (Number.isNaN(Number(book.year))) {
      console.warn("Рік має бути числом");
    } else {
      books.push({
        id: book.id,
        title: book.title,
        author: book.author,
        year: Number(book.year),
        description: book.desc,
      });
    }

    showBookList();
    bookDescContainer.innerHTML = "";
    bookDescContainer.style.border = "none";
  });

  bookDescContainer.append(form);
}

addBookBtn.addEventListener("click", addDescription);

showBookList();

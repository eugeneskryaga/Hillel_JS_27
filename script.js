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

const addBook = document.createElement("button");
addBook.textContent = "Add Book";

const bookDescContainer = document.createElement("div");
markup.append(bookDescContainer);

function showDetails(book) {
  bookDescContainer.innerHTML = "";

  bookDescContainer.style.border = border;
  bookDescContainer.style.padding = padding;

  const title = document.createElement("h2");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.innerHTML = `<strong>Автор</strong> ${book.author}`;

  const year = document.createElement("p");
  year.innerHTML = `<strong>Рік видання</strong> ${book.year}`;

  const desc = document.createElement("p");
  desc.innerHTML = `<strong>Опис</strong> ${book.description}`;

  bookDescContainer.append(title, author, year, desc);
}

function addDescription(books) {
  bookDescContainer.innerHTML = "";

  bookDescContainer.style.border = border;
  bookDescContainer.style.padding = padding;

  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.flexDirection = "column";

  const margin = "30px";

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Enter title: ";
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("name", "title");
  titleLabel.style.marginBottom = margin;
  titleLabel.append(inputTitle);

  const authorLabel = document.createElement("label");
  authorLabel.textContent = "Enter author: ";
  const inputAuthor = document.createElement("input");
  inputAuthor.setAttribute("name", "author");
  authorLabel.style.marginBottom = margin;
  authorLabel.append(inputAuthor);

  const yearLabel = document.createElement("label");
  yearLabel.textContent = "Enter publishing year: ";
  const inputYear = document.createElement("input");
  inputYear.setAttribute("name", "year");
  yearLabel.style.marginBottom = margin;
  yearLabel.append(inputYear);

  const descLabel = document.createElement("label");
  descLabel.textContent = "Enter description: ";
  const inputDesc = document.createElement("input");
  inputDesc.setAttribute("name", "desc");
  descLabel.style.marginBottom = margin;
  descLabel.append(inputDesc);

  const submit = document.createElement("button");
  submit.textContent = "Submit";

  form.append(titleLabel, authorLabel, yearLabel, descLabel, submit);
  bookDescContainer.append(form);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(e.target);

    const title = data.get("title");
    const author = data.get("author");
    const year = data.get("year");
    const desc = data.get("desc");
    const id = books.length + 1;

    const book = {
      id: id,
      title: title,
      author: author,
      year: year,
      description: desc,
    };

    books.push(book);
  });
}

const bookList = document.createElement("ul");
bookListContainer.append(bookList);

books.forEach(book => {
  const listItem = document.createElement("li");
  listItem.style.marginBottom = "10px";

  const bookTitle = book.title + " ";

  const button = document.createElement("button");
  button.textContent = "View Details";
  button.addEventListener("click", () => showDetails(book));

  listItem.append(bookTitle, button);
  bookList.appendChild(listItem);

  bookListContainer.append(addBook);
  addBook.addEventListener("click", () => addDescription(books));
});

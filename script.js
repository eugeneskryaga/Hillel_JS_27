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

const bookListContainer = document.createElement("div");
const border = "2px solid black";
const padding = "20px";
bookListContainer.style.border = border;
bookListContainer.style.padding = padding;
markup.append(bookListContainer);
bookListContainer.append(title);

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
});

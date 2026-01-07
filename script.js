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

root.append(title);

const bookList = document.createElement("ul");
root.append(bookList);

books.forEach(book => {
  const bookListItem = document.createElement("li");
  bookListItem.textContent = book.title + " ";
  bookList.append(bookListItem);
});

const bookListItems = bookList.querySelectorAll("li");

bookListItems.forEach(li => {
  const viewDetailsBtn = document.createElement("button");
  viewDetailsBtn.textContent = "View Details";
  li.append(viewDetailsBtn);
});

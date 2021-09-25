//Page: <All> - Single Page Application, make Navbar in Footer clickable

const pages = document.querySelectorAll(".page");
const linkList = document.querySelectorAll("footer a");

linkList.forEach((link) => {
  link.addEventListener("click", () => {
    pages.forEach((page) => {
      page.classList.remove("current");
    });

    const hrefAttribute = link.getAttribute("href");
    const nextPage = document.querySelector(hrefAttribute);
    nextPage.classList.add("current");
  });
});

//Page: <Create> - 

let createNewQuestionList = [
  {question: "Warum können Schweine nicht Fahrrad fahren?", answer: "Weil sie keinen Daumen zum Klingeln haben.", tags: "topkek lolionator", isBookmarked: false},
  {question: "Was macht ein Pirat am Computer?", answer: "Er drückt die Enter-Taste", tags: "flach löl", isBookmarked: false},
];

const createQuestionsHTML = (createNewQuestionList) => {
  let html = "";

  createNewQuestionList.forEach((questionObject, index) => {
    let tags = "";
    const tagsArray = questionObject.tags.split(" ");
    tagsArray.forEach((item) => {
      tags = tags + `<p class="homeTags">${item}</p>`
    });
    const bookmarkedClass = questionObject.isBookmarked ? " homeBookmarkToggle" : "";

    html = html + `
    <article>
    <div class="homeContainer">
      <div class="homeHeadline">
        <h2>Question:</h2>
        <img class="homeBookmark$(bookmarkedClass)" src="images/bookmark.png" data-index="${index}">
        </div>
      <p class="homeQuestion">${questionObject.question}</p>
      <div class="answerToggle">
        <button class="homeAnswerButton buttonToggle">Show answer</button>
        <p class="homeAnswer homeAnswerToggle">${questionObject.answer}</p>
      </div>
      <div class="homeTagContainer">
      ${tags}
      </div>
    </article>
    `;
  });
  console.log("Created HTML:", html);
  return html;
};

//Page: <Create & Home> - Transfer Output from "create"-form to "Home"-Tab

const renderNewQuestion = () => {
  const questionsHTML = createQuestionsHTML(createNewQuestionList);
  const questionsContainer = document.querySelector("#transferQuestion");
  questionsContainer.innerHTML = questionsHTML;

  //Page: <Home> - Highlight Bookmark Button
  const bookmarks = document.querySelectorAll(".homeBookmark");

  bookmarks.forEach((bookmark) => {
    bookmark.addEventListener("click", () => {
      bookmark.classList.toggle("homeBookmarkToggle");
    });
  });

  //Page: <Home> - Toggle Show Answer
  const answerButtonToggle = document.querySelectorAll(".answerToggle");

  answerButtonToggle.forEach((homeAnswerButton) => {
    const answerButton = homeAnswerButton.querySelector(".homeAnswerButton");
    const answer = homeAnswerButton.querySelector(".homeAnswerToggle");
    answerButton.addEventListener("click", () => {
      answer.classList.toggle("homeAnswerToggle");
    });
  });
};

renderNewQuestion();

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  createNewQuestionList.push({
    question: form.elements.question.value,
    answer: form.elements.answer.value,
    tags: form.elements.tags.value,
    isbookmarked: false,
  });
  renderNewQuestion();
  console.log(createNewQuestionList);
  event.preventDefault();
  form.reset();
});

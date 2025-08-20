// Fun Fact Generator
function showRandomFunFact() {
  if (
    typeof funFacts === "undefined" ||
    funFacts.length === 0 ||
    loadingSurveyText === "undefined"
  ) {
    //console.error("funFacts is not defined or is empty.");
    return;
  }
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  const fact = funFacts[randomIndex];
  const titleEl = document.querySelector(".fun-fact-text1");
  const contentEl = document.querySelector(".fun-fact-text2");
  const loadingSurveyTextEl = document.querySelector(".loading-survey-text");

  localStorage.setItem("fun-fact-title", fact.title);
  localStorage.setItem("fun-fact-content", fact.content);
  localStorage.setItem("loading-survey-text", loadingSurveyText);

  if (titleEl && contentEl) {
    titleEl.textContent = fact.title;
    contentEl.textContent = fact.content;
    loadingSurveyTextEl.textContent = loadingSurveyText;
  } else {
    //console.warn("Missing .fun-fact-text1 or .fun-fact-text2 in DOM");
  }
}

function checkAndShowFunFact() {
  const storedSessionId = localStorage.getItem("fun-fact-sessionId");

  if (reVisit) {
    // Same session, do nothing
    const titleEl = document.querySelector(".fun-fact-text1");
    const contentEl = document.querySelector(".fun-fact-text2");
    const loadingSurveyTextEl = document.querySelector(".loading-survey-text");

    //get the random fact from localStorage
    const fact = {
      title: localStorage.getItem("fun-fact-title"),
      content: localStorage.getItem("fun-fact-content"),
    };
    const loadingSurveyText = localStorage.getItem("loading-survey-text");

    //check if the fact is not null or undefined avoid user clearing localStorage
    if (!fact.title || !fact.content || !loadingSurveyText) {
      //console.error("No fun fact found in localStorage. Showing a new one.");
      showRandomFunFact();
      return;
    }

    titleEl.textContent = fact.title;
    contentEl.textContent = fact.content;
    loadingSurveyTextEl.textContent = loadingSurveyText;

    return;
  }
  showRandomFunFact();
}
checkAndShowFunFact();

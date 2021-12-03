const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter-button");
const quoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let quotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function completed() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  loading();
  let quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = quote.text;
  authText.textContent = quote.author || "Unknown";

  quote.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  completed();
}

async function getQuotes() {
  let apiUrl = "https://type.fit/api/quotes";

  try {
    loading();
    let apiResponse = await fetch(apiUrl);
    quotes = await apiResponse.json();
    newQuote();
  } catch (err) {
    console.error(err);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authText.textContent}`;
  window.open(twitterUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);
quoteBtn.addEventListener("click", newQuote);

getQuotes();

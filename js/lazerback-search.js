/**!
 * lazerback-search.js v0.1
 * Author: Marin Balabanov
 * Licence: CC0-1.0
 * https://github.com/mbalabanov/lazerback
 */

generateSearchModal();

let indexdata = [];
let inputElement = document.getElementById("searchInput");
let resultsElement = document.getElementById("searchResults");
let searchTerm = "";

if (inputElement && resultsElement) {
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchInText();
    }
  });
}

function triggerSearch() {
  import("./site-index.js").then((module) => {
    indexdata = module.indexdata;
  });

  const searchModal = new bootstrap.Modal(
    document.getElementById("searchModal")
  );

  inputElement.value = "";
  resultsElement.innerHTML = "";

  searchModal.show();

  searchModal._element.addEventListener("shown.bs.modal", () => {
    inputElement.focus();
  });
}

function searchInText() {
  searchTerm = inputElement.value;

  let searchResults = indexdata.filter((item) => {
    return item.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  resultsElement.innerHTML = "";
  displaySearchResults(searchResults);
}

function displaySearchResults(searchResults) {
  let urlEncodedSearchTerm = encodeURIComponent(searchTerm);
  searchResults.forEach((item) => {
    let itemAnchor = document.createElement("a");
    itemAnchor.classList.add("list-group-item");
    itemAnchor.href = `${item.url}?search=${urlEncodedSearchTerm}`;
    itemAnchor.textContent = item.title;
    resultsElement.appendChild(itemAnchor);
  });
}

function generateSearchModal() {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "searchModal";
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "searchModalLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-dialog-scrollable";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  const searchLabel = document.createElement("label");
  searchLabel.setAttribute("for", "searchInput");
  searchLabel.className = "fs-6";
  searchLabel.textContent = "Type your search term and press 'Return':";

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group mb-3";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "form-control";
  searchInput.id = "searchInput";
  searchInput.placeholder = "What would you like to find?";

  const searchButton = document.createElement("button");
  searchButton.className = "btn btn-outline-secondary";
  searchButton.type = "button";
  searchButton.textContent = "Search";
  searchButton.onclick = function() {
    searchInText();
  };

  inputGroup.appendChild(searchInput);
  inputGroup.appendChild(searchButton);

  const searchResults = document.createElement("ul");
  searchResults.id = "searchResults";
  searchResults.className = "list-group text-start";

  modalBody.appendChild(searchLabel);
  modalBody.appendChild(inputGroup);
  modalBody.appendChild(searchResults);

  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  if (document.body) {
    document.body.appendChild(modal);
  }
}

// This gets the URL parameter search and highlights the first occurrence of the search term on the page

let search = window.location.search;
let main = "";
if (document.querySelector("main")) {
  main = document.querySelector("main").innerHTML;
}
let decodedSearch = decodeURIComponent(search.replace("?search=", ""));

if (main && decodedSearch) {
  let searchIndex = main.toLowerCase().indexOf(decodedSearch.toLowerCase());
  if (searchIndex !== -1) {
    let searchElement = document.createElement("mark");
    searchElement.textContent = main.substring(
      searchIndex,
      searchIndex + decodedSearch.length
    );
    let searchElementHTML = searchElement.outerHTML;
    main =
      main.substring(0, searchIndex) +
      searchElementHTML +
      main.substring(searchIndex + decodedSearch.length);
    document.querySelector("main").innerHTML = main;

    setTimeout(() => {
      document.querySelector("mark").scrollIntoView();
    }, 1000);
  }
}

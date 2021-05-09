let textarea = document.getElementById("textarea");
let addNote = document.getElementById("btnAddNote");
let savedNotes = document.getElementById("savednotes");
let noteTitle = document.getElementById("textareaTitle");

let text;

showNotes();

// Textarea
addNote.addEventListener("click", function (element) {
  let notes = localStorage.getItem("notes");
  titleTxt = noteTitle.value;
  text = textarea.value;
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  completeNote = {
    title: titleTxt,
    content: text
  };
  noteObj.push(completeNote);

  localStorage.setItem("notes", JSON.stringify(noteObj));
  textarea.value = "";
  noteTitle.value = "";

  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  let html = "";
  noteObj.forEach(function (element, index) {
    html += `<div class="noteCards card my-2 mx-2" id="card${index}" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">
            ${element.content}

            </p>
            <button onclick="deleteNote(this.id)" class="btn btn-primary" id="${index}">
              Delete Note
            </button>
          </div>
        </div>`; //element[title] is invalid instead use element.title
  });
  if (noteObj.length != 0) {
    savedNotes.innerHTML = html;
  } else {
    savedNotes.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//delete note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));

  showNotes();
}

//searching
search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCards"); //html collection
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText; //returns array, although elemnt inside is only 1 still use index
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

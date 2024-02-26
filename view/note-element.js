export class NoteElement extends HTMLLIElement {
  constructor (note) {
    super();
  }

  #makeHTML (note) {
    noteElem.innerHTML = `${note.text} - <button data-id="${note.id}">X</button>`;
  }
}

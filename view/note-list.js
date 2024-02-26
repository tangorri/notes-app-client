export class NoteList {
  // pour stocker les DOM elements des notes
  // # => champs privés non accessibles depuis l'interface publique
  // (principe de l'encapsulation)
  #noteElements = [];
  #domElement;

  constructor(domElement) {
    this.#domElement = domElement;
  }

  // mettre à jour la vue de la liste des notes
  // un tableau de note doit nous être fourni
  update(notes) {
    if (!Array.isArray(notes)) {
      console.error('vous devez fournir un tableau');
      return;
    }

    // dans la vue on purge la liste (comme des sauvages)
    this.#domElement.innerHTML = '';

    // on génère le tableau de node Elements depuis les notes fournies
    let noteElements = notes.map(note => this.#createListElement(note));

    // maintenant que la liste est vide ajouter, enfant par enfant
    noteElements.forEach(noteElem => this.#domElement.appendChild(noteElem));
  }

  #createListElement(note) {
    const liElem = document.createElement('li');
    liElem.innerHTML = `${note.text} - <button data-id="${note.id}">X</button>`;
    return liElem;
  }


  // adaptateur, permet de faire un addEventListener fur l'élément DOM (qui implémente EventTarget) encapsulé
  addEventListener (eventType, callback) {
    this.#domElement.addEventListener(eventType, callback);
  }
}

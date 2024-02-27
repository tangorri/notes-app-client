import { Note } from './model/note.js';
import { NoteManager } from './api/note-manager.js';
import { NoteList } from './view/note-list.js'

// le modèle
let notes = [];
const minChars = 6;

const inputElem = document.getElementById('my-input');
const listElem = new NoteList(document.getElementById('list'));
const errorMsg = document.getElementById('error-msg');
const form = document.getElementsByTagName('form')[0];

function updateCounter() {
  document.getElementById('count').innerText = notes.length;
}


function resetInput() {
  // reset du champs de saisie
  inputElem.value = '';
}

function isValid() {
  // vérifier validité de la saisie
  // au moins quatre caractères
  let valid = (inputElem.value.length >= minChars);
  return valid;
}

function showError() {
  errorMsg.style.display = 'block';
}

function hideError() {
  errorMsg.style.display = 'none';
}

inputElem.addEventListener('change', function (event) {
  if (isValid()) {
    hideError();
  } else {
    showError();
  }
});

const onNewNoteSubmit = async () => {
  // instantiation d'une nouvelle note.
  // on instancie avec ID à null (mysql s'occupera tout seul de générer ce numéro)
  const newNote = new Note(null, inputElem.value.trim());
  resetInput();
  await NoteManager.create(newNote);
  refreshAll();
};

// gérer la soumission du formulaire.
form.addEventListener('submit', async function (event) {
  // empêcher le rechargement de la page(comportement par défaut d'un form)
  // https://www.freecodecamp.org/news/manage-default-behavior-in-browser/
  event.preventDefault();
  if (!isValid()) return false;
  onNewNoteSubmit();
});

listElem.addEventListener('click', async (event) => {
  console.log('event target: ', event.target);
  // on convertie en nombre la valeur l'attribut data-id de l'élément cliqué.
  const id = +event.target.getAttribute('data-id');
  // élément cliqué est associé à un ID de note ? (aka id est bien un nombre?)
  if (isNaN(id)) return;

  // click sur modif ou supprimer ?
  if (event.target.className === 'modify') {
    // on filter sur les éléments qui on l'id correspondant.
    // on doit donc faire un [0] pour récupérer l'élément.
    const noteToUpdate = notes.filter(note => note.id === id)[0];
    // on demande la saisie de la nouvelle valeur pour ce champs
    noteToUpdate.text = window.prompt('nouvelle valeur pour le champs text', noteToUpdate.text);
    await NoteManager.update(noteToUpdate);
  } else if (event.target.className === 'delete') {
    await NoteManager.remove(id);
  }

  refreshAll();
});

document.querySelector('#error-msg span').innerText = minChars;

async function refreshAll() {
  notes = await NoteManager.list();
  listElem.update(notes);
  updateCounter();
}

const appInit = async () => {
  await refreshAll();
}

document.addEventListener("DOMContentLoaded", (_event) => {
  appInit();
});

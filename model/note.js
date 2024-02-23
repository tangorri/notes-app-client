export class Note {
  constructor(id, text, author,date) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.date = date;
  }

  fullDisplay() {
    const formattedDate = this.date.toLocaleDateString();
    const display = `
      Text: ${this.text} - Author: ${this.author}
       - Date: ${formattedDate}
    `;
    return display;
  }

  length() {
    return this.text.length;
  }
}

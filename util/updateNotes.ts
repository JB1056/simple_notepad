import { NoteItem } from "../src/Index";
import { readFile, writeFile } from "./accessFile";

const FILE_NAME = "client_notes.json";

const updateNote = async (newNote: NoteItem) => {
  let parsedPrev: NoteItem[] = [];

  const previous = await getNotes();

  // If previous notes exist, parse and remove overlap
  if (previous.length)
    parsedPrev = previous.filter((note: NoteItem) => note.id !== newNote.id);

  // add new note
  parsedPrev.push(newNote);

  // write new array of notes
  const stringifiedNote = JSON.stringify(parsedPrev);
  writeFile({ fileName: FILE_NAME, fileContents: stringifiedNote });
};

const getNotes = async () => {
  const result = await readFile({ fileName: FILE_NAME });
  if (result) return JSON.parse(result);

  return [];
};

const removeNote = async (id: string) => {
  const previous = await getNotes();

  if (!previous.length) return;

  const stringifiedNote = JSON.stringify(
    previous.filter((note: NoteItem) => note.id !== id)
  );
  writeFile({ fileName: FILE_NAME, fileContents: stringifiedNote });
};

export { updateNote, removeNote, getNotes };

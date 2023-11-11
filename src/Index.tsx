import { Text, StyleSheet, View, FlatList } from "react-native";
import { Button } from "./components/Button";
import { useEffect, useState } from "react";
import { Note } from "./components/Note";
import { NewNoteModal } from "./components/NewNoteModal";
import { readFile } from "../util/accessFile";
import { getNotes, removeNote } from "../util/updateNotes";

export type NoteItem = {
  id: string;
  client: string;
  category: string;
  body: string;
  color?: string;
};

export const Index = () => {
  const [focused, setFocused] = useState<NoteItem>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<NoteItem[]>([]);

  const updateNotes = async () => {
    // fetch notes and update current state
    const notes = await getNotes();
    setNotes(notes);
    // Clear focus
    setFocused(undefined);
  };

  const handleDelete = async (id: string) => {
    await removeNote(id);
    updateNotes();
  };

  const handleEdit = async (note: NoteItem) => {
    setFocused(note);
    setIsOpen(true);
  };

  // on mount fetch initial notes
  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <View style={styles.root}>
      {isOpen && (
        <NewNoteModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          callback={updateNotes}
          initialValues={focused}
          clearFocus={() => setFocused(undefined)}
        />
      )}

      {notes.length ? (
        <FlatList
          style={styles.container}
          data={notes}
          renderItem={({ item }) => (
            <Note
              {...item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.placeholderText}>
          No Notes Found... Try creating one!
        </Text>
      )}

      <Button style={styles.addButton} onPress={() => setIsOpen(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "#2c2c3c",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  container: { width: "100%" },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    borderRadius: 50,
  },
  placeholderText: { color: "white" },
});

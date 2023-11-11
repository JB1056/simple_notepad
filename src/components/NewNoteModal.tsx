import {
  Modal,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import { Button } from "./Button";
import { useState, useCallback } from "react";
import { NoteItem } from "../Index";
import { Dropdown } from "react-native-element-dropdown";
import { updateNote } from "../../util/updateNotes";
import { generateHex } from "../../util/generateHex";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  initialValues?: NoteItem;
  callback?: VoidFunction;
  clearFocus?: VoidFunction;
};

const CATEGORIES = ["Goal Evidence", "Support Coordination", "Active Duty"];

// should use form validation such as react-hook-forms, but is out of scope for this task
export const NewNoteModal = ({
  isOpen,
  callback,
  setIsOpen,
  clearFocus,
  initialValues,
}: ModalProps) => {
  const uid = initialValues?.id ?? String(uuid.v4());

  // just for a bit of fun and variance
  const color = initialValues?.color ?? generateHex();

  const [client, setClient] = useState(initialValues?.client || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [notes, setNotes] = useState(initialValues?.body || "");
  const [isFocus, setIsFocus] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    clearFocus?.();
  };

  const handleAddNote = useCallback(() => {
    const newNote: NoteItem = {
      id: uid,
      client,
      category,
      body: notes,
      color,
    };

    updateNote(newNote).then(() => callback?.());
    handleClose();
  }, [uid, client, category, notes]);

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable onPress={handleClose} style={style.background} />
      <View style={style.container}>
        <Text style={style.label}>Client</Text>
        <TextInput
          value={client}
          onChangeText={(value) => setClient(value)}
          style={style.inputField}
          placeholder="Client Name, eg. John Smith"
        />

        <Text style={style.label}>Category</Text>
        <Dropdown
          style={style.inputField}
          labelField="label"
          valueField="value"
          data={CATEGORIES.map((category) => ({
            label: category,
            value: category,
          }))}
          search
          maxHeight={300}
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCategory(item.value);
            setIsFocus(false);
          }}
        />

        <Text style={style.label}>Additional Information</Text>
        <TextInput
          value={notes}
          onChangeText={(value) => setNotes(value)}
          style={[style.inputField, style.largeInputField]}
          multiline
          numberOfLines={6}
        />

        <Button
          style={style.button}
          disable={!(client && category)}
          label="Add Note"
          onPress={handleAddNote}
        />
        <Button style={style.button} label="Cancel" onPress={handleClose} />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 40,
    backgroundColor: "#3c3c3c",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000",
    opacity: 0.6,
  },
  inputField: {
    height: 40,
    backgroundColor: "#ddd",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  largeInputField: {
    height: 160,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f1f1",
  },
  button: {
    height: 40,
    width: "100%",
    marginVertical: 4,
  },
});

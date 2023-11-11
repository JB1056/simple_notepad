import { View, Text, StyleSheet } from "react-native";
import { NoteItem } from "../Index";
import { Button } from "./Button";

type NoteProps = NoteItem & { onEdit?: VoidFunction; onDelete?: VoidFunction };

export const Note = ({
  client,
  category,
  body,
  color,
  onEdit,
  onDelete,
}: NoteProps) => (
  <View style={[styles.item, color && { backgroundColor: color }]}>
    <Text style={styles.title}>{client}</Text>
    <Text style={styles.subtitle}>{category}</Text>
    <Text style={styles.body}>{body}</Text>
    <View style={styles.buttonContainer}>
      {/* Don't bother with SVG rendered components, use ASCII icons */}
      {onEdit && <Button style={styles.button} label="✎" onPress={onEdit} />}
      {onDelete && (
        <Button style={styles.button} label="✖" onPress={onDelete} />
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
  },
  buttonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
  },
  button: {
    height: 30,
    width: 30,
    backgroundColor: "transparent",
  },
});

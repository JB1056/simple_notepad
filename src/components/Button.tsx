import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { zIndex } from "../../util/zIndex";

type ButtonProps = {
  onPress: VoidFunction;
  label?: string;
  elevation?: number;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
};

export const Button = ({
  onPress,
  label = "+",
  elevation = 99,
  style,
  disable = false,
}: ButtonProps) => {
  const s = useStyle(elevation);

  return (
    <Pressable
      style={({ pressed }) => [
        s.root,
        pressed && s.pressed,
        disable && s.disabled,
        style,
      ]}
      disabled={disable}
      onPress={onPress}
    >
      <Text style={s.text}>{label}</Text>
    </Pressable>
  );
};

const useStyle = (elevation: number) =>
  StyleSheet.create({
    root: {
      backgroundColor: "lightblue",
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      ...zIndex(elevation),
    },
    text: { fontSize: 24 },
    pressed: { opacity: 0.5 },
    disabled: { backgroundColor: "grey", opacity: 0.5 },
  });

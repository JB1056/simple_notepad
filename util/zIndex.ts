import { Platform } from "react-native"


export const zIndex = (value: number) => {
    if (Platform.OS === 'ios' ) return { zIndex: value }
    return { elevation: value }
}
import {Pressable, StyleSheet, Text} from 'react-native'
import Colors from "../constants/colors";
import {useState} from "react";

/**
 * @apiNote: Cancel button designed specifically for iOS platform
 * @param title: Cancel button text
 * @param onPress: callback function gets executed when the button is pressed
 * @returns {JSX.Element}
 */
const CancelButton = ({ title, onPress }) => {
    const [isBeingPressed, setIsBeingPressed] = useState(false);

    return (
        <Pressable style={({pressed}) => pressed ? styles.buttonPressed : styles.button}
                   onPress={onPress}
                   onPressIn={() => setIsBeingPressed(true)}
                   onPressOut={() => setIsBeingPressed(false)}
        >
            { isBeingPressed && <Text style={styles.titlePressed}>{title}</Text> }
            { !isBeingPressed && <Text style={styles.title}>{title}</Text> }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 44,
        borderRadius: 15,
        backgroundColor: Colors.searchBar
    },
    buttonPressed: {
        height: 44,
        borderRadius: 15,
        backgroundColor: Colors.cancelButton
    },
    title: {
        height: "100%",
        width: "100%",
        color: Colors.cancelTitle,
        paddingTop: 14,
        paddingHorizontal: 10,
        textShadowColor: Colors.mainContainer,
        textShadowRadius: 1
    },
    titlePressed: {
        height: "100%",
        width: "100%",
        color: "white",
        paddingTop: 14,
        paddingHorizontal: 10,
        textShadowColor: Colors.mainContainer,
        textShadowRadius: 1
    }
});

export default CancelButton;
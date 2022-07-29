import {useState} from "react";
import {Keyboard, StyleSheet, TextInput, View} from "react-native";
import {Feather, Entypo} from "@expo/vector-icons";
import CancelButton from "./CancelButton";
import Colors from "../constants/colors";

const SearchView = ({ searchResultHandler, onCancel, viewStyle }) => {
    /* this state is set when the user has pressed on the search bar and is typing */
    const [isFocus, setIsFocus] = useState(false);

    /* holds the search text being entered by the user */
    const [searchText, setSearchText] = useState('');

    /**
     * @apiNote: this function is a handler that wraps the callback passed by the parent component as a property.
     *           It should validate the search text when it gets changed and then pass it to the callback.
     * @param text: the text which user enters.
     * @return void
     */
    const searchTextChangeHandler = (text) => {
        // Validating the text is set, and it is not empty
        const trimmedText = (text || '').trim();
        if (trimmedText) {
            setSearchText(text);
            // executing the callback, given the new text
            if (typeof searchResultHandler === 'function')
                searchResultHandler(text);
        } else {
            setSearchText('');
        }
    };

    return (
        <View style={[styles.container, viewStyle]}>
            <View style={isFocus ? styles.searchBarFocus : styles.searchBarNormal}>

                <Feather name="search" size={20} color="black" style={{marginHorizontal: 5, width: "10%"}}/>

                <TextInput style={styles.searchInput} placeholder="Search for news ..." placeholderTextColor="darkgray"
                           value={searchText}
                           maxLength={20}
                           autoCorrect={false}
                           returnKeyType="search"
                           onChangeText={searchTextChangeHandler}
                           onSubmitEditing={searchTextChangeHandler.bind(this, searchText)}
                           onFocus={() => setIsFocus(true)}
                />

                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {isFocus && searchText !== '' &&
                    (
                        <Entypo name="cross" size={20} color="darkgray" style={{padding: 2, marginHorizontal: 5}}
                                onPress={() => {
                                    setSearchText("");
                                    onCancel();
                                }}
                        />
                    )
                }
            </View>

            {/* cancel button, depending on whether the search bar is clicked or not */}
            {isFocus && (
                <View style={{marginLeft: 10}}>
                    <CancelButton title="Cancel"
                        onPress={() => {
                            Keyboard.dismiss();
                            setIsFocus(false);
                            setSearchText("");
                            onCancel();
                        }}
                    ></CancelButton>
                </View>
            )}
        </View>
    );
};

// styles
const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        shadowOpacity: 0.3,
        shadowColor: Colors.shadow,
        shadowRadius: 5,
        shadowOffset: {height: 0, width: 0}
    },
    searchBarNormal: {
        height: 50,
        width: "95%",
        padding: "3%",
        flexDirection: "row",
        backgroundColor: Colors.searchBar,
        borderRadius: 15,
        alignItems: "center",
    },
    searchBarFocus: {
        height: 50,
        width: "80%",
        padding: "3%",
        flexDirection: "row",
        backgroundColor: Colors.searchBar,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    searchInput: {
        height: 50,
        width: "90%",
        fontSize: 20,
        marginLeft: 10,
        textAlign: "justify"
    },
});

export default SearchView;
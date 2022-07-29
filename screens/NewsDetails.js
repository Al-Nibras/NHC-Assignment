import {Image, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar} from "react-native";
import Colors from "../constants/colors";
import DeviceUtil from "../utils/DeviceUtil";

const NewsDetails = ({ route }) => {
    const url = route.params.url;
    const imageUrl = route.params.imageUrl;
    const title = route.params.title;
    const description = route.params.description;
    const publishDate = route.params.publishDate;

    StatusBar.setBarStyle("light-content");
    return (
        <SafeAreaView style={styles.mainView}>
            <StatusBar style="light" />
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.newsView}>
                    <View style={styles.imageView}>
                        <Image source={{uri: imageUrl, cache: "force-cache"}} style={styles.image}></Image>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.publishDateView}>
                        <Text style={styles.publishDateText}>{publishDate}</Text>
                    </View>
                </View>
            </ScrollView>
            <Pressable
                style={({pressed}) => {
                    return pressed ? styles.visitButtonPressed : styles.visitButton
                }}
                onPress={() => {
                    console.log("opening URL: " + url);
                    Linking.openURL(url).catch(error => console.error("Couldn't open URL!", error));
                }}
            >
                <Text style={styles.visitButtonText}>Visit Original Post</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 0.80 * DeviceUtil.getWindowHeight(),
        width: "100%",
        marginTop: DeviceUtil.getStatusBarHeight()
    },
    content: {
        justifyContent: "center",
        alignItems: "center"
    },
    newsView: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    imageView: {
        height: 300,
        width: "100%",
        justifyContent: "center",
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        borderBottomWidth: 3,
        borderBottomColor: Colors.subContainer,
        shadowRadius: 4,
        shadowColor: Colors.shadow,
        shadowOffset: {height: 4, width: 0},
        shadowOpacity: 0.4,
    },
    titleView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    publishDateView: {
        flex: 1,
        alignSelf: "flex-end",
        paddingHorizontal: 10,
        marginTop: 20
    },
    descriptionView: {
        flex: 1,
        paddingHorizontal: 10
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    title: {
        width: "100%",
        textAlign: "center",
        padding: 20,
        fontSize: 30,
        fontWeight: "bold"
    },
    publishDateText: {
        width: "100%",
        color: Colors.mainContainer,
        fontWeight: "100",
        fontStyle: "normal",
        fontSize: 11,
        textAlign: "right"
    },
    description: {
        textAlign: "justify",
        fontSize: 18,
        fontStyle: "italic"
    },
    visitButton: {
        height: 0.05 * DeviceUtil.getWindowHeight(),
        width: "80%",
        backgroundColor: Colors.cancelButton,
        borderRadius: 6,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: "center"
    },
    visitButtonPressed: {
        height: 0.05 * DeviceUtil.getWindowHeight(),
        width: "80%",
        backgroundColor: Colors.cancelButton,
        borderRadius: 6,
        marginTop: 20,
        marginBottom: 10,
        alignSelf: "center",
        opacity: 0.75
    },
    visitButtonText: {
        color: Colors.title,
        width: "100%",
        height: "100%",
        textAlign: "center",
        paddingTop: "3%",
        fontSize: 20
    }
});
export default NewsDetails;
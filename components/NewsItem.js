import {View, StyleSheet, Pressable, Text, Platform, Image, Animated} from 'react-native'
import Colors from "../constants/colors";
import DeviceUtil from "../utils/DeviceUtil";
import {useEffect, useRef} from "react";


const onPressHandler = (navigation, url, title, description, imageUrl, publishDate) => {
    navigation.navigate("NewsDetails", {
        url: url,
        imageUrl: imageUrl,
        title: title,
        description: description,
        publishDate: publishDate
    });
};

/**
 * @apiNote returns a View JXM element which animates only once (Fade In Animation).
 *          Used during displaying the news card
 * @param props
 * @returns {JSX.Element}
 */
const FadeInView = (props) => {
    const fadeAnimation = useRef(new Animated.Value(0)).current // opacity = 0 (initial value)

    useEffect(() => {
        Animated.timing(
            fadeAnimation,
            {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000 // on second
            }
        ).start();
    }, [fadeAnimation]);

    return (
        <Animated.View style={{ ...props.style, opacity: fadeAnimation}}>
            {props.children}
        </Animated.View>
    );
}


/**
 * @apiNote returns a news card component
 * @param newsId newsId that is uniquely identifies the news card among the others
 * @param title news title
 * @param description news short description (according to the News API, it is limited to 200 characters)
 * @param imageUrl news image URL
 * @param publishDate news publish date
 * @returns {JSX.Element}
 */
const NewsItem = ({url, navigation, title, description, imageUrl, sourceName, publishDate}) => {
    return (
        <FadeInView style={styles.card}>
            <Pressable onPress={onPressHandler.bind(this, navigation, url, title, description, imageUrl, publishDate)}
                       android_ripple={{color: Colors.androidRippleEffect}}
                       style={
                           ({ pressed }) => {
                               return (pressed && Platform.OS === "ios") ? styles.containerPressed : styles.container;
                           }
                       }
            >
                <View style={styles.imageView}>
                    <Image source={{uri: imageUrl, cache: "force-cache"}} style={styles.image} resizeMode={'cover'} ></Image>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleText} numberOfLines={3} ellipsizeMode="tail">{title.toUpperCase()}</Text>
                </View>
                <View style={styles.descriptionView}>
                    <Text style={styles.sourceNameText} numberOfLines={1} ellipsizeMode="tail">{sourceName}</Text>
                    <Text style={styles.publishDateText} numberOfLines={1} ellipsizeMode="tail">{publishDate}</Text>
                </View>
            </Pressable>
        </FadeInView>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 0.29 * DeviceUtil.getWindowHeight(),
        width: 0.9 * DeviceUtil.getWindowWidth(),
        marginVertical: 15,
        marginHorizontal: 8,
        backgroundColor: Colors.mainContainer,
        borderRadius: 8,
        overflow: Platform.select({ios: "visible", android: "hidden"}),
        shadowColor: Colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 4}
    },
    container: {
        height: "100%",
        width: "100%",
        overflow: 'hidden',
        backgroundColor: Colors.subContainer,
        justifyContent: 'center',
        borderRadius: 8,
    },
    containerPressed: {
        height: "100%",
        width: "100%",
        overflow: 'hidden',
        backgroundColor: Colors.subContainer,
        justifyContent: 'center',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        opacity: 0.9,
        borderRadius: 8
    },
    imageView: {
        height: "60%",
        width: "100%",
    },
    titleView: {
        height: "25%",
        width: "100%",
        marginTop: "2%",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingTop: 10
    },
    descriptionView: {
        flexDirection:"row",
        height: "12%",
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 25,
        paddingVertical: 10,
        shadowOffset: {height:2, width: 0},
        shadowColor: Colors.shadow,
        shadowOpacity: 0.8
    },
    image: {
        flex: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: undefined,
        width: undefined
    },
    titleText: {
        height: "100%",
        color: Colors.title,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'left',
    },
    sourceNameText: {
        height: 30,
        width: "50%",
        color: Colors.subtitle,
        fontSize: 10,
        fontWeight: "normal",
        textAlign: "left",
    },
    publishDateText: {
        height: 30,
        width: "50%",
        color: Colors.subtitle,
        fontSize: 10,
        fontWeight: "normal",
        textAlign: "right"
    }
});

export default NewsItem;
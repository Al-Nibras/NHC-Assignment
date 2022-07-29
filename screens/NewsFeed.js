import {View, StyleSheet, FlatList, Text, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native'
import Colors from "../constants/colors";
import SearchView from "../components/SearchView";
import NewsItem from "../components/NewsItem";
import {useReducer, useState} from "react";
import DeviceUtil from "../utils/DeviceUtil";
import DateUtil from "../utils/DateUtil";
import searchNews from "../apis/NewsAPI";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";

/**
 * @apiNote builds a list of items to be utilized by FlatList through renderNewsItem().
 * @param payload: array of articles
 * @returns {null|*[]}
 */
const populateNewsData = (payload) => {
    if (!payload) return null;
    let newsList = [];
    payload.forEach((element, index) => {
        const article = {
            id: index,
            source: element.source,
            title: element.title,
            description: element.description,
            url: element.url,
            imageUrl: element.urlToImage,
            publishDate: DateUtil.getFormattedDate(element.publishedAt),
            content: element.content,
            sourceName: element.source.name
        };
        newsList.push(article);
    });
    return newsList;
}

/**
 * @apiNote a handler is used by FlatList to render each news card.
 * @param item: an item object fetched from the list of articles
 * @param navigation the navigation object maintained by the app's NavigationStack
 * @returns JSX element
 */
const renderNewsItem = (item, navigation) => {
    console.log(`rendering news with Id: ${item.id} and Url: ${item.url}`);

    if (item.url && item.imageUrl && item.title) {
        return (
            <NewsItem navigation={navigation}
                      url={item.url}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      description={item.description}
                      publishDate={item.publishDate}
                      sourceName={item.sourceName}
            />
        );
    } else {
        /* ignore rendering this item since it is missing some mandatory data */
        return <></>
    }

};

/**
 * @apiNote a callback function invoked by the useReducer that maintains the state of search results (News)
 *          during state update.
 * @param state: current search result state
 * @param action: clear =? true -> clear the search result, false -> update the state
 * @returns Array [new state]
 */
const feedReducer = (state, action) => {
    if (action.clear === false)
        return populateNewsData(action.payload) ?? [];
    else
        return [];
}


const NewsFeed = () => {
    const [searchResult, setSearchResult] = useReducer(feedReducer, () => []);

    /* this state is set when a search is being carried out (Network call is in progress) */
    const [isSearching, setIsSearching] = useState(false);

    const navigation = useNavigation();

    const feedHandler = (articles) => {
        if (articles && articles.length > 0) {
            setSearchResult({
                payload: articles,
                clear: false
            });
        } else {
            setSearchResult({
                payload: [],
                clear: true
            });
        }
        setIsSearching(false);
    };

    StatusBar.setBarStyle("light-content");

    return (
        <>
            { /* The first SafeAreaView is for Top SafeAreaInsets, its flex is set to 1 to expand */ }
            <SafeAreaView style={styles.mainView}>
                <LinearGradient colors={[Colors.mainContainer, Colors.subContainer]} style={styles.gradientView}>
                    <SearchView viewStyle={{height: "8%", marginTop: DeviceUtil.getStatusBarHeight() + 10}}
                                searchResultHandler={(text) => {
                                    // start searching only if the user enters two characters or more
                                    if (text && text.length >= 2) {
                                        setIsSearching(true);
                                        searchNews(text, feedHandler);
                                    }
                                }}
                                onCancel={() => feedHandler(null)}>
                    </SearchView>

                    {   /* if there is news, display the list of news, otherwise display `no data available` */
                        (searchResult && searchResult.length > 0)
                            ?
                            (
                                <View>
                                    {
                                        isSearching
                                            ?
                                            <View style={styles.loadingIndicatorView}>
                                                <ActivityIndicator size="large" animating={true} color="white"/>
                                            </View>
                                            :
                                            <FlatList data={searchResult} style={{marginBottom: "20%"}}
                                                      renderItem={({item}) => renderNewsItem(item, navigation)}
                                                      keyExtractor={(item) => item.id}/>
                                    }
                                </View>
                            )
                            :
                            (
                                <View style={styles.noDataView}>
                                    <Text style={styles.noDataText}>No Data Available</Text>
                                </View>
                            )
                    }
                </LinearGradient>
            </SafeAreaView>

            { /* The second SafeAreaView is for Bottom SafeAreaInsets, its flex is set to 0 to prevent expansion */ }
            <SafeAreaView style={{ flex:0, backgroundColor: Colors.subContainer }} />
        </>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        width: "100%",
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: Colors.mainContainer,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2,
    },
    gradientView: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.mainContainer,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2,
    },
    noDataView: {
        flex: 1,
        justifyContent: "center",
        zIndex: 1
    },
    noDataText: {
        color: Colors.title,
        fontWeight: "400",
        fontSize: 25
    },
    loadingIndicatorView: {
        flex: 1,
        justifyContent: "center"
    }
});

export default NewsFeed;
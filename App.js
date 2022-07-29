import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsFeed from "./screens/NewsFeed";
import NewsDetails from "./screens/NewsDetails";
import Colors from "./constants/colors";

const NavigationStack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <NavigationStack.Navigator>
                <NavigationStack.Screen
                    name="NewsFeed"
                    component={NewsFeed}
                    options={{title: 'News', headerShown: false}}
                />
                <NavigationStack.Screen
                    name="NewsDetails"
                    component={NewsDetails}
                    options={{
                        title: 'Details',
                        headerTitleStyle: {
                            color: Colors.subtitle,
                            fontSize: 20
                        },
                        headerStyle: {
                            backgroundColor: Colors.subContainer
                        },
                        headerTintColor: Colors.subtitle
                    }}
                />
            </NavigationStack.Navigator>
        </NavigationContainer>
    );
}


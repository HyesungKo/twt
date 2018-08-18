import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import Favorite from '../components/Favorite/Favorite';
import Inbox from '../components/Inbox/Inbox';
import Login from '../components/Login/Login';
import MyTrip from '../components/MyTrip/MyTrip';
import Post from '../components/Post/Post';
import Profile from '../components/Profile/Profile';
import Register from '../components/Register/Register';
import Search from '../components/Search/Search';
import SplashScreen from '../components/SplashScreen/SplashScreen';
import GuideDetail from '../components/GuideDetail/GuideDetail';

const FavoriteStack = createStackNavigator(
    {
      Favorite: Favorite
    },
    {
      initialRouteName: 'Favorite',
    }
);

const InboxStack = createStackNavigator(
    {
      Inbox: Inbox,
    },
    {
      initialRouteName: 'Inbox'
    }
);

const ProfileStack = createStackNavigator(
    {
      Profile: Profile,
      Post: Post,
    },
    {
      initialRouteName: 'Profile',
    }
);

const SearchStack = createStackNavigator(
    {
      Search: Search,
      GuideDetail: GuideDetail
    },
    {
      initialRouteName: 'Search',
    }
);

const App = createBottomTabNavigator(
    {
        Search: SearchStack,
        Favorite: FavoriteStack,
        MyTrip: MyTrip,
        Inbox: InboxStack,
        Profile: ProfileStack
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({ focused, tintColor}) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Search') {
                    iconName = `ios-search${focused ? '' : '-outline'}`
                } else if (routeName === 'Favorite') {
                    iconName = `ios-bookmark${focused ? '' : '-outline'}`
                } else if (routeName === 'MyTrip') {
                    iconName = `ios-calendar${focused ? '' : '-outline'}`
                } else if (routeName === 'Inbox') {
                    iconName = `ios-chatboxes${focused ? '' : '-outline'}`
                } else if (routeName === 'Profile') {
                    iconName = `ios-person${focused ? '' : '-outline'}`
                }

                return <Ionicons name={iconName} size={25} color={tintColor} />
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
)

const Auth = createStackNavigator(
    {
        Login: Login,
        Register: Register,
        CreateProfile: CreateProfile
    },
    {
        navigationOptions: {
            header: null
        }
    }
);    
export const RootNavigation = () => {
    return createSwitchNavigator(
        {
            Splash: SplashScreen,
            Auth: Auth,
            App: App
        },
        {
            initialRouteName: 'Splash'
        }
    )
}

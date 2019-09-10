import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginScreen from '../screens/LoginScreen';
import EventsScreen from '../screens/EventsScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import AddEventScreen from '../screens/AddEventScreen';
import Screen5 from '../screens/AddEntryScreen';

import AddEntryScreen from '../screens/AddEntryScreen';

// import EditProfileScreen from '../screens/EditProfileScreen';

import EditProfileScreen from '../screens/EditProfileScreen';

//import TestFormScreen from '../screens/TestFormScreen';

import {createStackNavigator} from 'react-navigation-stack';

import EditEventScreen from '../screens/EditEventScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AddButton from '../layout/AddButton';

import EditButton from '../layout/EditButton';
import EditEntryScreen from '../screens/EditEntryScreen';

import ProvideEntryLocationScreen from '../screens/ProvideEntryLocationScreen';

import EventEntriesScreen from '../screens/EventEntriesScreen';
 
// const EventDetailsNavigator = createStackNavigator({
//   EventDetails: EventDetailsScreen,
//   AddEntry: AddEntryScreen,
// });

const EventNavigator = createStackNavigator({
  Events: {
    screen: EventsScreen,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Events',
        headerRight: (
          <AddButton onPress={() => navigation.getParam('openCreateNew')()} />
        ),
      };
    },
  },
  EventDetails: EventDetailsScreen,
  AddEvent: AddEventScreen,
  EditEvent: EditEventScreen,
  AddEntry: AddEntryScreen,
  EditEntry: EditEntryScreen,
  ProvideLocationEntry: ProvideEntryLocationScreen,
  EventEntries: EventEntriesScreen,
});

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => {
      return {
        title: 'Profile',
        headerRight: (
          <EditButton onPress={() => navigation.getParam('OpenEdit')()} />
        ),
      };
    },
  },
  EditProfile: EditProfileScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Events: EventNavigator,
    Profile: ProfileNavigator,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Profile') {
          iconName = `ios-person`;
        } else if (routeName === 'Events') {
          iconName = `event`;
          IconComponent = MaterialIcons;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#158040',
      inactiveTintColor: '#40C575',
      style: {
        backgroundColor: '#8EE2B0',
        fontSize: 19,
      },
    },
  },
);

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
});

const MainNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthNavigator,
    Main: TabNavigator,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#40C575',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '200',
        fontSize: 19,
      },
    },
  },
);

export default createAppContainer(MainNavigator);

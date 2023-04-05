import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { HomeScreen } from "./HomeScreen";
import { ProfileScreen } from "./ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

export function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Notes" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
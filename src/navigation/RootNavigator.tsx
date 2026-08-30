import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RosterScreen } from '@/features/roster/presentation/RosterScreen';
import { useTheme } from '@/theme';

import { buildNavigationTheme } from './navigationTheme';
import { Routes } from './routes';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();
  const navigationTheme = useMemo(() => buildNavigationTheme(theme), [theme]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={Routes.Roster}
        screenOptions={{
          headerShown: false,

          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name={Routes.Roster} component={RosterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

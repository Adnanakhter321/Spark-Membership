import React, { useState } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button, IconButton, SearchInput, ToggleSwitch } from '@/components';
import { makeStyles } from '@/theme';
import AppImageBackground from '@/components/AppImageBackground';
import { images } from '@/assets/images';
import TraditionalKarate, { type ClassMember } from '@/components/TraditionalKarate';

const avatar = (gender: 'men' | 'women', n: number) => ({
  uri: `https://randomuser.me/api/portraits/${gender}/${n}.jpg`,
});

const DEMO_MEMBERS: ClassMember[] = [
  { id: '1', name: 'Jenny Wilson', photo: images.dummyImage, showActions: true },
  { id: '2', name: 'Marvin McKinney', photo: avatar('men', 32), showActions: true },
  { id: '3', name: 'Brooklyn Simmons', photo: avatar('women', 68), showActions: true },
  { id: '7', name: 'Jenny Wilson' },
  { id: '4', name: 'Ralph Edwards', photo: avatar('men', 75), showActions: true },
  { id: '5', name: 'Ralph Edwards', photo: avatar('men', 54) },
  { id: '6', name: 'Floyd Miles', photo: avatar('men', 86) },
  { id: '8', name: 'Marvin McKinney', photo: avatar('men', 32) },
  { id: '9', name: 'Brooklyn Simmons', photo: avatar('women', 68) },
];

const DEMO_CLASSES = [
  { id: 'c1', title: 'Traditional Karate', time: '5:30 PM - 6:30 PM', members: DEMO_MEMBERS },
  { id: 'c2', title: 'Traditional Karate', time: '5:30 PM - 6:30 PM', members: DEMO_MEMBERS.slice(0, 6) },
  { id: 'c3', title: 'Traditional Karate', time: '5:30 PM - 6:30 PM', members: DEMO_MEMBERS.slice(0, 6) },
  { id: 'c4', title: 'Traditional Karate', time: '5:30 PM - 6:30 PM', members: DEMO_MEMBERS.slice(0, 6) },
];

export function RosterScreen() {
  const styles = useStyles();

  const [instructorMode, setInstructorMode] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.screen, instructorMode && styles.screenActive]}
    >
      <View style={[styles.header, instructorMode && styles.headerActive]}>
        <View style={styles.modeRow}>
          <AppText size="lg">Instructor mode</AppText>
          <ToggleSwitch value={instructorMode} onValueChange={setInstructorMode} />
        </View>

        <View style={styles.searchRow}>
          <SearchInput value={query} onChangeText={setQuery} />
          <Button title="All Rosters" iconRight="chevron-down" />
          <IconButton name="settings-outline" accessibilityLabel="Roster settings" />
        </View>
      </View>

      <View style={styles.list}>
        <AppImageBackground source={images.bgImage} style={styles.background}>
          <FlashList
            data={DEMO_CLASSES}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TraditionalKarate
                title={item.title}
                time={item.time}
                members={item.members}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </AppImageBackground>
      </View>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme, r) => ({
  screen: {
    flex: 1,

    backgroundColor: theme.colors.card,
  },
  screenActive: {
    backgroundColor: theme.colors.pink,
  },
  header: {
    paddingVertical: r.scale(theme.spacing.lg),
    paddingHorizontal: r.scale(theme.spacing.lg),
    backgroundColor: theme.colors.card,
  },
  headerActive: {
    backgroundColor: theme.colors.pink,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: r.scale(theme.spacing.xl),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.scale(theme.spacing.md),
    marginTop: r.scale(theme.spacing.lg),
  },
  list: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  listContent: {
    paddingVertical: r.scale(theme.spacing.sm),
  },
}));

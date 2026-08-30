import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/assets/images';
import { AppText, Button, IconButton, SearchInput, ToggleSwitch } from '@/components';
import AppImageBackground from '@/components/AppImageBackground';
import TraditionalKarate, { type ClassMember } from '@/components/TraditionalKarate';
import { makeStyles, useTheme, withAlpha } from '@/theme';

import { useRoster } from './useRoster';

type StateMessageProps = {
  title: string;
  message: string;
  actionTitle?: string;
  onAction?: () => void;
};

function StateMessage({ title, message, actionTitle, onAction }: StateMessageProps) {
  const styles = useStyles();
  return (
    <View style={styles.centered}>
      <View style={styles.panel}>
        <AppText size="lg" weight="semiBold" style={styles.textCenter}>
          {title}
        </AppText>
        <AppText color="textMuted" style={styles.message}>
          {message}
        </AppText>
        {actionTitle && onAction ? (
          <View style={styles.action}>
            <Button title={actionTitle} onPress={onAction} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

type ClassCard = {
  id: string;
  title: string;
  time: string;
  members: ClassMember[];
};

export function RosterScreen() {
  const styles = useStyles();
  const theme = useTheme();
  const roster = useRoster();

  const [instructorMode, setInstructorMode] = useState(false);

  const classes = useMemo(
    () =>
      roster.classes.map(item => ({
        id: item.id,
        title: item.name,
        time: item.time,
        members: item.members.map(member => ({
          id: member.id,
          name: member.name,
          photo: member.photo ? { uri: member.photo } : null,
          showActions: instructorMode,
        })),
      })),
    [roster.classes, instructorMode],
  );

  const renderClass = useCallback(
    ({ item }: { item: ClassCard }) => (
      <TraditionalKarate title={item.title} time={item.time} members={item.members} />
    ),
    [],
  );

  const renderContent = useCallback(() => {
    if (roster.loading) {
      return (
        <View style={styles.centered}>
          <View style={styles.panel}>
            <ActivityIndicator size="large" color={theme.colors.CoralRed2} />
          </View>
        </View>
      );
    }

    if (roster.error) {
      return (
        <StateMessage
          title="Could not load the roster"
          message={roster.error.message}
          actionTitle={roster.error.canRetry ? 'Try again' : undefined}
          onAction={roster.error.canRetry ? roster.reload : undefined}
        />
      );
    }

    if (roster.isEmpty) {
      return (
        <StateMessage
          title="No classes today"
          message="Classes will show up here once they are scheduled."
          actionTitle="Refresh"
          onAction={roster.reload}
        />
      );
    }

    if (roster.hasNoMatches) {
      return (
        <StateMessage
          title="No results"
          message={`Nothing matched "${roster.query}". Try another name, ID`}
        />
      );
    }

    return (
      <FlashList
        data={classes}
        keyExtractor={item => item.id}
        renderItem={renderClass}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={roster.refreshing}
            onRefresh={roster.reload}
            tintColor={theme.colors.onPrimary}
            colors={[theme.colors.CoralRed2]}
          />
        }
      />
    );
  }, [classes, renderClass, roster, styles, theme]);

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
          <SearchInput
            value={roster.query}
            onChangeText={roster.onChangeQuery}
            style={styles.search}
          />
          <Button title="All Rosters" iconRight="chevron-down" />
          <IconButton name="settings-outline" accessibilityLabel="Roster settings" />
        </View>
      </View>

      <View style={styles.list}>
        <AppImageBackground source={images.bgImage} style={styles.background}>
          {renderContent()}
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
    marginVertical:r.scale(theme.spacing.sm),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: r.scale(theme.spacing.md),
    marginTop: r.scale(theme.spacing.lg),
  },
  search: {
    minWidth: r.scale(220),
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: r.scale(theme.spacing.xl),
  },
  panel: {
    alignItems: 'center',
    backgroundColor: withAlpha(theme.colors.card, 0.95),
    borderRadius: r.scale(12),
    paddingVertical: r.scale(theme.spacing.xl),
    paddingHorizontal: r.scale(theme.spacing.xxl),
    maxWidth: r.scale(420),
  },
  textCenter: {
    textAlign: 'center',
  },
  message: {
    marginTop: r.scale(theme.spacing.sm),
    textAlign: 'center',
  },
  action: {
    marginTop: r.scale(theme.spacing.lg),
  },
}));

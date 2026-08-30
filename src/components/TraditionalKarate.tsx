import React from 'react';
import { View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';

import { images } from '@/assets/images';
import { makeStyles, withAlpha } from '@/theme';

import AppText from './AppText';

export type ClassMember = {
    id: string;
    name: string;
    photo?: number | { uri: string } | null;
    showActions?: boolean;
};

type Props = {
    title: string;
    time: string;
    members: ClassMember[];
};

const splitName = (name: string) => name.replace(' ', '\n');

const TraditionalKarate = ({ title, time, members }: Props) => {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.title2}>{time}</AppText>
            </View>

            <View style={styles.bottom}>
                {members.map(member => (
                    <View key={member.id} style={styles.member}>
                        <View style={styles.avatarBox}>
                            <FastImage
                                source={member.photo ?? images.defaultUser}
                                style={styles.avatar}
                            />
                            {member.showActions ? (
                                <>
                                    <FastImage source={images.cross} style={styles.cross} />
                                    <FastImage source={images.tick} style={styles.tick} />
                                </>
                            ) : null}
                        </View>

                        <AppText style={styles.title3} numberOfLines={2}>
                            {splitName(member.name)}
                        </AppText>
                    </View>
                ))}
            </View>
        </View>
    );
};

const useStyles = makeStyles((theme, r) => {
    const AVATAR = 90;
    const MIN_GAP = 45;

    const available = r.width - r.scale(theme.spacing.lg) * 2;
    const columns = Math.max(2, Math.floor(available / r.scale(AVATAR + MIN_GAP)));

    const columnWidth = `${100 / columns}%` as `${number}%`;

    return {
    title3: {
        fontFamily: theme.fonts.semiBold,
        fontSize: r.fontSize(theme.fontSize.md),
        color: theme.colors.CharcoalGray,
        textAlign: 'center',
        marginTop: r.scale(theme.spacing.xs),
        letterSpacing: r.fontSize(2),
        lineHeight: r.fontSize(21),
    },
    container: {
        marginHorizontal: r.scale(theme.spacing.lg),
        marginVertical: r.scale(theme.spacing.sm),
    },
    header: {
        backgroundColor: theme.colors.CoralRed2,
        borderTopRightRadius: r.scale(12),
        borderTopLeftRadius: r.scale(12),
        padding: r.scale(theme.spacing.md),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: r.scale(theme.spacing.lg),
    },
    title: {
        color: theme.colors.card,
        fontSize: r.fontSize(theme.fontSize.lg),
        fontFamily: theme.fonts.bold,
    },
    title2: {
        color: theme.colors.card,
        fontSize: r.fontSize(theme.fontSize.lg),
    },
    bottom: {
        backgroundColor: withAlpha(theme.colors.card, 0.8),
        paddingTop: r.scale(theme.spacing.lg),
        borderBottomLeftRadius: r.scale(12),
        borderBottomRightRadius: r.scale(12),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    member: {
        width: columnWidth,
        gap: r.scale(6),
        alignItems: 'center',
        paddingVertical: r.scale(theme.spacing.sm),
        paddingHorizontal: r.scale(4),
        marginBottom: r.scale(theme.spacing.xl),
    },
    avatarBox: {
        width: r.scale(AVATAR),
        height: r.scale(AVATAR),
    },
    avatar: {
        width: r.scale(AVATAR),
        height: r.scale(AVATAR),
        borderRadius: r.scale(AVATAR / 2),
    },
    cross: {
        position: 'absolute',
        top: -r.scale(5),
        left: -r.scale(5),
        width: r.scale(35),
        height: r.scale(35),
    },
    tick: {
        position: 'absolute',
        bottom: -r.scale(5),
        right: -r.scale(5),
        width: r.scale(35),
        height: r.scale(35),
    },
    };
});

export default TraditionalKarate;

import React, { useCallback, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
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
    onPressCross?: (member: ClassMember) => void;
    onPressTick?: (member: ClassMember) => void;
};

const splitName = (name: string) => {
    const words = name.trim().split(/\s+/);

    if (words.length < 2) {
        return name;
    }

    let breakAt = 1;
    let smallest = Infinity;

    for (let i = 1; i < words.length; i++) {
        const first = words.slice(0, i).join(' ').length;
        const second = words.slice(i).join(' ').length;
        const difference = Math.abs(first - second);

        if (difference < smallest) {
            smallest = difference;
            breakAt = i;
        }
    }

    return `${words.slice(0, breakAt).join(' ')}\n${words.slice(breakAt).join(' ')}`;
};

const TraditionalKarate = ({ title, time, members, onPressCross, onPressTick }: Props) => {
    const styles = useStyles();
    const [brokenPhotos, setBrokenPhotos] = useState<Record<string, boolean>>({});

    const onPhotoError = useCallback((id: string) => {
        setBrokenPhotos(current => ({ ...current, [id]: true }));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.title} numberOfLines={1}>
                    {title}
                </AppText>
                <AppText style={styles.title2} numberOfLines={1}>
                    {time}
                </AppText>
            </View>

            <View style={styles.bottom}>
                {members.map(member => (
                    <View key={member.id} style={styles.member}>
                        <View style={styles.avatarBox}>
                            <Image source={images.defaultUser} style={styles.avatar} />

                            {member.photo && !brokenPhotos[member.id] ? (
                                <FastImage
                                    source={member.photo}
                                    onError={() => onPhotoError(member.id)}
                                    style={[styles.avatar, styles.avatarPhoto]}
                                />
                            ) : null}
                            {member.showActions ? (
                                <>
                                    <TouchableOpacity
                                        style={styles.cross}
                                        activeOpacity={0.7}
                                        hitSlop={8}
                                        accessibilityRole="button"
                                        accessibilityLabel={`Mark ${member.name} absent`}
                                        onPress={() => onPressCross?.(member)}
                                    >
                                        <FastImage source={images.cross} style={styles.badgeImage} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.tick}
                                        activeOpacity={0.7}
                                        hitSlop={8}
                                        accessibilityRole="button"
                                        accessibilityLabel={`Mark ${member.name} present`}
                                        onPress={() => onPressTick?.(member)}
                                    >
                                        <FastImage source={images.tick} style={styles.badgeImage} />
                                    </TouchableOpacity>
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
    const nameLineHeight = r.fontSize(21);

    return {
    title3: {
        fontFamily: theme.fonts.semiBold,
        fontSize: r.fontSize(theme.fontSize.md),
        color: theme.colors.CharcoalGray,
        textAlign: 'center',
        marginTop: r.scale(theme.spacing.xs),
        letterSpacing: r.fontSize(2),
        lineHeight: nameLineHeight,
        minHeight: nameLineHeight * 2,
        alignSelf: 'stretch',
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
        color: theme.colors.onPrimary,
        fontSize: r.fontSize(theme.fontSize.lg),
        fontFamily: theme.fonts.bold,
        flexShrink: 1,
        marginRight: r.scale(theme.spacing.md),
    },
    title2: {
        color: theme.colors.onPrimary,
        fontSize: r.fontSize(theme.fontSize.lg),
        flexShrink: 0,
    },
    bottom: {
        backgroundColor: withAlpha(theme.colors.card, 0.8),
        paddingTop: r.scale(theme.spacing.lg),
        borderBottomLeftRadius: r.scale(12),
        borderBottomRightRadius: r.scale(12),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },
    member: {
        width: columnWidth,
        alignSelf: 'flex-start',
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
    avatarPhoto: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    cross: {
        position: 'absolute',
        top: -r.scale(5),
        left: -r.scale(5),
        width: r.scale(35),
        height: r.scale(35),
    },
    badgeImage: {
        width: '100%',
        height: '100%',
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

export default React.memo(TraditionalKarate);

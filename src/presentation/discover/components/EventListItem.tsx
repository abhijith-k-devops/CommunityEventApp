import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { ColorTheme } from "../../../core/theme/Colors";
import { useTheme } from "../../../core/hooks/useTheme";
import { Events } from "../../../domain/model/Events";
import Ionicons from "@react-native-vector-icons/ionicons";
import CustomPill, { CustomPillType } from "../../../core/components/CustomPill";
import CustomText, { CustomTextVariant } from "../../../core/components/CustomText";
import FavouriteIconComponent from "../../../core/components/FavouriteIconComponent";
import { useCallback, useState } from "react";
import { formatDate } from "../../../core/utils/DateUtil";
import { useRSVP } from "../../viewmodels/hooks/useRSVP";

interface EventListItemProps {
    event: Events;
    onPress?: () => void;
}

function EventListItem({ event, onPress }: EventListItemProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { isRSVP, toggleRSVP } = useRSVP();
    const handleRSVPToggle = useCallback(async () => {
        await toggleRSVP(event);
    }, [event, toggleRSVP]);
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            {/* Background Image */}
            <Image
                source={{ uri: event.imageUrl }}
                style={styles.backgroundImage}
            />

            {/* Overlay */}
            <View style={styles.overlay} />

            {/* Featured Badge */}
            {event.isFeatured && (
                <CustomPill text="Featured" type={CustomPillType.FEATURED} style={styles.pill} />
            )}

            {/* Heart Icon with Count */}

            <FavouriteIconComponent
                onToggle={handleRSVPToggle}
                isFavourite={isRSVP(event.id)}
                count={event.attendeeCount}
                style={styles.heartContainer}
            />

            {/* Content Container */}
            <View style={styles.contentContainer}>
                {/* Title */}
                <CustomText variant={CustomTextVariant.TITLE} numberOfLines={2} style={styles.title}>
                    {event.title}
                </CustomText>

                {/* Event Details */}
                <View style={styles.detailsContainer}>
                    {/* Date */}
                    <View style={styles.detailRow}>
                        <Ionicons
                            name="calendar-outline"
                            size={16}
                            color={colors.white}
                            style={styles.detailIcon}
                        />
                        <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.subtext}>{formatDate(new Date(event.date))}</CustomText>
                    </View>

                    {/* Location */}
                    <View style={styles.detailRow}>
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color={colors.white}
                            style={styles.detailIcon}
                        />
                        <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.subtext}>{event.location}</CustomText>
                    </View>

                    {/* Attendees */}
                    <View style={styles.detailRow}>
                        <Ionicons
                            name="people-outline"
                            size={16}
                            color={colors.white}
                            style={styles.detailIcon}
                        />
                        <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.subtext}>{event.attendeeCount}</CustomText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function createStyles(colors: ColorTheme) {
    return StyleSheet.create({
        container: {
            height: 280,
            marginHorizontal: 16,
            marginVertical: 12,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: colors.backgroundSecondary,
            elevation: 4,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
        },
        title: {
            color: colors.white
        },
        subtext: {
            color: colors.white,
            fontSize: 10,
        },
        backgroundImage: {
            width: "100%",
            height: "100%",
            position: "absolute",
        },
        overlay: {
            backgroundColor: colors.backgroundOverlay,
        },
        pill: {
            margin: 8
        },
        heartContainer: {
            position: "absolute",
            top: 12,
            right: 12
        },
        contentContainer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            paddingTop: 24,
            backgroundColor: colors.backgroundOverlay,
        },
        detailsContainer: {
            gap: 8,
            flexDirection: "row",
            marginTop: 8,
        },
        detailRow: {
            flexDirection: "row",
            alignItems: "center",
        },
        detailIcon: {
            marginRight: 8,
        },
    });
}

export default EventListItem;
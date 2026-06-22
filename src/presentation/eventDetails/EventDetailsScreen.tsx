import Ionicons from "@react-native-vector-icons/ionicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import {
    Image,
    ImageSourcePropType,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import CustomText, { CustomTextVariant } from "../../core/components/CustomText";
import { useTheme } from "../../core/hooks/useTheme";
import { MainStackParamList } from "../../core/types/AppNavigationType";
import OrganizerCard from "./components/OrganizerCard";
import FavouriteIconComponent from "../../core/components/FavouriteIconComponent";
import CustomPill, { CustomPillType } from "../../core/components/CustomPill";
import { formatDate, formatTime } from "../../core/utils/DateUtil";
import { useRSVP } from "../viewmodels/hooks/useRSVP";

type EventDetailsRouteProp = RouteProp<MainStackParamList, "EventDetails">;
type EventDetailsNavigationProp = NativeStackNavigationProp<MainStackParamList>;


function EventDetailsScreen() {
    const { colors } = useTheme();
    const route = useRoute<EventDetailsRouteProp>();
    const navigation = useNavigation<EventDetailsNavigationProp>();
    const { isRSVP, toggleRSVP } = useRSVP();
    const event = route.params.event;
    const styles = createStyles(colors);

     const handleRSVPToggle = useCallback(async () => {
            await toggleRSVP(event);
    }, [event, toggleRSVP]);

    const tags = useMemo(() => {
        const base = [`#${event.category || "Event"}`, "#International", "#Masterclass", "#Street Food"];
        return base.filter((t, i, arr) => arr.indexOf(t) === i);
    }, [event.category]);

    const attendees = useMemo(() => {
        const hostImages = event.host ? [event.host.profileImageUrl].filter(Boolean) : [];
        const fallback = [
            "https://i.pravatar.cc/80?img=13",
            "https://i.pravatar.cc/80?img=22",
            "https://i.pravatar.cc/80?img=31",
            "https://i.pravatar.cc/80?img=44",
        ];
        return [...hostImages, ...fallback].slice(0, 4);
    }, [event.host]);

    const primaryHost = event.host && (event.host.name || event.host.profileImageUrl) ? event.host : null;

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.heroContainer}>
                    <Image source={{ uri: event.imageUrl }} style={styles.heroImage} />
                </View>

                <View style={styles.contentBlock}>
                    <CustomText variant={CustomTextVariant.TITLE} style={styles.titleText}>
                        {event.title}
                    </CustomText>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Ionicons name="calendar-outline" size={18} color={colors.textLight} />
                                <CustomText style={styles.infoLabel}>Date</CustomText>
                            </View>
                            <CustomText style={styles.infoValue}>{formatDate(new Date(event.date))}</CustomText>
                        </View>

                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Ionicons name="time-outline" size={18} color={colors.textLight} />
                                <CustomText style={styles.infoLabel}>Time</CustomText>
                            </View>
                            <CustomText style={styles.infoValue}>{formatTime(event.date)}</CustomText>
                        </View>

                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Ionicons name="location-outline" size={18} color={colors.textLight} />
                                <CustomText style={styles.infoLabel}>Location</CustomText>
                            </View>
                            <CustomText style={styles.infoValue}>{event.location}</CustomText>
                        </View>

                        <View style={styles.infoCard}>
                            <View style={styles.infoRow}>
                                <Ionicons name="flash-outline" size={18} color={colors.textLight} />
                                <CustomText style={styles.infoLabel}>Price</CustomText>
                            </View>
                            <CustomText style={styles.infoValue}>Free entry</CustomText>
                        </View>
                    </View>

                    <View style={styles.rsvpCard}>
                        <View>
                            <CustomText style={styles.attendingCount}>{event.attendeeCount}</CustomText>
                            <CustomText style={styles.attendingLabel}>people going</CustomText>
                        </View>
                        <FavouriteIconComponent isFavourite={isRSVP(event.id)} onToggle={handleRSVPToggle} count={event.attendeeCount}/>
                    </View>

                    <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.sectionTitle}>
                        About this event
                    </CustomText>
                    <CustomText style={styles.descriptionText}>
                        {event.description || "Join this unique experience with an incredible lineup, immersive sessions, and curated networking in the city."}
                    </CustomText>

                    <View style={styles.tagsWrap}>
                        {tags.map((tag, index) => (
                            <CustomPill key={`${tag}-${index}`} text={tag} type={CustomPillType.DEFAULT}/>
                        ))}
                    </View>

                    <View style={styles.attendeesHeader}>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.attendeesTitle}>
                            Attendees
                        </CustomText>
                        <CustomText style={styles.attendeesSub}>{event.attendeeCount} going</CustomText>
                    </View>

                    <View style={styles.attendeesRow}>
                        {attendees.map((uri, index) => (
                            <Image
                                key={`${uri}-${index}`}
                                source={{ uri } as ImageSourcePropType}
                                style={[styles.avatar, index > 0 ? styles.avatarStacked : null]}
                            />
                        ))}
                        <CustomText style={styles.moreText}>+{Math.max(event.attendeeCount - attendees.length, 0)} more</CustomText>
                    </View>

                    {primaryHost ? (
                        <OrganizerCard
                            host={primaryHost}
                            attendeeCount={event.attendeeCount}
                            onPress={() => navigation.navigate("HostDetails", { host: primaryHost })}
                        />
                    ) : null}
                </View>
            </ScrollView>
        </View>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scrollContent: {
            paddingBottom: 28,
            paddingTop: 10,
        },
        heroContainer: {
            height: 480 / 2,
            position: "relative",
            marginHorizontal: 10,
            borderRadius: 14,
            overflow: "hidden",
        },
        heroImage: {
            width: "100%",
            height: "100%",
        },
        heroOverlay: {
            ...StyleSheet.absoluteFill,
            backgroundColor: colors.heroImageOverlay,
        },
        heroBottomFade: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 145,
            backgroundColor: colors.backgroundOverlay,
        },
        contentBlock: {
            marginTop: 10,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            paddingHorizontal: 20 / 2,
            paddingTop: 20 / 2,
            backgroundColor: colors.background,
        },
        titleText: {
            color: colors.textPrimary,
            fontSize: 28,
            lineHeight: 38,
            marginBottom: 16,
        },
        infoGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 10,
        },
        infoCard: {
            width: "48.5%",
            borderRadius: 8,
            backgroundColor: colors.backgroundSecondary,
            borderWidth: 1,
            borderColor: colors.surfaceBorder,
            paddingHorizontal: 8,
            paddingVertical: 8,
        },
        infoRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
        },
        infoLabel: {
            color: colors.textLight,
            fontSize: 12,
        },
        infoValue: {
            color: colors.textPrimary,
            fontSize: 14,
            fontFamily: "Poppins-Medium",
            marginLeft: 4,
        },
        rsvpCard: {
            marginTop: 12,
            borderRadius: 8,
            backgroundColor: colors.backgroundSecondary,
            borderWidth: 1,
            borderColor: colors.surfaceBorder,
            paddingHorizontal: 8,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        attendingCount: {
            color: colors.textPrimary,
            fontFamily: "Poppins-Bold",
            fontSize: 28,
            lineHeight: 37,
        },
        attendingLabel: {
            color: colors.textLight,
            fontSize: 14,
            marginTop: 2,
        },
        attendeesTitle: {
            color: colors.textPrimary,
            fontSize: 16,
        },
        sectionTitle: {
            color: colors.textPrimary,
            fontSize: 16,
            marginTop: 16,
            marginBottom: 16,
        },
        descriptionText: {
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
        },
        tagsWrap: {
            marginTop: 12,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
        },
        attendeesHeader: {
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },
        attendeesSub: {
            color: colors.textLight,
            fontSize: 12,
        },
        attendeesRow: {
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
        },
        avatar: {
            width: 35,
            height: 35,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: colors.background,
        },
        avatarStacked: {
            marginLeft: -7,
        },
        moreText: {
            marginLeft: 8,
            color: colors.textLight,
            fontSize: 12,
        },
    });

export default EventDetailsScreen;
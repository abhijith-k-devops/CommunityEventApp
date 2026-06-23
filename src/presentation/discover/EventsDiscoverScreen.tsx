import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView, useWindowDimensions } from "react-native";
import { useCallback, useContext, useMemo, useState } from "react";
import { EventContext } from "../viewmodels/contexts/EventsContext";
import EventListItem from "./components/EventListItem";
import { useTheme } from "../../core/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import CustomText, { CustomTextVariant } from "../../core/components/CustomText";
import FilterChip from "./components/FilterChip";
import CustomTextInput from "../../core/components/CustomTextInput";
import { Events } from "../../domain/model/Events";
import { MainStackParamList } from "../../core/types/AppNavigationType";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const FILTERS = ["All", "Music", "Sports", "Tech", "Food", "Other"];

function EventsDiscoverScreen() {
    const context = useContext(EventContext);
    const { width } = useWindowDimensions();
    const isTwoColumn = width >= 768;
    const numColumns = isTwoColumn ? 2 : 1;

    const { colors } = useTheme();
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const styles = createStyles(colors);
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const handleItemClick = useCallback((event: Events) => {
        navigation.getParent()?.navigate("EventDetails", { event });
    }, [navigation]);


    if (!context) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: Context not available</Text>
            </View>
        );
    }

    const { events, loading, error } = context;

    const filteredEvents = useMemo(() => {
        let result = events;

        if (selectedFilter !== "All") {
            result = result.filter((event) =>
                (event.category || "").toLowerCase().includes(selectedFilter.toLowerCase())
            );
        }

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(
                (event) =>
                    event.title.toLowerCase().includes(q) ||
                    event.location.toLowerCase().includes(q)
            );
        }

        return result;
    }, [events, selectedFilter, searchQuery]);

    const featuredEvents = filteredEvents.filter((event) => event.isFeatured);
    const moreEvents = filteredEvents.filter((event) => !event.isFeatured);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Loading events...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <FlatList
                key={`discover-list-${numColumns}`}
                data={moreEvents}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <EventListItem
                        event={item}
                        onPress={() => handleItemClick(item)}
                        containerStyle={isTwoColumn ? styles.gridCard : styles.singleColumnCard}
                    />
                )}
                columnWrapperStyle={isTwoColumn ? styles.columnWrapper : undefined}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    filteredEvents.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                {searchQuery.trim()
                                    ? `No results for "${searchQuery.trim()}"`
                                    : `No events found for ${selectedFilter}`}
                            </Text>
                        </View>
                    ) : null
                }
                ListHeaderComponent={
                    <View>
                        <View style={styles.headerContainer}>
                            <CustomText style={styles.locationText}>DUBAI  .  UAE</CustomText>
                            <CustomText variant={CustomTextVariant.TITLE}>What&apos;s happening?</CustomText>

                            <CustomTextInput
                                placeholder="Search events or places..."
                                style={styles.searchBox}
                                placeholderTextColor={colors.textLight}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                returnKeyType="search"
                                clearButtonMode="while-editing"
                            />

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.filterRow}
                            >
                                {FILTERS.map((filter) => {
                                    const selected = selectedFilter === filter;
                                    return (
                                        <FilterChip
                                            key={filter}
                                            label={filter}
                                            selected={selected}
                                            onPress={() => setSelectedFilter(filter)}
                                        />
                                    );
                                })}
                            </ScrollView>
                        </View>

                        <View style={isTwoColumn ? styles.featuredGrid : undefined}>
                            {featuredEvents.map((featuredEvent) => (
                                <EventListItem
                                    key={featuredEvent.id}
                                    event={featuredEvent}
                                    onPress={() => handleItemClick(featuredEvent)}
                                    containerStyle={isTwoColumn ? styles.featuredGridCard : styles.singleColumnCard}
                                />
                            ))}
                        </View>

                        {moreEvents.length > 0 && (
                            <View style={styles.moreEventsHeader}>
                                <CustomText style={styles.moreEventsText}>MORE EVENTS</CustomText>
                            </View>
                        )}
                    </View>
                }
                scrollEnabled={true}
            />
        </SafeAreaView>
    );
}

function createStyles(colors: any) {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background,
        },
        headerContainer: {
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 8,
            overflow: "visible",
        },
        locationText: {
            color: colors.secondary,
            letterSpacing: 2,
            fontSize: 14,
            marginBottom: 10,
            fontFamily: "Poppins-Medium",
        },
        headingText: {
            color: colors.textPrimary,
            fontSize: 56 / 2,
            lineHeight: 32,
            marginBottom: 18,
            maxWidth: 220,
            fontFamily: "Poppins-Bold",
        },
        searchBox: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: colors.searchIconBackground,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.08)",
            borderRadius: 26,
            paddingHorizontal: 16,
            height: 45,
            marginTop: 16
        },
        searchText: {
            color: colors.textLight,
            fontSize: 22 / 2,
            fontFamily: "Poppins-Regular",
        },
        filterRow: {
            gap: 10,
            paddingTop: 14,
            paddingBottom: 14,
            paddingRight: 20,
            marginTop: 16,
            overflow: "visible",
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        loadingText: {
            marginTop: 10,
            fontSize: 16,
            color: colors.textPrimary,
        },
        errorContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
        },
        errorText: {
            color: colors.error,
            fontSize: 14,
            textAlign: "center",
        },
        emptyContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        emptyText: {
            fontSize: 16,
            color: colors.textSecondary,
        },
        moreEventsHeader: {
            paddingHorizontal: 20,
            paddingTop: 14,
            paddingBottom: 6,
        },
        moreEventsText: {
            color: colors.textLight,
            fontSize: 28 / 2,
            letterSpacing: 2,
            fontFamily: "Poppins-Medium",
        },
        singleColumnCard: {
            marginHorizontal: 16,
            marginVertical: 12,
        },
        gridCard: {
            width: "48%",
            marginHorizontal: "1%",
            marginVertical: 8,
        },
        columnWrapper: {
            paddingHorizontal: 8,
        },
        featuredGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 8,
        },
        featuredGridCard: {
            width: "48%",
            marginHorizontal: "1%",
            marginVertical: 8,
        },
        listContainer: {
            paddingTop: 2,
            paddingBottom: 120,
        },
    });
}

export default EventsDiscoverScreen;
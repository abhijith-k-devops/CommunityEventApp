import { Events } from "../model/Events";


function toHostModel(host: any) {
    const source = Array.isArray(host) ? host[0] : host;

    if (!source || typeof source !== "object") {
        return {
            name: "",
            bio: "",
            profileImageUrl: "",
            isVerified: false,
            location: "",
            eventOrganised: [],
        };
    }

    return {
        name: source.name || "",
        bio: source.bio || "",
        profileImageUrl: source.profileImageUrl || "",
        isVerified: Boolean(source.isVerified),
        location: source.location || "",
        eventOrganised: Array.isArray(source.eventOrganised)
            ? source.eventOrganised.map((e: any) => EventMapper.toEventModel(e))
            : [],
    };
}


export class EventMapper {
    static toEventModel(event: any): Events {
        return {
            id: event.id || "",
            title: event.title || "",
            description: event.description || "",
            category: event.category || "",
            date: event.date || "",
            location: event.location || "",
            isFeatured: event.isFeatured || false,
            imageUrl: event.imageUrl || "",
            attendeeCount: event.attendeeCount || 0,
            host: toHostModel(event.host),
        };
    }
}
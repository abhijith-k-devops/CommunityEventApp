import { Host } from "./Host";

export interface Events {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
    imageUrl: string;
    attendeeCount: number;
    host: Host;
    isFeatured?: boolean;
}
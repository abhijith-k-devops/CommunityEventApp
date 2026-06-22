import { Events } from "./Events";


export interface Host {
    name: string;
    bio: string;
    profileImageUrl: string;
    isVerified: boolean;
    location: string;
    eventOrganised: Events[];
}
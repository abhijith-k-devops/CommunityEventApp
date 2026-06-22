import { Events } from "../model/Events";

export interface EventRepository {
    getEvents(): Promise<Events[]>;
}
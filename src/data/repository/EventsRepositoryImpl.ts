import { EventRepository } from "../../domain/repository/EventRepository";
import { Events } from "../../domain/model/Events";
import { EventService } from "../source/EventService";

export class EventsRepositoryImpl implements EventRepository {
    async getEvents(): Promise<Events[]> {
        // Implementation for fetching events
        const eventService = new EventService();
        return eventService.getEvents();
    }
}
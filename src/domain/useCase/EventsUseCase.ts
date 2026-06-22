import { EventRepository } from "../repository/EventRepository";

export class EventsUseCase {
    private eventRepository: EventRepository;

    constructor(eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    async execute() {
        return this.eventRepository.getEvents();
    }
}
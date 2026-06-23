import { EventRepository } from "../repository/EventRepository";
import { Events } from "../model/Events";

export type GetEventsUseCase = (repository: EventRepository) => Promise<Events[]>;

export const getEventsUseCase: GetEventsUseCase = async (repository) => {
    return repository.getEvents();
};
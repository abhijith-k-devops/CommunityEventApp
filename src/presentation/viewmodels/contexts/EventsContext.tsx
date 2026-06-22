import React, { useEffect } from "react";
import { Events } from "../../../domain/model/Events";
import { EventsRepositoryImpl } from "../../../data/repository/EventsRepositoryImpl";
import { EventsUseCase } from "../../../domain/useCase/EventsUseCase";

interface EventContextProviderProps {
    children: React.ReactNode;
}

export type EventContextType = {
    events: Events[];
    loading: boolean;
    error: string | null;
    refreshEvents: () => Promise<void>;
};

export const EventContext = React.createContext<EventContextType | null>(
    null
);

export function EventContextProvider({children}: EventContextProviderProps) {

    const [events, setEvents] = React.useState<Events[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const injectedUseCase: EventsUseCase = new EventsUseCase(new EventsRepositoryImpl());

    async function fetchEvents() {
        setLoading(true);
        setError(null);

        try {
            const data = await injectedUseCase.execute();
            console.log("Fetched events:", data);
            setEvents(data);
        } catch (err) {
            console.error("Fetch events failed:", err);
            const message = err instanceof Error ? err.message : "Failed to fetch events";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{ events, loading, error, refreshEvents: fetchEvents }}>
            {children}
        </EventContext.Provider>
    );

}


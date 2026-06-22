import { API_URL } from "../../core/utils/AppConstants";
import { EventMapper } from "../../domain/mapper/EventMapper";
import { Events } from "../../domain/model/Events";


export class EventService {
    
    async getEvents(): Promise<Events[]> {
        return fetch(API_URL)
            .then(response => response.json())
            .then((data: any[]) => {
                return data.map(event => (
                    EventMapper.toEventModel(event)
                ));
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                throw error;
            });
    }
}
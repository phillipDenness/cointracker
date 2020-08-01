import { LivePrice } from '../interfaces/LivePrice';

const FetchService = () => {
    let subscribers = [];
    const location = {
        latitude: 0,
        longitude: 0
    };

    return {
        subscribe: sub => subscribers.push(sub),
        setLocation: (coords: LivePrice) => {
            console.log('is working');
            subscribers.forEach(sub => sub(coords));
        },
        unsubscribe: (sub) => {
            subscribers = subscribers.filter(_sub => _sub !== sub);
        }
    };
};

export const locationService = FetchService();

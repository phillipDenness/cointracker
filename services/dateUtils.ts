import Moment from 'moment';

Moment.locale('en');

export function formatDate(date: Date|string): string {
    const typeDate = new Date(date);
    return Moment(typeDate).format('HH:mm:ss');
}

import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { LivePrice } from '../interfaces/LivePrice';
import { locationService } from '../contexts/FetchService';

export const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, async () => {
    try {
        // const receivedNewData: LivePrice = await fetchOkCoinLivePrice('BTC-EUR');
        const receivedNewData: LivePrice = {
            price: '',
            percentChange: 0,
            symbol: 'test'
        };
        locationService.setLocation(receivedNewData);

        console.log(receivedNewData);
        // return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
    } catch (e) {
        console.error(e);
        return BackgroundFetch.Result.Failed;
    }
});

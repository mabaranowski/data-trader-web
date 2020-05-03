import { Dataset } from '../models/dataset.model';

export const DATASETS: Dataset[] = [
    {
        id: 1,
        internalType: "bundles",
        type: 'Temperature',
        location: 'Poland',
        quantity: 4000,
        date: new Date,
        description: 'Data from temperature sensor #1',
        entries: [
            {
                id: 1,
                data: 'x',
                metrics: 'y'
            }
        ]
    },
    {
        id: 2,
        internalType: "streams",
        type: 'Humidity',
        location: 'Poznan',
        quantity: 2390,
        date: new Date,
        description: 'Data from humidity sensor #1',
        entries: [
            {
                id: 1,
                data: 'x',
                metrics: 'y'
            }
        ]
    }
];

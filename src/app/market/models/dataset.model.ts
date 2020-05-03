import { DataEntry } from './data-entry.model';

export interface Dataset {
    id?: number;
    internalType?: string;
    type?: string;
    location?: string;
    quantity?: number;
    date?: Date;
    description?: string;
    entries?: DataEntry[];
}

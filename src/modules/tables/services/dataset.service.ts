import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dataset } from '../models/dataset.model';
import { DATASETS } from '../data/datasets';

@Injectable({ providedIn: 'root' })
export class DatasetService {

    datasets$: Observable<Dataset[]>;

    constructor() {
        this.datasets$ = of(DATASETS);
    }

    getDataset(id: number): Dataset {
        let result: Dataset = {};
        this.datasets$.subscribe(dataset => {
            dataset.forEach(set => {
                if(set.id == id) {
                    result = set;
                }
            })
        });
        return result;
    }

    getDatasets(type: string): Dataset[] {
        let result: Dataset[] = [];
        this.datasets$.subscribe(dataset => {
            dataset.forEach(set => {
                if(set.internalType == type) {
                    result.push(set);
                }
            })
        });
        return result;
    }

    

}

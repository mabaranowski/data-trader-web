import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '@app/market/services/dataset.service';
import { DEVICE_TYPE, DEVICE_LOCATION } from '@app/market/data/device-const';

@Component({
    selector: 'sb-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {
    dataType!: string;
    datasets: any;

    constructor(
        public route: ActivatedRoute,
        private datasetService: DatasetService
        ) {}
    
    ngOnInit() {
        this.route.url.subscribe(params => {
            this.dataType = params[0].path === 'bundles' ? 'bundle' : 'stream';
        });

        this.datasetService.getDatasetsByType(this.dataType).subscribe((res: any) => {
            res.forEach((element: any) => {
                element = this.translateValues(element);
            });
            this.datasets = this.translateValues(res);
        });
    }

    private translateValues(res: any) {
        const typeName = DEVICE_TYPE.find((val: any) => val.value === res.type);
        const locationName = DEVICE_LOCATION.find((val: any) => val.value === res.location);
        res.type = typeName?.name;
        res.location = locationName?.name;
        return res;
    }

}

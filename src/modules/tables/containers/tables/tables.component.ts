import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sb-tables',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './tables.component.html',
    styleUrls: ['tables.component.scss'],
})
export class TablesComponent implements OnInit {

    dataPath!: string;

    constructor(public route: ActivatedRoute) {}
    
    ngOnInit() {
        this.route.url.subscribe(params => {
            this.dataPath = params[0].path;
        })
    }
}

import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MarketService } from '@app/market/services/market.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sb-dashboard-cards',
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    @Input() removeState!: boolean;
    @Input() deviceList!: any[];
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private marketService: MarketService
        ) {}

    ngOnInit() {}

    onRemoveEvent(id: string) {
        const found = this.deviceList.findIndex((element: any) => element._id == id);
        this.deviceList.splice(found, 1);

        this.marketService.removeDevice(id).subscribe();
    }

    onGetDetailsEvent(id: string) {
        this.router.navigate(['details', id], { relativeTo: this.route });
    }

}

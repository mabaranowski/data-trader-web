import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { MarketService } from '@app/market/services/market.service';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {
    @Input() removeState!: boolean;
    @Input() deviceList!: any[];
    
    constructor(private marketService: MarketService) {}

    ngOnInit() {
        //TODO Implement connection to devices and color based on success
    }

    onRemoveEvent(id: string) {
        const found = this.deviceList.findIndex((element: any) => element._id == id);
        this.deviceList.splice(found, 1);

        this.marketService.removeDevice(id).subscribe(res => {
        });
    }

}

import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'sb-card-view-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './card-view-details.component.html',
    styleUrls: ['card-view-details.component.scss'],
})
export class CardViewDetailsComponent implements OnInit {
    @Input() background!: string;
    @Input() color!: string;
    @Input() removeState!: boolean;
    @Output() removeEvent = new EventEmitter<void>();

    customClasses: string[] = [];
    faTimesCircle = faTimesCircle;

    constructor() {}
    ngOnInit() {
        if (this.background) {
            this.customClasses.push(this.background);
        }
        if (this.color) {
            this.customClasses.push(this.color);
        }
    }

    onRemove() {
        this.removeEvent.emit();
    }

}

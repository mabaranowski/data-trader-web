import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Input
} from '@angular/core';
import { Chart } from 'chart.js';
import moment from 'moment';
import { calculateProperLength, colorPicker } from '@app/commons/utils/chart.util';

@Component({
    selector: 'sb-charts-bar',
    templateUrl: './charts-bar.component.html',
    styleUrls: ['charts-bar.component.scss'],
})
export class ChartsBarComponent implements OnInit, AfterViewInit {
    @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
    @Input() payload!: any[];
    @Input() color!: string;

    labels: string[] = [];
    data: any[] = [];
    chart!: Chart;

    constructor() {}
    
    ngOnInit() {
        calculateProperLength(this.payload, 24);
        this.payload.forEach(data => {
            this.labels.push(moment(data.time).format('h:mm:ss a'));
            this.data.push(data.value);
        });
    }

    ngAfterViewInit() {
        this.chart = new Chart(this.myBarChart.nativeElement, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Data',
                        backgroundColor: colorPicker(this.color, 1),
                        borderColor: colorPicker(this.color, 1),
                        data: this.data,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'minute',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 10,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 10,
                            },
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }

}

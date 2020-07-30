import {
    AfterViewInit,
    Component,
    ElementRef,
    Input, OnInit,
    ViewChild
} from '@angular/core';
import { calculateProperLength, colorPicker } from '@app/commons/utils/chart.util';
import { Chart } from 'chart.js';
import moment from 'moment';

@Component({
    selector: 'sb-charts-area',
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    @Input() payload!: any[];
    @Input() color!: string;
    @Input() displayLabelX: boolean = true;
    @Input() chartTitle: string = 'placeholder';
    displayChartTitle: boolean = false;

    labels: string[] = [];
    data: any[] = [];
    chart!: Chart;

    constructor() {}

    ngOnInit() {
        if(typeof this.payload[0] == 'string') {
            this.chartTitle = this.payload[0];
            this.payload = this.payload[1];
            this.displayChartTitle = true;
        }

        calculateProperLength(this.payload, 24);
        this.payload.forEach(data => {
            this.labels.push(moment(data.time).format('h:mm:ss a'));
            this.data.push(data.value);
        });
    }

    ngAfterViewInit() {
        this.chart = new Chart(this.myAreaChart.nativeElement, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Data',
                        lineTension: 0.3,
                        backgroundColor: colorPicker(this.color, 0.2),
                        borderColor: colorPicker(this.color, 1),
                        pointRadius: 4,
                        pointBackgroundColor: colorPicker(this.color, 1),
                        pointBorderColor: 'rgba(255,255,255,0.8)',
                        pointHoverRadius: 1,
                        pointHoverBackgroundColor: colorPicker(this.color, 1),
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
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
                                display: this.displayLabelX
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 10,
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, .125)',
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
                title: {
                    display: this.displayChartTitle,
                    fontFamily: 'Nunito-ExtraBold',
                    text: this.chartTitle
                }
            },
        });
    }

}

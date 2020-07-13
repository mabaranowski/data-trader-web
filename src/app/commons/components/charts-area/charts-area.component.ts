import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Input,
    ChangeDetectorRef,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
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

    labels: string[] = [];
    data: any[] = [];
    chart!: Chart;

    constructor() {}

    ngOnInit() {
        this.calculateProperLength(24);
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
                        backgroundColor: this.colorPicker(0.2),
                        borderColor: this.colorPicker(1),
                        pointRadius: 4,
                        pointBackgroundColor: this.colorPicker(1),
                        pointBorderColor: 'rgba(255,255,255,0.8)',
                        pointHoverRadius: 1,
                        pointHoverBackgroundColor: this.colorPicker(1),
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
                                maxTicksLimit: 10
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
            },
        });
    }

    private colorPicker(alpha: number) {
        if(this.color === 'blue') {
            return `rgba(2, 117, 214, ${alpha})`;
        }
        if(this.color === 'red') {
            return `rgba(214, 2, 20, ${alpha})`;
        }
        if(this.color === 'green') {
            return `rgba(2, 214, 13, ${alpha})`;
        }
        if(this.color === 'yellow') {
            return `rgba(214, 196, 2, ${alpha})`;
        }
    }

    private calculateProperLength(targetLen: number) {
        const initLen = this.payload.length;
        this.payload.splice(0, initLen - targetLen);
    }

}

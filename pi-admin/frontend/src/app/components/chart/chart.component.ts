import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from "chart.js";
import {BaseChartDirective, Color, Label} from "ng2-charts";
import {debounceTime, filter, throttleTime} from "rxjs/operators";
import {WebsocketService} from "../../services/websocket.service";
import {Temp} from "../../app.component";

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

    public lineChartData: ChartDataSets[] = [];
    public lineChartLabels: Label[] = [];
    public lineChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                }
            ]
        },
    };
    public lineChartColors: Color[] = [
        { // grey
            backgroundColor: 'rgba(255,129,47,0.53)',
            borderColor: 'rgb(255,76,0)',
            pointBackgroundColor: 'rgb(253,64,30)',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#ff1d00',
            pointHoverBorderColor: 'rgba(148,159,177,0)'
        },
        { // dark grey
            backgroundColor: 'rgba(255,81,211,0.51)',
            borderColor: 'rgb(255,31,245)',
            pointBackgroundColor: 'rgb(168,9,154)',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#e213cd',
            pointHoverBorderColor: 'rgba(77,83,96,0)'
        },
        { // red
            backgroundColor: 'rgba(182,101,255,0.54)',
            borderColor: 'rgb(153,44,255)',
            pointBackgroundColor: 'rgb(153,44,255)',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: 'rgb(136,9,248)',
            pointHoverBorderColor: 'rgba(153,44,255,0)',
        },
        { // blue
            backgroundColor: 'rgba(128,255,102,0.49)',
            borderColor: 'rgb(43,227,2)',
            pointBackgroundColor: 'rgb(26,255,0)',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#00c12f',
            pointHoverBorderColor: 'rgba(148,159,177,0)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';

    private keyByIndex = {};


    constructor(private wsService: WebsocketService) {
    }

    ngOnInit() {
        this.wsService.wsMessages
            .pipe(
                filter((message: any) => message.path === 'device.temp.all'),
                throttleTime(1000)
            )
            .subscribe((message: { data: Temp[] }) => {
                this.lineChartLabels.push('')
                if (this.lineChartLabels.length >= 20000) {
                    this.lineChartLabels = []
                    this.lineChartData = []
                }

                message.data.forEach((temp, index) => {
                    index = this.keyByIndex[temp.zone] || index
                    this.keyByIndex[temp.zone] = index;
                    if (!this.lineChartData[index]) {
                        this.lineChartData[index] = {data: [temp.temp], label: index.toString()};
                    } else {
                        // if (this.lineChartData[index].data.length >= 10) {
                        //     this.lineChartData[index].data.splice(0, 1)
                        // }
                        this.lineChartData[index].data.push(temp.temp);
                    }
                });
            })

    }

    // events
    public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

}

import { Component, OnInit } from '@angular/core';
import { ApexOptions, ApexChart } from 'ng-apexcharts';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-apex-line',
  templateUrl: './apex-line.component.html',
  styleUrls: ['./apex-line.component.scss']
})
export class ApexLineComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  zoomableTimeseriesChart: ApexOptions = {
    series: [], // Default to empty array
    chart: {
      type: 'line', // Provide a default value for 'type'
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date création'
      }
    },
    yaxis: {
      title: {
        text: 'nombre utilisateurs'
      }
    },
    tooltip: {
      x: {
        format: 'dd/MM/yyyy'
      }
    }
  };

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    // Fetch user data and set up the chart
    this.authService.retrieveUsers().subscribe(users => {
    console.log('Received users:', users); // Log the user data
    this.setupChart(users);
    });
  }

  private setupChart(users: any[]): void {
    // Process user data
    const userCountsByDate = this.aggregateUserCountsByDate(users);

    // Configure the chart
    this.zoomableTimeseriesChart.series = [{
      name: 'Number of Users',
      data: userCountsByDate
    }];
  }

  private aggregateUserCountsByDate(users: any[]): any[] {
    const counts: { [key: string]: number } = {};

    users.forEach(user => {
      const date = new Date(user.createdAt).toDateString();
      counts[date] = (counts[date] || 0) + 1;
    });

    return Object.keys(counts).map(date => ({
      x: new Date(date).getTime(),
      y: counts[date]
    }));
  }
}

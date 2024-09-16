import { Component, OnInit } from '@angular/core';
import { OffreService } from 'src/app/core/services/offre.service';
import { Offre } from 'src/app/Models/offre';

@Component({
  selector: 'app-apex-radar',
  templateUrl: './apex-radar.component.html',
  styleUrls: ['./apex-radar.component.scss']
})
export class ApexRadarComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  offres: Offre[] = []; // To hold all offers
  basicRadarChart: any;

  constructor(private offreservice: OffreService) { }

  ngOnInit(): void {
    this.fetchOffres();
  }

  /**
   * Fetch all Offres and build the chart dynamically
   */
  private fetchOffres() {
    this.offreservice.getAllOffres().subscribe((data: Offre[]) => {
      this.offres = data;
      if (this.offres.length) {
        this.buildRadarChart(this.offres);
        
      }
    });
  }

  /**
   * Build Radar Chart with number of Candidatures for each Offre
   */
  private buildRadarChart(offres: Offre[]) {
    // Initialize arrays for the chart data
    const categories: string[] = [];
    const candidatureCounts: number[] = [];

    offres.forEach(offre => {
        // Push offer title as a category
        if (offre.title) {
            categories.push(offre.title);
        }

        // Use the candidatureCount field
        const candidatureCount = offre.candidatureCount; // This should now be populated correctly
        candidatureCounts.push(candidatureCount);
    });

    // Build the chart using the collected data
    this.basicRadarChart = {
        series: [
            {
                name: 'Candidatures',
                data: candidatureCounts
            }
        ],
        chart: {
            height: 350,
            type: "radar"
        },
        xaxis: {
            categories: categories // Offer titles as categories
        },
        stroke: {
            width: 2
        },
        markers: {
            size: 4
        },
        title: {
            text: "Number of Candidatures per Offer",
            align: 'center'
        }
    };
}



}

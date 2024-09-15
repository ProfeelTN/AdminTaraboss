import { Component, QueryList, ViewChildren } from '@angular/core';
import { GridJsModel } from './gridjs.model';
import { GridJsService } from './gridjs.service';
import { NgbdGridJsSortableHeader, SortEvent, } from './gridjs-sortable.directive';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { OffreService } from 'src/app/core/services/offre.service';
import { Offre } from 'src/app/Models/offre';
import { ToastrService } from 'ngx-toastr'; // Assuming you're using ngx-toastr for notifications

// import { SortColumn, SortDirection, SortEvent } from './gridjs.service'; // Import from the correct service/model file


@Component({
  selector: 'app-gridjs',
  templateUrl: './gridjs.component.html',
  styleUrls: ['./gridjs.component.scss'],
  providers: [GridJsService, DecimalPipe]
})
export class GridjsComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  
  
  // List of offers
  offres: Offre[] = [];

  // Table data for gridjs
  gridjsList$!: Observable<Offre[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdGridJsSortableHeader) headers!: QueryList<NgbdGridJsSortableHeader>;

  constructor(public service: GridJsService, private offreService: OffreService,
    private toastr: ToastrService
  ) {
    this.gridjsList$ = service.offres$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.loadAllOffre();

    // Setting up breadcrumb items
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'Grid Js', active: true }
    ];
  }

  /**
   * Sort table data based on the clicked column
   * @param param0 sort event with column and direction
   */
  onSort({ column, direction }: SortEvent) {
    // Resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  /**
   * Load all offers using the OffreService and update the grid
   */
  loadAllOffre() {
    this.offreService.getAllOffres().subscribe({
      next: (offres) => {
        this.offres = offres; // Store the fetched offers
        console.log('Offres:', this.offres);

        // Trigger the service to search and update the grid data
        this.service.searchTerm = ''; // Reset or set search term if needed
      },
      error: (err) => {
        console.error('Error loading offres:', err);
      }
    });
  }
  onDeleteOffre(id: number): void {
    if (confirm('confirmer votre suppression')) {
      this.offreService.deleteOffre(id).subscribe(
        () => {
          this.toastr.success('Offer deleted successfully'); // Show success notification
          this.loadAllOffre(); // Refresh the list after deletion
        },
        error => {
          this.toastr.error('Failed to delete the offer');
        }
      );
    }
  }
}

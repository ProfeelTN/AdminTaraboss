import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// Sweet Alert
import Swal from 'sweetalert2';

import { ListJs, paginationlist, dataattribute, existingList, FuzzyList } from '../../../core/data/table-listjs';
// import { ListService } from './listjs.service';
import { CandidatureService } from 'src/app/core/services/candidature.service';
import { Candidature } from 'src/app/Models/candidature';
import { NotificationService } from 'src/app/core/services/Notifucation.service';

@Component({
  selector: 'app-listjs',
  templateUrl: './listjs.component.html',
  styleUrls: ['./listjs.component.scss'],
})
export class ListjsComponent {
  breadCrumbItems!: Array<{}>;


  candidatures: Candidature[] = [];
  paginatedCandidatures: Candidature[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Adjust the number of items per page
  totalPages: number = 1;

  constructor(private route:Router,private candidatureService: CandidatureService,private notifService:NotificationService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'Grid Js', active: true }
    ];
    this.loadCandidatures();
  }

  loadCandidatures(): void {
    this.candidatureService.getAllCandidatures().subscribe({
      next: (candidatures: Candidature[]) => {
        this.candidatures = candidatures;
        this.totalPages = Math.ceil(this.candidatures.length / this.itemsPerPage);
        this.updatePaginatedCandidatures();
      },
      error: (err) => {
        console.error('Error loading candidatures:', err);
      }
    });
  }

  updatePaginatedCandidatures(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCandidatures = this.candidatures.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCandidatures();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCandidatures();
    }
  }

  acceptCandidature(candidatureId: number) {
    this.candidatureService.acceptCandidature(candidatureId).subscribe(
      response => {
        if (response === 'Candidature accepted successfully') {
          // this.notifService.showSuccess('Candidature accepted successfully', 'Success');
          window.location.reload();
        } else {
          // this.notifService.showError('Unexpected response', 'Error');
        }
        this.route.navigate(["/tables/listjs"]).then(()=>{
          window.location.reload();
        });

      },
      error => {
        // this.notifService.showError('Failed to accept candidature', 'Error');
      }
      
    );
    this.route.navigate(["/tables/listjs"]).then(()=>{
      window.location.reload();
    });
  }
  
  
  refuseCandidature(candidatureId: number) {
    this.candidatureService.refuseCandidature(candidatureId).subscribe(
      response => {
        this.notifService.showSuccess('Candidature refused successfully', 'Success');
        this.route.navigate(["/tables/listjs"]).then(()=>{
          window.location.reload();
        });
      },
      
      error => {
        this.notifService.showError('Failed to refuse candidature', 'Error');
      }
    );
    this.route.navigate(["/tables/listjs"]).then(()=>{
      window.location.reload();
    });
  }
  
  
}
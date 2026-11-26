import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Barangay, BarangayInfo } from '../barangay';

@Component({
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-public-viewing-page',
  styleUrl: './public-viewing-page.css',
  templateUrl: './public-viewing-page.html',
})
export class PublicViewingPage implements OnInit{
  private formBuilder = inject(FormBuilder);
  barangayService = inject(Barangay);
  editingId = signal<string | null>(null);

  ngOnInit(){
    this.barangayService.fetchBarInfo();
  }

    deleteBarInfo(id: string){
    if (!confirm('Are you sure to delete this Ticket Card?')) return;

    this.barangayService.deleteBarInfo(id).subscribe({
      next: () => this.barangayService.fetchBarInfo(),
      error: (err: unknown) => console.error('Error: Deletion Failed.', err),
    });
  }
}

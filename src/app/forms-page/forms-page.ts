import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Barangay, BarangayInfo } from '../barangay';

@Component({
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-forms-page',
  styleUrl: './forms-page.css',
  templateUrl: './forms-page.html',
})
export class FormsPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  barangayForms = inject(Barangay);
  editingId = signal<string | null>(null);

  barangayFormsPage = this.formBuilder.nonNullable.group({
    barangayLocation: ['', Validators.required],
    issueAndConcern: ['', Validators.required],
    placeOfResidence: ['', Validators.required],
    nameOfResident: ['']
  });

  ngOnInit(){
    this.barangayForms.fetchBarInfo();
  }

  startEdit(cardInfo: BarangayInfo){
    this.editingId.set(cardInfo._id);
    this.barangayFormsPage.patchValue({
      barangayLocation: cardInfo.barangayLocation,
      issueAndConcern: cardInfo.issueAndConcern,
      placeOfResidence: cardInfo.placeOfResidence,
      nameOfResident: cardInfo.nameOfResident
    });
  }

  cancelEdit(){
    this.editingId.set(null);
    this.barangayFormsPage.reset();
  }

  deleteBarInfo(id: string){
    if (!confirm('Are you sure to delete this Ticket Card?')) return;

    this.barangayForms.deleteBarInfo(id).subscribe({
      next: () => this.barangayForms.fetchBarInfo(),
      error: (err: unknown) => console.error('Error: Deletion Failed.', err),
    });
  }

  onSubmit(){
    if (this.barangayFormsPage.invalid) return;
    const data = this.barangayFormsPage.getRawValue();
    const id = this.editingId();

    if (id){
      this.barangayForms.updateBarInfo(id, data).subscribe({
        next: () =>  {
          this.barangayForms.fetchBarInfo();
          this.cancelEdit();
        },
        error: (err: unknown) => console.error('Error: Update Failed.', err),
      });
    } else {
      this.barangayForms.saveBarInfo(data).subscribe({
        next: () => {
          this.barangayForms.fetchBarInfo();
          this.barangayFormsPage.reset();
        },
        error: (err: unknown) => console.error('Error: Save Failed.', err),
      });
    }
  }
}
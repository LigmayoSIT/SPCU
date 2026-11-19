import { Component, inject, OnInit } from '@angular/core';
import { Barangay } from '../barangay';

@Component({
  imports: [],
  selector: 'app-public-viewing-page',
  styleUrl: './public-viewing-page.css',
  templateUrl: './public-viewing-page.html',
})
export class PublicViewingPage implements OnInit{
  protected barangayService = inject(Barangay);
  ngOnInit(){
    this.barangayService.fetchBarInfo();
  }
}

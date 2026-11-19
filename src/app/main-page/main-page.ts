import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Barangay } from '../barangay'

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  selector: 'app-main-page',
  styleUrl: './main-page.css',
  templateUrl: './main-page.html',
})
export class MainPage {}

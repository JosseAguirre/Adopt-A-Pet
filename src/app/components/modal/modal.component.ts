import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { MascotInterface } from './../../models/mascot';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }

  onSaveMascot(formMascot: NgForm): void {
    if (formMascot.value.id == null) {
      // New 
      this.dataApi.addMascot(formMascot.value);
    } else {
      // Update
      this.dataApi.updateMascot(formMascot.value);
    }
    formMascot.resetForm();
    this.btnClose.nativeElement.click();
  }

}

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { MascotInterface } from './../../models/mascot';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService, private storage: AngularFireStorage) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `mascots/mascot_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onSaveMascot(formMascot: NgForm): void {
    if (formMascot.value.id == null) {
      // New 
      formMascot.value.userUid = this.userUid;
      this.dataApi.addMascot(formMascot.value);
    } else {
      // Update
      this.dataApi.updateMascot(formMascot.value);
    }
    formMascot.resetForm();
    this.btnClose.nativeElement.click();
  }

}

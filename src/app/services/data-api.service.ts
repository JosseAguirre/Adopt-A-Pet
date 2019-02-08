import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { MascotInterface } from './../models/mascot';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) { }
  private mascotsCollection: AngularFirestoreCollection<MascotInterface>;
  private mascots: Observable<MascotInterface[]>;
  private mascotDoc: AngularFirestoreDocument<MascotInterface>;
  private mascot: Observable<MascotInterface>;
  public selectedMascot: MascotInterface = {
    id: null
  };


  getAllMastcots() {
    this.mascotsCollection = this.afs.collection<MascotInterface>('mascots');
    return this.mascots = this.mascotsCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as MascotInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOneMascot(idMascot: string) {
    this.mascotDoc = this.afs.doc<MascotInterface>(`mascots/${idMascot}`);
    return this.mascot = this.mascotDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as MascotInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addMascot(mascot : MascotInterface) {
    this.mascotsCollection.add(mascot);
  }

  updateMascot(mascot : MascotInterface) {
    let idMascot = mascot.id;
    this.mascotDoc = this.afs.doc<MascotInterface>(`mascots/${idMascot}`);
    this.mascotDoc.update(mascot);
  }

  deleteMascot(idMascot: string) {
    this.mascotDoc = this.afs.doc<MascotInterface>(`mascots/${idMascot}`);
    this.mascotDoc.delete();
  }
}

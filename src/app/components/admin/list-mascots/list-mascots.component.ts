import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import { MascotInterface } from './../../../models/mascot';

@Component({
  selector: 'app-list-mascots',
  templateUrl: './list-mascots.component.html',
  styleUrls: ['./list-mascots.component.css']
})
export class ListMascotsComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  private mascots: MascotInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  paginaActual: number = 1;

  ngOnInit() {
    this.getListMacots();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
        })
      }
    })
  }

  getListMacots() {
    this.dataApi.getAllMastcots()
      .subscribe(mascots => {
        this.mascots = mascots;
      });
  }

  onDeleteMascot(idMascot: string): void {
    const confirmacion = confirm('Estas seguro?');
    if (confirmacion) {
      this.dataApi.deleteMascot(idMascot);
    }
  }

  onPreUpdateMascot(mascot: MascotInterface) {
    console.log('BOOK', mascot);
    this.dataApi.selectedMascot = Object.assign({}, mascot);
  }

}

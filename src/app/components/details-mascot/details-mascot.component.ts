import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service'
import { MascotInterface } from './../../models/mascot';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-mascot',
  templateUrl: './details-mascot.component.html',
  styleUrls: ['./details-mascot.component.css']
})
export class DetailsMascotComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  public mascot : MascotInterface = {};

  ngOnInit() {
    const idMascot = this.route.snapshot.params['id'];
    this.getDetails(idMascot);
  }

  getDetails(idMascot: string): void {
    this.dataApi.getOneMascot(idMascot).subscribe(mascot => {
      this.mascot = mascot;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public mascots = [];
  public mascot = '';
  public books = [];
  public book = '';

  ngOnInit() {
    this.dataApi.getAllBooks().subscribe(books => {
      console.log('BOOKS', books);
      this.books = books;
    })

    this.dataApi.getAllMastcots().subscribe(mascots => {
      console.log('Mascots', mascots);
      this.mascots = mascots;
    })
  }



}

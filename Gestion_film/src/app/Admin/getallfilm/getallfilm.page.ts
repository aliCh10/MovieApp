import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';
import { Film } from '../Film';

@Component({
  selector: 'app-getallfilm',
  templateUrl: './getallfilm.page.html',
  styleUrls: ['./getallfilm.page.scss'],
})
export class GetallfilmPage implements OnInit {
  films: Film[] = [];  // Declare the films array

  constructor(private service:AdminserviceService) { }

  ngOnInit() {
    return this.service.getFilms().subscribe({
      next: (data) => {console.log(data)
        const filmsArray: Film[] = [];
        for (const key in data) {
          filmsArray.push({ ...data[key], id: key });

        }
        console.log(filmsArray);
        this.films = filmsArray;


      },
      error: (error) => console.error(error)


    })

  }

}

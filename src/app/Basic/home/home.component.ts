import "../../../assets/Js/slidePage.min.js";
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
declare var $:any;
declare var slidePage;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    $('#pagination').find('a').eq(0).addClass('active')
    slidePage.init({
        /*'index': 1,*/
        before: function (index, direction, target) {
            if (direction == 'next') {
                if (target == 1) {
                    slidePage.fire(2)
                }
                $('#pagination').find('a').removeClass('active').eq(index).addClass('active')
            } else if (direction == 'prev') {
                $('#pagination').find('a').removeClass('active').eq(target - 1).addClass('active')
            }
        },
        after: function (index, direction, target) {
        },
        'useAnimation': true,
        'refresh': true,
        'speed': false,
    });
  }

}

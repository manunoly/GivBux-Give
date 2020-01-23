import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-givbux',
  templateUrl: './header-givbux.component.html',
  styleUrls: ['./header-givbux.component.scss'],
})
export class HeaderGivbuxComponent implements OnInit {

  @Input() inicio = true;
  @Input() fin = true;

  constructor() { }

  ngOnInit() {}

}

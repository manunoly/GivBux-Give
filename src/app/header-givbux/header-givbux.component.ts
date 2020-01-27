import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../_services/utils.service';

@Component({
  selector: 'app-header-givbux',
  templateUrl: './header-givbux.component.html',
  styleUrls: ['./header-givbux.component.scss'],
})
export class HeaderGivbuxComponent implements OnInit {

  @Input() inicio = true;
  @Input() fin = true;
  @Input() regresarApp = true;

  constructor(private _util : UtilsService) { }

  ngOnInit() {}

  returnApp(){
    this._util.returnToApp();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'src/app/_services/utils.service';

@Component({
  selector: 'app-new-header-givbux',
  templateUrl: './new-header-givbux.component.html',
  styleUrls: ['./new-header-givbux.component.scss'],
})
export class NewHeaderGivbuxComponent implements OnInit {

  @Input() inicio = true;
  @Input() fin = true;
  @Input() title : string = '';
  @Input() toolbar : boolean = true;
  @Input() shape : boolean = true;
  @Input() regresarApp = false;

  constructor(private _util : UtilsService) { }

  ngOnInit() {}

  returnApp(){
    this._util.returnToApp();
  }

}

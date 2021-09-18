import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Record } from 'src/app/services/Record';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() records:Record[] = [];

  @Output() selectRecord = new EventEmitter<string | number>();

  constructor() { }

  ngOnInit(): void {
  }

  selectRecordFromSideBar(i:number){
    this.selectRecord.emit(i);
  }

}

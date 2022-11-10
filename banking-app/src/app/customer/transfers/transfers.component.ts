import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  // transfers
  day = ["monday","tuesday","wednesday","thursday","friday"];

  constructor() { }

  ngOnInit(): void {
  }

}

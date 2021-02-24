import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  @Input() message: string = 'Caricamento in corso...';
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-socials-links',
  templateUrl: './socials-links.component.html',
  styleUrls: ['./socials-links.component.css'],
})
export class SocialsLinksComponent implements OnInit {
  faLinkedinIn = faLinkedinIn;
  constructor() {}

  ngOnInit(): void {}
}

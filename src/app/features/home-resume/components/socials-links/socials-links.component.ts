import { Component, OnInit } from '@angular/core';
import { faLinkedinIn, faGitlab } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-socials-links',
  templateUrl: './socials-links.component.html',
  styleUrls: ['./socials-links.component.scss'],
})
export class SocialsLinksComponent implements OnInit {
  faLinkedinIn = faLinkedinIn;
  faGitlab = faGitlab;
  constructor() {}

  ngOnInit(): void {}
}

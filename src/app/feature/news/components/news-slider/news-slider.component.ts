import { Component, Input, OnInit } from '@angular/core';
import { FlickingOptions, Plugin } from '@egjs/flicking/declaration/types';
import { News } from '../../news.model';

@Component({
  selector: 'app-news-slider',
  templateUrl: './news-slider.component.html',
  styleUrls: ['./news-slider.component.scss'],
})
export class NewsSliderComponent implements OnInit {
  @Input() resumePosition: 'left' | 'right';
  @Input() title: string;
  @Input() description: string;
  @Input() sliderOptions: Partial<FlickingOptions>;
  @Input() data: News[] = [];
  @Input() sliderPlugins: Plugin[];
  constructor() {}

  ngOnInit(): void {}
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideosService} from '../videos/videos.service';
import {VideoItem} from '../videos/video';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css'],
  providers: [VideosService]
})
export class SearchDetailComponent implements OnInit, OnDestroy {
  query: string;
  videoList: [VideoItem];
  private routeSub: any;
  private req: any;

  constructor(private route: ActivatedRoute, private _video: VideosService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.query = params['q'];
      this.req = this._video.search(this.query).subscribe(data => {
          this.videoList = data as [VideoItem];
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.req.unsubscribe();
  }
}

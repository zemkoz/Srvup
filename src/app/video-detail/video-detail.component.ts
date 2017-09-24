import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VideosService} from '../videos/videos.service';
import {VideoItem} from '../videos/video';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [VideosService]
})
export class VideoDetailComponent implements OnInit, OnDestroy {
  video: VideoItem;
  slug: string;

  private routeSubscribe;
  private req: any;

  constructor(private route: ActivatedRoute, private _videos: VideosService) { }

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(params => {
      this.slug = params['slug'];
      this.req = this._videos.get(this.slug).subscribe((data) => {
        this.video = data as VideoItem;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscribe.unsubscribe();
    this.req.unsubscribe();
  }

  getEmbedUrl(embedId: string): string {
    return 'https://www.youtube.com/embed/' + embedId + '?ecver=2';
  }
}

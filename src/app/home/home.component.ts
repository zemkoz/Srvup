import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {VideosService} from '../videos/videos.service';
import {VideoItem} from '../videos/video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideosService]
})
export class HomeComponent implements OnInit, OnDestroy {
  homeImageList: [VideoItem];
  private req: any;

  constructor(private router: Router, private _http: Http, private _video: VideosService) { }

  ngOnInit() {
    this.req = this._video.list().subscribe((data) => {
      this.homeImageList = [] as [VideoItem];
      data.filter((item: VideoItem) => {
        if (item.featured) {
          this.homeImageList.push(item);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.req.unsubscribe();
  }

  preventNormal(event: MouseEvent, image: any) {
    if (!image.prevented) {
      event.preventDefault();
      this.router.navigate(['./videos']);
    }
  }
}

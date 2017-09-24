import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideosService} from '../videos/videos.service';
import {VideoItem} from '../videos/video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  providers: [VideosService]
})
export class VideoListComponent implements OnInit, OnDestroy {
  title = 'Videos';
  videoList: [VideoItem];
  todayDate;
  private req: any;

  constructor(private _video: VideosService) { }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.req = this._video.list().subscribe((data) => {
      this.videoList = data as [VideoItem];
    });
  }

  ngOnDestroy(): void {
    this.req.unsubscribe();
  }
}

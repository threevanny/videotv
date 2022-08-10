import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import HLS from 'hls.js';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit {
  private hls = new HLS();
  public user: string | null = 'HOME' //TODO: User que se pasa por la url como parametro !
  private playing: boolean = false;
  @ViewChild('video', { static: true }) private readonly video: ElementRef<HTMLVideoElement> | any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('user') || 'HOME';
    this.load(`http://localhost:8000/live/${this.user}/index.m3u8`)
  }

  public loadInit(): void { }

  public load(currentVideo: string): void {
    if (HLS.isSupported()) {
      this.loadVideoWithHLS(currentVideo);
    } else {
      alert('HLS is not supported');
    }
  }

  private loadVideoWithHLS(currentVideo: string) {
    this.hls.loadSource(currentVideo);
    this.hls.attachMedia(this.video.nativeElement);
  }
}
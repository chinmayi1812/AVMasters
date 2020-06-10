import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public videoId;
  constructor(private vidServ: VideoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // var a = document.getElementsByTagName('video')[0];
    // var b = document.getElementsByTagName('audio')[0];
    // a.onplay = function () { a.currentTime = b.currentTime; b.play() };
    // a.onpause = function () { b.pause() };
    // a.currentTime = b.currentTime;
    this.route.params.subscribe(para => this.videoId = para['id'])
    this.vidServ.getVideoByAssetId(this.videoId).subscribe((success) => {
      console.log(success)

      var myOptions = {
        autoplay: true,
        controls: true,
        width: "640",
        height: "400",
        poster: ""
      };
      var myPlayer = amp("azuremediaplayer", myOptions);
      myPlayer.src(
        [
          { src: success.streamingUrl, type: "application/vnd.ms-sstr+xml" },
        ],
        [
          { src: "assets/subtitle.vtt", srclang: "en", kind: "subtitles", label: "english" },
          { src: "https://storageaccountodlha8946.blob.core.windows.net/asset-6bd5ffc3-76aa-4093-9428-950da1a3f00a/transcript.vtt?sp=r&st=2020-06-09T16:38:02Z&se=2021-06-10T00:38:02Z&spr=https&sv=2019-10-10&sr=b&sig=ChsJoECNi%2FPw2Rg2Aq7Au9LtQQhoR7kdIrVRUnVc3NY%3D", srclang: "es", kind: "subtitles", label: "spanish" },
          { src: "//ams-samplescdn.streaming.mediaservices.windows.net/11196e3d-2f40-4835-9a4d-fc52751b0323/TOS-fr.vtt", srclang: "fr", kind: "subtitles", label: "french" },
          { src: "//ams-samplescdn.streaming.mediaservices.windows.net/11196e3d-2f40-4835-9a4d-fc52751b0323/TOS-it.vtt", srclang: "it", kind: "subtitles", label: "italian" }
        ]
      );
    }, (error) => { })

  }
  time() {
    var a = document.getElementsByTagName('video')[0];
    a.currentTime = 30;
  }

}

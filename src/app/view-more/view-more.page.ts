import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Charity } from '../_models/charity.model';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.page.html',
  styleUrls: ['./view-more.page.scss'],
})
export class ViewMorePage implements OnInit {
  charity: Charity;
  title = '';
  mediaType : string;
  safeVideoURL : SafeResourceUrl;

  constructor(private router: Router, 
    private navController: NavController,
    private _sanitizer: DomSanitizer){

     
    this.charity =
      this.router.getCurrentNavigation().extras &&
      this.router.getCurrentNavigation().extras.state
        ? this.router.getCurrentNavigation().extras.state.charity
        : null;

    console.log(this.charity);

    if (!this.charity) {
      this.navController.back();
      return;
    }

    this.title = this.charity.name;
    this.checkTypeMedia();
  }

  ngOnInit() {}

  goBack() {
    this.navController.back();
  }

  goWebSite() {
    // this.charity.web_url
    window.open(this.charity.web_url, '_blank');
  }

  checkTypeMedia() {
    if(this.charity.url_description){

      if(this.charity.url_description.includes('youtube') || this.charity.url_description.includes('youtu') ){
        this.mediaType = 'video';        
        // console.log(this.charity.url_description + '&output=embed')
        this.safeVideoURL = this._sanitizer.bypassSecurityTrustResourceUrl( this.charity.url_description.replace("watch?v=", "embed/"));
      } else {
        const extension = this.getUrlExtension(this.charity.url_description);
        this.mediaType = this.getMimeType(extension);
      }
      
    }
  }

  getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  /**
   *
   * @param fileExt
   * @return 'audio' | 'video' | 'image' | null
   */
  getMimeType(fileExt: string) {

    console.log(fileExt);

    if (fileExt == 'wav') return 'audio';
    else if (fileExt == 'm4a') return 'audio';
    else if (fileExt == 'mp4') return 'video';
    else if (fileExt == 'm4v') return 'video';
    else if (fileExt == 'mkv') return 'video';
    else if (fileExt == 'ogg') return 'video';
    else if (fileExt == 'flv') return 'video';
    else if (fileExt == 'MOV') return 'video';
    else if (fileExt == 'jpg') return 'image';
    else if (fileExt == 'jpeg') return 'image';
    else if (fileExt == 'png') return 'image';
    else if (fileExt == 'svg') return 'image';
    else if (fileExt == 'bmp') return 'image';
    else if (fileExt == 'gif') return 'image';
    else {
      return null;
    }
  }
}

import { Component, OnInit, HostListener } from '@angular/core';
import { GiphyService } from './giphy.service';
@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})

export class GiphyComponent implements OnInit{
  public offset = 0;
  public gifList: any[] = [];
  public gifInfo = {
    author : '',
    title : '',
    url: '',
    raiting: '',
    status: false
  }
  constructor(private service: GiphyService) { }

  ngOnInit(): void {
    this.getGifs();
  }

  @HostListener('window:scroll', ['$event']) 
  onScroll(event: any) {
    if (window.innerHeight + window.scrollY + 25 > document.body.scrollHeight && this.offset < 175) {
       this.offset += 25;
       setTimeout(()=>{    
        this.getGifs();
       }, 500);
    }
  }

  getGifs(){
    return this.service.getGifs(this.offset).subscribe((data: any) => {
      this.gifList = this.gifList.concat(data.data);
    });
  }

  searchGif(key: string){
    return this.service.searchGif(key).subscribe((data:any) => {
      this.gifList = data.data; 
    });
  }
  
  getGifInfo(gif: any){
    this.gifInfo.status = true;
    this.gifInfo.title = gif.title;
    this.gifInfo.url = gif.images.downsized.url;
    gif.username === "" || gif.username === null 
    ? this.gifInfo.author = 'No Author' 
    : this.gifInfo.author = gif.username;

    switch(gif.rating) {
      case 'q':
          this.gifInfo.raiting = 'level 1';
          break;
      case 'pg':
          this.gifInfo.raiting = 'level 2';
          break;
      case 'pg-13':
          this.gifInfo.raiting = 'level 3';
          break;
      default:
          this.gifInfo.raiting = 'level 4';
          break;
    };
    this.scrollToTop();
  }

  // Helper
  scrollToTop(){
      let _scrollToTop = window.setInterval(() => {
          let _pos = window.pageYOffset;
          if (_pos > 0) {
              window.scrollTo(0, _pos - 20); 
          } else {
              window.clearInterval(_scrollToTop);
          }
      }, 16);
  }
} 

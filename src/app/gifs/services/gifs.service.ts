import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../intefaces/gifs.interfaces';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey = '1IAc02zW6MA76nmFzqdn8CkzDyhniKWe';
  private seviceUrl = 'https://api.giphy.com/v1/gifs';
  constructor(private http: HttpClient) {
    this.loadDataStorage();
    console.log('gifs loaded')
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
      tag = tag.toLowerCase();
      if (this._tagsHistory.includes(tag)) {
        this._tagsHistory = this._tagsHistory.filter(x=> x !== tag)
      }

      this._tagsHistory.unshift(tag);
      this._tagsHistory = this._tagsHistory.splice(0, 10)
      this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadDataStorage(): void {
    if (! localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0]);
    }

  }

   searchTag(  tag: string): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.seviceUrl}/search`, {params: params} )
      .subscribe(resp => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList});
      })



  }
}

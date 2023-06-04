import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control"
    (keyup.enter)="searchTag()"
    #txtTagInput
    placeholder="Buscar gifs...">
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

constructor(private giftsService: GifsService){

}



  //searchTag(newTag: string):
  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value
    this.giftsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
    console.log(this.giftsService.tagsHistory)
  }

}

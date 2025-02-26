import { Component, computed, effect, signal, ChangeDetectionStrategy } from '@angular/core';
import { ColorsService } from '../../services/colors.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-color-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatSlideToggleModule],
  template: `
    <div class="container-fluid">
    @if(isAdvancedChecked) {
    <div class="searchBar">
        <input type="text" class="form-control" [value]="searchInput()" (input)="onInputChange($event)" placeholder="search color">
        <input class="form-check-input" type="checkbox" value="" id="exampleCheck1" [checked]="isMainChecked()" (change)="onCheckboxChange('main', $event)">
        <label class="form-check-label" for="exampleCheck1">
             main
        </label>
        <input class="form-check-input" type="checkbox" value="" id="exampleCheck1" [checked]="isStateChecked" (change)="onCheckboxChange('state', $event)">
        <label class="form-check-label" for="exampleCheck1">
            state
        </label>
    </div>
    <div class="line" style="width: 100%; border-bottom: 2px solid black; margin-top: 1em;">

    </div>
}
    <div class="list">
        <div class="toggle">
            <mat-slide-toggle [(ngModel)]="isAdvancedChecked" [labelPosition]="'before'" (change)="resetForm()">
                Advanced filtering
              </mat-slide-toggle>
              
        </div>
        @for(color of filteredColors(); track color) {
        <div class="element">
            <div class="row">
                <div class="col-3" title="color name">{{color.name}}</div>
                <div class="col-3">
                    <div class="square" [style.background-color]="color.hex" title="color hex">
                        {{color.hex}}
                    </div>
                </div>
                <div class="col-3"></div>
                <div class="col-3" title="category">{{color.category}}</div>
            </div>
        </div>
    }
    </div>
</div>
  `,
  styles: [
    `
      .container-fluid
{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-top: 1%;
}

.list
{
   margin-top: 2%;
   width: 30%;
}

.row
{
    display: flex;
    background-color: #f7f7f7;
    border-radius: 20px;
    margin-top: 2%;
    font-size: 1.1em;
}

@media(max-width: 1100px) {
    .list {
        width: 80%;
    }
}

.col-3
{
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.square
{
    aspect-ratio: 1;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 5%;
    background-color: black;
    height: 5em;
    width: auto;
}

.searchBar
{
    display: flex;
    flex-direction: row;
}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorListComponent {

  // variables
  isAdvancedChecked: boolean = true;
  isMainChecked = signal(true);  
  isStateChecked = signal(true); 
  searchInput = signal<string>('');
  colors = computed(() => this.colorService.getColors()());
  searchControl = new FormControl('');
  ///////////////////////////////////////////////////////////////////

  constructor(private readonly colorService: ColorsService){
    effect(() => {
      const searchValue = this.searchControl.value ?? ''; 
      this.searchInput.set(searchValue); 
    },
    {allowSignalWrites: true}
  );
  }

  filteredColors = computed(() => {
    const searchText = this.searchInput();
    return this.colors().filter(color =>
      color.name.toLowerCase().startsWith(searchText.toLowerCase()) &&
      (this.isMainChecked() && color.category === 'main' ||
       this.isStateChecked() && color.category === 'state')
    );
  });

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchInput.set(inputElement.value); 
    }
  }

  onCheckboxChange(category: 'main' | 'state', event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (category === 'main') {
      this.isMainChecked.set(inputElement.checked);
    } else if (category === 'state') {
      this.isStateChecked.set(inputElement.checked);
    }
  }

  resetForm(): void {
    this.isMainChecked.set(true); 
    this.isStateChecked.set(true); 
    this.searchInput.set(''); 
  }
}

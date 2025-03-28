import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-para-type',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="mb-4 text-xl line-text " [innerHTML]="'<p>' + currentPara.join('') + '</p>'">
                    <p>{{currentPara.join('')}}</p>
        </div>`,
    styles: [`
    .line-text { font-size: 1.8em; line-height: 1.5; }
    .bottom-cursor{ text-decoration: underline; text-decoration-color: #f9a8d4; }
    `]
})
export class ParaType implements OnInit {
    public paragraphs: string[] = ["Life is a collection of moments. Don't get so caught up in the past or worried about the future that you miss the beauty and opportunity of the present. Practice mindfulness, savor experiences, and appreciate the small joys that each day offers.  Focusing on the now can reduce stress and increase overall happiness."]
    public currentPara: string[] = this.paragraphs[0].split('').map(key => `<span class="inline-block default">${key == ' ' ? '&nbsp' : key.toLowerCase() }</span>`)
    currentKey:string[] = this.paragraphs[0].split('')
    originalKey:string[] = this.paragraphs[0].split('')
    key: string = '';
    typed = signal(0)


    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        this.key = event.key; // Store the key that was pressed down.
        if(this.key === 'Backspace') {//delete case
            this.typed.update(value => value -1); // Decrement the signal.
            if(this.typed() === 0) {
              console.log('No more keys to delete!');
              return;
            } 
            else if(this.currentKey[this.typed()] === this.originalKey[this.typed()]) { //correct case
            this.currentPara[this.typed()] = `<span class="blinking-border">${this.currentKey[this.typed()] == ' ' ? '&nbsp' : this.currentKey[this.typed()].toLowerCase() }</span>`
            this.currentPara[this.typed()+1] = `<span class="default">${this.currentKey[this.typed()+1] == ' ' ? '&nbsp' : this.currentKey[this.typed()+1].toLowerCase() }</span>`
            
            } else {
              this.currentPara.splice(this.typed(), 1) 
              this.currentKey.splice(this.typed(), 1)
            }
          }
          else if (this.key === this.currentKey[this.typed()].toLocaleLowerCase()) { // correct case
            console.log('Correct key pressed!');
            this.currentPara[this.typed()] = `<span class="text-green-300">${this.currentKey[this.typed()] == ' ' ? '&nbsp' : this.currentKey[this.typed()].toLowerCase() }</span>`  
            this.typed.update(value => value +1); // Increment the signal.
            
          } else { //incorrect case
              if(this.currentKey[this.typed()] == ' '){ //case of space
                this.currentPara.splice(this.typed(), 1, `<span class="text-red-500">${this.key }</span>`, `<span class="text-red-500">&nbsp</span>`)
                this.currentKey.splice(this.typed(), 1, this.key, ' ')
              } else { //case of letter
                this.currentPara[this.typed()] = `<span class="text-red-500">${this.currentKey[this.typed()] == ' ' ? '&nbsp' : this.currentKey[this.typed()].toLowerCase() }</span>`
              } 
              this.typed.update(value => value +1); // Increment the signal.
              console.log("Incorrect key pressed")
          }

          if (this.typed() === this.currentKey.length) {
            console.log('All keys typed correctly!');
            this.typed.set(0); // Reset after completing the sequence
          } else {
            if(this.key !== 'Backspace') this.currentPara[this.typed()] = `<span class="blinking-border">${this.currentKey[this.typed()] == ' ' ? '&nbsp' : this.currentKey[this.typed()].toLowerCase() }</span>`
          }
      
          if (event.key === 'Enter' && event.ctrlKey) {
            console.log('Ctrl+Enter pressed!');
          }
    }

    ngOnInit() {
      this.currentPara[this.typed()] = `<span class="blinking-border">${this.currentKey[this.typed()] == ' ' ? '&nbsp' : this.currentKey[this.typed()].toLowerCase() }</span>`  
    }
}

import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-para-type',
    imports: [CommonModule],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="mb-4 text-lg" [innerHTML]="'<p>' + currentPara.join('') + '</p>'">
                    <p>{{currentPara.join('')}}</p>
        </div>`,
})
export class ParaType implements OnInit {
    public paragraphs: string[] = ["Life is a collection of moments.  Don't get so caught up in the past or worried about the future that you miss the beauty and opportunity of the present. Practice mindfulness, savor experiences, and appreciate the small joys that each day offers.  Focusing on the now can reduce stress and increase overall happiness."]
    public currentPara: string[] = this.paragraphs[0].split('').map(key => `<span class="inline-block default">${key == ' ' ? '&nbsp' : key.toLowerCase() }</span>`)
    currentKey:string[] = this.paragraphs[0].split('')
    key: string = '';
    typed = signal(0)


    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        this.key = event.key; // Store the key that was pressed down.
        if (this.key === this.currentKey[this.typed()].toLocaleLowerCase()) { // Compare with current key
            console.log('Correct key pressed!');
            this.currentPara[this.typed()] = `<span class="text-green-300">${this.currentKey[this.typed()] == ' ' ? '&nbsp' : this.currentKey[this.typed()].toLowerCase() }</span>`  
            this.typed.update(value => value +1); // Increment the signal.
            if (this.typed() === this.currentKey.length) {
              console.log('All keys typed correctly!');
              this.typed.set(0); // Reset after completing the sequence
            }
          } else {
              console.log("Incorrect key pressed")
              this.typed.set(0); // Reset if wrong key is typed
          }
      
          if (event.key === 'Enter' && event.ctrlKey) {
            console.log('Ctrl+Enter pressed!');
          }
    }

    ngOnInit() {
    }
}

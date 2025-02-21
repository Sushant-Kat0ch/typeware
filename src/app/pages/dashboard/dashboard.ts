import { Component } from '@angular/core';
import { ParaType } from './components/paragraphType';

@Component({
    selector: 'app-dashboard',
    imports: [ParaType],
    template: `
        <div class="grid grid-cols-1 gap-8">
            <app-para-type class="contents" />
            <div class="col-span-12 xl:col-span-6">
            </div>
            <div class="col-span-12 xl:col-span-6">
            </div>
        </div>
    `
})
export class Dashboard {}

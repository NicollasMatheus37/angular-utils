import { Component } from '@angular/core';
import { AngularUtilsDate } from './angular-utils-date/angular-utils-date';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-utils';

    getFormattedDate() {
        return AngularUtilsDate.parse().getDayOfWeek();
    }
}

import { formatDate, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

export enum AngularUtilsDateWeekFormatEnum {
    WEEK_ABBREVIATED = 'EEE',
    WEEK_WIDE = 'EEEE',
    WEEK_NARROW = 'EEEEE',
    WEEK_SHORT = 'EEEEEE'
}

export enum AngularUtilsDateMonthFormatEnum {
    MONTH_ABBREVIATED = 'MMM',
    MONTH_WIDE = 'MMMM',
    MONTH_NARROW = 'MMMMM'
}

class AngularUtilsDateObject {
    public date: Date;
    public format: string = 'yyyy-MM-dd HH:mm:ss';
    public day: number;
    public month: number;
    public year: number;
    public hour: number;
    public minute: number;
    public second: number;
    public milisecond: number;
    public locale: string;

    public constructor(date: Date = new Date(), locale: string = 'en-us') {
        this.hydrateAngularUtilsDateObject(date, locale);
    }

    public hydrateAngularUtilsDateObject(date: Date = new Date(), locale: string = 'en-us') {
        this.date = date;
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.hour = date.getHours();
        this.minute = date.getMinutes();
        this.second = date.getSeconds();
        this.milisecond = date.getMilliseconds();
        this.locale = locale;
    }
}

class AngularUtilsDateAssembler {
    private acObject: AngularUtilsDateObject;

    public constructor(acObject: AngularUtilsDateObject) {
        this.acObject = acObject;
    }

    public addDays(number: number) {
        this.acObject.day += number;

        return this;
    }

    public addMonths(number: number) {
        this.acObject.month += number;

        return this;
    }

    public addYears(number: number) {
        this.acObject.year += number;

        return this;
    }

    public getDayOfWeek(format: AngularUtilsDateWeekFormatEnum = AngularUtilsDateWeekFormatEnum.WEEK_WIDE) {
        return formatDate(this.acObject.date, format, this.acObject.locale);
    }

    public getMonth(format: AngularUtilsDateMonthFormatEnum = AngularUtilsDateMonthFormatEnum.MONTH_WIDE) {
        return formatDate(this.acObject.date, format, this.acObject.locale);
    }

    public format() {
        this.acObject.date = new Date(this.acObject.year, this.acObject.month, this.acObject.day, this.acObject.hour, this.acObject.minute, this.acObject.second, this.acObject.milisecond);

        try {
            return AngularUtilsDate.format(this.acObject);
        } catch (error) {
            console.error('Invalid date.');
        }
    }
}

export class AngularUtilsDate {
    private static acObject: AngularUtilsDateObject;

    public static setLocale(locale) {
        if (!this.acObject) {
            this.acObject = new AngularUtilsDateObject();
        }

        this.acObject.locale = locale;

        return this;
    }

    public static format(value?: AngularUtilsDateObject | Date | string): string {
        if (!this.acObject) {
            this.acObject = new AngularUtilsDateObject();
        }

        if (value instanceof Date) {
            this.acObject.hydrateAngularUtilsDateObject(value);
        }

        if (typeof value === 'string') {
            this.acObject.format = value;
        }

        try {
            return formatDate(this.acObject.date, this.acObject.format, this.acObject.locale);
        } catch (error) {
            console.error('Type [' + value + '] not allowed to AngularUtilsDate.format()');
        }
    }

    public static parse(date: Date = new Date) {
        if (!this.acObject) {
            this.acObject = new AngularUtilsDateObject(date);
        }

        return new AngularUtilsDateAssembler(this.acObject);
    }
}

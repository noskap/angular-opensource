import { EventEmitter, Injectable } from '@angular/core';
import { from, timer } from 'rxjs';
import { isPromise } from '../util/isPromise';
import * as i0 from "@angular/core";
export class BusyTrackerService {
    constructor() {
        this.isDelayProcessing = false;
        this.isDurationProcessing = false;
        this.isBusiesProcessing = false;
        this.busyQueue = [];
        this.__isActive = false;
        this.onStartBusy = new EventEmitter();
        this.onStopBusy = new EventEmitter();
    }
    get isActive() {
        return this.__isActive;
    }
    set isActive(val) {
        if (this.__isActive === false && val === true && this.onStartBusy) {
            this.onStartBusy.emit();
        }
        if (this.__isActive === true && val === false && this.onStopBusy) {
            this.isBusiesProcessing = false;
            this.onStopBusy.emit();
        }
        this.__isActive = val;
    }
    get busyList() {
        return this.busyQueue;
    }
    load(options) {
        this.loadBusyQueue(options.busyList);
        this.startLoading(options);
    }
    updateActiveStatus() {
        this.isActive = this.isBusiesProcessing &&
            !this.isDelayProcessing &&
            (this.isDurationProcessing || this.busyQueue.length > 0);
    }
    startLoading(options) {
        if (!this.isBusiesProcessing && this.busyList.length > 0) {
            this.isBusiesProcessing = true;
            this.isDelayProcessing = true;
            this.updateActiveStatus();
            timer(options.delay).subscribe(() => {
                this.isDelayProcessing = false;
                this.isDurationProcessing = true;
                this.updateActiveStatus();
                timer(options.minDuration).subscribe(() => {
                    this.isDurationProcessing = false;
                    this.updateActiveStatus();
                });
            });
        }
    }
    loadBusyQueue(busies) {
        busies.filter((busy) => {
            return busy && !busy.hasOwnProperty('__loaded_mark_by_ng_busy');
        }).forEach((busy) => {
            Object.defineProperty(busy, '__loaded_mark_by_ng_busy', {
                value: true, configurable: false, enumerable: false, writable: false
            });
            let cur_busy;
            if (isPromise(busy)) {
                cur_busy = from(busy).subscribe();
            }
            else {
                cur_busy = busy;
            }
            this.appendToQueue(cur_busy);
        });
    }
    appendToQueue(busy) {
        this.busyQueue.push(busy);
        busy.add(() => {
            this.busyQueue = this.busyQueue.filter((cur) => !cur.closed);
            this.updateActiveStatus();
        });
    }
    ngOnDestroy() {
    }
}
BusyTrackerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
BusyTrackerService.ctorParameters = () => [];
BusyTrackerService.ngInjectableDef = i0.defineInjectable({ factory: function BusyTrackerService_Factory() { return new BusyTrackerService(); }, token: BusyTrackerService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS10cmFja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFlLElBQUksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztBQVc1QyxNQUFNO0lBNkJKO1FBM0JRLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0IsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGNBQVMsR0FBd0IsRUFBRSxDQUFDO1FBQ3BDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFM0IsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFvQnBDLENBQUM7SUFsQmhCLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsR0FBWTtRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDaEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxD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QUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztJQUNYLENBQUM7OztZQXhGRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBmcm9tLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2lzUHJvbWlzZX0gZnJvbSAnLi4vdXRpbC9pc1Byb21pc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrZXJPcHRpb25zIHtcbiAgbWluRHVyYXRpb246IG51bWJlcjtcbiAgZGVsYXk6IG51bWJlcjtcbiAgYnVzeUxpc3Q6IEFycmF5PFByb21pc2U8YW55PiB8IFN1YnNjcmlwdGlvbj47XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEJ1c3lUcmFja2VyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBpc0RlbGF5UHJvY2Vzc2luZyA9IGZhbHNlO1xuICBwcml2YXRlIGlzRHVyYXRpb25Qcm9jZXNzaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgaXNCdXNpZXNQcm9jZXNzaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgYnVzeVF1ZXVlOiBBcnJheTxTdWJzY3JpcHRpb24+ID0gW107XG4gIHByaXZhdGUgX19pc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIG9uU3RhcnRCdXN5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgb25TdG9wQnVzeTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZ2V0IGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9faXNBY3RpdmU7XG4gIH1cblxuICBzZXQgaXNBY3RpdmUodmFsOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX19pc0FjdGl2ZSA9PT0gZmFsc2UgJiYgdmFsID09PSB0cnVlICYmIHRoaXMub25TdGFydEJ1c3kpIHtcbiAgICAgIHRoaXMub25TdGFydEJ1c3kuZW1pdCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fX2lzQWN0aXZlID09PSB0cnVlICYmIHZhbCA9PT0gZmFsc2UgJiYgdGhpcy5vblN0b3BCdXN5KSB7XG4gICAgICB0aGlzLmlzQnVzaWVzUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgdGhpcy5vblN0b3BCdXN5LmVtaXQoKTtcbiAgICB9XG4gICAgdGhpcy5fX2lzQWN0aXZlID0gdmFsO1xuICB9XG4gIGdldCBidXN5TGlzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5idXN5UXVldWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbG9hZChvcHRpb25zOiBUcmFja2VyT3B0aW9ucykge1xuICAgIHRoaXMubG9hZEJ1c3lRdWV1ZShvcHRpb25zLmJ1c3lMaXN0KTtcbiAgICB0aGlzLnN0YXJ0TG9hZGluZyhvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQWN0aXZlU3RhdHVzKCkge1xuICAgIHRoaXMuaXNBY3RpdmUgPSB0aGlzLmlzQnVzaWVzUHJvY2Vzc2luZyAmJlxuICAgICAgIXRoaXMuaXNEZWxheVByb2Nlc3NpbmcgJiZcbiAgICAgICh0aGlzLmlzRHVyYXRpb25Qcm9jZXNzaW5nIHx8IHRoaXMuYnVzeVF1ZXVlLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydExvYWRpbmcob3B0aW9uczogVHJhY2tlck9wdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMuaXNCdXNpZXNQcm9jZXNzaW5nICYmIHRoaXMuYnVzeUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc0J1c2llc1Byb2Nlc3NpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5pc0RlbGF5UHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVN0YXR1cygpO1xuICAgICAgdGltZXIob3B0aW9ucy5kZWxheSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0RlbGF5UHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRHVyYXRpb25Qcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVTdGF0dXMoKTtcbiAgICAgICAgdGltZXIob3B0aW9ucy5taW5EdXJhdGlvbikuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzRHVyYXRpb25Qcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVTdGF0dXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRCdXN5UXVldWUoYnVzaWVzOiBBcnJheTxQcm9taXNlPGFueT4gfCBTdWJzY3JpcHRpb24+KSB7XG4gICAgYnVzaWVzLmZpbHRlcigoYnVzeSkgPT4ge1xuICAgICAgcmV0dXJuIGJ1c3kgJiYgIWJ1c3kuaGFzT3duUHJvcGVydHkoJ19fbG9hZGVkX21hcmtfYnlfbmdfYnVzeScpO1xuICAgIH0pLmZvckVhY2goKGJ1c3k6IFByb21pc2U8YW55PiB8IFN1YnNjcmlwdGlvbikgPT4ge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGJ1c3ksICdfX2xvYWRlZF9tYXJrX2J5X25nX2J1c3knLCB7XG4gICAgICAgIHZhbHVlOiB0cnVlLCBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIGxldCBjdXJfYnVzeTtcbiAgICAgIGlmIChpc1Byb21pc2UoYnVzeSkpIHtcbiAgICAgICAgY3VyX2J1c3kgPSBmcm9tKGJ1c3kpLnN1YnNjcmliZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VyX2J1c3kgPSBidXN5O1xuICAgICAgfVxuICAgICAgdGhpcy5hcHBlbmRUb1F1ZXVlKGN1cl9idXN5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kVG9RdWV1ZShidXN5OiBTdWJzY3JpcHRpb24pIHtcbiAgICB0aGlzLmJ1c3lRdWV1ZS5wdXNoKGJ1c3kpO1xuICAgIGJ1c3kuYWRkKCgpID0+IHtcbiAgICAgIHRoaXMuYnVzeVF1ZXVlID0gdGhpcy5idXN5UXVldWUuZmlsdGVyKChjdXI6IFN1YnNjcmlwdGlvbikgPT4gIWN1ci5jbG9zZWQpO1xuICAgICAgdGhpcy51cGRhdGVBY3RpdmVTdGF0dXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICB9XG59XG4iXX0=
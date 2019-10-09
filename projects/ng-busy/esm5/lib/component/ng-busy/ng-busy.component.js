import { ChangeDetectorRef, Component, EventEmitter, Inject } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { InstanceConfigHolderService } from '../../service/instance-config-holder.service';
var inactiveStyle = style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
var timing = '.3s ease';
var NgBusyComponent = /** @class */ (function () {
    function NgBusyComponent(instanceConfigHolder, busyEmitter, cdr) {
        var _this = this;
        this.instanceConfigHolder = instanceConfigHolder;
        this.busyEmitter = busyEmitter;
        this.cdr = cdr;
        this.disableAnimation = false;
        this.showBackdrop = true;
        this.isActive = false;
        this.busyMonitor = this.busyEmitter.subscribe(function (isActive) {
            var config = _this.instanceConfigHolder.config;
            _this.isActive = isActive;
            _this.wrapperClass = config.wrapperClass;
            _this.showBackdrop = config.backdrop;
            _this.disableAnimation = config.disableAnimation;
            if (_this.cdr) {
                _this.cdr.markForCheck();
            }
        });
    }
    NgBusyComponent.prototype.ngOnDestroy = function () {
        if (this.busyMonitor) {
            this.busyMonitor.unsubscribe();
        }
    };
    NgBusyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-ng-busy',
                    template: "<div [class]=\"wrapperClass\" @flyInOut [@.disabled]=\"disableAnimation\" *ngIf=\"isActive\">\n  <ng-content></ng-content>\n</div>\n<div class=\"ng-busy-backdrop\" @flyInOut [@.disabled]=\"disableAnimation\" *ngIf=\"showBackdrop && isActive\">\n</div>\n",
                    styles: [""],
                    animations: [
                        trigger('flyInOut', [
                            transition('void => *', [
                                inactiveStyle,
                                animate(timing)
                            ]),
                            transition('* => void', [
                                animate(timing, inactiveStyle)
                            ])
                        ])
                    ]
                },] },
    ];
    NgBusyComponent.ctorParameters = function () { return [
        { type: InstanceConfigHolderService, decorators: [{ type: Inject, args: ['instanceConfigHolder',] }] },
        { type: EventEmitter, decorators: [{ type: Inject, args: ['busyEmitter',] }] },
        { type: ChangeDetectorRef }
    ]; };
    return NgBusyComponent;
}());
export { NgBusyComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9uZy1idXN5L25nLWJ1c3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHeEUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFFekYsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzFCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsU0FBUyxFQUFFLG1CQUFtQjtDQUMvQixDQUFDLENBQUM7QUFDSCxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7QUFFMUI7SUE2QkUseUJBQzBDLG9CQUFpRCxFQUMxRCxXQUFrQyxFQUNoRCxHQUFzQjtRQUh6QyxpQkFlQztRQWR5Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO1FBQzFELGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUNoRCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVJsQyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFM0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU9mLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxRQUFpQjtZQUM5RCxJQUFNLE1BQU0sR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQ2hELEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLEtBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN4QyxLQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDcEMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRCxJQUFJLEtBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQztJQUNILENBQUM7O2dCQWxERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwrUEFLWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0JBQ1osVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxVQUFVLEVBQUU7NEJBQ2xCLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0NBQ3RCLGFBQWE7Z0NBQ2IsT0FBTyxDQUFDLE1BQU0sQ0FBQzs2QkFDaEIsQ0FBQzs0QkFDRixVQUFVLENBQUMsV0FBVyxFQUFFO2dDQUN0QixPQUFPLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQzs2QkFDL0IsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGOzs7Z0JBNUJPLDJCQUEyQix1QkFzQzlCLE1BQU0sU0FBQyxzQkFBc0I7Z0JBMUNJLFlBQVksdUJBMkM3QyxNQUFNLFNBQUMsYUFBYTtnQkEzQ2pCLGlCQUFpQjs7SUFnRXpCLHNCQUFDO0NBQUEsQUFwREQsSUFvREM7U0EvQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2FuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL2ludGVybmFsL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi4vLi4vbmctYnVzeS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcblxuY29uc3QgaW5hY3RpdmVTdHlsZSA9IHN0eWxlKHtcbiAgb3BhY2l0eTogMCxcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNDBweCknXG59KTtcbmNvbnN0IHRpbWluZyA9ICcuM3MgZWFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1idXN5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtjbGFzc109XCJ3cmFwcGVyQ2xhc3NcIiBAZmx5SW5PdXQgW0AuZGlzYWJsZWRdPVwiZGlzYWJsZUFuaW1hdGlvblwiICpuZ0lmPVwiaXNBY3RpdmVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibmctYnVzeS1iYWNrZHJvcFwiIEBmbHlJbk91dCBbQC5kaXNhYmxlZF09XCJkaXNhYmxlQW5pbWF0aW9uXCIgKm5nSWY9XCJzaG93QmFja2Ryb3AgJiYgaXNBY3RpdmVcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmx5SW5PdXQnLCBbXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgIGluYWN0aXZlU3R5bGUsXG4gICAgICAgIGFuaW1hdGUodGltaW5nKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgIGFuaW1hdGUodGltaW5nLCBpbmFjdGl2ZVN0eWxlKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQnVzeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHVibGljIHdyYXBwZXJDbGFzczogc3RyaW5nO1xuICBwdWJsaWMgZGlzYWJsZUFuaW1hdGlvbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0JhY2tkcm9wID0gdHJ1ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBidXN5TW9uaXRvcjogU3Vic2NyaXB0aW9uO1xuICBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2luc3RhbmNlQ29uZmlnSG9sZGVyJykgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ2J1c3lFbWl0dGVyJykgcHJpdmF0ZSBidXN5RW1pdHRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmJ1c3lNb25pdG9yID0gdGhpcy5idXN5RW1pdHRlci5zdWJzY3JpYmUoKGlzQWN0aXZlOiBib29sZWFuKSA9PiB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmluc3RhbmNlQ29uZmlnSG9sZGVyLmNvbmZpZztcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgIHRoaXMud3JhcHBlckNsYXNzID0gY29uZmlnLndyYXBwZXJDbGFzcztcbiAgICAgIHRoaXMuc2hvd0JhY2tkcm9wID0gY29uZmlnLmJhY2tkcm9wO1xuICAgICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9uID0gY29uZmlnLmRpc2FibGVBbmltYXRpb247XG4gICAgICBpZiAodGhpcy5jZHIpIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5idXN5TW9uaXRvcikge1xuICAgICAgdGhpcy5idXN5TW9uaXRvci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=
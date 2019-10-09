import { ChangeDetectorRef, Component, EventEmitter, Inject } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { InstanceConfigHolderService } from '../../service/instance-config-holder.service';
const inactiveStyle = style({
    opacity: 0,
    transform: 'translateY(-40px)'
});
const timing = '.3s ease';
export class NgBusyComponent {
    constructor(instanceConfigHolder, busyEmitter, cdr) {
        this.instanceConfigHolder = instanceConfigHolder;
        this.busyEmitter = busyEmitter;
        this.cdr = cdr;
        this.disableAnimation = false;
        this.showBackdrop = true;
        this.isActive = false;
        this.busyMonitor = this.busyEmitter.subscribe((isActive) => {
            const config = this.instanceConfigHolder.config;
            this.isActive = isActive;
            this.wrapperClass = config.wrapperClass;
            this.showBackdrop = config.backdrop;
            this.disableAnimation = config.disableAnimation;
            if (this.cdr) {
                this.cdr.markForCheck();
            }
        });
    }
    ngOnDestroy() {
        if (this.busyMonitor) {
            this.busyMonitor.unsubscribe();
        }
    }
}
NgBusyComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ng-busy',
                template: `<div [class]="wrapperClass" @flyInOut [@.disabled]="disableAnimation" *ngIf="isActive">
  <ng-content></ng-content>
</div>
<div class="ng-busy-backdrop" @flyInOut [@.disabled]="disableAnimation" *ngIf="showBackdrop && isActive">
</div>
`,
                styles: [``],
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
NgBusyComponent.ctorParameters = () => [
    { type: InstanceConfigHolderService, decorators: [{ type: Inject, args: ['instanceConfigHolder',] }] },
    { type: EventEmitter, decorators: [{ type: Inject, args: ['busyEmitter',] }] },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9uZy1idXN5L25nLWJ1c3kuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHeEUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sOENBQThDLENBQUM7QUFFekYsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQzFCLE9BQU8sRUFBRSxDQUFDO0lBQ1YsU0FBUyxFQUFFLG1CQUFtQjtDQUMvQixDQUFDLENBQUM7QUFDSCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUM7QUF1QjFCLE1BQU07SUFRSixZQUMwQyxvQkFBaUQsRUFDMUQsV0FBa0MsRUFDaEQsR0FBc0I7UUFGQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQTZCO1FBQzFELGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtRQUNoRCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVJsQyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFM0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU9mLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFpQixFQUFFLEVBQUU7WUFDbEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDaEQsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7SUFDSCxDQUFDOzs7WUFsREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7O0NBS1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNaLFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsVUFBVSxFQUFFO3dCQUNsQixVQUFVLENBQUMsV0FBVyxFQUFFOzRCQUN0QixhQUFhOzRCQUNiLE9BQU8sQ0FBQyxNQUFNLENBQUM7eUJBQ2hCLENBQUM7d0JBQ0YsVUFBVSxDQUFDLFdBQVcsRUFBRTs0QkFDdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7eUJBQy9CLENBQUM7cUJBQ0gsQ0FBQztpQkFDSDthQUNGOzs7WUE1Qk8sMkJBQTJCLHVCQXNDOUIsTUFBTSxTQUFDLHNCQUFzQjtZQTFDSSxZQUFZLHVCQTJDN0MsTUFBTSxTQUFDLGFBQWE7WUEzQ2pCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2FuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL2ludGVybmFsL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi4vLi4vbmctYnVzeS5kaXJlY3RpdmUnO1xuaW1wb3J0IHtJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcblxuY29uc3QgaW5hY3RpdmVTdHlsZSA9IHN0eWxlKHtcbiAgb3BhY2l0eTogMCxcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNDBweCknXG59KTtcbmNvbnN0IHRpbWluZyA9ICcuM3MgZWFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZy1idXN5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtjbGFzc109XCJ3cmFwcGVyQ2xhc3NcIiBAZmx5SW5PdXQgW0AuZGlzYWJsZWRdPVwiZGlzYWJsZUFuaW1hdGlvblwiICpuZ0lmPVwiaXNBY3RpdmVcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibmctYnVzeS1iYWNrZHJvcFwiIEBmbHlJbk91dCBbQC5kaXNhYmxlZF09XCJkaXNhYmxlQW5pbWF0aW9uXCIgKm5nSWY9XCJzaG93QmFja2Ryb3AgJiYgaXNBY3RpdmVcIj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmx5SW5PdXQnLCBbXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgIGluYWN0aXZlU3R5bGUsXG4gICAgICAgIGFuaW1hdGUodGltaW5nKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXG4gICAgICAgIGFuaW1hdGUodGltaW5nLCBpbmFjdGl2ZVN0eWxlKVxuICAgICAgXSlcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5nQnVzeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgcHVibGljIHdyYXBwZXJDbGFzczogc3RyaW5nO1xuICBwdWJsaWMgZGlzYWJsZUFuaW1hdGlvbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd0JhY2tkcm9wID0gdHJ1ZTtcbiAgcHJpdmF0ZSByZWFkb25seSBidXN5TW9uaXRvcjogU3Vic2NyaXB0aW9uO1xuICBpc0FjdGl2ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2luc3RhbmNlQ29uZmlnSG9sZGVyJykgcHJpdmF0ZSBpbnN0YW5jZUNvbmZpZ0hvbGRlcjogSW5zdGFuY2VDb25maWdIb2xkZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ2J1c3lFbWl0dGVyJykgcHJpdmF0ZSBidXN5RW1pdHRlcjogRXZlbnRFbWl0dGVyPGJvb2xlYW4+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmJ1c3lNb25pdG9yID0gdGhpcy5idXN5RW1pdHRlci5zdWJzY3JpYmUoKGlzQWN0aXZlOiBib29sZWFuKSA9PiB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmluc3RhbmNlQ29uZmlnSG9sZGVyLmNvbmZpZztcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgIHRoaXMud3JhcHBlckNsYXNzID0gY29uZmlnLndyYXBwZXJDbGFzcztcbiAgICAgIHRoaXMuc2hvd0JhY2tkcm9wID0gY29uZmlnLmJhY2tkcm9wO1xuICAgICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9uID0gY29uZmlnLmRpc2FibGVBbmltYXRpb247XG4gICAgICBpZiAodGhpcy5jZHIpIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5idXN5TW9uaXRvcikge1xuICAgICAgdGhpcy5idXN5TW9uaXRvci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=
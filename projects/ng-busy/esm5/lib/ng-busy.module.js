import { NgModule } from '@angular/core';
import { BusyConfig, DefaultBusyComponent } from './model/busy-config';
import { CommonModule } from '@angular/common';
import { BusyTrackerService } from './service/busy-tracker.service';
import { BusyConfigHolderService } from './service/busy-config-holder.service';
import { NgBusyDirective } from './ng-busy.directive';
import { NgBusyComponent } from './component/ng-busy/ng-busy.component';
var NgBusyModule = /** @class */ (function () {
    function NgBusyModule() {
    }
    NgBusyModule.forRoot = function (config) {
        return {
            ngModule: NgBusyModule,
            providers: [
                { provide: BusyConfig, useValue: config }
            ]
        };
    };
    NgBusyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [DefaultBusyComponent, NgBusyDirective, NgBusyComponent],
                    providers: [BusyConfigHolderService, BusyTrackerService],
                    exports: [NgBusyDirective],
                    entryComponents: [DefaultBusyComponent, NgBusyComponent]
                },] },
    ];
    return NgBusyModule;
}());
export { NgBusyModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL25nLWJ1c3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUV0RTtJQUFBO0lBZ0JBLENBQUM7SUFSUSxvQkFBTyxHQUFkLFVBQWUsTUFBbUI7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQzthQUN4QztTQUNGLENBQUM7SUFDSixDQUFDOztnQkFmRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO29CQUN0RSxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxrQkFBa0IsQ0FBQztvQkFDeEQsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxlQUFlLENBQUM7aUJBQ3pEOztJQVVELG1CQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FUWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0J1c3lDb25maWcsIERlZmF1bHRCdXN5Q29tcG9uZW50LCBJQnVzeUNvbmZpZ30gZnJvbSAnLi9tb2RlbC9idXN5LWNvbmZpZyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QnVzeVRyYWNrZXJTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UvYnVzeS10cmFja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHtCdXN5Q29uZmlnSG9sZGVyU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL2J1c3ktY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcbmltcG9ydCB7TmdCdXN5RGlyZWN0aXZlfSBmcm9tICcuL25nLWJ1c3kuZGlyZWN0aXZlJztcbmltcG9ydCB7TmdCdXN5Q29tcG9uZW50fSBmcm9tICcuL2NvbXBvbmVudC9uZy1idXN5L25nLWJ1c3kuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0RlZmF1bHRCdXN5Q29tcG9uZW50LCBOZ0J1c3lEaXJlY3RpdmUsIE5nQnVzeUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0J1c3lDb25maWdIb2xkZXJTZXJ2aWNlLCBCdXN5VHJhY2tlclNlcnZpY2VdLFxuICBleHBvcnRzOiBbTmdCdXN5RGlyZWN0aXZlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRGVmYXVsdEJ1c3lDb21wb25lbnQsIE5nQnVzeUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmdCdXN5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBJQnVzeUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmdCdXN5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBCdXN5Q29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==
import { NgModule } from '@angular/core';
import { BusyConfig, DefaultBusyComponent } from './model/busy-config';
import { CommonModule } from '@angular/common';
import { BusyTrackerService } from './service/busy-tracker.service';
import { BusyConfigHolderService } from './service/busy-config-holder.service';
import { NgBusyDirective } from './ng-busy.directive';
import { NgBusyComponent } from './component/ng-busy/ng-busy.component';
export class NgBusyModule {
    static forRoot(config) {
        return {
            ngModule: NgBusyModule,
            providers: [
                { provide: BusyConfig, useValue: config }
            ]
        };
    }
}
NgBusyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [DefaultBusyComponent, NgBusyDirective, NgBusyComponent],
                providers: [BusyConfigHolderService, BusyTrackerService],
                exports: [NgBusyDirective],
                entryComponents: [DefaultBusyComponent, NgBusyComponent]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYnVzeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL25nLWJ1c3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQVN0RSxNQUFNO0lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFtQjtRQUNoQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2FBQ3hDO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWZGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7Z0JBQ3RFLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixFQUFFLGtCQUFrQixDQUFDO2dCQUN4RCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLGVBQWUsRUFBRSxDQUFDLG9CQUFvQixFQUFFLGVBQWUsQ0FBQzthQUN6RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCdXN5Q29uZmlnLCBEZWZhdWx0QnVzeUNvbXBvbmVudCwgSUJ1c3lDb25maWd9IGZyb20gJy4vbW9kZWwvYnVzeS1jb25maWcnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1c3lUcmFja2VyU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlL2J1c3ktdHJhY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7QnVzeUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4vc2VydmljZS9idXN5LWNvbmZpZy1ob2xkZXIuc2VydmljZSc7XG5pbXBvcnQge05nQnVzeURpcmVjdGl2ZX0gZnJvbSAnLi9uZy1idXN5LmRpcmVjdGl2ZSc7XG5pbXBvcnQge05nQnVzeUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbmctYnVzeS9uZy1idXN5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtEZWZhdWx0QnVzeUNvbXBvbmVudCwgTmdCdXN5RGlyZWN0aXZlLCBOZ0J1c3lDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtCdXN5Q29uZmlnSG9sZGVyU2VydmljZSwgQnVzeVRyYWNrZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW05nQnVzeURpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW0RlZmF1bHRCdXN5Q29tcG9uZW50LCBOZ0J1c3lDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nQnVzeU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogSUJ1c3lDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nQnVzeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQnVzeUNvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=
import { Component, Inject } from '@angular/core';
import { InstanceConfigHolderService } from '../service/instance-config-holder.service';
export class BusyConfig {
    constructor(config = {}) {
        for (const option of Object.keys(BUSY_CONFIG_DEFAULTS)) {
            this[option] = config[option] !== undefined ? config[option] : BUSY_CONFIG_DEFAULTS[option];
        }
    }
}
export class DefaultBusyComponent {
    constructor(instanceConfigHolder) {
        this.instanceConfigHolder = instanceConfigHolder;
    }
    get message() {
        return this.instanceConfigHolder.config.message;
    }
}
DefaultBusyComponent.decorators = [
    { type: Component, args: [{
                selector: 'default-busy',
                template: `
      <div class="ng-busy-default-wrapper">
          <div class="ng-busy-default-sign">
              <div class="ng-busy-default-spinner">
                  <div class="bar1"></div>
                  <div class="bar2"></div>
                  <div class="bar3"></div>
                  <div class="bar4"></div>
                  <div class="bar5"></div>
                  <div class="bar6"></div>
                  <div class="bar7"></div>
                  <div class="bar8"></div>
                  <div class="bar9"></div>
                  <div class="bar10"></div>
                  <div class="bar11"></div>
                  <div class="bar12"></div>
              </div>
              <div class="ng-busy-default-text">{{message}}</div>
          </div>
      </div>
  `,
            },] },
];
DefaultBusyComponent.ctorParameters = () => [
    { type: InstanceConfigHolderService, decorators: [{ type: Inject, args: ['instanceConfigHolder',] }] }
];
export const BUSY_CONFIG_DEFAULTS = {
    template: DefaultBusyComponent,
    templateNgStyle: {},
    delay: 0,
    minDuration: 0,
    backdrop: true,
    message: 'Please wait...',
    wrapperClass: 'ng-busy',
    disableAnimation: false
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzeS1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1idXN5LyIsInNvdXJjZXMiOlsibGliL21vZGVsL2J1c3ktY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxTQUFTLEVBQXFCLE1BQU0sRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFFdEYsTUFBTTtJQVVKLFlBQVksU0FBc0IsRUFBRTtRQUNsQyxLQUFLLE1BQU0sTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3RjtJQUNILENBQUM7Q0FDRjtBQTBCRCxNQUFNO0lBRUosWUFBb0Qsb0JBQWlEO1FBQWpELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBNkI7SUFDckcsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbEQsQ0FBQzs7O1lBL0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDthQUNGOzs7WUExQ08sMkJBQTJCLHVCQTZDcEIsTUFBTSxTQUFDLHNCQUFzQjs7QUFvQjVDLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHO0lBQ2xDLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsZUFBZSxFQUFFLEVBQUU7SUFDbkIsS0FBSyxFQUFFLENBQUM7SUFDUixXQUFXLEVBQUUsQ0FBQztJQUNkLFFBQVEsRUFBRSxJQUFJO0lBQ2QsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixZQUFZLEVBQUUsU0FBUztJQUN2QixnQkFBZ0IsRUFBRSxLQUFLO0NBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0NvbXBvbmVudCwgVGVtcGxhdGVSZWYsIFR5cGUsIEluamVjdCwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJbnN0YW5jZUNvbmZpZ0hvbGRlclNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvaW5zdGFuY2UtY29uZmlnLWhvbGRlci5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIEJ1c3lDb25maWcgaW1wbGVtZW50cyBJQnVzeUNvbmZpZyB7XG4gIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuICB0ZW1wbGF0ZU5nU3R5bGU6IHt9O1xuICBkZWxheTogbnVtYmVyO1xuICBtaW5EdXJhdGlvbjogbnVtYmVyO1xuICBiYWNrZHJvcDogYm9vbGVhbjtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB3cmFwcGVyQ2xhc3M6IHN0cmluZztcbiAgZGlzYWJsZUFuaW1hdGlvbjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IElCdXN5Q29uZmlnID0ge30pIHtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBPYmplY3Qua2V5cyhCVVNZX0NPTkZJR19ERUZBVUxUUykpIHtcbiAgICAgIHRoaXNbb3B0aW9uXSA9IGNvbmZpZ1tvcHRpb25dICE9PSB1bmRlZmluZWQgPyBjb25maWdbb3B0aW9uXSA6IEJVU1lfQ09ORklHX0RFRkFVTFRTW29wdGlvbl07XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlZmF1bHQtYnVzeScsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2IGNsYXNzPVwibmctYnVzeS1kZWZhdWx0LXdyYXBwZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmctYnVzeS1kZWZhdWx0LXNpZ25cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5nLWJ1c3ktZGVmYXVsdC1zcGlubmVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIzXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyNFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI2XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyN1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjhcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXI5XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmFyMTBcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJiYXIxMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJhcjEyXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmctYnVzeS1kZWZhdWx0LXRleHRcIj57e21lc3NhZ2V9fTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRCdXN5Q29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KCdpbnN0YW5jZUNvbmZpZ0hvbGRlcicpIHByaXZhdGUgaW5zdGFuY2VDb25maWdIb2xkZXI6IEluc3RhbmNlQ29uZmlnSG9sZGVyU2VydmljZSkge1xuICB9XG5cbiAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VDb25maWdIb2xkZXIuY29uZmlnLm1lc3NhZ2U7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQnVzeUNvbmZpZyB7XG4gIHRlbXBsYXRlPzogVGVtcGxhdGVSZWY8YW55PiB8IFR5cGU8YW55PjtcbiAgdGVtcGxhdGVOZ1N0eWxlPzoge307XG4gIGRlbGF5PzogbnVtYmVyO1xuICBtaW5EdXJhdGlvbj86IG51bWJlcjtcbiAgYmFja2Ryb3A/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICB3cmFwcGVyQ2xhc3M/OiBzdHJpbmc7XG4gIGJ1c3k/OiBBcnJheTxQcm9taXNlPGFueT4gfCBTdWJzY3JpcHRpb24+O1xuICBkaXNhYmxlQW5pbWF0aW9uPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IEJVU1lfQ09ORklHX0RFRkFVTFRTID0ge1xuICB0ZW1wbGF0ZTogRGVmYXVsdEJ1c3lDb21wb25lbnQsXG4gIHRlbXBsYXRlTmdTdHlsZToge30sXG4gIGRlbGF5OiAwLFxuICBtaW5EdXJhdGlvbjogMCxcbiAgYmFja2Ryb3A6IHRydWUsXG4gIG1lc3NhZ2U6ICdQbGVhc2Ugd2FpdC4uLicsXG4gIHdyYXBwZXJDbGFzczogJ25nLWJ1c3knLFxuICBkaXNhYmxlQW5pbWF0aW9uOiBmYWxzZVxufTtcbiJdfQ==
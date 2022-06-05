import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {TimeService} from './../_services';

@Injectable()
export class TimeGuard implements CanActivate {

    constructor(private router: Router, private timeService: TimeService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
            return this.timeService.timIsUp;
        
    }
}
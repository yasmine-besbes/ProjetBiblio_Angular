import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const localData=localStorage.getItem('LoggedUser');
  if (localData != null) {
    
    const user = JSON.parse(localData);
    
    
    switch (state.url) {
      case '/gestion':
      case '/suivie':
        if (user.Role !== 'Agent') {
          router.navigateByUrl('/search'); 
          return false;
        }
        break;
      case '/search':
        if (user.Role === 'Agent') {
          router.navigateByUrl('/gestion'); 
          return false;
        }
        break;
    }

    return true; 
  } else {
    
    router.navigateByUrl('/login');
    return false;
  }
};

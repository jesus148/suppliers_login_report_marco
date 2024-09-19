import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLogedGuard: CanActivateFn = (route, state) => {



  // inyectamos pq es una const
  const router = inject(Router);


  const token = localStorage.getItem('object');



  if(token == undefined){
   router.navigate(['/login']);


  }
  return true;


};

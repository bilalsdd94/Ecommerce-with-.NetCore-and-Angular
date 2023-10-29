import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<Basket | null> | undefined;
  currentUser$: Observable<User | null> | undefined;
  isAdmin$: Observable<boolean> | undefined;
  
  constructor(public basketService: BasketService, public accountService: AccountService){}
  ngOnInit(): void {
    this.basket$ = this.basketService.basketSource$;
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
  }
  getCount(items: BasketItem[]){
    return items.reduce((sum,item) => sum + item.quantity, 0)

  }

  logout(){
    
  }
}

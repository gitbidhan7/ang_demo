import { Component, OnInit } from '@angular/core';
import { CartItem  } from '../models/cart-item.model';
import {CartItemList} from '../models/cart-item-list.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {
  readonly #MaxCartItem = 10;
  CartItems: CartItem[] = new CartItemList().CartItems;
  AddToCarts: Array<{Cart: CartItem, Selected: boolean}> = [];
  TotalQty:number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  addToCartItem(cartId: number){
    let idx1 = this.CartItems.findIndex(x=>x.CartId==cartId);
    let idx2 = this.AddToCarts.findIndex(x=>x.Cart.CartId==cartId);
    if(idx2==-1){
      if(this.#_cartIsFull()) return;
      let cart : Array<{Cart: CartItem, Selected: boolean}> = [];
      this.AddToCarts.push({
      Cart: {
        CartId: this.CartItems[idx1].CartId,
        ImageUrl: this.CartItems[idx1].ImageUrl,
        Price: this.CartItems[idx1].Price,
        Quantity: 1
      }, Selected: false});
    }
    else{
      if(!this.#_cartIsFull()){
        this.AddToCarts[idx2].Cart.Quantity += 1;
      }
    }
    this.TotalQty = this.#_totalQty();
  }
  remFromTbls(){
    let len:number=this.AddToCarts.length;
    for(let i:number=0;i<len;i++){
      if(this.AddToCarts[i].Selected) this.AddToCarts.splice(i,1);
    }
    this.TotalQty = this.#_totalQty();
  }
  chngQty(e:Event, idx:number){
    let target: HTMLButtonElement = e.target as HTMLButtonElement;
    let isfull: boolean = this.#_cartIsFull();
    let isempty: boolean = this.#_cartIsEmpty(idx);
    if(target){
      switch(target.value){
        case "0":
          if(!isfull) this.AddToCarts[idx].Cart.Quantity += 1;
          break;
        case "1":
          if(!isempty) this.AddToCarts[idx].Cart.Quantity -= 1;
          break;
        default:
          break;
      }
    }
    this.TotalQty = this.#_totalQty();
  }
  itemSelected(e: Event, idx: number){
    let target: HTMLInputElement = e.target as HTMLInputElement;
    if(target){
      if(target.type==="checkbox"){
        target.checked = !target.checked;
      }
    }
    this.AddToCarts[idx].Selected = !this.AddToCarts[idx].Selected;
  }
  remItem(idx:number){
    this.AddToCarts.splice(idx, 1);
    this.TotalQty = this.#_totalQty();
  }
  totalPrice():number{
    let total: number = 0.00;
    this.AddToCarts.forEach(e=>{
      total += e.Cart.Price;
    });
    return total;
  }
  #_totalQty():number{
    let total = 0;
    this.AddToCarts.forEach(e=>total+=e.Cart.Quantity);
    return total;
  }
  #_cartIsFull(){
    let items = 0;
    this.AddToCarts.forEach(x=>{
      items += x.Cart.Quantity;
    });
    return items>this.#MaxCartItem-1;
  }
  #_cartIsEmpty(idx: number):boolean{
    let flag: boolean = true;
    if(this.AddToCarts.length>0){
      if(this.AddToCarts[idx].Cart.Quantity==0){
        flag = true;
      }
      else{
        flag = false;
      }
    }
    else{
      flag = true;
    }
    return flag;
  }
}

import { Component, OnInit } from '@angular/core';
import { CardsService } from './service/cards.service';
import { Card } from './models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cards ok';
  cards: Card[] = [];
  card: Card = {
    id : '',
    cardHolderName: '',
    cardNumber: '',
    expireMonth:'',
    expireYear:'',
    cvc:''
  }

  constructor(private cardsService: CardsService){

  }

  ngOnInit(): void {
    // throw new Error("Method Not Implemented");
    this.getAllCards();
  }

  getAllCards(){
    this.cardsService.getAllCards()
    .subscribe(
      response => {
        this.cards = response;
        console.log(response);
      }
    )
  }

  onSubmit(){

    if (this.card.id === ''){
      this.cardsService.addCard(this.card).subscribe(Response => {
        this.getAllCards();
        this.card = {
          id: '',
          cardHolderName:'',
          cardNumber:'',
          expireMonth:'',
          expireYear:'',
          cvc:''
        };
      })
    }
    else{
      this.updateCard(this.card);
    }
    
    // console.log(this.card);
  }

  deleteCard(id:string){
    this.cardsService.deleteCard(id).subscribe(
      response => {
        this.getAllCards();
      }
    )
  }

  editForm(card: Card){
    this.card = card;
  }

  updateCard(card: Card){
    this.cardsService.updateCard(card).subscribe(Response => {
      this.getAllCards();
      this.card = {
        id: '',
        cardHolderName:'',
        cardNumber:'',
        expireMonth:'',
        expireYear:'',
        cvc:''
      };
    });

  }
}

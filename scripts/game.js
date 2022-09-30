const game= {
   
   lockMode: false,
   firstCard: null,
   secondCard: null,
   
   setCard(id) {
      
      let card= this.cards.filter(card=>card.id===id)[0]
      
      if (card.flipped || this.lockMode) {
         return false
      }
      
      if (!this.firstCard) {
         this.firstCard= card
         this.firstCard.flipped= true
         return true
      } else {
         this.secondCard= card
         this.secondCard.flipped= true
         this.lockMode= true
         return true
      }
      
   },
   
   checkMatch() {
      if (!this.firstCard || !this.secondCard) { 
         return false 
      }
      return this.firstCard.icon === this.secondCard.icon
   },
   
   clearCards() {
      this.firstCard= null
      this.secondCard= null
      this.lockMode= false
   },
   
   unflipCards() {
      this.firstCard.flipped= false
      this.secondCard.flipped= false
      this.clearCards()
   },
   
   gameOver() {
      return this.cards.filter(card=>!card.flipped).length == 0
   },
      
   techs: [
   'bootstrap',
   'html',
   'css',
   'electron',
   'firebase',
   'javascript',
   'jquery',
   'node',
   'react',
   'mongo'],
   
   cards: null,
   
   createCards: function () {
   this.cards= []
   
   for (let i of this.techs) {
      this.cards.push(this.createCardAttribute(i))
   }
      this.cards= this.cards.flatMap(tech => tech)
      this.shuffleCards()
      return this.cards
   },

   createCardAttribute: function (i) {
      return [{
         id: this.createId(i),
         flipped: false,
         icon: i,
      },{
         id: this.createId(i),
         flipped: false,
         icon: i,
      }]
   },

   createId: function (tech) {
      return tech + parseInt(Math.random() * 1000)
   },
   
   shuffleCards: function () {
      let currencyIndex= this.cards.length
      let randomIndex= 0
   
      do {
         randomIndex= Math.floor(Math.random() * currencyIndex)
         currencyIndex--
      
         [this.cards[currencyIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currencyIndex]]
      } while (currencyIndex > 0)
   },
}
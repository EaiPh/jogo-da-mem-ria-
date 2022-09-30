let front= "front"

startGame()
function startGame() {
   cards= game.createCards()
   setCardsOnTab(cards)
}

function setCardsOnTab() {
   const tab= document.querySelector('.tabuleiro')
   
   tab.innerHTML= ""
   cards.forEach((card) => {
      
      let div= document.createElement('div')
      div.id= card.id
      div.classList.add('card')
      div.dataset.icon= card.icon
      
      div.addEventListener('click', flipCard)
      createCardContent(card, div)
      tab.appendChild(div)
      
   })
}

function createCardContent(card, div) {
   createCardFace("front" ,card, div)
   createCardFace("back" ,card, div)
}

function createCardFace(face, card, Element) {
   let div= document.createElement('div')
   div.classList.add(face)
   
   face == 'front' ? createCardFront(div, card) : div.innerHTML= "&lt;/&gt;"

   Element.appendChild(div)
}

function createCardFront(div, card) {
   let img= document.createElement('img')
   img.src= `./imagens/${card.icon}.png`
   div.appendChild(img)
}

function flipCard() {
   
   if (game.setCard(this.id)) {
      
      this.classList.add('flip')
      if (game.secondCard) {
         if (game.checkMatch()) {
            game.clearCards()
            if (game.gameOver()) {
               document.querySelector('#gameOver').style.display= 'flex'
            }
         } else {
            setTimeout( () => {
               let firstCardView= document.getElementById(game.firstCard.id)
               let secondCardView= document.getElementById(game.secondCard.id)
               
               firstCardView.classList.remove('flip')
               secondCardView.classList.remove('flip')
               
               game.unflipCards()
            },1000)
         }
      }
   }   
}

function playAgain() {
   game.clearCards()
   startGame()
   document.querySelector('#gameOver').style.display= 'none'
}
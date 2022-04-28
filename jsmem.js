  const cards = document.querySelectorAll('.memory-card'); 
    const resetButton = document.querySelector('#replay');

    const announcer = document.querySelector('.announcer');

 let hasFlippedCard = false;
 let lockBoard = false;
 let firstCard, secondCard;

  function flipCard() {
   if (lockBoard) return;
   if (this === firstCard) return;
   this.classList.toggle('flip');
   this.classList.add('flip');

   if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;     return;
   }

   secondCard = this;
   hasFlippedCard = false;

   checkForMatch();
 }

 function checkForMatch() {
   if (firstCard.dataset.framework === secondCard.dataset.framework) {
     disableCards();
     return;
   }

   unflipCards();
 }
 function disableCards() { 
  announcer.classList.remove('hide');
          announcer.style.color = "#30a242";
      announcer.innerText = 'Its a match!';
setTimeout(()=>{ 
        announcer.classList.add('hide');
      },1200);
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);


   resetBoard();
 }

 function unflipCards() {

     lockBoard = true;
   setTimeout(() => {
     announcer.classList.remove('hide');
          announcer.style.color = "#8c52cd";
      announcer.innerText = 'No match! Try again!';
setTimeout(()=>{ 
        announcer.classList.add('hide');
      },1200);
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');

     lockBoard = false;

   resetBoard();
   }, 700);
 }
 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

function shufflea() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 };

cards.forEach(card => card.addEventListener('click', flipCard));


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


function resetall() {
 lockBoard = true;
      cards.forEach(card => {   
    card.classList.remove('flip') ; 
    card.addEventListener('click', flipCard);
lockBoard = false;
        resetBoard();

  });    
      setTimeout(function () {  shufflea();
    }, 500);
}

 resetButton.addEventListener('click', resetall);

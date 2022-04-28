const topl = document.querySelector('.topl');
const topr = document.querySelector('.topr');
const btml = document.querySelector('.btml');
const btmr = document.querySelector('.btmr'); 
    const resetButton = document.querySelector('.reset');
    const announcer = document.querySelector('.announcer');

const scorea = document.querySelector('.scrsim');
const highscore = document.querySelector('.highscore');
 
const getRandomPanel = () => {
const panels = [topr, 
				topl, 
				btmr, 
				btml]; 
return panels[(Math.floor(Math.random()*4))];
};

let score = 0;
let hs = 0;

let sequences = [getRandomPanel()];
let guessed = [...sequences];

const flash = panel => {
	return new Promise((resolve, reject)=>{
		panel.className+=' yes';
		setTimeout(()=> {
			panel.className = panel.className.replace(
				' yes', '');
			setTimeout(()=>{ 
			resolve();
			},250);
		}, 800);
	});
};

let canClick = false;

const panelClicked = panelClicked =>{
	if(!canClick) return; 
	const expected = guessed.shift();
	if(expected === panelClicked){
		if(guessed.length === 0){
			sequences.push(getRandomPanel());
			guessed = [...sequences]; 
			score+=1;
			scorea.innerHTML = score;
        announcer.classList.remove('hide');
        	announcer.style.color = "#30a242";
			announcer.innerText = 'Correct! Keep going!';
setTimeout(()=>{ 
        announcer.classList.add('hide');
			},1000);
		if(score>=hs)
			hs = score;
			setTimeout(()=>{ 
			startFlash();
			},800);
		}
	} else {
		sequences = [];
		guessed = [];
        announcer.classList.remove('hide');
        	announcer.style.color = "#8c52cd";
			announcer.innerText = 'Wrong! Game over!'; 
			highscore.innerHTML = hs; 
	}
};

const startFlash = async () => {
	canClick = false;
for(const panel of sequences){
	await flash(panel);
	}
	canClick = true;
}


 const resetBoard = () => { 
 	sequences = [getRandomPanel()]; 
 	guessed = [...sequences];
 	score = 0;  
	scorea.innerHTML = score; 
  announcer.classList.add('hide');
  startFlash(); 
    };


  resetButton.addEventListener('click', resetBoard); 
startFlash();


const player_batu = document.getElementById('player-batu')
const player_gunting = document.getElementById('player-gunting')
const player_kertas = document.getElementById('player-kertas')

const com_batu = document.getElementById('com-batu')
const com_gunting = document.getElementById('com-gunting')
const com_kertas = document.getElementById('com-kertas')

const output_result = document.getElementById('output-result')
const reload_btn = document.getElementById('reload-btn')




class gameSuit {
     constructor(showResult, comShuffle, comChoise, gameOutput){
          this.showResult = showResult
          this.comChoise = comChoise
          this.comShuffle = comShuffle
          this.gameOutput = gameOutput
     }

     choose(){
          const comShuffle = ['ROCK', 'SCISSORS', 'PAPER']
          this.comChoise = comShuffle[Math.floor(Math.random()*comShuffle.length)]
     }

     logic(){
          if(this.playerChoise == this.comChoise){
               this.gameOutput = 'Draw'
               this.showResult = output_result.innerHTML = "<img src='/game/assets/Draw.png'>" //Draw
               this.gameResult()
          } else if ((this.playerChoise === 'ROCK' && this.comChoise === 'SCISSORS')
                    || (this.playerChoise === 'SCISSORS' && this.comChoise === 'PAPER')
                    || (this.playerChoise === 'PAPER' && this.comChoise === 'ROCK')){
                         this.gameOutput = 'playerWin'
                         this.showResult = output_result.innerHTML = "<img src='/game/assets/player-win.png'>" //PLAYER WIN
                         this.gameResult()
          } else {
               this.gameOutput = 'computerWin'
               this.showResult = output_result.innerHTML = "<img src='/game/assets/computer-win.png'>" //COM WIN
               this.gameResult()
          }
     }

     //output
     gameResult(){
          output_result.classList.remove('versus')
          output_result.classList.add(this.gameOutput)
          output_result.innerHTML = this.showResult;
          console.log(this.showResult)
     }

     option_stop(){
          player_batu.style.pointerEvents = 'none'
          player_gunting.style.pointerEvents = 'none'
          player_kertas.style.pointerEvents = 'none'

     }

     refresh(){
          reload_btn.addEventListener('click', () => {
               player_batu.style.pointerEvents = 'auto'
               player_gunting.style.pointerEvents = 'auto'
               player_kertas.style.pointerEvents = 'auto'

               player_batu.style.backgroundColor = "#9C835F";
               player_gunting.style.backgroundColor = " #9C835F";
               player_kertas.style.backgroundColor = " #9C835F";

               com_batu.style.backgroundColor = " #9C835F"
               com_gunting.style.backgroundColor = " #9C835F"
               com_kertas.style.backgroundColor = " #9C835F"
               
               output_result.classList.remove("Draw")
               output_result.classList.remove("playerWin")
               output_result.classList.remove("computerWin")
               output_result.classList.add("versus")
               output_result.innerHTML = "VS";

               this.playerChoise = ''
               this.comShuffle = ''
               this.comChoise = ''
               this.gameOutput = ''
          })
     }
}

class playerCom extends gameSuit {
     constructor(comChoise,comShuffle, playerChoise){
          super(comChoise, comShuffle)
          this.playerChoise = playerChoise
     }

     ROCK(){
          player_batu.addEventListener('click', () => {
               this.playerChoise = 'ROCK'
               player_batu.style.backgroundColor = '#c4c4c4'
               player_batu.style.borderRadius = '10px'
               super.choose()
               this.logic()
               this.option_stop()
               this.bgCom()
          })
     }

     SCISSORS(){
          player_gunting.addEventListener('click', () => {
               this.playerChoise = 'SCISSORS'
               player_gunting.style.backgroundColor = '#c4c4c4'
               player_gunting.style.borderRadius = '10px'
               super.choose()
               this.logic()
               this.option_stop()
               this.bgCom()
          })
     }

     PAPER(){
          player_kertas.addEventListener('click', () => {
               this.playerChoise = 'PAPER'
               player_kertas.style.backgroundColor = '#c4c4c4'
               player_kertas.style.borderRadius = '10px'
               super.choose()
               this.logic()
               this.option_stop()
               this.bgCom()
          })
     }

     bgCom(){
          if(this.comChoise == 'ROCK'){
               com_batu.style.backgroundColor = '#c4c4c4'
               com_batu.style.borderRadius = '10px'
          } else if (this.comChoise == 'SCISSORS'){
               com_gunting.style.backgroundColor = '#c4c4c4'
               com_gunting.style.borderRadius = '10px'
          } else {
               com_kertas.style.backgroundColor = '#c4c4c4'
               com_kertas.style.borderRadius = '10px'
          }
     }
}

const playing = new playerCom()
playing.ROCK()
playing.SCISSORS()
playing.PAPER()
playing.refresh()
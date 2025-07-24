import { catsData } from '/data.js'

// DOM Elements
const emotionRadios = document.getElementById('emotion-radios')
const memeModal = document.getElementById('meme-modal')
const controlsContainer = document.getElementById('controls-container')
const closeBtn = document.getElementById('meme-modal-close-btn')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')

// Event handlers
emotionRadios.addEventListener('change', highlightCheckedOption)
closeBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)
document.addEventListener('click', function(e){
   if (!memeModal.contains(e.target) && !controlsContainer.contains(e.target)) {
      closeModal()
   }
})
document.addEventListener('keydown', function(e){
   if (e.key === 'Escape' && memeModal.style.display === 'flex') {
      closeModal()
   }
})

// Rendering related functions
function renderEmotionsRadios(cats){
   let radioItems = ''
   const emotions = getEmotionsArray(cats)
   for (let emotion of emotions){
      radioItems += `
      <div class="radio">
         <label for="${emotion}">${emotion}</label>
         <input
         type="radio"
         id="${emotion}"
         value="${emotion}"
         name="emotions"
         >
      </div>`
   }
   emotionRadios.innerHTML = radioItems
}

function renderCat(){
   const catObject = getSingleCatObject()
   document.getElementById('meme-modal-inner').innerHTML = `
      <img 
      class="cat-img" 
      src="./images/${catObject.image}"
      alt="${catObject.alt}"
      >
   `
   memeModal.style.display = 'flex'
}

// Data processing functions
function getEmotionsArray(cats){
   const emotionsArray = []
   for (let cat of cats){
      for (let emotion of cat.emotionTags){
         if (!emotionsArray.includes(emotion)){
         emotionsArray.push(emotion)
         }
      }
   }
   return emotionsArray
}

function getMatchingCatsArray(){
   if(document.querySelector('input[type="radio"]:checked')){
      const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
      const isGif = gifsOnlyOption.checked
      
      return catsData.filter(function(cat){
         if(isGif){
            return cat.emotionTags.includes(selectedEmotion) && cat.isGif
         }
         else{
            return cat.emotionTags.includes(selectedEmotion)
         }            
      })
   }
   return [] // to prevent returning undefined if no input is checked
}

function getSingleCatObject(){
   const catsArray = getMatchingCatsArray()
   if(catsArray.length === 1){
      return catsArray[0]
   }
   else{
      const randomNumber = Math.floor(Math.random() * catsArray.length)
      return catsArray[randomNumber]
   }
}

// Interface interaction functions
function highlightCheckedOption(e){
   const radios = document.getElementsByClassName('radio')
   for (let radio of radios){
      radio.classList.remove('highlight')
   }
   document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
   memeModal.style.display = 'none'
}

renderEmotionsRadios(catsData)
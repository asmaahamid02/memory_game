// const cards = document.querySelectorAll('.card')

// let cardFlipped = false
// let card_one, card_two

// const flipCard = (element) => () => {
//   element.classList.toggle('flip')

//   if (!cardFlipped) {
//     cardFlipped = true
//     card_one = element
//   } else {
//     cardFlipped = false
//     card_two = element
//   }

//   if (card_one && card_two) {
//     if (card_one.dataset.language === card_two.dataset.language) {
//       card_one.removeEventListener('click', flipCard)
//       card_two.removeEventListener('click', flipCard)
//     }
//   }

//   console.log(cardFlipped, card_one, card_two)
// }
// cards.forEach((card) => card.addEventListener('click', flipCard(card)))

document.addEventListener('DOMContentLoaded', () => {
  const cardsList = [
    {
      name: 'html',
      src: './assets/images/html.png',
    },
    {
      name: 'html',
      src: './assets/images/html.png',
    },
    {
      name: 'js',
      src: './assets/images/js.png',
    },
    {
      name: 'js',
      src: './assets/images/js.png',
    },
    {
      name: 'python',
      src: './assets/images/python.png',
    },
    {
      name: 'python',
      src: './assets/images/python.png',
    },
  ]

  cardsList.sort(() => 0.5 - Math.random())

  const cards_container = document.querySelector('.cards-container')

  const flips_num = document.querySelector('.flips-num')
  const found_num = document.querySelector('.found-num')

  const clickedCards = []
  const cards_ids = []
  const total_cards = 6
  const flips_counter = 0
  const found_counter = 0

  flips_num.textContent = flips_counter
  found_num.textContent = found_counter

  const flipCards = (element) => () => {
    if (clickedCards.length != 2) {
      let card_id = element.dataset.id
      // console.log(card_id)

      if (element.getAttribute('src') !== './assets/images/blank.png') {
        clickedCards.push(cardsList[card_id].name)
        cards_ids.push(card_id)
        element.setAttribute('src', cardsList[card_id].src)

        if (clickedCards.length == 2) {
          setTimeout(checkMatched, 600)
        }
      }
    }
  }

  const createCards = () => {
    for (let i = 0; i < cardsList.length; i++) {
      let card = document.createElement('img')
      card.setAttribute('src', './assets/images/front.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCards(card))
      cards_container.appendChild(card)
    }
  }
  createCards()
})

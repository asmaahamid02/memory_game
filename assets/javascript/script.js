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

  let clickedCards = []
  let cards_ids = []
  const total_cards = 6
  let flips_counter = 0
  let found_counter = 0

  flips_num.textContent = flips_counter
  found_num.textContent = found_counter

  const checkMatched = () => {
    const cards = document.querySelectorAll('img')

    const first_card = cards_ids[0]
    const second_card = cards_ids[1]
    console.log(first_card)
    if (clickedCards[0] === clickedCards[1]) {
      found_counter += 2
      //   console.log('matched')
      cards[first_card].setAttribute('src', './assets/images/blank.png')
      cards[second_card].setAttribute('src', './assets/images/blank.png')
    } else {
      //   console.log('not matched')
      cards[first_card].setAttribute('src', './assets/images/front.png')
      cards[second_card].setAttribute('src', './assets/images/front.png')
    }
    clickedCards = []
    cards_ids = []

    found_num.textContent = found_counter

    if (found_counter == total_cards) {
      setTimeout(() => {
        const container = document.querySelector('.container')
        const title = document.querySelector('#title')
        const div = document.createElement('div')
        div.classList.add('win')
        const h2 = document.createElement('h2')
        h2.textContent = 'Congrats! You Won!'
        const restart_btn = document.createElement('button')
        restart_btn.classList.add('restart')
        restart_btn.textContent = 'Restart'
        restart_btn.addEventListener('click', () => window.location.reload())

        container.insertBefore(div, title)
        div.appendChild(h2)
        div.appendChild(restart_btn)

        const controls = document.querySelector('.controls')
        title.classList.add('none')
        cards_container.classList.add('none')
        controls.classList.add('none')
      }, 0)
    }
  }

  const flipCards = (element) => () => {
    if (!cards_ids.includes(element.dataset.id)) {
      flips_counter++
      flips_num.textContent = flips_counter
      if (clickedCards.length != 2) {
        let card_id = element.dataset.id
        // console.log(card_id)

        if (element.getAttribute('src') !== './assets/images/blank.png') {
          clickedCards.push(cardsList[card_id].name)
          cards_ids.push(card_id)
          element.setAttribute('src', cardsList[card_id].src)

          console.log(clickedCards.length)
          if (clickedCards.length == 2) {
            setTimeout(checkMatched, 500)
          }
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

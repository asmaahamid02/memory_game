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

  //shuffle the array
  cardsList.sort(() => 0.5 - Math.random())

  //declare variables
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

  const displaySuccess = () => {
    const container = document.querySelector('.container')
    const title = document.querySelector('#title')

    //create new elements
    const div = document.createElement('div')
    div.classList.add('win')

    const h2 = document.createElement('h2')
    h2.textContent = 'Congrats! You Won!'

    const restart_btn = document.createElement('button')
    restart_btn.classList.add('restart')
    restart_btn.textContent = 'Restart'
    restart_btn.addEventListener('click', () => window.location.reload())

    //insert elements in their position
    container.insertBefore(div, title)
    div.appendChild(h2)
    div.appendChild(restart_btn)

    //hide game
    const controls = document.querySelector('.controls')
    title.classList.add('none')
    cards_container.classList.add('none')
    controls.classList.add('none')
  }

  const checkMatched = () => {
    const cards = document.querySelectorAll('img')

    //2 cards will be the first elemnts in the ids array
    const first_card = cards_ids[0]
    const second_card = cards_ids[1]

    if (clickedCards[0] === clickedCards[1]) {
      //increase the counter if the elements matched
      found_counter += 2

      //remove the image and replace it with blank
      cards[first_card].setAttribute('src', './assets/images/blank.png')
      cards[second_card].setAttribute('src', './assets/images/blank.png')
    } else {
      //display again the front image if the cards not matched
      cards[first_card].setAttribute('src', './assets/images/front.png')
      cards[second_card].setAttribute('src', './assets/images/front.png')
    }
    clickedCards = []
    cards_ids = []

    found_num.textContent = found_counter

    //display success card
    if (found_counter == total_cards) {
      displaySuccess()
    }
  }

  const flipCards = (element) => () => {
    //if the card clicked is not in the array
    if (
      !cards_ids.includes(element.dataset.id) &&
      element.getAttribute('src') !== './assets/images/blank.png'
    ) {
      flips_counter++

      flips_num.textContent = flips_counter

      //to stop the user from filling more cards into the array
      if (clickedCards.length != 2) {
        let card_id = element.dataset.id

        //push the new element to the arrays
        clickedCards.push(cardsList[card_id].name)
        cards_ids.push(card_id)

        //set new src
        element.setAttribute('src', cardsList[card_id].src)

        //check for matched cards
        if (clickedCards.length == 2) {
          setTimeout(checkMatched, 500)
        }
      }
    }
  }

  const createCards = () => {
    //create new cards based on the card list array
    for (let i = 0; i < cardsList.length; i++) {
      let card = document.createElement('img')
      card.setAttribute('src', './assets/images/front.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCards(card))
      cards_container.appendChild(card)
    }
  }

  //call the main function
  createCards()
})

const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const MAX_TIME = 100;
const { Observable, of, fromEvent, from, interval } = rxjs;
const { map, mergeMap } = rxjs.operators;
const inputObs = fromEvent(quoteInputElement, 'input');



inputObs.subscribe(e => {

  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true

  from(arrayQuote)
    .pipe(
      map((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
          characterSpan.classList.remove('correct')
          characterSpan.classList.remove('incorrect')
          correct = false
        } else if (character === characterSpan.innerText) {
          characterSpan.classList.add('correct')
          characterSpan.classList.remove('incorrect')
        } else {
          characterSpan.classList.remove('correct')
          characterSpan.classList.add('incorrect')
          correct = false
        }
        return characterSpan;
      })
    )
    .subscribe();

  if (correct) renderNewQuote()
});

function getRandomQuote() {
  return Observable.create(observer => {
    fetch(RANDOM_QUOTE_API_URL)
      .then(response => response.json())
      .then(data => {
        observer.next(data.content)
        observer.complete()
      })
  });

}

function renderNewQuote() {
  getRandomQuote()
    .pipe(
      mergeMap(v => from(v.split(''))),
    )
    .subscribe(character => {
      const characterSpan = document.createElement('span')
      characterSpan.innerText = character
      quoteDisplayElement.appendChild(characterSpan)
    })

  quoteDisplayElement.innerHTML = ''
  quoteInputElement.value = null
  startTimer().subscribe(v => timerElement.innerHTML = v)
}

let startTime
function startTimer() {
  return Observable.create(observer => {
    observer.next(0)
    startTime = new Date()

    interval(1000).subscribe(_ => {
      observer.next(getTimerTime());
      if (getTimerTime() == MAX_TIME) {
        observer.complete()
        renderNewQuote();
      }
    })
  })
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()
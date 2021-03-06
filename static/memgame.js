// shuffling images to random
function shuffle(arr) {
    for (var iter = 0; iter < arr.length; iter++) {
        var random = Math.floor(Math.random() * (iter + 1));
        var elementAtIter = arr[iter];
        arr[iter] = arr[random];
        arr[random] = elementAtIter;
    }
    return arr;
}


function triggerPointerEvents(isClickable) {
    cards = document.getElementsByClassName('card');
    for (let i of cards) {
        i.style.pointerEvents = isClickable ? 'auto' : 'none';
    }
}


function handleFlippedCards(cardClicked, LastCardClicked) {
    function set_original() {
        LastCardClicked.firstElementChild.setAttribute('class', originalCardImage);
        cardClicked.firstElementChild.setAttribute('class', originalCardImage);
        LastCardClicked.style.backgroundColor = 'white';
        cardClicked.style.backgroundColor = 'white';
        triggerPointerEvents(true);
    }


    var originalCardImage = "fas fa-magic awesome-img"
    var isCardsSimilar = cardClicked.firstElementChild.className == LastCardClicked.firstElementChild.className;
    if (isCardsSimilar){
        if (document.getElementsByClassName(originalCardImage).length == 0){
            $('#Modal').modal();
        }
    } else {
        triggerPointerEvents(false);
        setTimeout(set_original, 800);
    }
}



function memoryGame() {
    var cards = document.getElementsByClassName("card");
    // shuffle, layout images
    var images = ["fas fa-american-sign-language-interpreting", "fas fa-bong", "fas fa-cannabis", "fas fa-joint",
        "fas fa-smoking", "fas fa-tablets", "fas fa-syringe", "fab fa-untappd", "far fa-sad-cry", "fab fa-bitcoin",
        "fas fa-archway", "fab fa-bluetooth-b", "fas fa-binoculars", "fas fa-blind", "fas fa-blender", "fas fa-bezier-curve",
        "fas fa-bed", "fas fa-battery-three-quarters", "fas fa-basketball-ball", "fas fa-bullhorn"];
    images = images.slice(0, cards.length / 2);
    images = images.concat(images);
    var randomizedImages = shuffle(images);

    var isSecondFlip = false;
    var lastCardClicked;

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click',function () {
            // checking if card is already flipped up
            var originalCardImage = "fas fa-magic awesome-img";
            if (this.firstElementChild.className == originalCardImage) {

                this.style.backgroundColor = '#30556d';
                this.firstElementChild.setAttribute('class', randomizedImages[i] + ' ' + 'awesome-img-clicked');

                if (isSecondFlip) {
                    handleFlippedCards(this, lastCardClicked);
                }
                isSecondFlip = !isSecondFlip;
                lastCardClicked = this;
            }
        });
    }
}


function createCards() {
    var dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('mouseup', layoutCards)


    function layoutCards() {
        var selectedNum = dropdown.value;
        var parentDiv = document.getElementById('card-parent-div');

        var cardLayout = '<div class="col-xs-6 col-sm-4 col-lg-3 margin-auto-padding-0" > \
                          <div class="card"> \
                          <i class="fas fa-magic awesome-img"></i> \
                          </div>\
                          </div>'.repeat(selectedNum * 2);
        parentDiv.innerHTML = cardLayout;

        memoryGame();
    }
}

function main() {
    createCards();
}

main();


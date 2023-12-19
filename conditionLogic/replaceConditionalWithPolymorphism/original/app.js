class Bird {
    constructor(type){
        this.type = type;
    }

    state; 

    get getPlumage(){
        this.state = "normal";
        return this.state;
    }
}

let birdType = "africanSwallow";
let bird = new Bird(birdType);
let europeanSwallow = new EuropeanSwallow(birdType);
let africanSwallow = new AfricanSwallow(birdType);
let norwegianBlueParrot = new NorwegianBlueParrot(birdType);
console.log('type ::: ' + bird.type);

switch(bird.type){
    case 'europeanSwallow':
        europeanSwallow.getPlumage; // get Method는 속성처럼 접근한다.
        break;
    case 'africanSwallow':
        africanSwallow.getPlumage;
        break;
    case 'norwegianBlueParrot':
        norwegianBlueParrot.getPlumage;
        break;
    default:
        "notFound";
        break;
}




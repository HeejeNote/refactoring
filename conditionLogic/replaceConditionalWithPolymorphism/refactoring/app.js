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

class EuropeanSwallow extends Bird {
    constructor(){
        super("europeanSwallow");
    }

    get getPlumage(){
        return super.plumage();
    }
}

class AfricanSwallow extends Bird {
    constructor(){
        super("africanSwallow");
    }

    numberOfCocounts = 3 ;
    state;

    get getPlumage(){
        this.state = (this.numberOfCocounts > 2) ? "tired" : "normal";
        return this.state;
    }
} 

class NorwegianBlueParrot extends Bird {
    constructor(){
        super("norwegianBlueParrot");
    }

    voltage = 120;
    state;

    get getPlumage(){
        this.state = (this.voltage > 100) ? "darked" : "beautiful"
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
        return europeanSwallow.getPlumage; // get Method는 속성처럼 접근한다.
    case 'africanSwallow':
        return africanSwallow.getPlumage;
    case 'norwegianBlueParrot':
        return norwegianBlueParrot.getPlumage;
    default:
        return "notFound";
}


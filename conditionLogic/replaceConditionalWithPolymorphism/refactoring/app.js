class Bird {
    constructor(bird){
        Object.assign(this, bird);
    }

    get plumage(){
        return "notFound";
    }

    get airSpeedVelocity(){
        return null;
    }

}

function createBird(bird){
    switch(bird.type){
        case 'europeanSwallow' :
            return new EuropeanSwallow(bird);
        case 'africanSwallow':
            return new AfricanSwallow(bird);
        case 'norwegianBlueParrot':
            return new NorwegianBlueParrot(bird);
        default:
            return new Bird(bird);    
    }
}

class EuropeanSwallow extends Bird {

    get plumage(){
        return "normal"
    }

    get airSpeedVelocity(){
        return 35;
    }
}

class AfricanSwallow extends Bird {
    
    get plumage(){
        return (this.numberOfCocounts > 2) ? "tired" : "normal";
    }

    get airSpeedVelocity(){
        return 40 - 2 * bird.numberOfCocounts;
    }
}

class NorwegianBlueParrot extends Bird {
    
    get plumage(){
        return (this.voltage > 100) ? "darked" : "beautiful"
    }

    get airSpeedVelocity(){
        return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
    }
    
}

// function plumage(bird){
//     return new Bird(bird).plumage;
// }

// function plumage(bird){
//     return new createBird(bird).plumage;
// }

// function airSpeedVelocity(bird){
//     return new Bird(bird).airSpeedVelocity;
// }

// function airSpeedVelocity(bird){
//     return new createBird(bird).airSpeedVelocity;
// }

function plumage(birds){
    return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.plumage]));
}

function speeds(birds){
    return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.airSpeedVelocity]));
}
function plumage(bird){
    switch(bird.type){
        case 'europeanSwallow':
            return "normal";
        case 'africanSwallow':
            return (bird.numberOfCocounts > 2) ? "tired" : "normal"
        case 'norwegianBlueParrot':
            return (bird.voltage > 100) ? "darked" : "beautiful"
        default:
            return "notFound";
    }
}

function airSpeedVelocity(bird){
    switch(bird.type) {
        case 'europeanSwallow':
            return 35;
        case 'africanSwallow':
            return 40 - 2 * bird.numberOfCocounts;
        case 'norwegianBlueParrot':
            return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
        default:
            return null;
    }
}





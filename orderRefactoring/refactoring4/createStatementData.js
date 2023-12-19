const invoice = readJSONFile('invoices.json');
const plays = readJSONFile('plays.json');

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount(){
        throw new Error('서브 클래스에서 호출하도록 처리');
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }

}

class TragedyCalculator extends PerformanceCalculator {
    get amount(){
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount(){
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits(){
        return super.volumeCredits + Math.floor(this.performance.audience / 5);

    }
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type){
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy" : return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`알 수 없는 장르: ${aPlay.type}`);
    }
}

// export default function createStatementData()
export function createStatementData(){

    const result = {};
    result.customer = invoice[0].customer;
    result.performances = invoice[0].performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result; // html 결과 출력을 함수로 추출

    function enrichPerformance(aPerformance){
        // const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance)); // 팩토리 함수 적용
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;

        return result;
    }

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance){
        return new PerformanceCalculator(aPerformance, playFor(aPerformance).amount);
    }

    function volumeCreditsFor(aPerformance) {
        return new PerformanceCalculator(aPerformance, playFor(aPerformance).volumeCredits);
    }

    function totalAmount(data){
        return data.performances
            .reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data){
        return data.performances
            .reduce((total,p) => total + p.volumeCredits, 0);
    }
}


import fs from 'fs';

function readJSONFile(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error reading JSON file ${filePath}: ${error.message}`);
        return null;
    }
}

// module.exports = createStatementData;


const invoice = readJSONFile('invoices.json');
const plays = readJSONFile('plays.json');

// export default function createStatementData()
export function createStatementData(){
    const result = {};
    result.customer = invoice[0].customer;
    result.performances = invoice[0].performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result; // html 결과 출력을 함수로 추출

    function enrichPerformance(aPerformance){
        const result = Object.assign({}, aPerformance);
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);

        return result;
    }

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance){
        let result = 0;
        switch (aPerformance.play.type) {
            case "tragedy": //비극
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
        }
        return result;
    }

    function volumeCreditsFor(aPerformance) {

        let result = 0;

        result += Math.max(aPerformance.audience - 30, 0);

        if ("comedy" === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        }

        return result;
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


/**
 * 공연 관림 비용 계산 부분 함수화
 */

const fs = require('fs');

function readJSONFile(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error reading JSON file ${filePath}: ${error.message}`);
        return null;
    }
}
function statement(invoice,plays) {
    let totalAmount = 0; // 총액
    let volumeCredits = 0; // 적립 포인트
    let result = `::: 청구 내역 (고객명: ${invoice[0].customer}) ::: \n`;

    const format = new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for (let performance of invoice[0].performances) {
        const play = plays[performance.playID];


        let thisAmount = amountFor(performance, play);

        // 포인트를 적립한다.
        volumeCredits += Math.max(performance.audience - 30, 0);

        //희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === play.type) {
            volumeCredits += Math.floor(performance.audience / 5);
        }

        // 청구 내역을 출력한다.
        result += `- ${play.name}: ${format(thisAmount / 100)} (${performance.audience}석)\n`;
        totalAmount += thisAmount;
    }

    result += `----------------------------------\n`;
    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    result += `----------------------------------\n`;
    return result;
}

function amountFor(perf, play){
    let result = 0;
    switch (play.type) {
        case "tragedy": //비극
            result = 40000;
            if (perf.audience > 30) {
                result += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (perf.audience > 20) {
                result += 10000 + 500 * (perf.audience - 20);
            }
            result += 300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
}

const invoice = readJSONFile('invoices.json');
const plays = readJSONFile('plays.json');

if (invoice && plays) {
    const result = statement(invoice, plays);
    console.log(result);
}
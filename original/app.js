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

    /**
     * Intl.NumberFormat ::: 숫자를 다양한 지역 및 통화형식으로 포맷팅하는 JS 내장 객체
     * style: "currency" ::: 숫자를 통화(화폐)로 지정
     * currency : "USD" ::: 통화코드 => 달러 지정
     * minimumFractionDigits: 2 ::: 소수부분 처리 (소수 둘째짜리까지 표시)
     */
    const format = new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for (let perf of invoice[0].performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;

        switch (play.type) {
            case "tragedy": //비극
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }

        // 포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);

        //희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === play.type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        // 청구 내역을 출력한다.
        result += `- ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }

    result += `----------------------------------\n`;
    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    result += `----------------------------------\n`;
    return result;
}

const invoice = readJSONFile('invoices.json');
const plays = readJSONFile('plays.json');

if (invoice && plays) {
    // console.log('invoices.json ::: ', invoice);
    // console.log('play.json ::: ', plays);
    const result = statement(invoice, plays);
    console.log(result);
}
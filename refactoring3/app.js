/**
 * 계산 단계와 포맷팅 단계 분리
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

function statement(invoice) {
    const statementData = {}; // 중간 데이터 구조 객체 생성
    statementData.customer = invoice[0].customer;
    statementData.performances = invoice[0].performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlainText(statementData) // html 결과 출력을 함수로 추출

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
        let result = 0;
        for (let performance of data.performances) {
            result += performance.amount;
        }
        console.log('total :::', result);
        return result;
    }

    function totalVolumeCredits(data){
        let result = 0;
        for (let performance of data.performances) {
            result += performance.volumeCredits;
        }
        return result;
    }
}

function renderPlainText(data){
    let result = `::: 청구 내역 (고객명: ${data.customer}) ::: \n`;

    for (let performance of data.performances) {
        result += `- ${performance.play.name}: ${usd(performance.amount)} (${performance.audience}석)\n`;
    }

    result += `----------------------------------\n`;
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
    result += `----------------------------------\n`;
    return result;


}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber/100);
}

const invoice = readJSONFile('invoices.json');
const plays = readJSONFile('plays.json');

if (invoice && plays) {
    const result = statement(invoice, plays);
    console.log(result);
}
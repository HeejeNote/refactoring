/**
 * amountFor(performance, play)
 * play 변수 ::: playFor(performance) -> play 변수를 함수화하여 변수 제거
 * let thisAmount = amountFor(performance, play); -> 변수 제거하고 바로 매핑
 */

/**
 * 적립 포인트 계산 함수화
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
    let result = `::: 청구 내역 (고객명: ${invoice[0].customer}) ::: \n`;

    for (let performance of invoice[0].performances) {
        // 청구 내역을 출력한다.
        result += `- ${playFor(performance).name}: ${usd(amountFor(performance))} (${performance.audience}석)\n`;
    }

    result += `----------------------------------\n`;
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    result += `----------------------------------\n`;
    return result;
}

/**
 * 총합 공연 관람 비용 계산 함수
 * @returns {number}
 */
function totalAmount(){
    let result = 0;
    for (let performance of invoice[0].performances) {
        result += amountFor(performance);
    }
    return result;
}

/**
 * 총합 적립 포인트 계산 함수
 * @returns {number}
 */
function totalVolumeCredits(){
    let result = 0;
    for (let performance of invoice[0].performances) {
        // 포인트를 적립한다.
        result += volumeCreditsFor(performance);
    }
    return result;
}

/**
 * usd 통화 지정 및 단위 계산 함수
 * @param aNumber
 * @returns {string}
 */
function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber/100);
}

/**
 * 적립 포인트 계산 함수
 * @param aPerformance
 * @returns {number}
 */
function volumeCreditsFor(aPerformance) {

    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type) {
        result += Math.floor(aPerformance.audience / 5);
    }

    return result;
}

/**
 * 공연 ID 추출 함수
 * @param aPerformance
 * @returns {*}
 */
function playFor(aPerformance){
    return plays[aPerformance.playID];
}

/**
 * 공연 관람 비용 계산 함수
 * @param aPerformance
 * @returns {number}
 */
function amountFor(aPerformance){
    let result = 0;
    switch (playFor(aPerformance).type) {
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
            throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
}


const invoice = readJSONFile('invoices.json');
const plays = readJSONFile('plays.json');

if (invoice && plays) {
    const result = statement(invoice, plays);
    console.log(result);
}
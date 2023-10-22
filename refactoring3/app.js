import createStatementData from "./createStatementData.mjs";
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

function statement(invoice) {
    return renderPlainText(createStatementData(invoice))

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
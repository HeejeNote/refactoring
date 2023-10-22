import { createStatementData } from "./createStatementData.js";
import fs from 'fs';

// const createStatementData = require("./createStatementData.js");
// const fs = require('fs');

function readJSONFile(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error reading JSON file ${filePath}: ${error.message}`);
        return null;
    }
}

function htmlStatement(invoice) {
    return renderHtml(createStatementData(invoice))

}

function renderHtml(data){

    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>"
    for (let performance of data.performances) {
        result += ` <tr><td>${performance.play.name}</td><td>(${performance.audience}석)</td>`;
        result += `<td>${usd(performance.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber/100);
    }
}



const invoice = readJSONFile('invoices.json');
const plays = readJSONFile('plays.json');

if (invoice && plays) {
    const result = htmlStatement(invoice, plays);
    console.log(result);
}
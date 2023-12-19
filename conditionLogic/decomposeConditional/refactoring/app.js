class Plan {

    summerRate = 30;
    regularRate = 10;
    regularServiceCharge = 2;

    constructor(startDate,endDate){
        this.summerStart = startDate;
        this.summerEnd = endDate;
    }

}

class ComareDate {

    constructor(date){
        this.date = date;

    }

    isBefore(startDate){
        if(this.date < startDate){
            console.log("isBefore 비수기 기간입니다.");
            return true;
        }
        console.log("isBefore 성수기 기간입니다.");
        return false;
    }
    
    isAfter(endDate){
        if(this.date > endDate){
            console.log("isAfter 비수기 기간입니다.");
            return true;
        }

        console.log("isAfter 성수기 기간입니다.")
        return false;
    }

}

let comareDate = 20230602;
let startDate = 20230601;
let endDate = 20230831;
let quantity = 2;

const aDate = new ComareDate(comareDate);
const plan = new Plan(startDate,endDate);

console.log("date ::: " + aDate.date)
console.log("summerStart :::" + plan.summerStart);
console.log("summerEnd :::" + plan.summerEnd);


// if(summer()){ // 조건식 함수화
//     summerCharge(); // 조건절 함수화
// } else {
//     regularCharge(); // 조건절 함수화
// }

let charge = summer() ? summerCharge() : regularCharge();
console.log(charge);

function summer(){
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)
}

function summerCharge(){
    console.log("성수기 charge ::: " + quantity * plan.summerRate);
    return quantity * plan.summerRate;
}

function regularCharge(){
    console.log("비수기 charge ::: " + quantity * plan.regularRate + plan.regularServiceCharge);
    return quantity * plan.regularRate + plan.regularServiceCharge;
}

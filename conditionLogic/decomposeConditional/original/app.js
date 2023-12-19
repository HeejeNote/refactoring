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
let charge = 0;

const aDate = new ComareDate(comareDate);
const plan = new Plan(startDate,endDate);

console.log("date ::: " + aDate.date)
console.log("summerStart :::" + plan.summerStart);
console.log("summerEnd :::" + plan.summerEnd);


if(!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)){
    charge = quantity * plan.summerRate;
    console.log("::: 성수기 :::")
    console.log("quantity = " + quantity + " regularRate = " + plan.regularRate + " regularServiceCharge = " + plan.regularServiceCharge);
    console.log(charge);
} else {
    charge = quantity * plan.regularRate + plan.regularServiceCharge;
    console.log("::: 비수기 :::");
    console.log("quantity = " + quantity + " regularRate = " + plan.regularRate + " regularServiceCharge = " + plan.regularServiceCharge);
    console.log(charge);
}




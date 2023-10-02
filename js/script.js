let date = new Date();
let maxDay = 31;
let dayNow = date.getDate()+1, monthNow = date.getMonth()+1, yearNow = date.getFullYear();
const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
const monthsWith30Days = [4, 6, 9, 11];

function calc() {
    var userDay = document.querySelector('.i-day').value;
    var userMonth = document.querySelector('.i-month').value;
    var userYear = document.querySelector('.i-year').value;
    
    console.log(userDay + ' ' + userMonth+ ' ' + userYear+ '\n\n');
    
    let test = check(userDay, userMonth, userYear);
    console.log(test);
    if(test == 3){
        var monthBounce=0, ansY=yearNow-userYear, ansM=monthNow-userMonth, ansD=Math.abs(dayNow-userDay);
        console.log(yearNow + ' ' + monthNow + ' ' + dayNow);
        
        if(userDay > dayNow){
            monthBounce++;
            ansD = 30-ansD + (maxDay - 30);
        }
        if(userMonth-(monthBounce*-1) >= monthNow){
            console.log(userMonth-(monthBounce*-1) + ' ' + monthNow);
            ansY--;
            
            ansM = 12 - (userMonth-(monthBounce*-1) - monthNow)
        }
        
        console.log(ansD + ' ' + ansM + ' ' + ansY);
        $('.no-day').html(`<i>${ansD}</i>`);
        $('.no-month').html(`<i>${ansM}</i>`);
        $('.no-year').html(`<i>${ansY}</i>`);
    }
    else {
        $('.no-day').html("<i>-  -</i>");
        $('.no-month').html("<i>-  -</i>");
        $('.no-year').html("<i>-  -</i>");
    }
}


function year(c, max = yearNow){
    if(c > max || !c.length){
        $('.i-year-error').html(`Must be ${(c>max)? "in the past": "valid"} [0 - ${max}]`);
        $('.i-year-error').css("display", "block");
        $('.y').children().eq(0).css("color", "var(--error)");
        $('.y').children().eq(1).css("border-color", "var(--error)");
        
        console.log("year wrong");
        return 0;
    }
    else {
        $('.i-year-error').css("display", "none");
        $('.y').children().eq(0).css("color", "var(--pre-value)");
        $('.y').children().eq(1).css("border-color", "#ededed");
        return 1;
    }
}

function month(b, ourYear = false ,max = 12){
    if(ourYear){
        max = monthNow;
    }
    if(b > max || b < 0 || !b.length){
        $('.i-month-error').html(`Must be ${(b>max)? "in the past": "valid"} [0 - ${max}]`);
        $('.i-month-error').css("display", "block");
        $('.m').children().eq(0).css("color", "var(--error)");
        $('.m').children().eq(1).css("border-color", "var(--error)");
        
        console.log("month wrong");
        return 0;
    }
    else {
        $('.i-month-error').css("display", "none");
        $('.m').children().eq(0).css("color", "var(--pre-value)");
        $('.m').children().eq(1).css("border-color", "#ededed");
        return 1;
    }
}

function day(a, b, max = 31, ourYear = false){
    if(ourYear && monthNow == b){
        max = dayNow;
    }
    if(a > max || a < 0 || !a.length){
        console.log("day wrong");
        $('.i-day-error').html(`Must be ${(a>max)? "in the past": "valid"} [0 - ${maxDay}]`);
        $('.i-day-error').css("display", "block");
        $('.d').children().eq(0).css("color", "var(--error)");
        $('.d').children().eq(1).css("border-color", "var(--error)");
        
        return 0;
    }
    else {
        $('.i-day-error').css("display", "none");
        $('.d').children().eq(0).css("color", "var(--pre-value)");
        $('.d').children().eq(1).css("border-color", "#ededed");
        return 1;
    }
}

function check(a, b, c){
    let test = 0;
    // Check Year
    console.log(test);
    ourYear = (yearNow - c)? true: false;
    test += year(c);
    console.log(test);
    
    // Chack Month
    test += month(b, !ourYear);
    console.log(test);
    
    // Chack Day
    if(monthsWith30Days.includes(b)){
        test += day(a, b, 30, !ourYear);
        maxDay = 30;
    }
    else if(monthsWith31Days.includes(b)){
        test += day(a, b, 31, !ourYear);
        maxDay = 31;
    }
    else {
        if(c%4 == 0 && (c% 400 == 0 || c%100 != 0) ){
            test += day(a, b, 29, !ourYear)
            maxDay = 29;
        }
        else{ 
            test += day(a, b, 28, !ourYear);
            maxDay = 28;
        }
    }
    console.log(test);  
    return test;
}

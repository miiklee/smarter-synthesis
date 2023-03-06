//top-down type directed search program synthesis algorithm

document.getElementById('input_button').addEventListener('click', parseInputs);



function parseInputs(){
    var input = [];
    var output = [];
    var type;
    
    //extract inputs and outputs
    var inputs = document.getElementById('input').value.split(", ");
    inputs.forEach(element => {
        let pair = element.split(" ");
        input.push(pair[0]);
        output.push(pair[1]);
    });

    //make sure types are consistent
    let counterIn = 0;
    let counterOut = 0;
    input.forEach(element => {
        if (element.includes('"')){
            counterIn += 1;
        }
    });
    output.forEach(element => {
        if (element.includes('"')){
            counterOut += 1;
        }
    });
    

    //set type of conversion
    if (counterIn == 0){
        type = "intto";
    }else if (counterIn != input.length){ //mismatch of types
        document.getElementById('node').innerHTML = "oh no! you don't have consistent input types :( try using all chars to all ints, all ints to all chars, all chars to all chars, or all ints to all ints and try again!";
        document.getElementById('node').style.color = "red"
    }else{
        for (let i = 0; i < input.length; i++){
            input[i] = input[i].substring(1,2)
        }
        type = "strto";
    }if (counterOut == 0){
        type += "int";
    }else if (counterOut != output.length){ //mismatch of types
        document.getElementById('node').innerHTML = "oh no! you don't have consistent output types :( try using all chars to all ints, all ints to all chars, all chars to all chars, or all ints to all ints and try again!";
        document.getElementById('node').style.color = "red"
    }else{
        for (let i = 0; i < output.length; i++){
            output[i] = output[i].substring(1,2)
        }
        type += "str";
    }
    
    
    //call appropriate method based on type
    if (type == "inttostr"){
        intToStr(input, output);
    }else if (type == "strtoint"){
        strToInt(input, output);
    }else{
        allDone(checkPrograms(input, output));
    }
}


function intToStr(input, output){
    functions = checkPrograms(input, output);
    for (let i = 0; i < functions.length; i++){
        functions[i] = "toString( " + functions[i] + " )"; 
    }
    allDone(functions);

}

function strToInt(input, output){
    functions = checkPrograms(input, output);
    for (let i = 0; i < functions.length; i++){
        functions[i] = "toInt( input ) " + functions[i]; 
    }
    allDone(functions);

}



function genOperators(){
    //generate all possible combos of operators
    var options = ['+', '-', '*', '/'];
    var operators = [];

    for (let i = 0; i < options.length; i++) {
        for (let j = 0; j < options.length; j++) {
            for (let k = 0; k < options.length; k++) {
                let ops = options[i] + options[j] + options[k];
                operators.push(ops);
            }
        }
    }
    operators.forEach(element => {
        element.split("");
    })
    return operators;
}

function genNums(){
    var nums = [...Array(1000).keys()].slice(100, 1000); 
    var smartNums = [];

    //make into lists of numbers
    nums.forEach( element => {
        element = element.toString();
        element = element.split("");
        element.sort();
        if (!(element in smartNums)){ //since we have all combos of operators, don't need different orders of same numbers
            smartNums.push(element); //smarter algorithm since removes duplicates earlier
        }
    })

    return smartNums;
}


function genFunctions(){
    var operators = genOperators();
    var nums = genNums();
    var functions = [];
    console.log(operators)

    for(let i = 0; i<nums.length; i++){
        for(let j = 0; j < operators.length; j++){
            let func = "";
            for(let k = 0; k<3; k++){
                func += operators[j][k] + nums[i][k];
            }
            //get rid of duplicates/ operations that do nothing
            func = func.replace("+0", "");
            func = func.replace("-0", "");
            func = func.replace("/0", "");
            func = func.replace("/1", "");
            func = func.replace("*1", "");

            functions.push(func);
        }
    }

    return functions;
}


function checkPrograms(input, output) {
    
    var functions = genFunctions();
    var goodFuncs = [];

    functions.forEach(func => {
        var itWorks = true;
        for(let i = 0; i < input.length; i++){ //check if function is valid
            if (func.includes('/')){
                let funky = func.split('/');
                var funky1 = eval(input[i] + funky[0]);
                if (funky[1].length == 1 && ~~eval(funky1.toString() + '/' + funky[1]) != parseInt(output[i])){
                    itWorks = false;
                }else{
                    let funky2 = funky[1].split();
                    funky1 = (~~eval(funky1 + '/' + funky2[0])).toString();
                    funky2 = funky2.slice(1);
                    let funkster = funky2.join("");
                    console.log(funky1)
                    console.log(funkster)
                    if (eval(funky1 + funkster) != parseInt(output[i])){
                        itWorks = false;
                    }
                }
            }
            else if(eval(input[i] + func) != parseInt(output[i])){
                itWorks = false;
            }
        }if (itWorks){
            goodFuncs.push(func);
        }
    })
    
    goodFuncs = goodFuncs.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    goodFuncs.sort((a, b) => a.length - b.length); //sort by length
    console.log(goodFuncs)
    if (goodFuncs.length > 5){
        return goodFuncs.slice(0, 5); //return 4 shortest functions
    }else{
        return goodFuncs;
    }
}


function allDone(functions){
    if(functions.length != 0){
        document.getElementById('label').style.visibility = 'visible'
        document.getElementById('node').style.color = "black"
        document.getElementById('node').innerHTML = functions.join(", ");
    }else{
        document.getElementById('label').style.visibility = 'hidden'
        document.getElementById('node').style.color = "black"
        document.getElementById('node').innerHTML = "i'm sorry, there are no programs that work consistently across that set of inputs and outputs :(";
    }
    

}

//brute force program synthesis algorithm

document.getElementById('input_button').addEventListener('click', findPrograms)



function findPrograms() {

    // mapping of inputs to outputs
    var in_out = {};

    var inputs = document.getElementById('input').value.split(",");
    inputs.forEach(element => {
        let pair = element.split(" ");
        in_out[pair[0]] = pair[1];
        

    });


    
    var functions = [];

    let i = 0
    while(functions.length <= 1 && i<eval(input + '+' + output)){
        //try all operations with all numbers until 2 work
        if (eval(input + '+' + i.toString()) == output.toString()){
            functions.push('+' + i.toString());
        }if (eval(input + '-' + i.toString()) == output.toString()){
            functions.push('-' + i.toString());
        }if (eval(input + '*' + i.toString()) == output.toString()){
            functions.push('*' + i.toString());
        }if ((~~eval(input + '/' + i.toString())) == output.toString()){ //truncate bc int div
            functions.push('/' + i.toString());
        }
        i++;
    }

    document.getElementById('label').style.visibility = 'visible'
    if(functions.length>1){
        document.getElementById('node').innerHTML = functions[0] + ' ' + functions[1];
    }else{
        document.getElementById('node').innerHTML = functions[0];
    }
    

}

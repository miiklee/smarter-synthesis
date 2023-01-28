//brute force program synthesis algorithm

document.getElementById('input_button').addEventListener('click', findPrograms)

function findPrograms() {
    var inputs = document.getElementById('input').value.split(" ");
    var input = inputs[0];
    var output = inputs[1];
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

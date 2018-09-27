
const OPERATIONS = ['+', '-', '*', '/',];
const NUMBERS = '123456789'.split('');

//every iteration, we store expressions and results in hashes in the form {result: [expression1, expression2...]]}
const outcomes = (a,b) => {
    const res = {};
    OPERATIONS.forEach(op => {
        res[eval( a + op + b )] = a + op + b;
    });
    return res;
}

class myHash {
    constructor(){
        this.store = {};
    }

    keys(){
        return Object.keys(this.store);
    }

    values(){
        return Object.values(this.store);
    }

    set(k,v){
        if(this.store[k] === undefined){
            this.store[k] = [];
        }
        this.store[k].push(v);
    }

    get(k){
        return this.store[k];
    }

    merge(h){
        h.keys.forEach(k => {
            this.set(k, h.get(k));
        })
        return this;
    }
}


//hardcode the first result
const first_case = new myHash;
first_case.set(NUMBERS[0], NUMBERS.shift());
var computed = first_case;

NUMBERS.forEach(number => {
    let all_results = new myHash;
    computed.values().forEach( previous_result_array => {
        previous_result_array.forEach( previous_result => {
            resultsMappedToExpressions = outcomes(previous_result, number);
            Object.keys(resultsMappedToExpressions).forEach(outcome => {
                all_results.set(outcome, resultsMappedToExpressions[outcome]);   
            });
        });
    });
    computed = all_results;
});



console.log(computed.get('100'));

//just to be sure
computed.get('100').forEach( expression => {
    if(eval(expression) !== 100){
        console.log('ERR ', expression, " EVALUATES TO ", eval(expression));
    }
});

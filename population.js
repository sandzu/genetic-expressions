const CHROMOSOMES = ['+', '-', '*', '/',];
const NUMBERS = '123456789'.split('');
const MUTATION_RATE = .1;
const TARGET = 100;
const FITNESS_CUTOFF = 100; 
const BREEDING_POPULATION_SIZE = 12;
const POPULATION_SIZE = 50;

const populate = (num_organisms, numbers) => {
    const res = [];
    for(let i = 0; i < num_organisms; i++){
        res.push(randomString(CHROMOSOMES, numbers.length - 1))
    }
    return res;
}

const randomString = (seedChars, length) => {
    res = ""
    while(res.length < length){
        res += sample(seedChars);
    }
    return res;
}

const breed = (a,b)=> {
    let offspring = "";
    a.split('').forEach((char, index)=>{
        const chance = Math.random();
        if(chance < MUTATION_RATE){
            offspring += sample(CHROMOSOMES);
        }else if(chance<(1-MUTATION_RATE)/2){
            offspring += a[index];
        }else{
            offspring += b[index];
        }
    })
    return offspring; 
}

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const expression = organism => {
    const ops = organism.split("")
    const nums = NUMBERS.slice();
    let res = [];
    res.push(nums.shift());
    while (nums.length > 0) {
        res.push(ops.shift());
        res.push(nums.shift());
    }
    return res.join("");
}

const eval_fitness = (organism) => {
    return Math.abs(TARGET - eval(expression(organism)))
}

const sort_func = (a,b) => (eval_fitness(a)-eval_fitness(b))/Math.abs(eval_fitness(a)-eval_fitness(b));


const avg_fitness = population => population.reduce((acc, el)=> acc + eval_fitness(el),0)*1.0/population.length;

const new_population = old_population => {
    //filter out individuals beyond cutoff point
    survivors = old_population.filter(organism => eval_fitness(organism)< FITNESS_CUTOFF).sort(sort_func);
    //trim population of least fit individuals until desired breeding population size is achieved
    survivors = survivors.sort(sort_func);
    while(survivors.length > BREEDING_POPULATION_SIZE) survivors.pop();

    const newborns = [];
    while(newborns.length + survivors.length < POPULATION_SIZE){
        const a = sample(survivors);
        const b = sample(survivors);
        newborns.push(breed(a,b))
    }
    return survivors.concat(newborns);
}



console.log('LETS FIND AN EXPRESSION OF THE FORM "1 a 2 b 3 c 4 d ... h 9" THAT EVALUATES TO 100. ')
console.log('PRESS y TO START')
let population = populate(POPULATION_SIZE, NUMBERS);
let current_gen = 0
var stdin = process.openStdin();
stdin.addListener("data", (d)=>{
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    if(d.toString().trim() === 'y'){
        population = new_population(population);
        const brute = populate(POPULATION_SIZE, NUMBERS);
        if(eval(expression(brute.sort(sort_func)[0])) === 0) console.log('BRUTE FORCE HAS SUCCEEDED');
        current_gen += 1;
        console.log('GEN ', current_gen);
        console.log("NEW GENERATION AVG FITNESS ", avg_fitness(population));
        console.log("NEW GENERATION BEST FITNESS ", eval_fitness(population.sort(sort_func)[0]));
        console.log('NEW GENERATION BEST ORGANISM ', population.sort(sort_func)[0]);
        console.log(expression(population.sort(sort_func)[0]), " = ", eval(expression(population.sort(sort_func)[0])));
        
        console.log('press y to continue')
    }
})
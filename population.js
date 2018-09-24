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

const generation = (population, generation_count = 0) => {
    const next_population = new_population(population);
    console.log("NEW GENERATION AVG FITNESS ", avg_fitness(next_population));
    console.log("NEW GENERATION BEST FITNESS ", eval_fitness(next_population.sort(sort_func)[0]));
    console.log('NEW GENERATION BEST ORGANISM ', next_population.sort(sort_func)[0]);
    console.log(expression(next_population.sort(sort_func)[0]), " = ", eval(expression(next_population.sort(sort_func)[0])));
    console.log('press y to continue')
    return next_population;
}


console.log('LETS FIND AN EXPRESSION OF THE FORM "1 a 2 b 3 c 4 d ... h 9" THAT EVALUATES TO 100. ')
console.log('PRESS y TO START')
let population = populate(POPULATION_SIZE, NUMBERS);

var stdin = process.openStdin();
stdin.addListener("data", (d)=>{
    
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    if(d.toString().trim() === 'y'){
        population = generation(population);
    }
})
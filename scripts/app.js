import { saveLocal, getLocal, removeLocal } from "./ls.js";

let nameInput = document.getElementById("nameInput");
let addBtn = document.getElementById("addBtn");
let displayName = document.getElementById("displayName");
let pickRandom = document.getElementById("pickRandom");
let rangeSlider = document.getElementById("rangeSlider");
let rangeSlider2 = document.getElementById("rangeSlider2");
let sliderValue = document.getElementById("sliderValue");
let sliderValue2 = document.getElementById("sliderValue2");
let pickRandomGroup = document.getElementById("pickRandomGroup");
let totalNames = document.getElementById("totalNames");
let nameDiv = document.getElementById("nameDiv");
let modalBody = document.getElementById("modalBody");


let nameList = [];


addBtn.addEventListener('click', () => {
    let names = getLocal();

    saveLocal(nameInput.value);
    let div = document.createElement("div");
    let p = document.createElement("p");
    let button = document.createElement("button");

    p.textContent = nameInput.value;
    p.className = "text-2xl";
    button.textContent = "Remove";
    button.className = "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2";
    div.className = "flex justify-between pt-5";

    button.addEventListener('click', () => {

        let index = nameList.indexOf(p.textContent);
        nameList.splice(index, 1);
        totalNames.innerText = `Total Names: ${nameList.length}`;
        
        removeLocal(p.textContent);
        names = getLocal();
        div.remove();
    })

    nameList.push(nameInput.value);
    totalNames.innerText = `Total Names: ${nameList.length}`;
    nameInput.value = "";
    div.append(p);
    div.append(button);
    nameDiv.appendChild(div);
});

pickRandom.addEventListener('click', ()=> {

    if(!nameList.length > 0){
        alert("Please enter in names before selecting random.");
    }else{
        let rand = Math.floor(Math.random() * nameList.length);

        displayName.textContent = nameList[rand];
    }
})

rangeSlider.addEventListener('input', () => {
    sliderValue.textContent = rangeSlider.value;
})

rangeSlider2.addEventListener('input', () => {
    sliderValue2.textContent = rangeSlider2.value;
})

pickRandomGroup.addEventListener('click', () => {

    let nameList = getLocal();
    let errorMessage = document.createElement("p");
    modalBody.innerHTML = "";

    if(!nameList.length > 1){
        alert("Please enter in names before selecting random groups. (Min. 2 names)");
    }else{
        if(nameList.length < rangeSlider.value){
            errorMessage.textContent = "Cannot make a group larger than the amount of people added";
            errorMessage.className = "text-black";
            modalBody.append(errorMessage);
        }else{
            
            let newList = nameList;
            let groupSize = rangeSlider.value;

            shuffle(newList);
            console.log(newList);

            
                const result = newList.reduce((resultArray, name, index) => { 
                    const groupIndex = Math.floor(index / groupSize)
                  
                    if(!resultArray[groupIndex]) {
                      resultArray[groupIndex] = []
                    }
                  
                    resultArray[groupIndex].push(name)
                    
                    return resultArray
                  }, [])
                  console.log(result);
            
                  for(let i = 0; i < rangeSlider2.value; i++){

                    if(result[i].length < groupSize){
                        return;
                    }else{
                    let group = document.createElement("p");

                    group.textContent = `Group ${i}: ${result[i]} `;
                    group.className = "text-black text-xl";
                    modalBody.append(group);
                    }
                  }
        }
    }
})


const makeList = () => {
    nameList.forEach(name => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let button = document.createElement("button");

    p.textContent = name;
    p.className = "text-2xl";
    button.textContent = "Remove";
    button.className = "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2";
    div.className = "flex justify-between pt-5";

    button.addEventListener('click', () => {

        let index = nameList.indexOf(name);
        nameList.splice(index, 1);
        totalNames.innerText = `Total Names: ${nameList.length}`;
        
        removeLocal(name);
        nameList = getLocal();
        div.remove();
    })

    totalNames.innerText = `Total Names: ${nameList.length}`;
    nameInput.value = "";
    div.append(p);
    div.append(button);
    nameDiv.appendChild(div);
    })
}


nameList = getLocal();
makeList();

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex > 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
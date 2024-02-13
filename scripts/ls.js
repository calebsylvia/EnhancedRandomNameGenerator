const saveLocal = (name) => {
    console.log(name);
    let names = getLocal();

    if(!names.includes(name)){
        names.push(name);
    }

    localStorage.setItem("Names", JSON.stringify(names));
}

const getLocal = () => {
    let localData = localStorage.getItem("Names");

    if(localData == null){
        return [];
    }
        return JSON.parse(localData);
}
    

const removeLocal = (name) => {
        let names = getLocal();
        let index = names.indexOf(name);
    
        names.splice(index, 1);
    
        console.log(names)
        localStorage.setItem("Names", JSON.stringify(names))
}


export { saveLocal, getLocal, removeLocal }
let hashval = '17ec305661f035b372801cb260d3fef0';
let publicKey = '4b4f86b93e69867f933d5c259d215844';
let timestamp = 1698500468641;

let cont = document.getElementById('card-container');
let fav = [];

let search = document.getElementById('search_id');
let S_button = document.getElementById('Magic');
let s_helper = document.getElementById("search_help");


// this is for current page indication 
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active');
    }
})

// this is used for favourite character to fav array 
function favourite(){
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        let value1 = localStorage.getItem(key);
        let obj1 = JSON.parse(value1);
        let size = key.length;
        if(size > 10 && obj1.fav == true){
            let id = key.slice(0,7);
            let value = localStorage.getItem(id);
            let obj = JSON.parse(value);
            fav.push(obj.Name);
        }
    }
}
favourite();

if(fav.length == 0){
    alert('to display here add something in favourite');
}

// this is search button  
S_button.addEventListener('click', async (event)=>{
    let bool = false;
    let input = search.value;
    if(input == null){
        alert('input is empty');
    }
    for(let i=0; i<localStorage.length; i++){
        if(fav[i] == input){
            cont.innerHTML = "";
            bool = true;
            const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashval}&name=${input}`;
            const response = await fetch(url);
            const jsonData = await response.json();
            jsonData.data["results"].forEach((element) => {
                cont.innerHTML+=`
                <div class="scard-holder">
                    <div id="${element.id}" class="scard">
                        <div id="${element.id}-heart" class="sheart">
                            <div class="shleft"></div>
                            <div class="shright"></div>
                        </div>
                        <img src="${element.thumbnail["path"]+ "." +element.thumbnail["extension"]}" alt="" class="scard-image">
                        <div class="scard_content">
                            <h3 class="scard_tittle">${element.name}</h3>
                            <br>
                            <br>
                            <p class="scard_description">${element.description}</p>
                            <br>
                            <p class="comics">Comics: ${element.comics.available}</p>
                            <p class="series">Series: ${element.series.available}</p>
                        </div>
                    </div>
                    <div></div>
                </div>
                `
            });
        }
    }
    if(bool == false){
        alert('this is not present in the favourite list pls you can check it on main page');
    }
    renderfav();
    s_helper.style.display = "none";
})
document.addEventListener('keypress', async(event)=>{
    let bool = false;
    if(event.key == 'Enter'){
        let input = search.value;
        if(input == null){
            alert('input is empty');
        }
        for(let i=0; i<localStorage.length; i++){
            if(fav[i] == input){
                cont.innerHTML = "";
                bool = true;
                const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashval}&name=${input}`;
                const response = await fetch(url);
                const jsonData = await response.json();
                jsonData.data["results"].forEach((element) => {
                    cont.innerHTML+=`
                    <div class="scard-holder">
                        <div id="${element.id}" class="scard">
                            <div id="${element.id}-heart" class="sheart">
                                <div class="shleft"></div>
                                <div class="shright"></div>
                            </div>
                            <img src="${element.thumbnail["path"]+ "." +element.thumbnail["extension"]}" alt="" class="scard-image">
                            <div class="scard_content">
                                <h3 class="scard_tittle">${element.name}</h3>
                                <br>
                                <br>
                                <p class="scard_description">${element.description}</p>
                                <br>
                                <p class="comics">Comics: ${element.comics.available}</p>
                                <p class="series">Series: ${element.series.available}</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    `
                });
            }
        }
        if(bool == false){
            alert('this is not present in the favourite list pls you can check it on main page');
        }
        renderfav();
        s_helper.style.display = "none";
    }
})

// search suggestion 
search.addEventListener('keyup', async(event)=>{
    s_helper.innerHTML = "";
    let input = event.target.value;
    if(input.length == 0){
        s_helper.innerHTML = "";
        s_helper.style.display = "none";
    }
    else{
        s_helper.style.display = "block";
        console.log(input);
        const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${input}&ts=${timestamp}&apikey=${publicKey}&hash=${hashval}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.data["results"].forEach((element) => {
            s_helper.innerHTML+=`<li id="${element.name}">${element.name}</li>
            <br>`
        });
    }
    
})
s_helper.addEventListener('click', (event)=>{
    let input = event.target.id;
    if(input[6] != '_'){
        search.value = input;
    }
})
document.addEventListener('click', ()=>{
    s_helper.style.display = "none";
})

// this is for rendering the favourite card on the display and also for change the favourite
let check1 = {
    fav : false,
}
let container = document.getElementById('card-container');
container.addEventListener('click', (event)=>{
    let ans = false;
    let index;
    for(let j=0; j<=localStorage.length; j++){
        let str1 = event.target.id;
        let key = localStorage.key(j);
        if(key == event.target.id && str1[7] == '-'){
            ans = true;
            index = key;
        }
    }
    if(ans == true){
        let value = localStorage.getItem(`${index}`);
        let obj = JSON.parse(value);
        if(obj.fav == true){
            document.getElementById(`${index}`).childNodes[1].style.backgroundColor = 'white';
            document.getElementById(`${index}`).childNodes[3].style.backgroundColor = 'white';
            document.getElementById(`${index}`).childNodes[3].style.filter = 'drop-shadow(2px 4px 6px white)';
            obj.fav = false;
            localStorage.removeItem(`${index}`);
            localStorage.setItem(`${index}`, JSON.stringify(obj));
        }
        else{
            document.getElementById(`${index}`).childNodes[1].style.backgroundColor = 'red';
            document.getElementById(`${index}`).childNodes[3].style.backgroundColor = 'red';
            document.getElementById(`${index}`).childNodes[3].style.filter = 'drop-shadow(2px 4px 6px red)';
            obj.fav = true;
            localStorage.removeItem(`${index}`);
            localStorage.setItem(`${index}`, JSON.stringify(obj));
        }
    }
    else{
        let str = event.target.id;
        if(str[7]=='-'){
            localStorage.setItem(`${event.target.id}`, JSON.stringify(check1));
        }
    }
})


async function display(){
    cont.innerHTML = "";
    for(let i=0; i<fav.length; i++){
        let input = fav[i];
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashval}&name=${input}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.data["results"].forEach((element) => {
            cont.innerHTML+=`
            <div class="scard-holder">
                <div id="${element.id}" class="scard">
                    <div id="${element.id}-heart" class="sheart">
                        <div class="shleft"></div>
                        <div class="shright"></div>
                    </div>
                    <img src="${element.thumbnail["path"]+ "." +element.thumbnail["extension"]}" alt="" class="scard-image">
                    <div class="scard_content">
                        <h3 class="scard_tittle">${element.name}</h3>
                        <br>
                        <br>
                        <p class="scard_description">${element.description}</p>
                        <br>
                        <p class="comics">Comics: ${element.comics.available}</p>
                        <p class="series">Series: ${element.series.available}</p>
                    </div>
                </div>
                <div></div>
            </div>
            `
        });
    }
    renderfav();
}
function renderfav(){
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        let size = key.length;
        let value1 = localStorage.getItem(key);
        if(size > 10){
            let value = localStorage.getItem(key);
            let obj = JSON.parse(value);
            if(obj.fav == false){
                if(document.getElementById(`${key}`) == null){
                    continue;
                }
                document.getElementById(`${key}`).childNodes[1].style.backgroundColor = 'white';
                document.getElementById(`${key}`).childNodes[3].style.backgroundColor = 'white';
                document.getElementById(`${key}`).childNodes[3].style.filter = 'drop-shadow(2px 4px 6px white)';
            }
            else{
                if(document.getElementById(`${key}`) == null){
                    continue;
                }
                document.getElementById(`${key}`).childNodes[1].style.backgroundColor = 'red';
                document.getElementById(`${key}`).childNodes[3].style.backgroundColor = 'red';
                document.getElementById(`${key}`).childNodes[3].style.filter = 'drop-shadow(2px 4px 6px red)';
            }
        }
    }
}
display();
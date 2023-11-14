// console.log(CryptoJS.MD5("1698388388428688ab9070cc9a308774b66fc28cddc51b30683f04b4f86b93e69867f933d5c259d215844").toString());
let hashval = '17ec305661f035b372801cb260d3fef0';
let publicKey = '4b4f86b93e69867f933d5c259d215844';
let timestamp = 1698500468641;
let all = [];

let cont = document.getElementById('card-container');
let search = document.getElementById('search_id');
let S_button = document.getElementById('Magic');
let s_helper = document.getElementById("search_help");

// this is for active pages 
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active');
    }
})

let left = document.getElementById('left');
let right = document.getElementById('right');
let move = 0;
right.addEventListener('click', (event)=>{
    let length = localStorage.length;
    console.log(length);
    move = move-23;
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        if(key.length == 7){
            // console.log(key);
            let element = document.getElementById(`${key}`);
            element.style.transform = "translateX(" + move + "rem)";
            element.style.transition = "all 2s";
        }
    }
})
left.addEventListener('click', ()=>{
    let length = localStorage.length;
    console.log(length);
    move = move+23;
    if(move > 1){
        move = 0;
    }
    else{
        for(let i=0; i<localStorage.length; i++){
            let key = localStorage.key(i);
            if(key.length == 7){
                // console.log(key);
                let element = document.getElementById(`${key}`);
                element.style.transform = "translateX(" + move + "rem)";
                element.style.transition = "all 2s";
            }
        }
    }
})

S_button.addEventListener('click', async (event)=>{
    let input = search.value;
    console.log('button is clicked')
    if(input == ""){
        alert("input cannot be empty");
    }
    else{
        cont.innerHTML = "";
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashval}&name=${input}`;
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.data["results"].forEach((element) => {
            let check = {
                Name: element.name,
            }
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
                    </div>
                </div>
                <div></div>
            </div>
            `
            localStorage.setItem(`${element.id}`, JSON.stringify(check));
            all.push(`${element.id}`);
        });
    }
    renderfav();
})
document.addEventListener('keypress' , async (event)=>{
    if(event.key == 'Enter'){
        let input = search.value;
        if(input == ""){
            alert("input cannot be empty");
        }
        else{
            cont.innerHTML = "";
            const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashval}&name=${input}`;
            const response = await fetch(url);
            const jsonData = await response.json();
            jsonData.data["results"].forEach((element) => {
                let check = {
                    Name: element.name,
                }
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
                        </div>
                    </div>
                    <div></div>
                </div>
                `
                localStorage.setItem(`${element.id}`, JSON.stringify(check));
                all.push(`${element.id}`);
            });
        }
        renderfav();
    }
})
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
document.addEventListener('click', (event)=>{
    s_helper.style.display = "none";
})
s_helper.addEventListener('click', (event)=>{
    let input = event.target.id;
    if(input[6] != '_'){
        search.value = input;
    }
})

async function display(){
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashval}&limit=100`;
    const response = await fetch(url);
    const jsonData = await response.json();
    // console.log(jsonData.data["results"]);

    jsonData.data["results"].forEach((element)=>{
        // <img src="../image/love.png" alt="" id="love"></img>
        let check = {
            Name: element.name,
        }
        cont.innerHTML +=`
        <div class="card-holder">
        <div id="${element.id}" class="card">
        <div id="${element.id}-heart" class="heart">
            <div class="hleft"></div>
            <div class="hright"></div>
        </div>
        <img src="${element.thumbnail["path"]+ "." +element.thumbnail["extension"]}" alt="" class="card-image">
        <div class="card_content">
            <h3 class="card_tittle">${element.name}</h3>
            <br>
            <br>
            <p class="card_description">${element.description}</p>
        </div>
        </div>
        </div>
        `
        localStorage.setItem(`${element.id}`, JSON.stringify(check));
        all.push(`${element.id}`);
    })
    renderfav();
}

let check1 = {
    fav : false,
}
let container = document.getElementById('card-container');
container.addEventListener('click', (event)=>{
    let ans = false;
    let index;
    for(let j=0; j<=localStorage.length; j++){
        let key = localStorage.key(j);
        if(key == event.target.id){
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


function renderfav(){
    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i);
        let size = key.length;
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
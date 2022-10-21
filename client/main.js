// Grab element by ID
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const figureContainer = document.querySelector("#figuresContainer")
const form = document.querySelector("form")

// Base URL
const baseURL = 'http://localhost:4000/api/motivator'

// Inline function that takes motivators db and calls displayMotivators with motivators db as argument
const motivatorsCallback = ({ data: motivators }) => displayMotivators(motivators)

// Error callback
const errCallback = err => console.log(err)

// Functionality stored to variables. To be called by submitHandler and createMotivatorCard
const getAllMotivators = () => axios.get(baseURL).then(motivatorsCallback).catch(errCallback)
const createMotivator = body => axios.post(baseURL, body).then(motivatorsCallback).catch(errCallback)
const deleteMotivator = id => axios.delete(`${baseURL}/${id}`).then(motivatorsCallback).catch(errCallback)
const updateMotivator = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(motivatorsCallback).catch(errCallback)


// Functions that send request to backend
const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
    .then((response) => {
        const data = response.data
        alert(data)
    })
};
function submitHandler(event){
    event.preventDefault()

    let name = document.querySelector('#name')
    let netWorth = document.querySelector('#networth')
    let image = document.querySelector('#image')

    let bodyObj = {
        name: name.value,
        netWorth: netWorth.value,
        image: image.value
    }

    createMotivator(bodyObj)

    name.value = ''
    netWorth.value = ''
    image.value = ''
};
// Takes in motivators db (when displayMotivators function is called) and creates a card for each motivator
function createMotivatorCard(motivators) {
    const motivatorCard = document.createElement('div')
    motivatorCard.classList.add('motivator-card')

    motivatorCard.innerHTML = 
    `<img alt="Motivator" src=${motivators.image} class="motivator-cover-image"/>

    <p class="name">${motivators.name}</p>
    <p class="title">Networth:</p>

    <div class="btns-container">
        <button class="add" onclick="updateMotivator(${motivators.id}, 'minus')">-</button>
        <p class="motivator-networth">$${motivators.netWorth}</p>
        <button class="add" onclick="updateMotivator(${motivators.id}, 'plus')">+</button>
    </div>

    <button class="motiveBtn" onclick="deleteMotivator(${motivators.id})">Delete</button>`

    figuresContainer.appendChild(motivatorCard)
};

// Is run when motivatorsCallback is called
function displayMotivators(arr) {
    figuresContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMotivatorCard(arr[i])
    }
}


// Listens for frontend event
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitHandler)

// Runs getAllMotivators to add all available cards to DOM
getAllMotivators()
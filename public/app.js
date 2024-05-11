let btn = document.getElementById("addbtn")   //add comment btn
let clrbtn = document.getElementById("clear")  //clr btn

let data;  // this is for storing actual data == object

let arr = ["Anonymous",  ///array of different names
"Secret or Secretive",
"Ghost",
"Incognito",
"Nameless",
"Unknown",
"Discrete",
"Unnamed",
"Mysterious ",
"Invisible",
"Hidden",
"Disguised",
"Covet",
"Masked",
"Faceless",
"Whistleblower",
"Silent",
"Anon"
]

///array of colours for printing
let i = 0
let colorArr = ["primary", "secondary", "success", "danger", "warning", "info", "light"] 

//this function is used to generate a card out of user information
const generateComment = async() => {
    let aname = arr[Math.floor(Math.random() * arr.length)]
    //date
    var d = new Date()
    var month;
    if (d.getMonth) {
        month = d.getMonth() + 1
    }
    let date = d.getDate() + "/" + month + "/" + d.getFullYear()
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    
        let ccolor = colorArr[Math.floor(Math.random() * colorArr.length)]
        
        let content = document.getElementById("textarea").value
        
        document.querySelector(".post").insertAdjacentHTML("afterbegin",
        `<div class="card1">
        <div class="card bg-${ccolor}" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${aname}</h5>
        <h7 class="card-subtitle mb-2 text-body-secondary">${date}</h7><br>
        <h7 class="card-subtitle mb-2 text-body-secondary">${time}</h7>
        <h5 class="card-text">${content}</h5>
        </div>
        </div>
        </div>`
)

//clearing the input fields
document.getElementById("textarea").value = ""

//fetching ==>POST
await fetch('http://localhost:3000/data',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify( data = {
        color:ccolor,
        name:aname,
        date:date,
        time:time,
        content:content
    })
})
}

//clicking add comment button
btn.addEventListener("click", (e) => {
    e.preventDefault()
    generateComment()
})

//this is for enter btn
document.getElementById("textarea").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault()
        generateComment()
    }
})


//this is for clr btn
clrbtn.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("textarea").value = ""
})

const test = async () =>{
    let res = await fetch('http://localhost:3000/data')
    let data = await res.json()
    for(let i = 0; i<data.length; i++){
            document.querySelector(".post").insertAdjacentHTML("afterbegin",
            `<div class="card1">
            <div class="card bg-${data[i].color}" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <h7 class="card-subtitle mb-2 text-body-secondary">${data[i].date}</h7><br>
            <h7 class="card-subtitle mb-2 text-body-secondary">${data[i].time}</h7>
            <h5 class="card-text">${data[i].content}</h5>
            </div>
            </div>
            </div>` 
        )
    }
}

test()
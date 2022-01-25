//Variables to fetch the data when the window loads
let start = 0;
let end = 20;

//function which returns url after appending the start and end
function getUrl()
{
    const url = `https://infinitescrolldb.herokuapp.com/posts?_start=`+start+`&_end=`+end;

    //incrementin start and end for the next fetch API call
    start += 20;
    end += 20;

    return url;
}



//function to fetch data from api
async function fetchData() {

    //Empty object to store retrived data
    let data = {};

    // Storing response
    const response = await fetch(getUrl());
    
    // Storing data in form of JSON because fetch return data in form of html elements
    data = await response.json();
  
    //Passing data to loadData() function to load data on web-page
   
    loadData(data);
  
}


//incoking fetchData() function by passing api url as argument
fetchData();

//function to create dynamic elemnts, to display data
function loadData(data){

    //varible to track the count of articles to display
    let i=0;
    
    while(i<30)
    {
        //constant to append dyanmically created elements
        const container = document.querySelector(".container");
        const quoteBody = document.createElement("div");

        const quoteAuthor = document.createElement("h3");
        quoteAuthor.innerHTML = " Id = "+ data[i].id + " " + data[i].name;
        
        const quoteText = document.createElement("p");
        quoteText.innerHTML =   data[i].body;
        
        const breakLine = document.createElement("hr");

        container.appendChild(quoteBody).appendChild(quoteAuthor).appendChild(quoteText).appendChild(breakLine);
        i++;
    }   
    
}


//scroll-eventlisner to perform infinite scroll on web-page
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        fetchData();
    }
})

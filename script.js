const searchForm=document.querySelector('form');
const searchResultDiv=document.querySelector('.search-result');
const container =document.querySelector('.container');
let searchQery='';


const APP_ID='ae5cf971';
const APP_KEY='e0a6ffe7af4828bdf44d9124d8a5739b';



searchForm.addEventListener('submit',(event)=>
{

event.preventDefault();
searchQery=event.target.querySelector('input').value;
fetchAPI();
});

async function fetchAPI()
{

const baseURL=`https://api.edamam.com/search?q=${searchQery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
const response=await fetch(baseURL);
const data = await response.json();
console.log(data);
generateHTML(data.hits);
}

function generateHTML(results)

{
container.classList.remove('initial');
let generatedHTML='';
results.map
(result=>

{

generatedHTML +=

              `<div class="item">
         	
                 <img src="${result.recipe.image}" alt="image not found">
             
              <div class="flex-container">
              	<h1 class="title">${result.recipe.label}</h1>
              	
              	<a href="${result.recipe.url}" class="view-button" target="_blank">View Recipie</a>
              </div>
              <p class="item-data">Dish type: ${result.recipe.dishType}</p>
              <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)} </p>
              <p class="item-data">Diet Label: ${result.recipe.dietLabels.length> 0 ? result.recipe.dietLabels : 'No Data Found' }</p>
             
             </div> `
            
});

searchResultDiv.innerHTML=generatedHTML;

}




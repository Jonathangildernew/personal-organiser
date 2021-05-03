$(document).ready(function () {
  $('.modal').modal();
});

const addItems = document.querySelector(".modal-content");
const itemsList = document.querySelector(".tiles");
const items = JSON.parse(localStorage.getItem("items")) || [];



function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
}

function populateList(tiles = [], tilesList) {
  tilesList.innerHTML = tiles
    .map((tile, i) => {
      return `
             <li>
               <input type='checkbox' data-index=${i} id='item${i}' ${
        tile.done ? "checked" : ""
      }/>
               <h5  for='item${i}'>${tile.text} </h5>
                
               <a style="left:90vw; bottom:5vh;"; class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons" id='delete' onclick="deleteItem(this,${i})">X</i></a>
             </li>  
             `;
    })
    .join("");
}
  

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteItem(item, index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  item.parentNode.remove();
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

populateList(items, itemsList);

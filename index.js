import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL: "https://realtime-database-248d5-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addButtonEl = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      // let currentItemID = currentItem[0];
      // let currentItemValue = currentItem[1];
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No Element added yet..";
  }
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  if (inputValue === "") {
    return;
  }
  push(shoppingListInDB, inputValue);
  clearInputFieldEl();
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}

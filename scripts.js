function getAndUpdate() {
    console.log("Updating List...");
    let tit = document.getElementById("title").value;
    let desc = document.getElementById("description").value;
    let itemJsonArray;
    
    if (localStorage.getItem("itemsJson") == null) {
      itemJsonArray = [];
    } else {
      itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
    }
  
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  }
  
  function update() {
    let itemJsonArray = localStorage.getItem("itemsJson") ? JSON.parse(localStorage.getItem("itemsJson")) : [];
    
    let tableBody = document.getElementById("tableBody");
    let str = "";
  
    itemJsonArray.forEach((element, index) => {
      str += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element[0]}</td>
          <td>${element[1]}</td>
          <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
        </tr>`;
    });
    tableBody.innerHTML = str;
  }
  
  document.getElementById("add").addEventListener("click", getAndUpdate);
  update();
  
  function deleted(itemIndex) {
    let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  }
  
  function clearStorage() {
    if (confirm("Do you really want to clear?")) {
      localStorage.clear();
      update();
    }
  }
  
  function searchbar() {
    let filter = document.querySelector("#search1 input[type='search']").value.toUpperCase();
    let table = document.getElementById("tableBody");
    let tr = table.getElementsByTagName("tr");
  
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        let textValue = td.textContent || td.innerText;
        tr[i].style.display = textValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
      }
    }
  }
  function getAndUpdate() {
    console.log("Updating List...");
    let tit = document.getElementById("title").value;
    let desc = document.getElementById("description").value;
  
    if (!tit || !desc) {
      alert("Please fill out both Title and Description fields.");
      return;
    }
  
    let itemJsonArray = localStorage.getItem("itemsJson") ? JSON.parse(localStorage.getItem("itemsJson")) : [];
    
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  
    // Clear the input fields after adding the item
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  }
    
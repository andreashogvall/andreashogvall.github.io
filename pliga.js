 const tableContent = document.getElementById("table-content")
 const tableButtons = document.querySelectorAll("th button");
 
 const fetchSpelare = () => {
  return fetch("/spelare.json", {
      method: "GET",
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
  });
};

const response = fetchSpelare();

 const createRow = (obj) => {
    const row = document.createElement("tr");
    let bg = "bg-gray-300"
    if(obj['num'] % 2 == 0)
      bg = "bg-white"
    row.setAttribute("class", "px-2 py-2 " + bg)
    const objKeys = Object.keys(obj);
    console.log(objKeys)
    objKeys.map((key) => {
      const cell = document.createElement("td");
      cell.setAttribute("data-attr", key);
      cell.innerHTML = obj[key];
      row.appendChild(cell);
    });
    return row;
  };
 
 const getTableContent = (data) => {
  let num = 0
   data.map((obj) => {
     const obj2 = {"num": ++num, ...obj}
     const row = createRow(obj2);
     tableContent.appendChild(row);
   });
 };
 
 const sortData = (data, param, direction = "asc") => {
   tableContent.innerHTML = '';
   const sortedData =
     direction == "asc"
       ? [...data].sort(function (a, b) {
           if (a[param] < b[param]) {
             return -1;
           }
           if (a[param] > b[param]) {
             return 1;
           }
           return 0;
         })
       : [...data].sort(function (a, b) {
           if (b[param] < a[param]) {
             return -1;
           }
           if (b[param] > a[param]) {
             return 1;
           }
           return 0;
         });
 
   getTableContent(sortedData);
 };
 
 const resetButtons = (event) => {
   [...tableButtons].map((button) => {
     if (button !== event.target) {
       button.removeAttribute("data-dir");
     }
   });
 };
 
 window.addEventListener("load", () => {
   response.then(res => sortData(res.playdata, "total", "desc"));
 
   [...tableButtons].map((button) => {
     button.addEventListener("click", (e) => {
       resetButtons(e);
       if (e.target.getAttribute("data-dir") == "desc") {
         sortData(response.playdata, e.target.id, "desc");
         e.target.setAttribute("data-dir", "asc");
       } else {
         sortData(response.playdata, e.target.id, "asc");
         e.target.setAttribute("data-dir", "desc");
       }
     });
   });
 });
 
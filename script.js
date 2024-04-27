// definition of variables
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'create'
let updats;
// get total 
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value)
        total.innerHTML = result;
        total.style.background = "green";
    }
    else {
        total.innerHTML = " ";
        total.style.background = "#ce0202"
    }
}

// create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != "" && price.value != "" && category.value != "" && newPro.count <= 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                //  create count prodects 
                for (let x = 0; x < newPro.count; x++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[updats] = newPro;
            mood = 'create'
            submit.innerHTML = 'create'
            count.style.display = 'block'
        }
        clearData()
    } else {
        alert("To create a product, it is not allowed to leave the title, price, or category empty, and the maximum number of products is 100")
    }
    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))
    showData()
}

// clear inputs 
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

// read
function showData() {

    let table = " ";
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"> Update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete"> Delele</button></td>
            </tr> `
    }
    document.getElementById('tbody').innerHTML = table
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> Delele All (${dataPro.length} prodcts)</button>
        `
    } else {
        btnDelete.innerHTML = ""
    }
    getTotal()
}
showData()

// delete item 
function deleteItem(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
// delete all products
function deleteAll() {
    if (confirm("Do you want to delete all data?")) {
        localStorage.clear()
        dataPro.splice(0)
        showData()
    }
}

// update
function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    getTotal()
    count.style.display = "none"
    submit.innerHTML = "Update"
    mood = 'update'
    updats = i
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
// search
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchTitle') {
        searchMood = 'title'

    } else {
        searchMood = 'category'

    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus()
    search.value = ''
    showData()

}
function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"> Update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete"> Delele</button></td>
            </tr> `
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"> Update</button></td>
                <td><button onclick="deleteItem(${i})" id="delete"> Delele</button></td>
            </tr> `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table
}
// end project CRUD




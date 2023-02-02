const sendAuthBtn = document.getElementById('send-auth-btn')
const sendRegisterBtn = document.getElementById('send-register-btn')
const deleteBtn = document.getElementById('delete')

const emailLogin = document.getElementById('email-login')
const passwordLogin = document.getElementById('password-login')

const emailRegister = document.getElementById('email-register')
const passwordRegister = document.getElementById('password-register')

const dataName = document.getElementById('data-name')
const dataServer = document.getElementById('data-server')
const dataLane = document.getElementById('data-lane')
const dataPhone = document.getElementById('data-phone')
let tokenGlobal

//Post
const nome = document.getElementById("name")
const server = document.getElementById("server")
const lane = document.getElementById("lane")
const phone = document.getElementById("phone")
const submit = document.getElementById("submit")

sendRegisterBtn.addEventListener('click', async () => {
    const payload = {
        email: emailRegister.value,
        password: passwordRegister.value
    }
    const mwResponse = (await axios.post('http://130.211.90.160:3000/api/v1/auth/register', payload)).data
    console.log(mwResponse)
})




sendAuthBtn.addEventListener('click', async () => {
    const payload = {
        email: emailLogin.value,
        password: passwordLogin.value
    }
    const mwResponse = (await axios.post('http://130.211.90.160:3000/api/v1/auth/authenticate', payload)).data
    console.log(mwResponse)
    tokenGlobal = mwResponse.token
})

//POST
submit.addEventListener("click", async () => {
    const payload = {
        name: nome.value,
        server: server.value,
        lane: lane.value,
        phone: phone.value
    }
    const config = {
        headers: { Authorization: `Bearer ${tokenGlobal}` }
    }
    const response = await axios.post("http://130.211.90.160:3000/api/v1/entries", payload, config)
    console.log(response.data)
    clearFields()
})


//READ
const get = document.getElementById("get-button")
get.addEventListener("click", async () => {
    clearTable()
    getData()
});


//DELETE
const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action] = event.target.id.split('-')
        const eddel = event.target.id.split('-')
        if (action == 'delete') {
            const config = {
                headers: { Authorization: `Bearer ${tokenGlobal}` }
            }
            axios.delete(`http://130.211.90.160:3000/api/v1/entries/${eddel[1]}`, config)
            getData()
            clearTable()
            getData()
        } else {
            console.log(eddel)
        }
    }
}
// editClient(eddel[1])



const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

function createTable(data) {
    let table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Server</th>
        <th>Lane</th>
        <th>Phone</th>
        <th>Ações</th>
      </tr>
      ${data.map((row) => `
        <tr>
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.server}</td>
          <td>${row.lane}</td>
          <td>${row.phone}</td>
          <td>
            <button type="button" id="edit-${row.id}">Edit</button>
            <button type="button" id="delete-${row.id}">Delete</button>
          </td>
        </tr>
      `).join('')}
    `;

    document.body.appendChild(table);

    document.querySelector('table')
        .addEventListener('click', editDelete)
}


const getData = async () => {
    const config = {
        headers: { Authorization: `Bearer ${tokenGlobal}` }
    }
    const response = await axios.get("http://130.211.90.160:3000/api/v1/entries", config)
    console.log(response.data)
    clearTable()
    createTable(response.data);
}

function clearTable() {
    let table = document.querySelector('table');
    if (table) {
        table.remove();
    }
}
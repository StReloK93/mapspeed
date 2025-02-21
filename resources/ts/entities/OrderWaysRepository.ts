import axios from "axios"
const baseUrl = 'api/orderway'

async function index() {
   return await axios.get(baseUrl)
}

async function show(id) {
   return await axios.get(`${baseUrl}/${id}`)
}

async function store(formData) {
   return axios.post(baseUrl, formData)
}

async function update(id, formData) {
   return axios.put(`${baseUrl}/${id}`, formData)
}

async function updateName(orderWay) {
   return axios.post(`${baseUrl}/${orderWay.id}/update-name`, orderWay)
}

async function destroy(id) {
   return axios.delete(`${baseUrl}/${id}`)
}


export default { index, store, update, destroy, updateName, show }
import axios from "axios"
const baseUrl = 'api/greyder-jobs'

async function analyze(formdata) {
   const { data } = await axios.post(`${baseUrl}/analyze`, formdata)
   return data
}


export default { analyze }
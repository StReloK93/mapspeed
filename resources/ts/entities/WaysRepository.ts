import axios from "axios"


async function getWaysSpeed(formdata) {
   const { data } = await axios.post('api/get_way_speed', formdata)
   return data
}


export default { getWaysSpeed }
import axios from 'axios'

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL || ''}/api` })

export const recommendColleges = (data) => api.post('/colleges/recommend', data)
export const getAllColleges = () => api.get('/colleges/all')
export const estimateCost = (data) => api.post('/cost/estimate', data)
export const estimateHealthcare = (data) => api.post('/healthcare/estimate', data)
export const calculateLoan = (data) => api.post('/loan/calculate', data)
export const sendChat = (data) => api.post('/chat', data)

export default api



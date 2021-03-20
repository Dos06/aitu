import axios from 'axios'

const URL = 'http://23.111.206.237:8080/'

class DbService {
    async register(email, password, name) {
        return axios.post(`${URL}/register`, {email, password, name})
    }

    async login(username, password) {
        return axios.post(`${URL}signin?username=${username}&password=${password}`, {}).then(response => {
            let token = response.data
            if (token) {
                localStorage.setItem('token', JSON.stringify(token))
                this.getCurrentUser()
            }
            return response.data
        })
    }

    async logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
    }

    getCurrentToken() {
        return JSON.parse(localStorage.getItem('token'))['accessToken']
    }

    getCurrentUser() {
        let token = this.getCurrentToken()
        return axios.get(`${URL}current_user/${token}`, {
            headers: {
                'Authentication': `Bearer ${token}`,
            },
        }).then(response => {
            let data = response.data
            localStorage.setItem('profile', JSON.stringify(data))
            return data
        })
    }

    async sendMessage(message) {
        let token = this.getCurrentToken()
        return axios.post(`${URL}`)
    }

    getChatData() {

    }
}

export default new DbService()

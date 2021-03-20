import axios from 'axios'

const URL = 'http://23.111.206.237:8080/'
const configHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': 256,
    }
}

class DbService {

    async register({username, password}) {
        return axios.post(
            `${URL}register`,
            {username, password},
            configHeaders
        )
    }

    async login({username, password}) {
        return axios.post(
            `${URL}signin?username=${username}&password=${password}`,
            {},
            configHeaders
        ).then(response => {
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

    // saveCurrentUser(data) {
    //     localStorage.setItem('profile', JSON.stringify(data))
    // }

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

    async sendMessage({message, senderId, recipientId}) {
        return await axios.post(`${URL}chats/chat/${senderId}/${recipientId}/${message}`)
    }

    async getChatsByToken() {
        let token = this.getCurrentToken()
        return await axios.get(`${URL}chats/${token}`)
    }

    async getChatById(id) {
        return await axios.get(`${URL}chats/chat/${id}`)
    }

    // async get
}

export default new DbService()

// stores/counter.js
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
	state: () => {
		// Check LS for token
		let token = localStorage.getItem('token');

		return {
			token: token || "NULL",
		}
	},

	actions: {
		setToken(token) {
			localStorage.setItem('token', token);
			this.token = token
		}
	},
})

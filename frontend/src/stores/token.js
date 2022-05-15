import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
	state: () => {
		// Check LS for token
		let token = localStorage.getItem('token');

		return {
			token: token || "",
		}
	},

	actions: {
		setToken(token) {
			localStorage.setItem('token', token);
			this.token = token
		},
		clearToken() {
			localStorage.removeItem('token');
			this.token = null;
		}
	}
})

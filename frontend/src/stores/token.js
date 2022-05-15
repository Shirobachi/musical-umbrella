import { defineStore } from 'pinia'
import axios from "axios";

export const useTokenStore = defineStore('token', {
	state: () => {
		// Check LS for token
		let token = localStorage.getItem('token');

		return {
			token: {
				token: token || "",
				isAdmin: false
			},
		}
	},

	actions: {
		setToken(token) {
			localStorage.setItem('token', token.token);
			localStorage.setItem('isAdmin', token.isAdmin);

			this.token = token
		},
		clearToken() {
			localStorage.removeItem('token');
			localStorage.setItem('isAdmin', false);

			this.token = "";
		}
	}
})

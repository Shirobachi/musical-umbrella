<script setup>

	import { computed, ref } from 'vue';
  import { useToast } from "vue-toastification";
  import axios from "axios";
	import { useTokenStore } from '../stores/token'

	const token = useTokenStore()
	const Toast = useToast();
	const base_URI = import.meta.env.VITE_BASE_BACKEND_ENDPOINT;

	const user = ref({
		name: 'dasadsads',
		password: '2WxU0Gkx2q8VbcTPuNrJHonPuQn9yGLmIdvaMKfNuwD3ZwX3',
	})

	const submit = () => {
		if (user.value.password == "" || user.value.name == "") {
			return Toast.error('Please fill in all the fields');
		}

		axios({
			method: 'GET',
			url: `${base_URI}/auth`,
			headers: {
				Authorization: `Basic ${btoa(user.value.name + ":" + user.value.password)}`
			} 
		}).then((r) => {
			Toast.success('Successfully logged in!');	
			token.setToken(r.data.token);
		}).catch((e) => {
			if (e.response.data)
				Toast.error( e.response.data.message || "We struggling with goblins on out server 👺" );
			else
				Toast.error( "We struggling with goblins on out server 👺" );
		});

	}
</script>

<template>
	<div class="mx-auto max-w-xs">
		<form class="border-2 border-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">

			<!-- INPUT: name -->
			<div class="mb-4">
				<div class="flex flex-col space-y-2 items-center justify-center">
					<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="name or e-mail"
						v-model="user.name">
					<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="Password"
						v-model="user.password">
				</div>
			</div>

			<!-- SUBMIT -->
			<div class="flex items-center justify-center">
				<button @click="submit" class="bg-blue-500 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
					Sign In
				</button>
			</div>
		</form>

	{{token.token}}
	</div>


</template>
<script setup>

	import { computed, ref } from 'vue';
  import { useToast } from "vue-toastification";
  import axios from "axios";
	import router from '../router'

	const Toast = useToast();
	const VITE_BASE_BACKEND_ENDPOINT = import.meta.env.VITE_BASE_BACKEND_ENDPOINT;
	const VITE_DEV = import.meta.env.VITE_DEV;

	const user = ref({
		name: VITE_DEV ? 'Tester' : '',
		email: VITE_DEV ? 'test@example.com' : '',
		password: VITE_DEV ? '2WxU0Gkx2q8VbcTPuNrJHonPuQn9yGLmIdvaMKfNuwD3ZwX3' : '',
		passwordConfirmation: VITE_DEV ? '2WxU0Gkx2q8VbcTPuNrJHonPuQn9yGLmIdvaMKfNuwD3ZwX3' : '',
	})

	const submit = () => {
		if(user.value.password !== user.value.passwordConfirmation) {
			return Toast.error('Passwords do not match');
		}

		console.log(`${VITE_BASE_BACKEND_ENDPOINT}/auth`)

		axios({
			method: 'POST',
			url: `${VITE_BASE_BACKEND_ENDPOINT}/auth`,
			data: user.value,
		}).then(() => {
			Toast.success('Successfully signed up, you can now log in!');
			// redirect to login
			router.push('/sign-in');
		}).catch((e) => {
			if (e.response.data)
				Toast.error( e.response.data.message || VITE_DEV ? '🚩 We have problem with response!' : "We struggling with goblins on out server 👺" );
			else
				Toast.error( (VITE_DEV) ? "🔨 Did you start backend server?" : "We struggling with goblins on out server 👺" );
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
						placeholder="name"
						v-model="user.name">
					<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="E-mail"
						v-model="user.email">
					<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="Password"
						v-model="user.password">
					<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
						type="password"
						placeholder="Repeat password"
						v-model="user.passwordConfirmation">
				</div>
			</div>

			<!-- SUBMIT -->
			<div class="flex items-center justify-center">
				<button @click="submit" class="bg-blue-500 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
					Sign up
				</button>
			</div>
		</form>
	</div>


</template>
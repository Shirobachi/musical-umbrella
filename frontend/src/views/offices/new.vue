<script setup>
  import { useToast } from "vue-toastification";
  import axios from "axios";
	import router from '../../router'
	import { useTokenStore } from '../../stores/token'

	const VITE_BASE_BACKEND_ENDPOINT = import.meta.env.VITE_BASE_BACKEND_ENDPOINT;
	const VITE_DEV = import.meta.env.VITE_DEV || false;
	const token = useTokenStore()
	const Toast = useToast();

	const props = defineProps({
		office: {
			type: Object,
			default: () => ({
				name: '',
				price: '',
				location: '',
				floor: '',
				size: '',
				maxPeople: '',
				phone: '',
				email: '',
			})
		},
	});

	const add = () => {
		// print in console office as string
		console.log(JSON.stringify(props.office));

		axios({
			method: 'post',
			url: `${VITE_BASE_BACKEND_ENDPOINT}/offices/`,
			headers: {
				'Authorization': `Bearer ${token.token.token}`
			},
			data: props.office
		}).then(r => {
			Toast.info("Office added!");
			router.push('/offices/1');
		}).catch(e => {
			console.log(e);
			Toast.error(VITE_DEV ? 'Error: ' + e.message : 'Something went wrong!');
		});
	}

</script>

<template>
	<div class="container ">
		<div class="flex flex-col space-y-2 items-center">
			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="Name of office"
				v-model="props.office.name">

			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="number" step=".01" min=".01" max="1000"
				placeholder="Price per hour (in $)"
				v-model="props.office.price">

			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="Location (will be used in google maps)"
				v-model="props.office.location">

			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="number" min="0" max="200" 
				placeholder="Floor (0 if ground)"
				v-model="props.office.floor">

			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="Name of office"
				v-model="props.office.size">

			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="number" min="0" max="100"
				placeholder="Max people (how many desks?)"
				v-model="props.office.maxPeople">

			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="phone"
				placeholder="Phone nu."
				v-model="props.office.phone">

			<input class="w-11/12 focus:w-full bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="email"
				placeholder="E-mail address"
				v-model="props.office.email">

			<!-- SUBMIT BUTTON -->
			<button @click="add"
				class="hover:cursor-pointer py-2 my-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
				Add new office
			</button>
		</div>	

	</div>
</template>
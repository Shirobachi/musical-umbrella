<script setup>
  import { useToast } from "vue-toastification";
  import axios from "axios";
	import router from '../../router'
	import { useTokenStore } from '../../stores/token'
	import { useRoute } from 'vue-router';
	import { ref } from 'vue';
	import Loading from '../../components/loading.vue';

	const route = useRoute();
	const VITE_BASE_BACKEND_ENDPOINT = import.meta.env.VITE_BASE_BACKEND_ENDPOINT;
	const VITE_DEV = import.meta.env.VITE_DEV || false;
	const token = useTokenStore()
	const Toast = useToast();

	const add = () => {
		// print in console office as string
		console.log(JSON.stringify(office));

		if (isEdit){
      console.log("🚀 ~ file: form.vue ~ line 21 ~ add ~ office", office.value)
			var tempOffice = office;
      console.log("🚀 ~ file: form.vue ~ line 21 ~ add ~ office", office.value)
			delete tempOffice._id;
      console.log("🚀 ~ file: form.vue ~ line 21 ~ add ~ office", office.value)
			
			console.log("🚀 ~ file: form.vue ~ line 31 ~ add ~ tempOffice", tempOffice.value)
			axios({
				method: "PUT",
				url: `${VITE_BASE_BACKEND_ENDPOINT}/offices/${office.value['_id']}`,
				data: tempOffice.value,
				headers: {
					Authorization: `Bearer ${token.token.token}`
				}
			}).then((r) => {
        console.log("🚀 ~ file: form.vue ~ line 34 ~ add ~ r", r)
				Toast.success("Office updated successfully");
				router.push('/offers/' + office.value._id);
			}).catch((e) => {
				Toast.error(e.response.data.message || "We struggling with goblins on out server 👺");
				console.error(e);
			})
		}
		else{
			axios({
				method: 'post',
				url: `${VITE_BASE_BACKEND_ENDPOINT}/offices/`,
				headers: {
					'Authorization': `Bearer ${token.token.token}`
				},
				data: office.value
			}).then(r => {
				console.log("🚀 ~ file: form.vue ~ line 50 ~ add ~ r", r.data)
				Toast.info("Office added!");
				router.push('/offers/' + r.data._id);
			}).catch(e => {
				console.log(e);
				Toast.error(VITE_DEV ? 'Error: ' + e.message : 'Something went wrong!');
			});
		}
	}

	const isEdit = route.params.id ? true : false;

	const office = ref(
		{
			name: VITE_DEV && ! isEdit ? 'Unicorn pease 🦄' : '',
			price: VITE_DEV && ! isEdit ? 10 : '', // in $
			location: VITE_DEV && ! isEdit ? 'Rotterdam 40, Coolhaven 375, 3015 GC Rotterdam, Netherlands' : '',
			floor: VITE_DEV && ! isEdit ? 5 : '',
			size: VITE_DEV && ! isEdit ? 35 : '', // in m2
			maxPeople: VITE_DEV && ! isEdit ? 7 : '',
			phone: VITE_DEV && ! isEdit ? 588818754 : '',
			email: VITE_DEV && ! isEdit ? 'test@example.com' : ''
		}
	)

	if(isEdit){
		axios({
			method: 'get',
			url: `${VITE_BASE_BACKEND_ENDPOINT}/offices/${route.params.id}`,
			headers: {
				'Authorization': `Bearer ${token.token.token}`
			}
		}).then(r => {
			office.value = r.data;
      console.log("🚀 ~ file: form.vue ~ line 58 ~ office.value", office.value)
		}).catch(e => {
			console.log(e);
			Toast.error(VITE_DEV ? 'Error: ' + e.message : 'We struggling with goblins on out server 👺');
		})
	}

</script>

<template>
	<div>
		<div v-if="isEdit && office.name || !isEdit" class="flex flex-col space-y-2 items-center">
			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="Name of office"
				v-model="office.name">

			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="number" step=".01" min=".01" max="1000"
				placeholder="Price per hour (in $)"
				v-model="office.price">

			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="Location (will be used in google maps)"
				v-model="office.location">

			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="number" min="0" max="200" 
				placeholder="Floor (0 if ground)"
				v-model="office.floor">

			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="Size (in m2)"
				v-model="office.size">

			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="number" min="0" max="100"
				placeholder="Max people (how many desks?)"
				v-model="office.maxPeople">

			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="phone"
				placeholder="Phone nu."
				v-model="office.phone">

			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="email"
				placeholder="E-mail address"
				v-model="office.email">

			<!-- SUBMIT BUTTON -->
			<button @click="add"
				class="hover:cursor-pointer py-2 my-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
				{{ isEdit ? 'Edit this office' : 'Add new office'}}
			</button>
		</div>	
		<Loading v-else/>

	</div>
</template>
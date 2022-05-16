<script setup>
	import axios from 'axios';
	import { computed, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { useToast } from "vue-toastification";
	import router from '../../router'
	import Swal from 'sweetalert2'
	import { useTokenStore } from '../../stores/token'

	const token = useTokenStore()
	const Toast = useToast();
	const route = useRoute();
	const VITE_BASE_BACKEND_ENDPOINT = import.meta.env.VITE_BASE_BACKEND_ENDPOINT;

	const settings = ref(
		{
			page: route.params.page || 1,
		}
	)
	const data = ref(
		{
			items: [ ]
		}
	)

	const search = ref(route.params.q || '')

	const fetchData = () => {
		axios({
			method: "GET",
			url: `${VITE_BASE_BACKEND_ENDPOINT}/offices`,
			params: {
				q: search.value || '',
				page: settings.value.page,
			}
		}).then((r) => {
			data.value = r.data;
		})
		.catch((e) => {
      console.log("🚀 ~ file: list.vue ~ line 40 ~ fetchData ~ e", e)
			Toast.error(e.response.data.message || "We struggling with goblins on out server 👺");
      console.log("🚀 ~ file: list.vue ~ line 42 ~ fetchData ~ e.response", e.response)
			console.error(e);
			noData.value = true;
		})
	}
	fetchData();

	const paginationLinks = computed(() => {
		const links = [];

		if(data.value.firstPageToShow > 1){
			links.push( 1 );
			links.push( "..." );
		}
		for(let i = data.value.firstPageToShow; i <= data.value.lastPageToShow; i++){
			links.push( i );
		}
		if(data.value.lastPageToShow < data.value.pages){
			links.push( "..." );
			links.push( data.value.pages );
		}

		return links;
	}) 

	const redirect = (id) => {
		router.push(`/offices/${id}/${search.value}`);
		data.value.items = [];
		data.value.page = id;
		settings.value.page = id;
		fetchData();
	}
		
	const swalWithBootstrapButtons = Swal.mixin({
		buttonsStyling: true
	})

	const noData = ref(false)
	const deleteOffice = (id) => {
		console.log(id);

		swalWithBootstrapButtons.fire({
			title: 'Are you sure you want delete it?',
			text: "This will be permanently deleted (that's pretty long 😉)",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {

				axios({
					method: "DELETE",
					url: `${VITE_BASE_BACKEND_ENDPOINT}/offices/${id}`,
					headers: {
						'Authorization': `Bearer ${token.token.token}`
					}
				}).then((r) => {
					// if status == 200
					swalWithBootstrapButtons.fire(
						'Deleted!',
						'Your file has been deleted.',
						'success'
					)
					fetchData()
				}).catch((e) => {
					swalWithBootstrapButtons.fire(
						'Something went wrong!',
						'We struggling with goblins on out server 👺',
						'error'
					)
				})
			} else if ( result.dismiss === Swal.DismissReason.cancel ) {
				swalWithBootstrapButtons.fire(
					'Cancelled',
					'The office is not deleted :)',
					'info'
				)
			}
		})
	}

	const see = (id) => {
		router.push(`/offers/${id}`);
	}

	const edit = (id) => {
		router.push(`/offices/edit/${id}`);
	}

</script>

<template>
	<div>

		<div>
			<div class="flex justify-center space-x-3">
				<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				placeholder="👀 What are you looking for?"
				v-model="search"
				@keyup.enter="redirect(1)" >

				<button @click="redirect(1)" class="bg-blue-500 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
					Search
				</button>
			</div>
		</div>

		<div class="flex flex-col w-10/12 mx-auto">
			<div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
					<div class="overflow-hidden">
						<table class="min-w-full text-center">
							<thead class="border-b bg-gray-800">
								<tr>
									<th scope="col" class="text-sm font-medium text-white px-6 py-4">
										Name
									</th>
									<th scope="col" class="text-sm font-medium text-white px-6 py-4">
										Location
									</th>
									<th scope="col" class="text-sm font-medium text-white px-6 py-4">
										Price
									</th>
									<th scope="col" class="text-sm font-medium text-white px-6 py-4">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								
								<!-- Loading if loading -->
								<tr v-if="data.items.length == 0" class="bg-white border-b">
									<td colspan="4" class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{{ noData ? 'No results!' : 'Loading data . . .'}}
									</td>
								</tr>

								<!-- Data id loaded -->
								<tr class="bg-white border-b" v-for="(office) in data.items" :key="office['_id']">
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{{ office.name }}
									</td>
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{{ office.location }}
									</td>
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										${{ office.price }}/h
									</td>
									<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										
										<div class="flex space-x-1">
											<svg @click="deleteOffice(office['_id'])" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-600 hover:underline hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>

											<svg @click="see(office._id)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-green-600 hover:underline hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>

											<svg @click="edit(office._id)" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-orange-600 hover:underline hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</div>

									</td>
								</tr>

								<!-- pagination if loaded -->
								<tr v-if="data.items.length !== 0" class="bg-white border-b">
									<td colspan="4" class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										<div class="flex justify-around">
											<div class="flex">
												<p @click="redirect(link)" :class="link == data.page ? 'bg-green-500' : ''" class="rounded-md hover:bg-green-500 hover:cursor-pointer border p-2 m-1" v-for="link in paginationLinks" :key="link">
														{{link}}
												</p> 
											</div>

											<!-- HERE CAN BE ADDED EASY INPUT WITH PER PAGE CHOOSE -->

										</div>
									</td>
									
								</tr>
							</tbody>
						</table>
						
					</div>
				</div>
			</div>
		<router-link to="/offices/new"
			class="text-center text-xl hover:text-blue-500 hover:underline hover:cursor-pointer py-2 my-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
			Add new office
		</router-link>
		</div>
		


	</div>
</template>
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
			perPage: route.params.perPage || 10,
		}
	)
	const data = ref(
		{
			items: [ ]
		}
	)
	
	const fetchData = () => {
		axios({
			method: "GET",
			url: `${VITE_BASE_BACKEND_ENDPOINT}/offices`,
			params: settings.value
		}).then((r) => {
			data.value = r.data;
		})
		.catch((e) => {
			Toast.error(e.response.data.message || "We struggling with goblins on out server 👺");
			console.error(e);
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
		router.push(`/offices/${id}`);
		data.value.items = [];
		settings.value.page = id;
		fetchData();
	}
		
	const swalWithBootstrapButtons = Swal.mixin({
		buttonsStyling: true
	})

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


</script>

<template>
	<div>
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
										Loading data..
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
										
										<svg @click="deleteOffice(office['_id'])" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-600 hover:underline hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
										</svg>

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
		

    <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>

	</div>
</template>
<script setup>
	import axios from 'axios';
	import { computed, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { useToast } from "vue-toastification";
	import router from '../../router'

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

</script>

<template>
	<div>
		{{settings}}
		<div class="flex flex-col">
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
										TBU
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
		</div>

		<br>
		<br>
		<br>
		<br>
		<p @click="data.items.push({})">tesrt</p>
		<br>
		<br>
		<hr>
		<router-link to="/offices/new"
			class="hover:cursor-pointer py-2 my-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
			Add new office
		</router-link>

		this is page: {{ $route.params.page }}
	</div>
</template>
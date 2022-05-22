<script setup>
	import axios from 'axios';
	import { computed, ref } from 'vue';
	import { useToast } from "vue-toastification";
	import { useRoute } from 'vue-router';
	import { useTokenStore } from '../stores/token'
	import router from '../router'
	import Loading from '../components/loading.vue';

	const token = useTokenStore()
	const route = useRoute();
	const Toast = useToast();
	const VITE_BASE_BACKEND_ENDPOINT = import.meta.env.VITE_BASE_BACKEND_ENDPOINT;

	const data = ref(
		{
			items: []
		}
	)
	const settings = ref(
		{
			page: route.params.page || 1,
		}
	)

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
	const search = ref(route.params.q || '');
	const noData = ref(false)

	const fetchData = () => {
		axios({
			method: "GET",
			url: `${VITE_BASE_BACKEND_ENDPOINT}/offices`,
			params: {
				q: search.value || "",
				page: settings.value.page,
			}
		}).then((r) => {
			data.value = r.data;
      console.log("🚀 ~ file: Home.vue ~ line 21 ~ fetchData ~ r.data", r.data)
		})
		.catch((e) => {
			Toast.error(e.response.data.message || "We struggling with goblins on out server 👺");
			console.error(e);
			noData.value = true;
		})
	};fetchData()

	const redirect = (id) => {
		if(id != "...") {
			router.push(`/${id}/${search.value}`);
			data.value.items = [];
			data.value.page = id;
			settings.value.page = id;
			fetchData();
		}
	}

	const redirectToOffer = (id) => {
		// check token
		if (!token.token.token)
			Toast.error("You need to login first");
		else
			router.push(`/offers/${id}`);
		
	}

</script>

<template>
	<div>
		<div class="flex justify-center space-x-3">
			<input class="w-9/12 focus:w-10/12 bg-gray-600 shadow appearance-none border rounded py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
			type="text"
			placeholder="👀 What are you looking for?"
			v-model="search">
		<button @click="redirect(1)" class="bg-blue-500 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
			Search
		</button>
	</div>

		
		<div class="flex justify-center mt-10">
				<p @click="redirect(link)" :class="link == data.page ? 'bg-green-500' : (link == '...' ? '' : 'hover:bg-green-500 hover:cursor-pointer')" class="rounded-md border p-2 m-1" v-for="link in paginationLinks" :key="link">
					{{link}}
				</p> 
		</div>


		<div v-if="data.items.length == 0" class="my-3 text-center text-2xl font-mono">
			<Loading v-if="!noData"/>
			<p v-if="noData">No results!</p>
		</div>
		<div class="flex space-x-4 flex-wrap justify-center items-center">
			<div class="max-w-md py-4 px-8 text-center bg-white shadow-lg rounded-lg my-10 p-10" v-for="item in data.items" :key="item['_id']">
				<div>
					<h2 class="text-gray-800 text-3xl font-semibold">{{item.name}}</h2>
					<div class="mt-2 text-gray-600" v-if="item.price != undefined">
						<div class="pt-4 pb-2 text-center">
							<p class="inline-block bg-blue-200 hover:bg-blue-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-4 mb-2">💰 Only ${{item.price}} per hour</p>
							<p class="inline-block bg-cyan-300 hover:bg-cyan-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-4 mb-2">🗺️ {{item.location}}</p>
							<p class="inline-block bg-purple-300 hover:bg-purple-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-4 mb-2">🏚️ {{item.floor == 0 ? 'Ground' : (item.floor + ' floor')}}</p>
							<p class="inline-block bg-orange-300 hover:bg-orange-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-4 mb-2">🧑‍🤝‍🧑 Up to {{item.maxPeople}} people</p>
						</div>
					</div>
				</div>
				<div class="flex justify-end mt-4">
					<p @click="redirectToOffer(item['_id'])" class="hover:cursor-pointer text-xl font-medium text-indigo-500" v-if="item.price != undefined">
						See more
					</p>
					<a href="#" class="text-xl font-medium text-indigo-500" v-if="item.price != undefined"></a>
				</div>
			</div>
		</div>
		
		<div class="flex justify-center mt-10">
				<p @click="redirect(link)" :class="link == data.page ? 'bg-green-500' : (link == '...' ? '' : 'hover:bg-green-500 hover:cursor-pointer')" class="rounded-md border p-2 m-1" v-for="link in paginationLinks" :key="link">
					{{link}}
				</p> 
		</div>

	</div>
</template>
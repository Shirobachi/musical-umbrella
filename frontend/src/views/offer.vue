<script setup>
	import axios from 'axios';
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { useTokenStore } from '../stores/token'

	const token = useTokenStore()
	const route = useRoute();
	const VITE_BASE_BACKEND_ENDPOINT = import.meta.env.VITE_BASE_BACKEND_ENDPOINT;

	const id = route.params._id; 
	const item = ref({})
	const fetchItem = () => {
		axios({
			method: "GET",
			url: `${VITE_BASE_BACKEND_ENDPOINT}/offices/${id}`,
			headers: {
				Authorization: `Bearer ${token.token.token}`
			}
		}).then((r) => {
			item.value = r.data;
		})
		.catch((e) => {
			console.error(e);
		})
	}
	fetchItem()

</script>

<template>
	<div>
		<div v-if="!item.name">Loading</div>
		<!-- <div v-else> -->
			<!-- https://www.embedmymap.com/ -->
			<section class="text-gray-600 body-font relative">
				<div class="absolute inset-0 bg-gray-300">
					<iframe class="w-screen h-full" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="'https://maps.google.com/maps?hl=en&amp;q=' + item.location + '&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'"></iframe>
				</div>
				<div class="px-5 py-24 mx-auto flex">
					<div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
						<h2 class="text-gray-900 text-lg mb-1 font-medium title-font">{{item.name}}</h2>
						<p class="leading-relaxed mb-1 text-gray-600"> Price: ${{item.price}} / hour </p>
						<p class="leading-relaxed mb-1 text-gray-600"> Location: {{item.location}} </p>
						<p class="leading-relaxed mb-1 text-gray-600"> Floor: {{item.floor == 0 ? 'Ground' : item.floor}} </p>
						<p class="leading-relaxed mb-1 text-gray-600"> Size: {{item.size}}m<sup>2</sup></p>
						<p class="leading-relaxed mb-1 text-gray-600"> Max people: {{item.maxPeople}}</p>
						<p class="leading-relaxed mb-1 text-gray-600"> Phone: <span class="text-blue-400 hover:cursor-pointer"> <a :href="'tel:'+item.phone">{{item.phone}}</a></span></p>
						<p class="leading-relaxed mb-1 text-gray-600"> Email: <span class="text-blue-400 hover:cursor-pointer"> <a :href="'mailto:'+item.email">{{item.email}}</a></span></p>
					</div>
				</div>
			</section>
		<!-- </div> -->
	</div>
</template>
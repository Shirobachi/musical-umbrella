<script setup>
	import { ref } from 'vue'

	// props: token
	const props = defineProps({
		menuItems: Object
	});

	const mobile = ref(false)
</script>

<template>

	<nav class="bg-dark w-screen shadow-lg px-4">
		<div class="flex-col">
			<div class="flex justify-between">
				<!-- LOGO -->
				<div>
					<a href="#" class="flex items-center py-4 px-2">
						<img src="https://dummyimage.com/300x200/000/fff&text=logo" alt="Logo" class="h-8 w-8 mr-2">
					</a>
				</div>

				<!-- MANN MENU -->
				<div class="hidden md:flex items-center space-x-1">
						<!-- for items -->
						<div v-for="(item, index) in menuItems.mainMenu" :key="index">
							<router-link :to="item.link" 
								class="py-4 px-2 text-gray-300 font-semibold hover:text-green-500 transition duration-300"
								active-class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">
								{{ item.name }}
							</router-link>
						</div>
				</div>

				<!-- RIGHT MENU -->
				<div class="hidden md:flex items-center space-x-1">
					<!-- for items -->
					<div v-for="(item, index) in menuItems.optionalManu" :key="index">
						<router-link :to="item.link" 
							class="py-2 my-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
							{{ item.name }}
						</router-link>
					</div>
				</div>

				<!-- HAMBURGER ICON -->
				<div @click="mobile = !mobile" class="md:hidden flex items-center outline-none mobile-menu-button hover:text-blue-400 hover:cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</div>
			</div> <!-- end of flex-->

			<!-- mobile menu -->
			<div v-if="mobile" class="mobile-menu">
				<ul class="">
					<!-- for main manu items -->
					<div v-for="(item, index) in menuItems.mainMenu" :key="index">
						<router-link :to="item.link" 
							class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
							active-class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">
							{{ item.name }}
						</router-link>
					</div>
					<!-- for optional items -->
					<div v-for="(item, index) in menuItems.optionalManu" :key="index">
						<router-link :to="item.link" 
							class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"
							active-class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">
							{{ item.name }}
						</router-link>
					</div>
				</ul>
			</div>
		</div> <!-- end of flex-col -->
	</nav>
</template>
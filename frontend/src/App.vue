<script setup>
	import Menu from './components/Menu.vue';
	import Footer from './components/Footer.vue';

	const menuItems = {
		mainMenu: [
			{
				name: 'Home',
				link: '/',
			},
			{
				name: 'Something',
				link: 'sadas',
			},
		], 
		optionalManu: [
			{
				name: 'login',
				link: '/',
			},
			{
				name: 'register',
				link: 'sadas',
			},
		]
	}
</script>

<template>
	<div class="container">

		<Menu :menuItems='menuItems'/>
		<router-view></router-view>
		<Footer/>

	</div>
</template>
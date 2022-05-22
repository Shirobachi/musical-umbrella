<script setup>
	const props = defineProps({
		color: ''
	})
</script>

<template>
	<div class="bouncing-loader">
		<div :class="props.color ?? 'bg-white'"></div>
		<div :class="props.color ?? 'bg-white'"></div>
		<div :class="props.color ?? 'bg-white'"></div>
	</div>
</template>

<style>
	@keyframes bouncing {
		to {
			opacity: .2;
			transform: translate3d(0, -16px, 0);
		}
	}

	.bouncing-loader {
		display: flex;
		justify-content: center;
	}

	.bouncing-loader > div {
		width: 25px;
		height: 25px;
		margin: 3rem .6rem;
		border-radius: 50%;
		animation: bouncing .5s infinite alternate;
	}

	.bouncing-loader > div:nth-child(2) {
		animation-delay: .2s;
	}

	.bouncing-loader > div:nth-child(3) {
		animation-delay: .4s;
	}


</style>
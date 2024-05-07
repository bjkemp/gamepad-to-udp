<script>
  import 'virtual:uno.css';
	import GamePad from './GamePad.svelte';
  
</script>

<svelte:head>
	<title>Gamepad to UDP</title>
	<meta name="description" content="Send Gamepad Events via UDP to an IP Address" />
</svelte:head>

<section>
	<GamePad />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>

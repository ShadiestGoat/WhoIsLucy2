<script lang="ts">
    import "../app.scss";
	import '@fontsource/roboto';
</script>

<div class="container col">
    <slot />
</div>

<style lang="scss">
    .container {
        height: 100dvh;
    }
</style>
<template>
    <RouterView></RouterView>
</template>

<script>
    import {RouterView} from 'vue-router'

    export default {
        name: 'app',
        class: 'full-height',
        components: {},
    }
</script>

<style>
#app {
    height: 100%;
}
</style>
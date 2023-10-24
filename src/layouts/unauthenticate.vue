<template>
    <div class="page-flexbox-wrappernp">
        <header-component />
        <main class="container mx-auto mb-10 sm:px-0 px-5">
            <router-view />
        </main>
        <footer-component />
    </div>
</template>

<script>
import headerComponent from "./header.vue"
import footerComponent from "./footer.vue"
export default {
    name: 'Default',
    components: {
        'header-component': headerComponent,
        'footer-component': footerComponent
    },
};
</script>
<style lang="scss" >
body {
    background: #f5f6f8;
}
</style>
<style lang="sass">
.page-flexbox-wrapper
    display: flex
    min-height: 100vh
    flex-direction: column

main
    flex: 1 1 auto
</style>

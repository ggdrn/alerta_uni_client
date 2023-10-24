<template>
   <div class="flex flex-col">
        <header-component />
            <main class="flexpage-flexbox-wrappernp">
                <side-bar-component />
                <div class="content-principal">
                    <router-view />
                </div>
        </main>    
    </div>
</template>

<script>
import headerComponent from "./headerAuth.vue"
import sideBarComponent from "./sideBar.vue"
export default {
    name: 'Default',
    components: {
        'header-component': headerComponent,
        'side-bar-component': sideBarComponent,
    },
};
</script>
<style lang="scss" >
body {
    background: #f5f6f8;
}
.content-principal {
    margin-left: 220px; /* Margem à esquerda para acomodar o menu lateral */
    padding: 20px;
    box-sizing: border-box; /* Inclui padding no tamanho total */
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

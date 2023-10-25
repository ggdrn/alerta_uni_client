<template>
    <el-header class="header-desktop">
        <div class="container mx-auto flex items-center justify-between">
            <div>
                <img :src="logo" width="128px" height="18px" />
            </div>
            <div class="user-section flex justify-start items-center">
                <div class="space">Bem Vindo, {{ userNome }}</div>
            </div>
        </div>
    </el-header>
</template>

<script>
export default {
    name: 'headerComponent',
    computed: {
        logo () {
            return 'https://portal.ufrrj.br/wp-content/themes/portalufrrj/images/logomarca_ufrrj_cor.png'
        },
        userNome() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            return user?.usuarioNome ?? '';
        }
    }
}
</script>

<style lang="scss" scoped>
.header-desktop {
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    width: 100%;
    position: fixed;
    z-index: 2;
}
.header-desktop .container {
    // height: 60px;
    // position:fixed;
    width: 100%;
    margin-bottom: 54px;
    // z-index: 99999 !important;
    background: #fff;
}
.user-section {
    font-size: 14px;
}
.user-section .space {
    margin-right: 15px;
}
.circular_image {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    overflow: hidden;
}
.circular_image img {
    width: 100%;
}
.icon {
    font-size: 16px;
}
</style>
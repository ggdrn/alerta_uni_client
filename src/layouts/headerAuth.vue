<template>
    <el-header class="header-desktop">
        <div class="container mx-auto flex items-center justify-between">
            <div>
                <img :src="logo" width="128px" height="18px" />
            </div>
            <div class="user-section flex justify-start items-center">
                <div class="space">Alerta Uni</div>
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
        }
    }
}
</script>

<style lang="scss" scoped>
.header-desktop {
    background: #fff;
}
.header-desktop .container {
    height: 54px;
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
<style>
    body {
        background: #f3f3f3;
    }
</style>
<template>
    <div>
        <v-header></v-header>
        <div class="side-menu">
            <router-view name="left"></router-view>
        </div>
        <div class="main-content">
            <router-view></router-view>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import header from 'components/header'
    import footer from 'components/footer'
    import {mapGetters, mapActions} from 'vuex'
    export default{
        name: "main",
        components: {
            'v-header': header,
            'v-footer': footer
        },
        computed:mapGetters({
            authTimeOut:'authTimeOut',
            username:'username'
        }),
        watch:{
            'authTimeOut':function (val,oldVal) {
                var vm = this;
                if(val)
                {
                    alert("由于长时间未操作系统，需要重新登录");
                    vm.$router.push('/login');
                }
            }
        },
        beforeCreate(){
            if(!window.localStorage.getItem('userInfo'))
            {
                this.$router.push('/login');
            }
        },
        beforeUpdate(){
            if(!window.localStorage.getItem('userInfo'))
            {
                this.$router.push('/login');
            }
        }
    }
</script>
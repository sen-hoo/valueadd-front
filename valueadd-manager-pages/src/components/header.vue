<style scoped>
    .navbar-default {
        height: 60px;
        background: url('../assets/images/login/bg.jpg');
        background-position: 0 -550px;
        background-size: 150%;
        margin-bottom: 0px;
        border: none;
    }

    .navbar-header {
        width: 200px;

    }

    .navbar-brand{
        font-size: 16px;
    }

    .navbar-brand, .navbar-brand:hover {
        height: 60px;
        padding: 20px 40px;
        color: #fff;
    }

    .navbar-default .navbar-nav > li > a,
    .navbar-default .navbar-nav > li > a:hover {
        padding: 20px 30px;
        height: 60px;
        color: #fff;
    }

    .navbar-default .navbar-nav > li > a:hover{
        background-color: rgba(255, 255, 255, 0.6);
        color: #fff;
    }

    .navbar-default .navbar-nav > .active > a,
    .navbar-default .navbar-nav > .active > a:visited
    {
        background-color: rgba(255, 255, 255, 0.21);
        color: #fff;
    }

    .navbar-default .navbar-nav > .active > a:focus,
    .navbar-default .navbar-nav > .active > a:hover,
    {
        background-color: rgba(255, 255, 255, 0.6);
        color: #fff;
    }

    .navbar-default .navbar-nav > .open > a,
    .navbar-default .navbar-nav > .open > a:focus,
    .navbar-default .navbar-nav > .open > a:hover,
    .navbar-default .navbar-nav > .open > a:visited {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.21);
    }
    .navbar-default .navbar-right  > li > a:hover{
        color: #fff;
        background-color: rgba(0, 0, 0, 0.21);
    }
    .navbar-right {
        margin-right: 20px;
    }
</style>
<template>
    <header class="navbar navbar-default">
        <div class="navbar-header">
            <a class="navbar-brand">in聚管理后台</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <router-link tag="li" to="/main/activity"><a>活动管理</a></router-link>
                <router-link tag="li" to="/main/account"><a>用户管理</a></router-link>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                        <i class="icon icon-user icon-large"></i>&nbsp;
                        <span class="role">{{displayName}}</span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <!--<li ><a v-link="{path:'/user/resetpwd'}">修改密码</a></li>-->
                        <li><a href="javascript:void(0)" @click.prevent="signOut">退出登录</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</template>
<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    export default{
        name: 'header',
        computed: {
            ...mapGetters(['displayName'])
        },
        methods: {
            signOut(){
                this.$store.dispatch("loginOut");
                this.$router.push({name: "login"});
            }
        }
    }
</script>
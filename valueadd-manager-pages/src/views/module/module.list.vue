<template>
    <div>
        <h2>公司列表</h2>
        <div class="query-content">
            <div class="query-row">
                <div class="pull-left mr10">
                    <input type="text" class="form-control" v-model="queryParams.param.keyWord" placeholder="请输入你想查询的内容"/>
                </div>
                <button class="pull-left btn btn-primary" @click="queryEvent">查询</button>
                <button class="pull-left btn btn-success" @click="addEvent">添加新公司</button>
            </div>
        </div>
        <div class="table-content">
            <div v-if="showList">
                <table class="table">
                    <thead>
                    <tr>
                        <th><input type="checkbox" v-model="allChecked" @change="checkedAll"/></th>
                        <th>公司名称</th>
                        <th>备注信息</th>
                        <th>创建时间</th>
                        <th style="width:200px;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in companyList">
                        <td><input type="checkbox" v-model="selected" :value="item.companyId"/></td>
                        <td>{{item.name}}</td>
                        <td>{{item.remark}}</td>
                        <td>{{getTime(item.createTime)}}</td>
                        <td>
                            <a href="javascript:void(0)" @click="editClick(index)">编辑</a>
                            <a href="javascript:void(0)" @click="deleteClick(index)">删除</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button class="btn btn-default" @click="deleteEvent">批量删除</button>

            </div>
            <div v-else class="empty-data">
                没有相关数据
            </div>

            <div class="pull-right" v-show="showPage">
                <v-pager :current="queryParams.pageNumber" :page-count="pagination.totalPage" :total="pagination.total"
                         @change="pageChange"></v-pager>
            </div>
        </div>
        <modal-edit ref="edit" :company-info="editCompanyInfo" :is-new="isNew"></modal-edit>
    </div>
</template>
<script type="text/ecmascript-6">
    import {convertTime} from '../../utils/common.tools'
    import {mapGetters, mapActions} from 'vuex'
    import activityService from 'services/activityService'
    import pager from 'components/common/pager.vue'
    import modalEdit from 'components/company/modal.editCompany.vue'
    export default{
        name:'companyList',
        components: {
            "v-pager": pager,
            'modal-edit':modalEdit
        },
        data(){
            return {
                queryParams: {
                    pageNumber: 1,
                    pageSize: 10,
                    param:{
                        keyWord: ""
                    }
                },
                allChecked: false,
                selected: [],
                isNew:false,
                editCompanyInfo:{
                    companyId:"",
                    name:"",
                    logo:"",
                    remarks:""
                }
            }
        },
        created(){
            if (window.localStorage.getItem("queryParams")) {
                this.queryParams = JSON.parse(window.localStorage.getItem('queryParams'))
            }
            this.fetchData();
        },
        destroyed(){
            window.localStorage.removeItem("queryParams");
        },
        computed: {
            ...mapGetters({
                companyList: 'companyList',
                pagination: 'companyPagination',
                operateResult:'operateResult',
                systemError:'systemError'
            }),
            showPage: function () {
                return this.pagination.totalPage > 1;
            },
            showList: function () {
                return this.companyList.length > 0;
            }
        },
        watch: {
            '$route': 'fetchData',
            'selected': function (val) {
                if (val.length == this.companyList.length) {
                    this.allChecked = true;
                }
                else {
                    this.allChecked = false;
                }
            },
            'operateResult':function (val) {
                if(val != "")
                {
                    alert(val);
                    this.setEmptyResult();
                }
            },
            'systemError':function (val) {
                if(val != "")
                {
                    console.log(val);
                    this.setEmptyError();
                }
            }
        },
        methods: {
            ...mapActions(['getCompanyList','deleteCompany','setEmptyResult','setEmptyError']),
            fetchData(){
                this.queryParams.pageNumber = parseInt(this.$route.params.page);
                this.getCompanyList(this.queryParams);
            },
            queryEvent(){
                //存储查询条件，刷新后还在
                window.localStorage.setItem("queryParams", JSON.stringify(this.queryParams));
                if (this.queryParams.pageNumber == 1) {
                    this.getCompanyList(this.queryParams);
                }
                else {
                    this.$router.push({
                        name: 'companyList',
                        params: {
                            page: 1
                        }
                    });
                }
            },
            pageChange(index){
                this.$router.push({
                    name: 'companyList',
                    params: {
                        page: index
                    }
                });
            },
            checkedAll(e) {
                var vm = this;
                if (vm.allChecked) {//实现反选
                    vm.selected = [];
                    vm.companyList.forEach(function (item) {
                        vm.selected.push(item.companyId);
                    });

                } else {//实现全选
                    vm.selected = [];
                }
            },
            addEvent(){
                this.editCompanyInfo = {
                    companyId:"",
                    name:"",
                    logo:"",
                    remarks:""
                };
                this.isNew = true;
                this.$refs.edit.show();
            },
            deleteEvent(){
                var ids = this.selected;
                if(ids.length == 0)
                {
                    alert("请选择要删除的公司");
                    return;
                }
                if(confirm("确认要删除选择的所有公司?")){
                    var params = {
                        companyIds:ids.join(','),
                    };
                    this.deleteCompany(params);
                }
            },
            editClick(index){
                for (var i in this.companyList[index]) {
                    this.editCompanyInfo[i] = this.companyList[index][i];
                }
                this.isNew = false;
                this.$refs.edit.show();
            },
            deleteClick(index){
                if(confirm("确认要删除该项活动?")){
                    var id = this.companyList[index].companyId;
                    var params = {
                        companyIds:id,
                    };
                    this.deleteCompany(params);
                }
            },
            getTime(val){
                return convertTime(val);
            }
        }
    }
</script>
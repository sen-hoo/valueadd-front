<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="queryParam.mobile" placeholder="手机号码"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>

        <div class="operate-container">
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加白名单</el-button>
        </div>

        <div class="talbe-container">
            <el-table :data="testListData">
                <el-table-column label="手机号码" prop="mobile" width="150"></el-table-column>
                <el-table-column label="合作方名称" prop="cpName" width="120"></el-table-column>
                <el-table-column label="来源" prop="fromwhere" width="120"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="120"></el-table-column>
            </el-table>
            <!-- <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>

        <el-dialog title="添加白名单" :visible.sync="dialogFormVisible">
            <el-form :model="whitelistForm" :rules="rules" ref="whitelistForm" label-width="100%">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="whitelistForm.mobile" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('whitelistForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            queryParam: {
                mobile: undefined,
                pageSize: 20,
                pageNumber: 1
            },
            whitelistForm: {
                mobile: ''
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
            },
            testListData: [
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'},
                {mobile: '18600002895', cpName: '', fromwhere: 1, createTime: '2018-09-09 12:00:00'}
            ]
        }
    },
    methods: {
        resetTemp() {

        },
        handleCreate() {//添加
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            // this.$nextTick(() => {
            //     this.$refs['dataForm'].clearValidate()
            // })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

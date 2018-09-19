<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.keyword" placeholder="合作方名称" class="filter-item" style="width: 300px;"></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit" class="filter-item">添加合作方</el-button>
        </div>
        <div class="table-container">
            <el-table :data="dataList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="PKID" width="65">
                    <template slot-scope="scope">
                        <span>{{scope.row.rowId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="编号">
                    <template slot-scope="scope">
                        <span>{{scope.row.cpId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.cpName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="公司名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.cpCompany}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="电话">
                    <template slot-scope="scope">
                        <span>{{scope.row.cpMobile}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column align="center" label="电邮">
                    <template slot-scope="scope">
                        <span>{{scope.row.cpEmail}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="银行账号">
                    <template slot-scope="scope">
                        <span>{{scope.row.bankAccount}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                        <span>{{scope.row.bankUser}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="开户行地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.bankAddress}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column align="center" label="操作" class-name="small-padding">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteOperation(scope.row)"></el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit"  @click="editOperation(scope.row)"></el-button>
                        <el-dropdown  @click="serviceCodeRouteDialog(scope.row)">
                            <el-button type="primary" size="mini">合作方业务<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                            <el-dropdown-menu slot="dropdown">
                                <router-link :to="{name:'smscode', params:{partnerId: scope.row.cpId, partnerName: scope.row.cpName}}">
                                    <el-dropdown-item >短信业务</el-dropdown-item>
                                </router-link>
                                <router-link :to="{name:'mmscode', params:{partnerId: scope.row.cpId, partnerName: scope.row.cpName}}">
                                    <el-dropdown-item>彩信业务</el-dropdown-item>
                                </router-link>
                                <router-link :to="{name:'ivrcode', params:{partnerId: scope.row.cpId, partnerName: scope.row.cpName}}">
                                    <el-dropdown-item>IVR业务</el-dropdown-item>
                                </router-link>
                                <router-link :to="{name:'netcode', params:{partnerId: scope.row.cpId, partnerName: scope.row.cpName}}">
                                    <el-dropdown-item>联网业务</el-dropdown-item>
                                </router-link>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!-- <el-button size="mini" type="primary" icon="el-icon-share"  @click="businessOperation(scope.row)">合作方业务</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加合作方" :visible.sync="dialogFormVisible">
            <el-form :model="temp" :rules="rules" ref="addPartnerForm" label-position="left" label-width="100px">
                <el-form-item label="合作方ID" prop="cpId">
                    <el-input v-model="temp.cpId" placeholder="合作方ID" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item label="合作方名称" prop="cpName">
                    <el-input v-model="temp.cpName" placeholder="合作方名称" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" prop="cpCompany">
                    <el-input v-model="temp.cpCompany" placeholder="公司名称" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="cpMobile">
                    <el-input v-model="temp.cpMobile" placeholder="联系电话" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="cpEmail">
                    <el-input v-model="temp.cpEmail" placeholder="电子邮箱" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="收款账号" prop="bankAccount">
                    <el-input v-model="temp.bankAccount" placeholder="汇款账号" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="收款人姓名" prop="bankUser">
                    <el-input v-model="temp.bankUser" placeholder="收款人姓名" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item label="开户行地址" prop="bankAddress">
                    <el-input v-model="temp.bankAddress" placeholder="开户行地址" style="max-width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="IP列表" prop="cpIpList">
                    <el-input type="textarea" :rows="3" v-model="temp.cpIpList" placeholder="IP列表（多条请,分割）" style="width:500px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addPartnerForm')">确定</el-button>
            </div>

        </el-dialog>
    </div>
</template>
<script>
import { Message } from "element-ui";
import { fetchPartnerList, addPartner, editPartner, deletePartner } from "@/api/partner"
export default {
    data() {
        return {
            temp: {
                rowId: undefined,
                cpId: undefined,
                cpName: undefined,
                cpCompany: undefined,
                cpMobile: undefined,
                cpEmail: undefined,
                bankAccount: undefined,
                bankUser: undefined,
                bankAddress: undefined,
                cpIpList: undefined
            },
            dialogFormVisible: false,
            detailFormVisible: false,
            listLoading: true,
            dataList: null,
            total: null,
            listQuery: {
                keyword: undefined,
                pageSize: 20,
                pageNumber: 1
            },
            rules: {
                cpId: [
                    { required: true, message: "合作方ID为必需字段", trigger: "blur" }
                ],
                cpName: [
                    { required: true, message: "请输入合作方名称", trigger: "blur" }
                ]
            }
        }
    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList() {
            this.listLoading = true
            if (this.listQuery.keyword === "") this.listQuery.keyword = undefined;
            fetchPartnerList(this.listQuery).then((res)=> {
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
                if (res.code === 0) {
                    (this.dataList = res.data.partnerList),
                    (this.total = res.data.page.total);
                } else {
                    Message({
                        message: res.data.msg,
                        type: "error",
                        duration: 3 * 1000
                    });
                    this.listLoading = false;
                }
            })
        },
        searchByKeyword() {
            this.fetchList();
        },
        handleCurrentChange(pageNumber) {
            this.listQuery.pageNumber = pageNumber;
            this.fetchList();
        },
        handleSizeChange(pageSize) {
            this.listQuery.pageSize = pageSize;
            this.fetchList();
        },
        resetTemp() {//重置实体类
            this.temp = {
                rowId: undefined,
                cpId: undefined,
                cpName: undefined,
                cpCompany: undefined,
                cpMobile: undefined,
                cpEmail: undefined,
                bankAccount: undefined,
                bankUser: undefined,
                bankAddress: undefined,
                cpIpList: undefined
            };
        },
        deleteOperation(row) {
            let params = { pkId: row.rowId };
            deletePartner(params).then((res)=>{
                if (res.code === 0) {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                        duration: 2000
                    });
                } else {
                    this.$notify({
                        title: "失败",
                        message: "删除失败",
                        type: "error",
                        duration: 2000
                    });
                }
            })
        },
        editOperation(row) {//编辑合作方
            this.temp = {
                rowId: row.rowId,
                cpId: row.cpId,
                cpName: row.cpName,
                cpCompany: row.cpCompany,
                cpMobile: row.cpMobile,
                cpEmail: row.cpEmail,
                bankAccount: row.bankAccount,
                bankUser: row.bankUser,
                bankAddress: row.bankAddress,
                cpIpList: row.cpIpList
            };
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["addPartnerForm"].clearValidate();
            });
        },
        businessOperation(row) {//跳转到业务管理标签页

        },
        handleCreate() {//显示添加合作方窗口
            //添加
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["addPartnerForm"].clearValidate();
            });
        },
        submitForm(formName) {//点击确定按钮
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.temp.rowId == null) {
                        addPartner(this.temp).then(res => {
                            if (res.code === 0) {
                                this.dialogFormVisible = false;
                                this.dataList.unshift(this.temp);
                                this.$notify({
                                    title: "成功",
                                    message: "创建成功",
                                    type: "success",
                                    duration: 2000
                                });
                                this.fetchList();
                            } else {
                                this.$notify({
                                    title: "失败",
                                    message: "添加失败",
                                    type: "error",
                                    duration: 2000
                                });
                            }
                        });
                    } else {
                        editPartner(this.temp).then((res)=> {
                            if (res.code === 0) {
                                this.dialogFormVisible = false;
                                this.dataList.unshift(this.temp);
                                this.$notify({
                                    title: "成功",
                                    message: "修改成功",
                                    type: "success",
                                    duration: 2000
                                });
                                this.fetchList();
                            } else {
                                this.$notify({
                                    title: "失败",
                                    message: "修改失败",
                                    type: "error",
                                    duration: 2000
                                });
                            }
                        })
                    }
                }
            });
        }

    }
}
</script>


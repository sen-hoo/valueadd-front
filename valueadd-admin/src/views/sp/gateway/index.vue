<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.keyword" placeholder="关键字" class="filter-item" style="width: 300px;"></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit" class="filter-item">添加网关</el-button>
        </div>
        <div class="table-container">
            <el-table :data="dataList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="PKID" width="65">
                    <template slot-scope="scope">
                        <span>{{scope.row.gatewayId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="长号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.longTermid}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="端口号">
                    <template slot-scope="scope">
                        <span>{{scope.row.port}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column align="center" label="路由">
                    <template slot-scope="scope">
                        <span>{{scope.row.route}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column align="center" label="密钥">
                    <template slot-scope="scope">
                        <span>{{scope.row.password}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column align="center" label="短信网关地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.smsUrl}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="彩信网关地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.mmsUrl}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="IVR网关地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.ivrUrl}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="联网业务地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.netUrl}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column align="center" label="回调地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.callbackUrl}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" class-name="mini-padding">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteOperation(scope.row)"></el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editOperation(scope.row)"></el-button>
                        <el-button size="mini" type="primary" icon="el-icon-share" @click="businessOperation(scope.row)">业务代码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加网关" :visible.sync="dialogFormVisible">
            <el-form :model="temp" :rules="rules" ref="addGatewayForm" label-position="left" label-width="100px">
                <el-form-item label="网关名称" prop="name">
                    <el-input v-model="temp.name" placeholder="网关名称" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                    <el-input v-model="temp.port" placeholder="端口号" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="长号码" prop="longTermid">
                    <el-input v-model="temp.longTermid" placeholder="长号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="密钥" prop="password">
                    <el-input v-model="temp.password" placeholder="网关密钥" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="短信地址" prop="smsUrl">
                    <el-input v-model="temp.smsUrl" placeholder="短信地址"></el-input>
                </el-form-item>
                <el-form-item label="彩信地址" prop="mmsUrl">
                    <el-input v-model="temp.mmsUrl" placeholder="彩信地址"></el-input>
                </el-form-item>
                <el-form-item label="IVR地址" prop="ivrUrl">
                    <el-input v-model="temp.ivrUrl" placeholder="IVR地址"></el-input>
                </el-form-item>
                <el-form-item label="联网地址" prop="netUrl">
                    <el-input v-model="temp.netUrl" placeholder="联网地址"></el-input>
                </el-form-item>
                <el-form-item label="回调地址" prop="callbackUrl">
                    <el-input v-model="temp.callbackUrl" placeholder="回调地址"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select v-model="temp.state" placeholder="请选择">
                        <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addGatewayForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from "element-ui";
import {
    fetchGatewaylist,
    addGateway,
    editGateway,
    deleteGateway
} from "@/api/gateway";
export default {
    data() {
        return {
            stateOptions: [
                {
                    value: "0",
                    label: "暂停"
                },
                {
                    value: "1",
                    label: "激活"
                }
            ],
            temp: {
                gatewayId: undefined,
                name: undefined,
                longTermid: undefined,
                port: undefined,
                route: undefined,
                password: undefined,
                rootUrl: undefined,
                smsUrl: undefined,
                mmsUrl: undefined,
                ivrUrl: undefined,
                callbackUrl: undefined,
                state: undefined
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
                name: [
                    {
                        required: true,
                        message: "网关名称",
                        trigger: "blur"
                    }
                ],
                longTermid: [
                    {
                        required: true,
                        message: "请输入长号码",
                        trigger: "blur"
                    }

                ],
                port: [
                    {
                        required: true,
                        message: "请输入网关端口",
                        trigger: "blur"
                    }
                ],
                state: [
                    {
                        required: true,
                        message: "请选择网关状态",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.fetchList();
    },
    methods: {
        fetchList() {
            this.listLoading = true;
            if (this.listQuery.keyword === "") this.listQuery.keyword = undefined;
            fetchGatewaylist(this.listQuery).then(res => {
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
                if (res.code === 0) {
                    (this.dataList = res.data.gatewayList),
                        (this.total = res.data.page.total);
                } else {
                    Message({
                        message: res.data.msg,
                        type: "error",
                        duration: 3 * 1000
                    });
                    this.listLoading = false;
                }
            });
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
        resetTemp() {
            //重置实体类
            this.temp = {
                gatewayId: undefined,
                name: undefined,
                longTermid: undefined,
                port: undefined,
                route: undefined,
                password: undefined,
                rootUrl: undefined,
                smsUrl: undefined,
                mmsUrl: undefined,
                ivrUrl: undefined,
                netUrl: undefined,
                callbackUrl: undefined,
                state: undefined
            };
        },
        deleteOperation(row) {
            let params = { pkId: row.gatewayId };
            deletePartner(params).then(res => {
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
            });
        },
        editOperation(row) {
            //编辑合作方
            this.temp = {
                gatewayId: row.gatewayId,
                name: row.name,
                longTermid: row.longTermid,
                port: row.port,
                route: row.route,
                password: row.password,
                rootUrl: row.rootUrl,
                smsUrl: row.smsUrl,
                mmsUrl: row.mmsUrl,
                ivrUrl: row.ivrUrl,
                netUrl: row.netUrl,
                callbackUrl: row.callbackUrl,
                state: row.state
            };
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["addGatewayForm"].clearValidate();
            });
        },
        businessOperation(row) {
            //跳转到业务管理标签页
        },
        handleCreate() {
            //显示添加合作方窗口
            //添加
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["addGatewayForm"].clearValidate();
            });
        },
        submitForm(formName) {
            //点击确定按钮
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.temp.rowId == null) {
                        this.temp.route=this.temp.port / 100
                        addGateway(this.temp).then(res => {
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
                        editGateway(this.temp).then(res => {
                            this.temp.route=this.temp.port / 100
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
                        });
                    }
                }
            });
        }
    }
};
</script>

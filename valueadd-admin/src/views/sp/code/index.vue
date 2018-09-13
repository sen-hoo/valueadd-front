<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.keyword" placeholder="关键字" class="filter-item" style="width: 300px;"></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit" class="filter-item">添加业务代码</el-button>
        </div>
        <div class="table-container">
            <el-table :data="dataList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="PKID" width="65">
                    <template slot-scope="scope">
                        <span>{{scope.row.codePk}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="业务ID">
                    <template slot-scope="scope">
                        <span>{{scope.row.codeId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="代码ID">
                    <template slot-scope="scope">
                        <span>{{scope.row.productId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="业务名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.codeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="网关名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.gatewayName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="业务类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.codeType}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="计费类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.feeType}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="价格">
                    <template slot-scope="scope">
                        <span>{{scope.row.feeValue}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="描述">
                    <template slot-scope="scope">
                        <span>{{scope.row.description}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column align="center" label="操作" class-name="mini-padding">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteOperation(scope.row)"></el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="editOperation(scope.row)"></el-button>
                        <el-button size="mini" type="primary" icon="el-icon-share" @click="businessOperation(scope.row)">添加指令</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加网关" :visible.sync="dialogFormVisible">
            <el-form :model="temp" :rules="rules" ref="addServiceCodeForm" label-position="left" label-width="100px">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addServiceCodeForm')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加指令">
            <el-form :model="routeTemp" :rules="routeRules" ref="addServiceCodeRouteForm" label-position="left" label-width="100px">
                <el-form-item label="业务代码" prop="serviceCodeId">
                    <el-input v-model="routeTemp.serviceCodeId" placeholder="长号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="指令" prop="orderCode">
                    <el-input v-model="routeTemp.orderCode" placeholder="订购指令" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="指令匹配" prop="orderCodeCheckFlag">
                    <el-select v-model="routeTemp.orderCodeCheckFlag" placeholder="请选择">
                        <el-option v-for="item in routeTypeOptions" :key="item.type" :label="item.label" :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目的号码" prop="orderDest">
                    <el-input v-model="routeTemp.orderDest" placeholder="目的号码"></el-input>
                </el-form-item>
                <el-form-item label="目的号码匹配" prop="orderDestCheckFlag">
                    <el-select v-model="routeTemp.orderDestCheckFlag" placeholder="请选择">
                        <el-option v-for="item in routeTypeOptions" :key="item.type" :label="item.label" :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="routeTemp.type" placeholder="类型"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="routeDialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addServiceCodeRouteForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from "element-ui";
import { fetchServiceCodeList, addServiceCode, editServiceCode, deleteServiceCode } from "@/api/serviceCode";
import { editSCodeCtrl, fetchSCodeCtrlList } from "@/api/serviceCodeCtrl";
import { fetchServiceCodeRouteList, addServiceCodeRoute, deleteServiceCodeRoute, editServiceCodeRoute} from "@/api/serviceCodeRoute"
import { RouteTypeOptionsEnum } from "@/common"
export default {
    data() {
        return {
            temp: {
                codePk: undefined,
                codeId: undefined,
                productId: undefined,
                codeName: undefined,
                gatwayId: undefined,
                gatewayPort: undefined,
                codeType: undefined,
                feeType: undefined,
                feeValue: undefined
            },
            routeTemp: {
                codeRouteId: undefined,
                serviceCodePkid: undefined,
                serviceCodeId: undefined,
                orderCode: undefined,
                orderCodeCheckFlag: undefined,
                orderDest: undefined,
                orderDestCheckFlag: undefined,
                type: undefined
            },
            routeTypeOptions: RouteTypeOptionsEnum,
            dialogFormVisible: false,
            routeDialogFormVisible: false,
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
            fetchServiceCodeList(this.listQuery).then(res => {
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
                if (res.code === 0) {
                    (this.dataList = res.data.serviceCodeList),
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
                codePk: undefined,
                codeId: undefined,
                productId: undefined,
                codeName: undefined,
                gatwayId: undefined,
                gatewayPort: undefined,
                codeType: undefined,
                feeType: undefined,
                feeValue: undefined
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
                codePk: row.codePk,
                codeId: row.codeId,
                productId: row.productId,
                codeName: row.codeName,
                gatwayId: row.gatwayId,
                gatewayPort: row.gatewayPort,
                codeType: row.codeType,
                feeType: row.feeType,
                feeValue: row.feeValue
            };
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["addServiceCodeForm"].clearValidate();
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
                this.$refs["addServiceCodeForm"].clearValidate();
            });
        },
        submitForm(formName) {
            //点击确定按钮
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.temp.rowId == null) {
                        addServiceCode(this.temp).then(res => {
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
                        editServiceCode(this.temp).then(res => {
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

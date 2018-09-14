<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.keyword" placeholder="关键字" class="filter-item" style="width: 300px;"></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit" class="filter-item">添加业务代码</el-button>
        </div>
        <div class="table-container">
            <el-table :data="dataList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="PKID" width="65"  type="expand">
                     <template slot-scope="scope">
                         <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width:100%;background:#F2F6FC;">
                             <tr v-for="item in scope.row.serviceCodeRouteList">
                                 <td class="cell">
                                     <span v-if="item.orderCodeCheckFlag === 1">{{item.orderCode}}（精确）</span>
                                     <span v-else-if="item.orderCodeCheckFlag === 2">{{item.orderCode}}（模糊）</span>
                                     <span v-else-if="item.orderCodeCheckFlag === 3">{{item.orderCode}}（正则）</span>
                                </td>
                                 <td class="cell">
                                     <span v-if="item.orderDestCheckFlag === 1">{{item.orderDest}}（精确）</span>
                                     <span v-else-if="item.orderDestCheckFlag === 2">{{item.orderDest}}（模糊）</span>
                                     <span v-else-if="item.orderDestCheckFlag === 3">{{item.orderDest}}（正则）</span>
                                </td>
                                 <td class="cell">
                                     <span v-if="item.type === 1">点播</span>
                                     <span v-else-if="item.type === 2">定制</span>
                                     <span v-else-if="item.type === 3">取消定制</span>
                                     <span v-else-if="item.type === 4">普通上行</span>
                                 </td>
                                 <td>
                                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteSCodeRoute(item.codeRouteId)"></el-button>
                                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="editSCodeRoute(item)"></el-button>
                                 </td>
                             </tr>
                         </table>
                     </template>
                </el-table-column>
                <el-table-column align="center" label="业务名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.codeName}}</span>
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
                <el-table-column align="center" label="网关名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.gatewayName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="业务类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.codeType === 1">短信</span>
                        <span v-else-if="scope.row.codeType === 2">彩信</span>
                        <span v-else-if="scope.row.codeType === 3">IVR</span>
                        <span v-else-if="scope.row.codeType === 4">联网</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="计费类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.feeType === 1">按条</span>
                        <span v-else-if="scope.row.feeType === 2">包月</span>
                        <span v-else-if="scope.row.feeType === 3">按分钟</span>
                        <span v-else-if="scope.row.feeType === 9">免费</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="价格(分)">
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
                        <el-dropdown split-button type="primary" @click="serviceCodeRouteDialog(scope.row)" @command="otherCommand(scope.row, command)">
                        添加指令
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>开通省份</el-dropdown-item>
                                <el-dropdown-item @click.native="editOperation(scope.row)" divided>编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="deleteOperation(scope.row)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加业务代码" :visible.sync="dialogFormVisible">
            <el-form :model="temp" :rules="sCodRules" ref="addServiceCodeForm" label-position="left" label-width="100px">
                <el-form-item label="网关" prop="gatewayId">
                    <el-select v-model="temp.gatewayId" placeholder="请选择">
                        <el-option v-for="item in gatewayList" :key="item.gatewayId" :label="item.name" :value="item.gatewayId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务名称" prop="codeName">
                    <el-input v-model="temp.codeName" placeholder="业务名称" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="业务代码" prop="codeId">
                    <el-input v-model="temp.codeId" placeholder="业务代码" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="物料ID" prop="productId">
                    <el-input v-model="temp.productId" placeholder="物料ID" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="代码类型" prop="codeType">
                    <el-select v-model="temp.codeType" placeholder="请选择">
                        <el-option v-for="item in codeTypeOptions" :key="item.type" :label="item.label" :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="计费类型" prop="feeType">
                    <el-radio-group v-model="temp.feeType">
                        <el-radio :label="1">按条</el-radio>
                        <el-radio :label="2">包月</el-radio>
                        <el-radio :label="3">按分钟</el-radio>
                        <el-radio :label="9">免费</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="费率（分）" prop="feeValue">
                    <el-input v-model.number="temp.feeValue" placeholder="费率" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" :rows="3" v-model="temp.description" placeholder="描述"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addServiceCodeForm')">确定</el-button>
            </div>
        </el-dialog>
        <!-- 添加路由指令dialog -->
        <el-dialog title="添加指令" :visible.sync="routeDialogFormVisible">
            <el-form :model="routeTemp" :rules="routeRules" ref="addServiceCodeRouteForm" label-position="left" label-width="100px">
                <el-form-item label="业务代码" prop="serviceCodeId">
                    <el-input v-model="routeTemp.serviceCodeId" placeholder="长号码" style="width:300px;" :disabled="true"></el-input>
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
                    <el-input v-model="routeTemp.orderDest" placeholder="目的号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="目的号码匹配" prop="orderDestCheckFlag">
                    <el-select v-model="routeTemp.orderDestCheckFlag" placeholder="请选择">
                        <el-option v-for="item in routeTypeOptions" :key="item.type" :label="item.label" :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="routeTemp.type">
                        <el-radio :label="1">点播</el-radio>
                        <el-radio :label="2">定制</el-radio>
                        <el-radio :label="3">取消定制</el-radio>
                        <el-radio :label="4">普通上行</el-radio>
                    </el-radio-group>
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
import { fetchGatewayClause } from "@/api/gateway";
import { fetchServiceCodeList, addServiceCode, editServiceCode, deleteServiceCode } from "@/api/serviceCode";
import { editSCodeCtrl, fetchSCodeCtrlList } from "@/api/serviceCodeCtrl";
import { fetchServiceCodeRouteList, addServiceCodeRoute, deleteServiceCodeRoute, editServiceCodeRoute} from "@/api/serviceCodeRoute"
import { RouteTypeOptionsEnum, ServiceCodeEnum } from "@/common"
export default {
    data() {
        return {
            temp: {
                codePk: undefined,
                codeId: undefined,
                productId: undefined,
                codeName: undefined,
                gatewayId: undefined,
                gatewayPort: undefined,
                codeType: undefined,
                feeType: 1,
                feeValue: undefined,
                description: undefined
            },
            routeTemp: {
                codeRouteId: undefined,
                serviceCodePkid: undefined,
                serviceCodeId: undefined,
                orderCode: undefined,
                orderCodeCheckFlag: undefined,
                orderDest: undefined,
                orderDestCheckFlag: undefined,
                type: 1
            },
            routeTypeOptions: RouteTypeOptionsEnum,
            codeTypeOptions: ServiceCodeEnum,
            dialogFormVisible: false,
            routeDialogFormVisible: false,
            gatewayList: null,
            listLoading: true,
            dataList: null,
            total: null,
            listQuery: {
                keyword: undefined,
                pageSize: 20,
                pageNumber: 1
            },
            sCodRules: {
                gatewayId: [{ required: true, message: '请选择网关'}],
                codeId: [{
                        required: true,
                        message: "业务代码不能为空",
                        trigger: "blur"
                    }
                ],
                codeName: [
                    {
                        required: true,
                        message: "业务名称不能为空",
                        trigger: "blur"
                    }
                ],
                codeType: [
                    {
                        required: true,
                        message: "请选择代码类型",
                        trigger: "blur"
                    }
                ],
                feeType: [
                    {
                        required: true,
                        message: "请选择计费类型",
                        trigger: "blur"
                    }
                ],
                feeValue: [
                    { required: true, message: "费率不能为空"},
                    { type: 'number', message: '费率必须为数字值'}
                ]
            },
            routeRules: {

            }
        };
    },
    created() {
        this.fetchList();
        this.fetchGateway();
    },
    methods: {
        fetchGateway() {
            fetchGatewayClause({}).then(res => {
                if (res.code === 0) {
                    (this.gatewayList = res.data.gatewayList)
                }
            })
        },
        fetchList() {
            this.listLoading = true;
            if (this.listQuery.keyword === "") this.listQuery.keyword = undefined;
            fetchServiceCodeList(this.listQuery).then(res => {
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
                if (res.code === 0) {
                    (this.dataList = res.data.serviceCodeList);
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
                gatewayId: undefined,
                gatewayPort: undefined,
                codeType: undefined,
                feeType: 1,
                feeValue: undefined
            };
            this.gatewayList = null
        },
        resetRouteTemp(row) {
            this.routeTemp = {
                codeRouteId: undefined,
                serviceCodePkid: row.codePk,
                serviceCodeId: row.codeId,
                orderCode: undefined,
                orderCodeCheckFlag: undefined,
                orderDest: undefined,
                orderDestCheckFlag: undefined,
                type: 1
            }
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
                gatewayId: row.gatewayId,
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
            //显示添加业务代码窗口
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
                    if (formName === 'addServiceCodeForm') {
                        if (this.temp.codePk == null) {
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
                    if (formName === 'addServiceCodeRouteForm') {
                        if (this.routeTemp.codeRouteId == null) {
                            addServiceCodeRoute(this.routeTemp).then(res => {
                                if (res.code === 0) {
                                    this.routeDialogFormVisible = false;
                                    this.dataList.unshift(this.temp);
                                    this.$notify({ title: "成功", message: "创建成功", type: "success", duration: 2000 });
                                    this.fetchList();
                                } else {
                                    this.$notify({ title: "失败", message: "添加失败", type: "error", duration: 2000});
                                }
                            });
                        } else {
                            editServiceCodeRoute(this.routeTemp).then(res => {
                                if (res.code === 0) {
                                    this.routeDialogFormVisible = false;
                                    this.dataList.unshift(this.routeTemp);
                                    this.$notify({ title: "成功", message: "修改成功", type: "success", duration: 2000 });
                                    this.fetchList();
                                } else {
                                    this.$notify({ title: "失败", message: "修改失败", type: "error", duration: 2000});
                                }
                            });
                        }
                    }
                }
            });
        },
        gatewaySelect() {
            this.gatewayList.forEach((value, index, array)=>{
                if (value.gatewayId == this.temp.gatewayId) {
                    this.temp.gatewayPort = value.port
                }
                    
            });
        },
        serviceCodeRouteDialog(row) {
            this.resetRouteTemp(row)
            this.dialogStatus = "create";
            this.routeDialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["addServiceCodeRouteForm"].clearValidate();
            });
        },
        otherCommand(row, command) {
            console.log(JSON.stringify(row))
            console.log(JSON.stringify(command))
        },
        editSCodeRoute(row) {
            //编辑合作方
            this.routeTemp = {
                codeRouteId: row.codeRouteId,
                serviceCodeId: row.serviceCodeId,
                orderCode: row.orderCode,
                orderCodeCheckFlag: row.orderCodeCheckFlag,
                orderDest: row.orderDest,
                orderDestCheckFlag: row.orderDestCheckFlag,
                type: row.type
            };
            this.dialogStatus = "create";
            this.routeDialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["addServiceCodeRouteForm"].clearValidate();
            });
        },
        deleteSCodeRoute(pkId) {
            deleteServiceCodeRoute(pkId).then((res)=> {
                if (res.code === 0) {
                    this.$notify({ title: "成功", message: "删除成功", type: "success",duration: 2000 });
                } else {
                    this.$notify({ title: "失败", message: "删除失败", type: "error", duration: 2000 });
                }
            })
        }
    }
};
</script>


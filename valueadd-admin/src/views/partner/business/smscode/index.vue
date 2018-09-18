<template>
    <div class="app-container">
        <div class="filter-container">
            <el-select v-model="partnerId" placeholder="请选择合作方">
                <el-option v-for="item in partnerList" :key="item.cpId" :label="item.cpName" :value="item.cpId"></el-option>
            </el-select>
            <el-button type="primary" @click="handleAddCPService" icon="el-icon-edit" class="filter-item">添加合作方业务</el-button>
        </div>
        <div class="table-container">
            <el-table :data="smsCpServiceList"  v-loading="listLoading" stripe highlight-current-row>
                <el-table-column label="业务编号">
                    <template slot-scope="scope">
                        <span>{{scope.row.serviceId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="业务名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.serviceName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="业务代码">
                    <template slot-scope="scope">
                        <span>{{scope.row.serviceCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="网关">
                    <template slot-scope="scope">
                        <span>{{scope.row.gatewayName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="同步类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.syncType}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="同步协议">
                    <template slot-scope="scope">
                        <span>{{scope.row.syncProtocol}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加短信业务" :visible.sync="serviceFormVisible">
            <el-form :model="cpServiceTemp" :rules="cpServiceRules" ref="addCPServiceForm" label-position="left" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="业务编号" prop="serviceCodeId">
                        <el-input v-model="cpServiceTemp.serviceId" placeholder="长号码" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="业务代码" prop="serviceCode">
                        <el-input v-model="cpServiceTemp.serviceCode" placeholder="长号码" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="业务名称" prop="serviceName">
                    <el-input v-model="cpServiceTemp.serviceName" placeholder="长号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="分成比例" prop="proportion">
                    <el-input v-model="cpServiceTemp.proportion" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="上行(MO)同步地址" prop="moUrl">
                    <el-input v-model="cpServiceTemp.moUrl" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="状态报告(MR)同步地址" prop="mrUrl">
                    <el-input v-model="cpServiceTemp.mrUrl" placeholder="长号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="业务处理地址" prop="handleUrl">
                    <el-input v-model="cpServiceTemp.handleUrl" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="上行替换" prop="alterMo">
                    <el-input v-model="cpServiceTemp.alterMo" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="同步类型" prop="syncType">
                    <el-input v-model="cpServiceTemp.syncType" placeholder="长号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="同步协议" prop="syncProtocol">
                    <el-input v-model="cpServiceTemp.syncProtocol" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="订购成功下发" prop="registMessage">
                    <el-input v-model="cpServiceTemp.registMessage" placeholder="长号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="订购失败下发" prop="registFailMessage">
                    <el-input v-model="cpServiceTemp.registFailMessage" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="取消成功下发" prop="cancelMessage">
                    <el-input v-model="cpServiceTemp.cancelMessage" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="取消失败下发" prop="cancelFailMesage">
                    <el-input v-model="cpServiceTemp.cancelFailMesage" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="业务负责人" prop="agentMan">
                    <el-input v-model="cpServiceTemp.agentMan" placeholder="长号码" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="技术负责人" prop="techMan">
                    <el-input v-model="cpServiceTemp.techMan" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-input v-model="cpServiceTemp.status" placeholder="长号码" style="width:300px;" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="routeDialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addServiceCodeRouteForm')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加指令" :visible.sync="directivesFormVisible">

        </el-dialog>
    </div>
</template>
<script>
import { fetchPartnerList } from "@/api/partner";
import { fetchPartnerServiceList } from "@/api/partnerService";
import { ServiceCodeEnum } from "@/common"
import { CPServiceStatus } from "@/common";
export default {
    data() {
        return {
            listQuery: {
                partnerId: undefined,
                codeType: ServiceCodeEnum[0].type,
                pageSize: 20,
                pageNumber: 1
            },
            total: null,
            listLoading: false,
            partnerList: null,
            smsCpServiceList: null,
            serviceFormVisible: false,
            cpServiceTemp: {
                servicePkid: undefined,
                serviceId: undefined,
                serviceIdExtend: undefined,
                serviceName: undefined,
                serviceCodePkid: undefined,
                serviceCode: undefined,
                gatewayPkid: undefined,
                gatewayPort: undefined,
                feeValue: undefined,
                proportion: undefined,
                status: CPServiceStatus.ACTIVATED,
                alterMo: undefined,
                registMessage: undefined,
                cancelMessage: undefined,
                registFailMessage: undefined,
                cancelFailMesage: undefined,
                moUrl: undefined,
                mrUrl: undefined,
                handleUrl: undefined,
                syncType: undefined,
                syncProtocol: undefined,
                agentMan: undefined,
                techMan: undefined,
            },
            cpServiceRules: {

            }
        }
    },
    methods: {
        resetCpServiceTemp() {
            this.cpServiceTemp = {
                servicePkid: undefined,
                serviceId: undefined,
                serviceIdExtend: undefined,
                serviceName: undefined,
                serviceCodePkid: undefined,
                serviceCode: undefined,
                gatewayPkid: undefined,
                gatewayPort: undefined,
                feeValue: undefined,
                proportion: undefined,
                status: CPServiceStatus.ACTIVATED,
                alterMo: undefined,
                registMessage: undefined,
                cancelMessage: undefined,
                registFailMessage: undefined,
                cancelFailMesage: undefined,
                moUrl: undefined,
                mrUrl: undefined,
                handleUrl: undefined,
                syncType: undefined,
                syncProtocol: undefined,
                agentMan: undefined,
                techMan: undefined,
            }
        },
        fetchPartnerList() {//获取全部的合作方
            fetchPartnerList({}).then((res)=>{
                if (res.code === 0) {
                    this.partnerList = res.data.partnerList
                }
            })
        },
        fetchSmsServiceList() {//获取短信业务
            this.listLoading = true
            fetchPartnerServiceList(this.listQuery).then((res)=>{
                setTimeout(() => { this.listLoading = false }, 1.5 * 1000);
                if (res.code === 0) {
                    this.smsCpServiceList = res.data.cpServiceList
                    this.total = res.data.page.total
                } else {
                    this.listLoading = false
                    Message({ message: res.data.msg, type: "error", duration: 3 * 1000 })  
                }
            })
        },
        handleAddCPService() {
            this.resetCpServiceTemp()
            this.serviceFormVisible = true
            this.$nextTick(() => {
                this.$refs["addCPServiceForm"].clearValidate();
            });
        },

    },
    created() {
        this.fetchPartnerList()
        this.fetchSmsServiceList()
    }
}
</script>



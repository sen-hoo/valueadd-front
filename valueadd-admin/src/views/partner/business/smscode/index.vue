<template>
    <div class="app-container">
        <div class="filter-container">
            <el-select v-model="listQuery.partnerId" placeholder="请选择合作方" @change="onPartnerSelected">
                <el-option v-for="item in partnerList" :key="item.cpId" :label="item.cpName" :value="item.cpId"></el-option>
            </el-select>
            <el-button type="primary"  style="margin-bottom:0px;" @click="handleAddCPService" icon="el-icon-edit" class="filter-item">添加合作方业务</el-button>
        </div>
        <div>
            <p>当前合作方:[{{selectedPartnerName}}]</p>
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
                  <el-col :span="12">
                    <el-form-item label="业务编号" prop="serviceCodeId">
                        <el-input v-model="cpServiceTemp.serviceId" placeholder="业务编号" style="width:100px;" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="业务代码" prop="serviceCode">
                        <el-select v-model="cpServiceTemp.serviceCode" placeholder="请选择">
                          <el-option v-for="item in serviceCodeList" :key="item.codePk" :value="item.codeId" :label="item.codeId + ' | ' + item.codeName"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="业务名称" prop="serviceName">
                    <el-input v-model="cpServiceTemp.serviceName" placeholder="业务名称" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="分成比例" prop="proportion">
                    <el-input-number v-model="cpServiceTemp.proportion" placeholder="分成比例" :precision="2" :step="0.01" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="业务处理地址" prop="handleUrl">
                    <el-input v-model="cpServiceTemp.handleUrl" placeholder="业务处理地址"></el-input>
                </el-form-item>
                <el-form-item label="MO同步地址" prop="moUrl">
                    <el-input v-model="cpServiceTemp.moUrl" placeholder="上行(MO)同步地址"></el-input>
                </el-form-item>
                <el-form-item label="MR同步地址" prop="mrUrl">
                    <el-input v-model="cpServiceTemp.mrUrl" placeholder="状态报告(MR)同步地址"></el-input>
                </el-form-item>
                <el-form-item label="上行替换" prop="alterMo">
                    <el-input v-model="cpServiceTemp.alterMo" placeholder="上行替换" style="width:100px;" ></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="同步协议" prop="syncProtocol">
                        <el-radio-group v-model="cpServiceTemp.syncProtocol">
                            <el-radio :label="1">MO_MR</el-radio>
                            <el-radio :label="2">MR</el-radio>
                        </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="同步类型" prop="syncType">
                        <el-radio-group v-model="cpServiceTemp.syncType">
                            <el-radio :label="1">成功/失败</el-radio>
                            <el-radio :label="2">成功</el-radio>
                        </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="订购成功下发" prop="registMessage">
                    <el-input :rows="2" type="textarea" v-model="cpServiceTemp.registMessage" placeholder="订购成功下发" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="订购失败下发" prop="registFailMessage">
                    <el-input v-model="cpServiceTemp.registFailMessage" placeholder="订购失败下发" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="取消成功下发" prop="cancelMessage">
                    <el-input v-model="cpServiceTemp.cancelMessage" placeholder="取消成功下发" style="width:300px;" ></el-input>
                </el-form-item>
                <el-form-item label="取消失败下发" prop="cancelFailMesage">
                    <el-input v-model="cpServiceTemp.cancelFailMesage" placeholder="取消失败下发" style="width:300px;" ></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="业务负责人" prop="agentMan">
                        <el-input v-model="cpServiceTemp.agentMan" placeholder="业务负责人" style="width: 100px;"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="技术负责人" prop="techMan">
                        <el-input v-model="cpServiceTemp.techMan" placeholder="技术负责人" style="width: 100px;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="cpServiceTemp.status">
                        <el-radio :label="1">激活</el-radio>
                        <el-radio :label="2">同步暂停</el-radio>
                        <el-radio :label="3">业务停止</el-radio>
                    </el-radio-group>
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
import { Message } from "element-ui";
import { fetchPartnerList } from "@/api/partner";
import { fetchPartnerServiceList, getCPSN, addPartnerService, editPartnerService, deletePartnerService } from "@/api/partnerService";
import { fetchAllServiceCode } from '@/api/serviceCode';
import { ServiceCodeEnum, CPServiceStatus } from "@/common"

export default {
    data() {
        return {
            listQuery: {
                partnerId: undefined,
                codeType: ServiceCodeEnum[0].type,
                pageSize: 20,
                pageNumber: 1
            },
            selectedPartnerName: undefined,
            total: null,
            listLoading: false,
            partnerList: null,
            serviceCodeList: null,
            smsCpServiceList: null,
            serviceFormVisible: false,
            directivesFormVisible: false,
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
                proportion: 0.40,
                status: CPServiceStatus.ACTIVATED,
                alterMo: undefined,
                registMessage: undefined,
                cancelMessage: undefined,
                registFailMessage: undefined,
                cancelFailMesage: undefined,
                moUrl: undefined,
                mrUrl: undefined,
                handleUrl: undefined,
                syncType: 2,
                syncProtocol: 1,
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
                proportion: 0.40,
                status: CPServiceStatus.ACTIVATED,
                alterMo: undefined,
                registMessage: undefined,
                cancelMessage: undefined,
                registFailMessage: undefined,
                cancelFailMesage: undefined,
                moUrl: undefined,
                mrUrl: undefined,
                handleUrl: undefined,
                syncType: 2,
                syncProtocol: 1,
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
        handleCurrentChange(pageNumber) {
            this.listQuery.pageNumber = pageNumber;
            this.fetchSmsServiceList();
        },
        handleSizeChange(pageSize) {
            this.listQuery.pageSize = pageSize;
            this.fetchSmsServiceList();
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
        onPartnerSelected(value) {
            console.log(JSON.stringify(value))
            this.partnerList.forEach((item, index, array) => {
                if (item.cpId === value) {
                    this.selectedPartnerName = item.cpName
                }
            })
            this.fetchSmsServiceList()

        },
        handleAddCPService() {
            if (this.selectedPartnerName === null || typeof(this.selectedPartnerName) === "undefined") {
                Message({ message: "请选择要添加业务的合作方", type: "error", duration: 2 * 1000 })  
                return ;
            }
            getCPSN({partnerId: this.listQuery.partnerId}).then((res)=>{
                if (res.code === 0) {
                    this.cpServiceTemp.serviceId = res.data.cpServiceId
                    this.cpServiceTemp.serviceIdExtend = res.data.cpServiceIdExt
                }
            })
            this.resetCpServiceTemp()
            this.serviceFormVisible = true
            this.$nextTick(() => {
                this.$refs["addCPServiceForm"].clearValidate();
            });
        },

    },
    created() {
        const cpId = this.$route.params && this.$route.params.partnerId
        const cpName = this.$route.params && this.$route.params.partnerName
        this.listQuery.partnerId = cpId
        this.selectedPartnerName = cpName
        this.fetchPartnerList()
        this.fetchSmsServiceList()
        fetchAllServiceCode({}).then((res)=>{
            if (res.code === 0)
                this.serviceCodeList = res.data.serviceCodeList
        })
    }
}
</script>



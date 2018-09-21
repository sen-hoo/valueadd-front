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
                <el-table-column align="center" label="展开" width="65"  type="expand">
                    <template slot-scope="scope">
                        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width:100%;background:#F2F6FC;">
                            <tr v-for="item in scope.row.cpServiceRouteList">
                                <td class="cell">
                                    <span v-if="item.routeCodeCheckFlag === 1">{{item.routeCode}}（精确）</span>
                                    <span v-else-if="item.routeCodeCheckFlag === 2">{{item.routeCode}}（模糊）</span>
                                    <span v-else-if="item.routeCodeCheckFlag === 3">{{item.routeCode}}（正则）</span>
                                </td>
                                <td class="cell">
                                     <span v-if="item.routeDestCheckFlag === 1">{{item.routeDest}}（精确）</span>
                                     <span v-else-if="item.routeDestCheckFlag === 2">{{item.routeDest}}（模糊）</span>
                                     <span v-else-if="item.routeDestCheckFlag === 3">{{item.routeDest}}（正则）</span>
                                </td>
                                <td class="cell">
                                     <span v-if="item.routeType === 1">点播</span>
                                     <span v-else-if="item.routeType === 2">定制</span>
                                     <span v-else-if="item.routeType === 3">取消定制</span>
                                     <span v-else-if="item.routeType === 4">普通上行</span>
                                 </td>
                                 <td>
                                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteServiceRoute(item.cpServiceRouteId)"></el-button>
                                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="editServiceSCodeRoute(item,  scope.row.serviceName,  scope.row.serviceCode)"></el-button>
                                    <el-button size="mini" type="primary" @click="simulateSyncClick(item,  scope.row.serviceName,  scope.row.serviceCode)">模拟同步</el-button>
                                 </td>
                            </tr>
                        </table>
                    </template>
                </el-table-column>
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
                        <span v-if="scope.row.syncType === 1">成功/失败</span>
                        <span v-if="scope.row.syncType === 2">成功</span>
                    </template>
                </el-table-column>
                <el-table-column label="同步协议">
                    <template slot-scope="scope">
                        <span v-if="scope.row.syncProtocol === 1">MO_MR</span>
                        <span v-if="scope.row.syncProtocol === 2">MR</span>
                    </template>
                </el-table-column>
                <el-table-column label="风险规避">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isDeduct === 1">规避</span>
                        <span v-if="scope.row.isDeduct === 0">不规避</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1">激活</span>
                        <span v-if="scope.row.status === 2">同步暂停</span>
                        <span v-if="scope.row.status === 3">业务暂停</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-dropdown split-button type="primary"  @click="handleAddCpSrviceRoute(scope.row)">
                        添加指令
                            <el-dropdown-menu slot="dropdown">
                                <router-link :to="{name:'serviceCtrlConfig', params:{servicePkid: scope.row.servicePkid, serviceId: scope.row.serviceId, serviceName: scope.row.serviceName}}">
                                    <el-dropdown-item>开通省份</el-dropdown-item>
                                </router-link>
                                <el-dropdown-item @click.native="editPartnerServiceClick(scope.row)" divided command>编辑</el-dropdown-item>
                                <el-dropdown-item @click.native="deletePartnerServiceClick(scope.row)">删除</el-dropdown-item>
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
        <el-dialog :title="'添加/修改短信业务 -【' + selectedPartnerName+'】'" :visible.sync="serviceFormVisible" :before-close="handleClose">
            <el-form :model="cpServiceTemp" :rules="cpServiceRules" ref="addCPServiceForm" label-position="left" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="业务编号" prop="serviceCodeId">
                        <el-input v-model="cpServiceTemp.serviceId" placeholder="业务编号" style="width:100px;" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="业务代码" prop="serviceCode">
                        <el-select v-model="cpServiceTemp.serviceCode" placeholder="请选择" @change="onServinceCodeSelected">
                          <el-option v-for="item in serviceCodeList" :key="item.codePk" :value="item.codeId" :label="item.codeId + ' | ' + item.codeName"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="价格(分)" prop="feeValue">
                        <el-input v-model="cpServiceTemp.feeValue" placeholder="价格" style="width:100px;" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="业务名称" prop="serviceName">
                    <el-input v-model="cpServiceTemp.serviceName" placeholder="业务名称" style="width:300px;"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="分成比例" prop="proportion">
                        <el-input-number v-model="cpServiceTemp.proportion" placeholder="分成比例" :precision="2" :step="0.01" :max="10"></el-input-number>
                    </el-form-item>

                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="是否规避" prop="isDeduct">
                        <el-radio-group v-model="cpServiceTemp.isDeduct">
                            <el-radio :label="1">规避</el-radio>
                            <el-radio :label="0">不规避</el-radio>
                        </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
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
                  <el-col :span="12">
                    <el-form-item label="业务负责人" prop="agentMan">
                        <el-input v-model="cpServiceTemp.agentMan" placeholder="业务负责人" style="width: 200px;"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="技术负责人" prop="techMan">
                        <el-input v-model="cpServiceTemp.techMan" placeholder="技术负责人" style="width: 200px;"></el-input>
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
                <el-button @click="serviceFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addCPServiceForm')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加/修改指令" :visible.sync="cpSerivceRouteFormVisible">
            <el-form :model="serviceRouteTemp" :rules="cpServiceRouteRules" ref="addcpServiceRouteForm" label-position="left" label-width="100px">
                <el-form-item label="业务名称" prop="serviceName">
                    <el-input v-model="serviceRouteTemp.serviceName" placeholder="业务名称" style="width:200px;" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="业务代码" prop="serviceCode">
                    <el-input v-model="serviceRouteTemp.serviceCode" placeholder="业务代码" style="width:100px;" :disabled="true"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="指令" prop="scodeRoutePkid">
                            <el-select v-model="serviceRouteTemp.scodeRoutePkid" placeholder="请选择" @change="orderChange">
                                <el-option v-for="item in serviceCodeRouteList" :key="item.codeRouteId" :label="handleLable(item, 1)" :value="item.codeRouteId"></el-option>
                            </el-select>
                            <el-input v-model="serviceRouteTemp.routeCodeExt" placeholder="扩展" style="width:100px;"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="指令匹配" prop="routeCodeCheckFlag">
                    <el-select v-model="serviceRouteTemp.routeCodeCheckFlag" placeholder="请选择">
                        <el-option v-for="item in routeTypeOptions" :key="item.type" :label="item.label" :value="item.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="目的号码" prop="orderDest">
                            <el-select v-model="serviceRouteTemp.dest" placeholder="请选择" :disabled="true">
                                <el-option v-for="item in serviceCodeRouteList" :key="item.codeRouteId" :label="handleLable(item, 2)" :value="item.codeRouteId"></el-option>
                            </el-select>
                            <el-input v-model="serviceRouteTemp.routeDestExt" placeholder="扩展" style="width:100px;"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-form-item label="目的号码匹配" prop="routeDestCheckFlag">
                    <el-select v-model="serviceRouteTemp.routeDestCheckFlag" placeholder="请选择">
                        <el-option v-for="item in routeTypeOptions" :key="item.type" :label="item.label" :value="item.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="routeType">
                    <el-radio-group v-model="serviceRouteTemp.routeType" :disabled='true'>
                        <el-radio :label="1">点播</el-radio>
                        <el-radio :label="2">定制</el-radio>
                        <el-radio :label="3">取消定制</el-radio>
                        <el-radio :label="4">普通上行</el-radio>
                    </el-radio-group>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cpSerivceRouteFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('addcpServiceRouteForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from "element-ui";
import { fetchPartnerList } from "@/api/partner";
import { fetchPartnerServiceList, getCPSN, addPartnerService, editPartnerService, deletePartnerService } from "@/api/partnerService";
import { addPartnerServiceRoute, editPartnerServiceRoute, deletePartnerServiceRoute } from '@/api/partnerServiceRoute'
import { fetchAllServiceCode } from '@/api/serviceCode';
import { fetchServiceCodeRouteList } from '@/api/serviceCodeRoute'
import { ServiceCodeEnum, CPServiceStatus, RouteTypeOptionsEnum } from "@/common"

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
            cpSerivceRouteFormVisible: false,
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
                isDeduct: 1,
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
            routeTypeOptions: RouteTypeOptionsEnum,
            serviceCodeRouteList: null,
            //业务指令路由
            serviceRouteTemp: {
                serviceName: undefined,//显示使用
                serviceCode: undefined,//显示使用
                dest: undefined,//临时使用
                //后台实体
                cpServiceRouteId: undefined,
                gatewayPkid: undefined,
                gatewayPort: undefined,
                cpServicePkid: undefined,
                cpServiceId: undefined,
                scodeRoutePkid: undefined,
                routeCode: undefined,
                routeCodeExt: undefined,
                routeCodeCheckFlag: undefined,
                routeDest: undefined,
                routeDestExt: undefined,
                routeDestCheckFlag: undefined,
                routeType: undefined
            },
            cpServiceRules: {

            },
            cpServiceRouteRules: {

            }
        }
    },
    methods: {
        init() {
            this.fetchPartnerList()
            this.fetchSmsServiceList()
            fetchAllServiceCode({}).then((res)=>{
                if (res.code === 0)
                    this.serviceCodeList = res.data.serviceCodeList
            })
        },
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
                isDeduct: 1,
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
        onServinceCodeSelected(value) {
            this.serviceCodeList.forEach((item, index, array)=>{
                if (item.codeId === value) {
                    console.log(JSON.stringify(item))
                    this.cpServiceTemp.feeValue = item.feeValue
                    this.cpServiceTemp.serviceCodePkid = item.codePk
                    this.cpServiceTemp.gatewayPkid = item.gatewayId
                    this.cpServiceTemp.gatewayPort = item.gatewayPort

                }
            })
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
            this.$nextTick(() => { this.$refs["addCPServiceForm"].clearValidate() });
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_=>{
                done();
            })
            .catch(_ => {});
        },
        resetCpServiceRoute() {
            this.serviceRouteTemp.serviceName = undefined,
            this.serviceRouteTemp.serviceCode = undefined,
            this.serviceRouteTemp.dest = undefined,
            //后台实体
            this.serviceRouteTemp.cpServiceRouteId = undefined,
            this.serviceRouteTemp.gatewayPkid = undefined,
            this.serviceRouteTemp.gatewayPort = undefined,
            this.serviceRouteTemp.cpServicePkid = undefined,
            this.serviceRouteTemp.cpServiceId = undefined,
            this.serviceRouteTemp.scodeRoutePkid = undefined,
            this.serviceRouteTemp.routeCode = undefined,
            this.serviceRouteTemp.routeCodeExt = undefined,
            this.serviceRouteTemp.routeCodeCheckFlag = undefined,
            this.serviceRouteTemp.routeDest = undefined,
            this.serviceRouteTemp.routeDestExt = undefined,
            this.serviceRouteTemp.routeDestCheckFlag = undefined,
            this.serviceRouteTemp.routeType = undefined
        },
        getServiceCodeRouteList(serviceCodePkid) {
            fetchServiceCodeRouteList({serviceCodePkid: serviceCodePkid}).then(res=>{
                if (res.code === 0) {
                    this.serviceCodeRouteList = res.data.serviceCodeRouteList
                } else
                    this.serviceCodeRouteList = null
            })
        },
        handleAddCpSrviceRoute(row) {//添加业务路由指令
            //获取代码指令集合
            this.getServiceCodeRouteList(row.serviceCodePkid)
            //初始化数据
            this.resetCpServiceRoute()//从cpservice跳转
            this.serviceRouteTemp.serviceName = row.serviceName
            this.serviceRouteTemp.serviceCode = row.serviceCode
            this.serviceRouteTemp.gatewayPkid = row.gatewayPkid
            this.serviceRouteTemp.gatewayPort = row.gatewayPort
            this.serviceRouteTemp.cpServicePkid = row.servicePkid
            this.serviceRouteTemp.cpServiceId = row.serviceId            
            this.cpSerivceRouteFormVisible = true
            this.$nextTick(() => { this.$refs["addcpServiceRouteForm"].clearValidate() })
        },
        handleLable(item, type) {
            if (type === 1) {
                if (item.orderCodeCheckFlag === 1)
                    return item.orderCode + ' - (精确)'
                else if (item.orderCodeCheckFlag === 2)
                    return item.orderCode + ' - (模糊)'
                else if (item.orderCodeCheckFlag === 3)
                    return item.orderCode + ' - (正则)'
            } else {
                if (item.orderDestCheckFlag === 1)
                    return item.orderDest + ' - (精确)'
                else if (item.orderDestCheckFlag === 2)
                    return item.orderDest + ' - (模糊)'
                else if (item.orderDestCheckFlag === 3)
                    return item.orderDest + ' - (正则)'
            }
        },
        orderChange(value) {//指令选择后改变
            this.serviceCodeRouteList.forEach((item, index, array)=>{
                if (item.codeRouteId === value) {
                    this.serviceRouteTemp.dest = item.codeRouteId
                    this.serviceRouteTemp.routeCode = item.orderCode
                    this.serviceRouteTemp.routeDest = item.orderDest
                    this.serviceRouteTemp.routeType = item.type
                }
            })
        },
        editPartnerServiceClick(row) {
            this.resetCpServiceTemp()
            this.$nextTick(() => { this.$refs["addCPServiceForm"].clearValidate() });
            this.cpServiceTemp.servicePkid = row.servicePkid,
            this.cpServiceTemp.serviceId = row.serviceIdExtend,
            this.cpServiceTemp.serviceIdExtend = row.serviceIdExtend,
            this.cpServiceTemp.serviceName = row.serviceName,
            this.cpServiceTemp.serviceCodePkid = row.serviceCodePkid,
            this.cpServiceTemp.serviceCode = row.serviceCode,
            this.cpServiceTemp.gatewayPkid = row.gatewayPkid,
            this.cpServiceTemp.gatewayPort = row.gatewayPort,
            this.cpServiceTemp.feeValue = row.feeValue,
            this.cpServiceTemp.proportion = row.proportion,
            this.cpServiceTemp.isDeduct = row.isDeduct,
            this.cpServiceTemp.status = row.status,
            this.cpServiceTemp.alterMo = row.alterMo,
            this.cpServiceTemp.registMessage = row.registMessage,
            this.cpServiceTemp.cancelMessage = row.cancelMessage,
            this.cpServiceTemp.registFailMessage = row.registFailMessage,
            this.cpServiceTemp.cancelFailMesage = row.cancelFailMesage,
            this.cpServiceTemp.moUrl = row.moUrl,
            this.cpServiceTemp.mrUrl = row.mrUrl,
            this.cpServiceTemp.handleUrl = row.handleUrl,
            this.cpServiceTemp.syncType = row.syncType,
            this.cpServiceTemp.syncProtocol = row.syncProtocol,
            this.cpServiceTemp.agentMan = row.agentMan,
            this.cpServiceTemp.techMan = row.techMan

            this.serviceFormVisible = true
        },
        deletePartnerServiceClick(row) {

        },
        editServiceSCodeRoute(row, serviceName, serviceCode) {//编辑合作方业务路由指令
            console.log(JSON.stringify(row))
            this.getServiceCodeRouteList(row.serviceCodeRoute.serviceCodePkid)//获取业务代码指令
            //初始化实体类
            this.serviceRouteTemp.serviceName = serviceName
            this.serviceRouteTemp.serviceCode = serviceCode

            this.serviceRouteTemp.dest = row.scodeRoutePkid
            this.serviceRouteTemp.cpServiceRouteId = row.cpServiceRouteId
            this.serviceRouteTemp.gatewayPkid = row.gatewayPkid
            this.serviceRouteTemp.gatewayPort = row.gatewayPort
            this.serviceRouteTemp.cpServicePkid = row.cpServicePkid
            this.serviceRouteTemp.cpServiceId = row.cpServiceId
            this.serviceRouteTemp.scodeRoutePkid = row.scodeRoutePkid
            this.serviceRouteTemp.routeCode = row.serviceCodeRoute.orderCode
            this.serviceRouteTemp.routeCodeExt = row.routeCodeExt
            this.serviceRouteTemp.routeCodeCheckFlag = row.routeCodeCheckFlag
            this.serviceRouteTemp.routeDest = row.serviceCodeRoute.orderDest
            this.serviceRouteTemp.routeDestExt = row.routeDestExt
            this.serviceRouteTemp.routeDestCheckFlag = row.routeDestCheckFlag
            this.serviceRouteTemp.routeType = row.routeType

            //显示菜单
            this.cpSerivceRouteFormVisible = true
        },
        deleteServiceRoute(row) {
            
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (formName === 'addCPServiceForm') {
                            if (this.cpServiceTemp.servicePkid == null) {//添加合作方业务
                                addPartnerService(this.cpServiceTemp).then(res=> {
                                    if (res.code === 0) {
                                        this.addCPServiceForm = false
                                        this.init()
                                        this.$notify({title: "成功", message: "创建成功", type: "success", duration: 2000})
                                    } else {
                                        this.$notify({title: "失败", message: "添加失败", type: "error", duration: 2000})
                                    }
                                })
                            } else {//编辑
                                editPartnerService(this.cpServiceTemp).then(res=>{
                                    if (res.code === 0) {
                                        this.addCPServiceForm = false
                                        this.init()
                                        this.$notify({title: "成功", message: "编辑成功", type: "success", duration: 2000})
                                    } else {
                                        this.$notify({title: "失败", message: "编辑失败", type: "error", duration: 2000})
                                    }
                                })
                            }
                        }  else if (formName === 'addcpServiceRouteForm') {//增加合作方业务路由指令

                            if (this.serviceRouteTemp.cpServiceRouteId == null) {//添加指令
                               // 拼接指令和目的号
                               if (this.serviceRouteTemp.routeCodeExt != null) {
                                   this.serviceRouteTemp.routeCode = this.serviceRouteTemp.routeCode + this.serviceRouteTemp.routeCodeExt
                               }
                               if (this.serviceRouteTemp.routeDestExt != null) {
                                   this.serviceRouteTemp.routeDest = this.serviceRouteTemp.routeDest + this.serviceRouteTemp.routeDestExt
                               }
                                addPartnerServiceRoute(this.serviceRouteTemp).then(res => {
                                    if (res.code === 0) {
                                        this.cpSerivceRouteFormVisible = false
                                        this.init()
                                        this.$notify({title: "添加成功", message: "添加路由指令成功", type: "success", duration: 2000})
                                    } else 
                                        this.$notify({title: "添加失败", message: "添加路由指令失败", type: "success", duration: 2000})
                                })
                            } else {//编辑指令
                                if (this.serviceRouteTemp.routeCodeExt != null) {
                                    this.serviceRouteTemp.routeCode = this.serviceRouteTemp.routeCode + this.serviceRouteTemp.routeCodeExt
                                }
                                if (this.serviceRouteTemp.routeDestExt != null) {
                                    this.serviceRouteTemp.routeDest = this.serviceRouteTemp.routeDest + this.serviceRouteTemp.routeDestExt
                                }
                                editPartnerServiceRoute(this.serviceRouteTemp).then(res => {
                                    if (res.code === 0) {
                                        this.cpSerivceRouteFormVisible = false
                                        this.init()
                                        this.$notify({title: "修改成功", message: "修改路由指令成功", type: "success", duration: 2000})
                                    } else 
                                        this.$notify({title: "修改失败", message: "修改路由指令失败", type: "success", duration: 2000})
                                })
                            }
                            
                        }
                            
                    }
            })
        },

    },
    created() {
        const cpId = this.$route.params && this.$route.params.partnerId
        const cpName = this.$route.params && this.$route.params.partnerName
        this.listQuery.partnerId = cpId
        this.selectedPartnerName = cpName
        this.init()
    }
}
</script>



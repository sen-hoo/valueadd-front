<template>
    <div class="app-container">
        <div class="filter-container">
            <el-select v-model="partnerId" placeholder="请选择合作方">
                <el-option v-for="item in partnerList" :key="item.cpId" :label="item.cpName" :value="item.cpId"></el-option>
            </el-select>
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

        </el-dialog>
        <el-dialog title="添加指令" :visible.sync="directivesFormVisible">

        </el-dialog>
    </div>
</template>
<script>
import { fetchPartnerList } from "@/api/partner";
import { fetchPartnerServiceList } from "@/api/partnerService";
import { ServiceCodeEnum } from "@/common"
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
            temp: {
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
                status: undefined,
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
        }
    },
    methods: {
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

    },
    created() {
        this.fetchPartnerList()
        this.fetchSmsServiceList()
    }
}
</script>



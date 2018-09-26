<template>
    <div class="app-container">
        <div class="filter-container">
                    <span class="filter-item">合作方业务：</span>
                    <el-select v-model="listQuery.cpServicePKId" class="filter-item" placeholder="请选择合作方业务">
                        <el-option v-for="item in cpServiceList" :key="item.servicePkid" :label="item.serviceName + ' | ' + item.cpName" :value="item.servicePkid"></el-option>
                    </el-select>
                    <span class="filter-item">Trace ID：</span>
                    <el-input v-model="listQuery.traceId" placeholder="请输入traceId" class="filter-item" style="width: 300px;"></el-input>
                    <span class="filter-item">操作类型：</span>
                    <el-radio-group v-model="listQuery.fromWhere" class="filter-item">
                        <el-radio :label="1">程序同步</el-radio>
                        <el-radio :label="2">人工同步</el-radio>
                    </el-radio-group>
                    <div style="margin-top:10px;">
                        <span class="filter-item">业务类型：</span>
                        <el-checkbox-group v-model="listQuery.typeList" class="filter-item">
                            <el-checkbox :label=1>短信上行</el-checkbox>
                            <el-checkbox :label=10>短信状态报告</el-checkbox>
                            <el-checkbox :label=3>IVR</el-checkbox>
                            <el-checkbox :label=4>联网业务</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="float:right; margin-right:20px;">
                        <el-button type="primary" class="filter-item" @click="resetQueryParams">重置</el-button>
                        <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchButtonClick">搜索</el-button>
                    </div>
            
        </div>
        <div class="table-container">
            <el-table :data="syncCPLogList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column label="TraceId" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.traceId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="合作方业务ID" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.cpServiceId}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="请求连接" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.reqUrl}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="请求返回" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.callRet}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="请求时间" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { Message } from "element-ui";
import { fetchAllPartnerServiceList } from "@/api/partnerService";
import { fetchSyncCPLogList } from '@/api/syncCPLog'
export default {
    data() {
        return {
            listQuery: {
                fromWhere: 1,
                typeList: [1, 10, 3, 4],
                traceId: undefined,
                cpServicePKId: undefined
            },
            cpServiceList: null,
            listLoading: false,
            syncCPLogList: null

        }
    },
    methods: {
        resetQueryParams() {
            this.listQuery = {
                fromWhere: 1,
                typeList: [1, 10, 3, 4],
                traceId: undefined,
                cpServicePKId: undefined
            }
        },
        searchButtonClick() {
            this.listLoading = true
            setTimeout(() => { this.listLoading = false }, 1.5 * 1000);
            fetchSyncCPLogList(this.listQuery).then((res)=>{
                if (res.code === 0) {
                    this.syncCPLogList = res.data.syncCPLogList
                } else {
                    Message({ message: res.data.msg, type: "error", duration: 2 * 1000})
                }

            })
            
        }

    },
    created() {
        let traceId = this.$route.params && this.$route.params.traceId
        if (traceId != null) {
            this.listQuery.traceId = traceId
            fetchSyncCPLogList(this.listQuery).then((res)=>{
                if (res.code === 0) {
                    this.syncCPLogList = res.data.syncCPLogList
                } else {
                    Message({ message: res.data.msg, type: "error", duration: 2 * 1000})
                }

            })
        }
        fetchAllPartnerServiceList({}).then((res) => {
            if (res.code === 0) {
                this.cpServiceList = res.data.cpServiceList
            }
        })
    }

}
</script>


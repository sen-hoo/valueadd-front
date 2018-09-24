<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-item">
                <span class="filter-item">开始时间：</span>
                <el-date-picker v-model="listQuery.startDate" type="datetime" placeholder="开始时间" class="filter-item"></el-date-picker>
                <span class="filter-item">结束时间：</span>
                <el-date-picker v-model="listQuery.endDate" type="datetime" placeholder="结束时间" class="filter-item"></el-date-picker>
                <span class="filter-item" style="margin-left:10px;">状态：</span>
                <el-checkbox-group v-model="listQuery.statusList" class="filter-item">
                    <el-checkbox label="DELIVRD">成功</el-checkbox>
                    <el-checkbox label="FAILED">失败</el-checkbox>
                </el-checkbox-group>
                <span class="filter-item" style="margin-left:10px;">规避状态：</span>
                <el-radio-group v-model="listQuery.flag" class="filter-item">
                    <el-radio :label="9">全部</el-radio>
                    <el-radio :label="0">正常</el-radio>
                    <el-radio :label="1">规避</el-radio>
                </el-radio-group>
            </div>
            <div>
                <span class="filter-item"> 业务代码：</span>
                <el-select v-model="listQuery.serviceCodeId" placeholder="请选择业务代码" @change="onPartnerSelected" class="filter-item">
                    <el-option v-for="item in partnerList" :key="item.cpId" :label="item.cpName" :value="item.cpId"></el-option>
                </el-select>
                <span class="filter-item">合作方业务：</span>
                <el-select v-model="listQuery.partnerId" placeholder="请选择合作方业务" @change="onPartnerSelected" class="filter-item">
                    <el-option v-for="item in partnerList" :key="item.cpId" :label="item.cpName" :value="item.cpId"></el-option>
                </el-select>
            </div>
            <div style="float: right;" class="filter-item">
                <el-button type="primary" class="filter-item" @click="searchByKeyword">重置</el-button>
                <el-button type="primary" class="filter-item" icon="el-icon-search" @click="searchByKeyword">搜索</el-button>
                <el-button type="primary" class="filter-item" @click="exportData">导出</el-button>
                <el-button type="primary" class="filter-item" @click="reSyncPartner">重新同步</el-button>
            </div>
        </div>
        <div class="table-container">
            <el-table :data="valueaddOrderList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="合作方">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="业务代码">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="费率(分)">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="订购号码">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="目的号码">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="计费号码">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Linkid">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Flag">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="TraceId">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listQuery: {
                serviceCodeId: undefined,
                partnerServiceId: undefined,
                statusList: ['DELIVRD', 'FAILED'],
                flag: 9,
                startTime: undefined,
                endTime: undefined,
                pageSize: 20,
                pageNumber: 1
            },
            total: 0,
            valueaddOrderList: null,

        }
    },
    methods: {

    },
    created() {

    }

}
</script>


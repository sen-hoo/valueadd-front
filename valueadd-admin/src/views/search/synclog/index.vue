<template>
    <div class="app-container">
        <div class="filter-container">
            <el-row> 
                <el-col :span="3">
                    <span>合作方业务</span>
                </el-col>
                <el-col :span="9">
                    <el-select v-model="listQuery.partnerId" class="filter-item" placeholder="请选择合作方业务" @change="onPartnerSelected">
                        <el-option v-for="item in partnerList" :key="item.cpId" :label="item.cpName" :value="item.cpId"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <span>Trace ID:</span>
                </el-col>
                <el-col :span="9">
                    <el-input v-model="listQuery.traceId" placeholder="请输入traceId" class="filter-item" style="width: 300px;"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <span>业务类型</span>
                </el-col>
                <el-col :span="9">
                    <el-checkbox-group v-model="listQuery.typeList">
                        <el-checkbox label="1">短信上行</el-checkbox>
                        <el-checkbox label="10">短信状态报告</el-checkbox>
                        <el-checkbox label="3">IVR</el-checkbox>
                        <el-checkbox label="3">联网业务</el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="3">
                    <span>操作类型</span>
                </el-col>
                <el-col :span="9">
                    <el-radio-group v-model="listQuery.fromWhere">
                        <el-radio :label="1">程序同步</el-radio>
                        <el-radio :label="2">人工同步</el-radio>
                    </el-radio-group>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="4" :offset="20">
                    <el-button type="primary" class="filter-item" @click="searchByKeyword">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
                </el-col>
            </el-row>
            <div style="float:right;">
            </div>

        </div>
        <div class="table-container">
            <el-table :data="valueaddOrderList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column label="TraceId">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column label="合作方">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column label="请求连接">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column label="请求返回">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column label="请求时间">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listQuery: {
                fromWhere: 1,
                typeList: ['1', '10', '3', '4'],
                traceId: undefined,
                partnerServiceId: undefined,
                pageSize: 20,
                pageNumber: 1
            },
            valueaddOrderList: null,

        }
    },
    methods: {

    },
    created() {

    }

}
</script>


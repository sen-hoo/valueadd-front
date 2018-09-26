<template>
    <div class="app-container">
        <div class="filter-container">
            <el-date-picker v-model="listQuery.startTime" type="date" placeholder="开始时间" class="filter-item"></el-date-picker>
            <el-date-picker v-model="listQuery.endTime" type="date" placeholder="结束时间" class="filter-item"></el-date-picker>
            <el-input v-model="listQuery.mobile" placeholder="手机号码" class="filter-item" style="width: 300px;"></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchButtonClick">搜索</el-button>
        </div>
        <div class="table-container">
            <el-table :data="valueaddOrderList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="业务代码">
                    <template slot-scope="scope">
                        <span>{{scope.row.scodeId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="业务名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.serviceCode.codeName}}</span>
                    </template>
                </el-table-column>
                 <el-table-column align="center" label="费率(分)">
                    <template slot-scope="scope">
                        <span>{{scope.row.feeCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="长号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.srcTermid}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="目的号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.destTermid}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="计费号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.feeTermid}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="上行内容">
                    <template slot-scope="scope">
                        <span>{{scope.row.alterMoContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="上行时间">
                    <template slot-scope="scope">
                        <span>{{packageTimeParser(scope.row.moTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="下行内容">
                    <template slot-scope="scope">
                        <span>{{scope.row.mtContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="下行时间">
                    <template slot-scope="scope">
                        <span>{{packageTimeParser(scope.row.sendTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="成功时间">
                    <template slot-scope="scope">
                        <span>{{packageTimeParser(scope.row.succTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Linkid">
                    <template slot-scope="scope">
                        <span>{{scope.row.linkid}}</span>
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
import { parseTime } from "@/utils"
import { Message } from "element-ui";
import { fetchKefuValueaddOrderList } from "@/api/kefu";
export default {

    data() {
        return {
            listQuery: {
                mobile: undefined,
                startTime: undefined,
                endTime: undefined,
                pageSize: 20,
                pageNumber: 1
            },
            total: 0,
            valueaddOrderList: null,
            listLoading: false,

        }
    },
    methods: {
        fetchList() {
            if (this.listQuery.mobile === '') this.listQuery.mobile = undefined
            let params = Object.assign({}, this.listQuery)
            if (this.listQuery.startTime != null)
                params.startTime = parseTime(params.startTime, '{y}-{m}-{d}')//转移为字符串
            if (this.listQuery.endTime != null)
                params.endTime = parseTime(params.endTime, '{y}-{m}-{d}')//转移为字符串
            fetchKefuValueaddOrderList(params).then((res)=>{
                if (res.code === 0) {
                    this.valueaddOrderList = res.data.valueaddOrderList
                    this.total = res.data.page.total
                } else {
                    Message({ message: res.data.msg, type: "error", duration: 2 * 1000})
                }
            })
        },
        handleCurrentChange(pageNumber) {
            this.listQuery.pageNumber = pageNumber;
            this.searchButtonClick();
        },
        handleSizeChange(pageSize) {
            this.listQuery.pageSize = pageSize;
            this.searchButtonClick();
        },
        searchButtonClick() {
            if (this.listQuery.mobile == null) {
                Message({ message: '手机号码不能为空', type: "error", duration: 2 * 1000})
                return ;
            }
            this.listLoading = true
            this.fetchList()
            setTimeout(() => { this.listLoading = false }, 1.5 * 1000);
        },
        packageTimeParser(timeStamp) {
            return parseTime(timeStamp)
        }
    },
    created() {

    }

}
</script>


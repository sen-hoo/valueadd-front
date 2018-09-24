<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.mobile" placeholder="手机号码" class="filter-item" style="width: 300px;"></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
        </div>
        <div class="table-container">
            <el-table :data="valueaddOrderList" v-loading="listLoading" stripe highlight-current-row>
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
                <el-table-column align="center" label="上行内容">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="上行时间">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="下行内容">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="下行时间">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="成功时间">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Linkid">
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
                mobile: undefined,
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


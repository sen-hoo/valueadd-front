<template>
    <div class="dashboard-container">
        <div class="dashboard-editor-container">
            <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"></github-corner>
            <div class="filter-container">
                <span class="filter-item">日期：</span>
                <el-date-picker v-model="queryParams.startDate" type="date" placeholder="选择日期" class="filter-item"></el-date-picker>
                <span class="filter-item">合作方业务：</span>
                <!-- TODO 级联选择器 -->
                <el-select v-model="queryParams.serivceCode" class="filter-item">
                    <el-option v-for="item in serviceCodeList" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
                <span class="filter-item">省份：</span>
                <el-select v-model="queryParams.serivceCode" class="filter-item">
                    <el-option v-for="item in provinceList" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
                <el-checkbox v-model="timerRefresh" class="filter-item" style="margin-left:20px;">定时刷新</el-checkbox>
            </div>
            <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                <div>
                    <span>合作方矩形图：</span>
                </div>
            </el-row>
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                <div>
                    <span>分省矩形图：</span>
                </div>
            </el-row>
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
                <div>
                    <span>分时曲线图：</span>
                </div>
                <line-chart :chart-data="lineChartData"></line-chart>
            </el-row>
        </div>
    </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner"
import PanelGroup from "./components/PanelGroup"
import LineChart from "./components/LineChart"
const lineChartData = {
    newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
    }
}

export default {
    name: "dashboard-spcode",
    components: {
        GithubCorner,
        PanelGroup,
        LineChart
    },
    data() {
        return {
            lineChartData: lineChartData.newVisitis,
            queryParams: {
                serviceCode: undefined,
                startDate: undefined
            },
            serviceCodeList: null,
            provinceList: null,
            timerRefresh: false
        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type];
        }
    }
}
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}
</style>
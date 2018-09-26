<template>
    <div class="app-container">
        <div class="filter-container">
            <div class="filter-item">
                <span class="filter-item">开始时间：</span>
                <el-date-picker v-model="listQuery.startTime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm:ss" class="filter-item"></el-date-picker>
                <span class="filter-item">结束时间：</span>
                <el-date-picker v-model="listQuery.endTime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm:ss" class="filter-item"></el-date-picker>
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
                <el-select v-model="listQuery.sCodePKId" placeholder="请选择业务代码" class="filter-item">
                    <el-option v-for="item in serviceCodeList" :key="item.codePk" :label="item.codeId + ' | ' + item.codeName" :value="item.codePk"></el-option>
                </el-select>
                <span class="filter-item">合作方业务：</span>
                <el-select v-model="listQuery.servicePKId" placeholder="请选择合作方业务" class="filter-item">
                    <el-option v-for="item in cpServiceList" :key="item.servicePkid" :label="item.serviceId + '-' + item.serviceName + ' | ' + item.cpName" :value="item.servicePkid"></el-option>
                </el-select>
            </div>
            <div style="float: right;" class="filter-item">
                <el-button type="primary" class="filter-item" @click="resetQueryParams">重置</el-button>
                <el-button type="primary" class="filter-item" icon="el-icon-search" @click="searchButtonClick">搜索</el-button>
                <el-button type="primary" class="filter-item" @click="exportData">导出</el-button>
                <el-button type="primary" class="filter-item" @click="reSyncPartner">重新同步</el-button>
            </div>
        </div>
        <div class="table-container">
            <el-table :data="valueaddOrderList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="合作方">
                    <template slot-scope="scope">
                        <span>{{scope.row.partner.cpName + '(' + scope.row.cpServiceId + ')' }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="业务代码">
                    <template slot-scope="scope">
                        <span>{{scope.row.scodeId}}</span>
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
                <!-- <el-table-column align="center" label="目的号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.destTermid}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column align="center" label="计费号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.feeTermid}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Linkid">
                    <template slot-scope="scope">
                        <span>{{scope.row.linkid}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Flag">
                    <template slot-scope="scope">
                        <span>{{scope.row.flagDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="省份">
                    <template slot-scope="scope">
                        <span v-if="scope.row.haoduan != null">{{scope.row.haoduan.province}}</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="城市">
                    <template slot-scope="scope">
                        <span v-if="scope.row.haoduan != null">{{scope.row.haoduan.city}}</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="TraceId">
                    <template slot-scope="scope">
                        <span>{{scope.row.traceId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-dropdown split-button type="primary" @click="showDetailClick(scope.row)">
                            查看详情
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="scope.row.flag === 1" @click.native="editPartnerServiceClick(scope.row)" divided command>同步合作方</el-dropdown-item>
                                <router-link :to="{name:'synclog', params:{traceId: scope.row.traceId}}">
                                    <el-dropdown-item>查看同步</el-dropdown-item>
                                </router-link>
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
        <el-dialog title="订购详情" :visible.sync="dataDetailVisible" style="padding: 10px; 30px;">
            <div style="font-size:14px; color: #606266; font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;">
                <label style="font-size:18px;">上行(Mo)详情</label>
                <table style="border-collapse: separate;border-spacing: 2px;width:100%;margin-top:10px;text-align: center;">
                    <tr style="height: 30px;">
                        <td style="border: 1px solid #cad9ea; width:40%;">手机号码：</td>
                        <td style="border: 1px solid #cad9ea; width:60%;">{{moRecord.srcTermid}}</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td style="border: 1px solid #cad9ea; width:40%;">上行内容：</td>
                        <td style="border: 1px solid #cad9ea; width:60%;">{{moRecord.msgContent}}</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td style="border: 1px solid #cad9ea; width:40%;">上行时间：</td>
                        <td style="border: 1px solid #cad9ea; width:60%;">{{packageTimeParser(moRecord.rcvTime)}}</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td style="border: 1px solid #cad9ea; width:40%;">LinkId：</td>
                        <td style="border: 1px solid #cad9ea; width:60%;">{{moRecord.linkid}}</td>
                    </tr>
                </table>
            </div>
            <!-- <div>
                <span>Mt详情</span>
                <table>
                    <tr>
                        <td>处理手机号码：</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>下发内容：</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>处理时间：</td>
                        <td></td>
                    </tr>
                </table>
            </div> -->
            <div style="font-size:14px; color: #606266; margin-top:15px; font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif; margin-bottom:20px;">
                <label style="font-size:18px;">状态报(Mr)详情</label>
                <table style="border-collapse: separate;border-spacing: 2px;width:100%; margin-top:10px;text-align: center;">
                    <tr style="height: 30px;">
                        <td style="border: 1px solid #cad9ea; width:40%;">LinkId：</td>
                        <td style="border: 1px solid #cad9ea; width:60%;">{{mrRecord.linkid}}</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td style="border: 1px solid #cad9ea; width:40%;">状态标识：</td>
                        <td style="border: 1px solid #cad9ea; width:60%;">{{mrRecord.status}}</td>
                    </tr>
                    <tr style="height: 30px;">
                        <td style="border: 1px solid #cad9ea; width:40%;">状态报告时间：</td>
                        <td style="border: 1px solid #cad9ea; width:60%;">{{packageTimeParser(mrRecord.rcvTime)}}</td>
                    </tr>
                </table>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from "element-ui";
import { fetchValueaddList } from "@/api/valueaddOrder";
import { fetchAllServiceCode } from "@/api/serviceCode";
import { fetchAllPartnerServiceList } from "@/api/partnerService";
import { parseTime } from "@/utils";

export default {
    data() {
        return {
            listQuery: {
                sCodePKId: undefined,
                servicePKId: undefined,
                statusList: ["DELIVRD", "FAILED"],
                flag: 9,
                startTime: undefined,
                endTime: new Date(),
                pageSize: 20,
                pageNumber: 1
            },
            total: 0,
            serviceCodeList: null,
            cpServiceList: null,
            listLoading: false,
            valueaddOrderList: null,
            dataDetailVisible: false,
            moRecord: {
                srcTermid: undefined,
                msgContent: undefined,
                rcvTime: undefined,
                linkid: undefined
            },
            mrRecord: {
                linkid: undefined,
                status: undefined,
                rcvTime: undefined
            }
        };
    },
    methods: {
        resetQueryParams() {
            let currTime = new Date();
            this.listQuery = {
                sCodePKId: undefined,
                servicePKId: undefined,
                statusList: ["DELIVRD", "FAILED"],
                flag: 9,
                startTime: new Date(
                    currTime.getFullYear(),
                    currTime.getMonth(),
                    currTime.getDate(),
                    0,
                    0,
                    0
                ),
                endTime: new Date(),
                pageSize: 20,
                pageNumber: 1
            };
        },
        searchButtonClick() {
            this.listLoading = true;
            this.fetchValueaddList();
            setTimeout(() => {
                this.listLoading = false;
            }, 1.5 * 1000);
        },
        fetchValueaddList() {
            let params = Object.assign({}, this.listQuery);
            params.startTime = parseTime(params.startTime); //转移为字符串
            params.endTime = parseTime(params.endTime); //转移为字符串
            fetchValueaddList(params).then(res => {
                if (res.code === 0) {
                    this.valueaddOrderList = res.data.valueaddOrderList;
                    this.total = res.data.page.total;
                } else {
                    this.listLoading = false;
                    Message({
                        message: res.data.msg,
                        type: "error",
                        duration: 2 * 1000
                    });
                }
            });
        },
        handleCurrentChange(pageNumber) {
            this.listQuery.pageNumber = pageNumber;
            this.searchButtonClick();
        },
        handleSizeChange(pageSize) {
            this.listQuery.pageSize = pageSize;
            this.searchButtonClick();
        },
        reSyncPartner() {},
        exportData() {},
        packageTimeParser(timeStamp) {
            return parseTime(timeStamp);
        },
        showDetailClick(row) {
            //mo
            this.moRecord.srcTermid = row.moRecord.srcTermid;
            this.moRecord.msgContent = row.moRecord.msgContent;
            this.moRecord.rcvTime = row.moRecord.rcvTime;
            this.moRecord.linkid = row.moRecord.linkid;
            //mr
            this.mrRecord.linkid = row.mrRecord.linkid;
            this.mrRecord.status = row.mrRecord.status;
            this.mrRecord.rcvTime = row.mrRecord.rcvTime;
            this.dataDetailVisible = true;
        }
    },
    created() {
        let currTime = new Date();
        this.listQuery.startTime = new Date(
            currTime.getFullYear(),
            currTime.getMonth(),
            currTime.getDate(),
            0,
            0,
            0
        );
        fetchAllPartnerServiceList({}).then(res => {
            if (res.code === 0) {
                this.cpServiceList = res.data.cpServiceList;
            }
        });
        fetchAllServiceCode({}).then(res => {
            if (res.code === 0) {
                this.serviceCodeList = res.data.serviceCodeList;
            }
        });
    }
};
</script>

<style rel="stylesheet/scss" scoped>
myTable {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
}
myTable td,
myTable th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
}
myTable thead th {
    background-color: #cce8eb;
    width: 100px;
}
myTable tr:nth-child(odd) {
    background: #fff;
}
myTable tr:nth-child(even) {
    background: #f5fafa;
}
</style>



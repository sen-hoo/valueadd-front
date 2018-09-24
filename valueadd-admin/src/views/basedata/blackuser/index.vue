<template>
    <div class="app-container">
        <div class="filter-container">
            <div>
                <el-input v-model="listQuery.mobile" placeholder="手机号码" class="filter-item" style="width: 300px;"></el-input>
                <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
                <el-button type="primary" @click="handleCreate" icon="el-icon-edit" class="filter-item">添加黑名单</el-button>
                <div class="filter-item" style="float: right;">
                    <el-date-picker v-model="value1" type="date" placeholder="开始时间"></el-date-picker>
                    <el-date-picker v-model="value1" type="date" placeholder="结束时间"></el-date-picker>
                    <el-button type="primary" @click="importBlacklist" icon="el-icon-edit">导入黑名单</el-button>

                </div>

            </div>

        </div>
        <div class="table-container">
            <el-table :data="dataList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="序号" width="65">
                    <template slot-scope="scope">
                        <span>{{scope.row.buserId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="手机号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.mobile}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="来源">
                    <template slot-scope="scope">
                        <span v-if="scope.row.fromWhere === 1">后台添加</span>
                        <span v-else-if="scope.row.fromWhere === 2">文件导入</span>
                        <span v-else-if="scope.row.fromWhere === 3">数据库导入</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="创建时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteOperation(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNumber" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="白名单" :visible.sync="dialogFormVisible">
            <el-form :model="temp" :rules="rules" ref="blacklistForm" label-position="left" label-width="20%">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="temp.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('blacklistForm')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="导出" :visible.sync="exportFormVisible">
            <el-form :model="temp" :rules="rules" ref="blacklistForm" label-position="left" label-width="20%">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="temp.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('blacklistForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { fetchBlacklist, addBlacklist, deleteBlacklist } from "@/api/basedata";
import { checkMobile } from "@/utils/validate"
import { parseTime } from "@/utils";
import { Message } from "element-ui";
export default {
    data() {
        return {
            temp: {
                mobile: undefined
            },
            dialogFormVisible: false,
            exportFormVisible: false,
            listLoading: true,
            dataList: null,
            total: null,
            listQuery: {
                mobile: undefined,
                pageSize: 20,
                pageNumber: 1
            },
            rules: {
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    { validator: checkMobile, trigger: "blur" }
                ]
            }
        }

    },
    created() {
        this.fetchList()
    },
    methods: {
        fetchList() {
            this.listLoading = true;
            if (this.listQuery.mobile === "") this.listQuery.mobile = undefined;
            fetchBlacklist(this.listQuery).then((res) => {
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);

                if (res.code === 0) {
                    (this.dataList = res.data.blacklist),
                        (this.total = res.data.page.total);
                } else {
                    Message({
                        message: res.data.msg,
                        type: "error",
                        duration: 3 * 1000
                    });
                    this.listLoading = false;
                }
            })
        },
        resetTemp() {
            this.temp = {
                mobile: undefined
            };
        },
        handleCreate() {
            //添加
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["blacklistForm"].clearValidate();
            });
            this.fetchList();
        },
        importBlacklist() {

        },
        exportBlacklist() {

        },
        searchByKeyword() {
            this.fetchList();
        },
        handleSizeChange(pageSize) {
            this.listQuery.pageSize = pageSize;
            this.fetchList();
        },
        handleCurrentChange(pageNumber) {
            this.listQuery.pageNumber = pageNumber;
            this.fetchList();
        },
        deleteOperation(row) {
            let params = { pkId: row.fuserId };
            deleteWhitelist(params).then(res => {
                if (res.code === 0) {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                        duration: 2000
                    });
                } else {
                    this.$notify({
                        title: "失败",
                        message: "删除失败",
                        type: "failed",
                        duration: 2000
                    });
                }
            });
            this.fetchList();
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    addWhitelist(this.temp).then(res => {
                        if (res.code === 0) {
                            this.dialogFormVisible = false;
                            this.dataList.unshift(this.temp);
                            this.$notify({
                                title: "成功",
                                message: "添加成功",
                                type: "success",
                                duration: 2000
                            });
                            this.fetchList();
                        } else {
                            this.$notify({
                                title: "失败",
                                message: "添加失败",
                                type: "failed",
                                duration: 2000
                            });
                        }
                    });
                }
            });
        }
    }


}
</script>


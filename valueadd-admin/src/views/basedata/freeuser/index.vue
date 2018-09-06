<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.mobile" placeholder="手机号码" class="filter-item" style="width: 300px;"></el-input>
            <el-button type="primary" icon="el-icon-search" class="filter-item" @click="searchByKeyword">搜索</el-button>
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit" class="filter-item">添加白名单</el-button>
        </div>

        <div class="talbe-container">
            <el-table :data="dataList" v-loading="listLoading" stripe highlight-current-row>
                <el-table-column align="center" label="序号(PK_ID)" width="65">
                    <template slot-scope="scope">
                        <span>{{scope.row.fuserId}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="手机号码">
                    <template slot-scope="scope">
                        <span>{{scope.row.mobile}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="合作方名称">
                    <template slot-scope="scope">
                        <span>{{scope.row.cpName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="来源">
                    <template slot-scope="scope">
                        <span>{{scope.row.fromWhere}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="创建时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>

        <el-dialog title="白名单" :visible.sync="dialogFormVisible">
            <el-form :model="temp" :rules="rules" ref="whitelistForm" label-position="left" label-width="20%">
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="temp.mobile" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('whitelistForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { fetchWhitelist, addWhitelist } from "@/api/basedata";
import { parseTime } from '@/utils';
import { Message } from "element-ui";
export default {
    data() {
        var checkMobile = (rule, value, callback) => {
            if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
                callback(new Error("请输入正确的手机号码"));
            } else callback();
        };
        return {
            temp: {
                mobile: undefined
            },
            dialogFormVisible: false,
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
        };
    },
    created() {
        this.fetchList();
    },
    methods: {
        fetchList() {
            this.listLoading = true;
            fetchWhitelist(this.listQuery).then(response => {
                if (response.code === 0) {
                    this.dataList = response.data.whitelist,
                    this.total = response.data.page.total
                } else {
                    Message({message: response.data.msg, type: "error", duration: 3 * 1000})
                    this.listLoading = false
                }

                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
            });
        },
        resetTemp() {
            this.temp = {
                mobile: undefined
            }
            //this.listQuery.mobile = undefined
        },
        handleCreate() {
            //添加
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["whitelistForm"].clearValidate();
            });
        },
        searchByKeyword() {
            this.fetchList()
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    addWhitelist(this.temp).then(() => {
                        this.list.unshift(this.temp);
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "成功",
                            message: "创建成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                }
            });
        }
    }
};
</script>

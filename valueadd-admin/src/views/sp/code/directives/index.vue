<template>
    <div class="app-container">
        <div>
            <span>[{{title}}]开通省份配置</span>
        </div>
        <div class="table-container">
            <el-table :data="openConfigList" v-loading="listLoading" stripe highlight-current-row height="800">
              <el-table-column label="PKID">
                  <template slot-scope="scope">
                      <span>{{scope.row.codeCtrlPkid}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="业务代码">
                  <template slot-scope="scope">
                      <span>{{scope.row.serviceCode}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="省份">
                  <template slot-scope="scope">
                      <span>{{scope.row.province}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="日限(元)">
                  <template slot-scope="scope">
                      <el-input-number v-model="scope.row.dayProfitLimit" placeholder=""></el-input-number>
                  </template>
              </el-table-column>
              <el-table-column label="月限(元)">
                  <template slot-scope="scope">
                      <el-input-number v-model="scope.row.monthProfitLimit" placeholder=""></el-input-number>
                  </template>
              </el-table-column>
              <el-table-column label="关闭地市(以,分割))">
                  <template slot-scope="scope">
                      <el-input v-model="scope.row.closedCity" placeholder=""></el-input>
                  </template>
              </el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                      <el-button size="small" type="primary" icon="el-icon-edit" @click="updateOperation(scope.row)">保存</el-button>
                  </template>
              </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { Message } from "element-ui";
import {fetchSCodeCtrlList, editSCodeCtrl} from "@/api/serviceCodeCtrl"
export default {
    created() {
        const sCodePKId = this.$route.params && this.$route.params.sCodePKId
        const sCodeName = this.$route.params && this.$route.params.sCodeName
        const query = {
            serviceCodePKId: sCodePKId
        }
        this.fetchDataList(query)
        this.title=sCodeName
        this.sCodePKId = sCodePKId
    },
    data() {
        return {
            temp: {
                codeCtrlPkid: undefined,
                dayProfitLimit: undefined,
                monthProfitLimit: undefined,
                closedCity: undefined
            },
            openConfigList: null,
            title: undefined,
            listLoading: false,
            sCodePKId: undefined

        }
    },
    methods: {
        fetchDataList(sCodePKId) {
            this.listLoading = true
            fetchSCodeCtrlList(sCodePKId).then((res)=>{
                setTimeout(() => { this.listLoading = false }, 1.5 * 1000);
                if (res.code === 0) {
                    this.openConfigList = res.data.openConfigList
                } else {
                    this.listLoading = false
                    Message({ message: res.data.msg, type: "error", duration: 3 * 1000 })  
                }
            })
        },
        updateOperation(row) {
            this.temp = {
                codeCtrlPkid: row.codeCtrlPkid,
                dayProfitLimit: row.dayProfitLimit,
                monthProfitLimit: row.monthProfitLimit,
                closedCity: row.closedCity
            }
            editSCodeCtrl(this.temp).then((res)=> {
                if (res.code === 0) {
                    this.$notify({title: "成功", message: "修改成功", type: "success",})
                    this.fetchDataList({serviceCodePKId: this.sCodePKId})
                } else {
                    this.$notify({title: "失败", message: "修改失败", type: "error",})
                }
            })
            
        }
    }
}
</script>



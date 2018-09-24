<template>
    <div class="app-container">
        <div style="padding-bottom: 20px; color: burlywood; font-weight: bold;">
            <span>【{{title}}】- 开通省份配置</span>
        </div>
        <div class="table-container">
            <el-table :data="cpServiceCtrlList" v-loading="listLoading" stripe highlight-current-row height="800">
              <el-table-column align="center" label="开始时间">
                  <template slot-scope="scope">
                      <span>{{scope.row.beginTime}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="结束时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.endTime}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="日限(元)">
                  <template slot-scope="scope">
                      <span>{{scope.row.dayProfitLimit}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="月限(元)">
                  <template slot-scope="scope">
                      <span>{{scope.row.monthProfitLimit}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="用户日限(元)">
                  <template slot-scope="scope">
                      <span>{{scope.row.dayUserLimit}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="用户月限(元)">
                  <template slot-scope="scope">
                      <span>{{scope.row.monthUserLimit}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="省份">
                  <template slot-scope="scope">
                      <span>{{scope.row.province}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="关闭地市">
                  <template slot-scope="scope">
                      <span>{{scope.row.closedCity}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="规避数">
                  <template slot-scope="scope">
                      <span>{{scope.row.deductNumber}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="规避基数">
                  <template slot-scope="scope">
                      <span>{{scope.row.deductBaseNumber}}</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="规避类型">
                  <template slot-scope="scope">
                      <span v-if="scope.row.status == 0">不规避</span>
                      <span v-else-if="scope.row.status == 1">规避MO/MR</span>
                      <span v-else-if="scope.row.status == 2">规避MR</span>
                      <span v-else>未知</span>
                  </template>
              </el-table-column>
              <el-table-column align="center" label="状态">
                  <template slot-scope="scope">
                      <span v-if="scope.row.status == 1">打开</span>
                      <span v-else-if="scope.row.status == 0">关闭</span>
                      <span v-else>未知</span>
                  </template>
              </el-table-column>

              <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                      <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">修改</el-button>
                  </template>
              </el-table-column>
            </el-table>
        </div>
        <el-dialog title="修改开放省份" :visible.sync="serviceCtrlFormVisible">
            <el-form :model="serviceCtrlTemp" :rules="serviceCtrlRules" ref="editServiceCtrlForm" label-position="left" label-width="100px">
                <el-form-item label="省份名称">
                    <el-input v-model="serviceCtrlTemp.province" placeholder="" :disabled="true" style="width:100px;"></el-input>
                </el-form-item>
                <el-form-item label="关闭地市">
                    <el-input type="textarea" rows="2" v-model="serviceCtrlTemp.closedCity" placeholder="" style="width:400px;"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="开始时间" prop="serviceCode">
                        <el-time-select v-model="serviceCtrlTemp.beginTime" placeholder="06:00" :picker-options="{start:'6:00', step: '00:30', end: '23:30'}"></el-time-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="结束时间" prop="serviceCode">
                        <el-time-select v-model="serviceCtrlTemp.endTime" placeholder="23:30" :picker-options="{start:'6:00', step: '00:30', end: '23:30'}"></el-time-select>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收入日限(元)" prop="dayProfitLimit">
                            <el-input-number v-model="serviceCtrlTemp.dayProfitLimit" placeholder="0" :step="500"></el-input-number>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收入月限(元)" prop="monthProfitLimit">
                            <el-input-number v-model="serviceCtrlTemp.monthProfitLimit" placeholder="0" :step="500"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户日限(元)" prop="dayUserLimit">
                            <el-input-number v-model="serviceCtrlTemp.dayUserLimit" placeholder="0" :step="2"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户月限(元)" prop="monthUserLimit">
                            <el-input-number v-model="serviceCtrlTemp.monthUserLimit" placeholder="0" :step="2"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="规避基数" prop="deductBaseNumber">
                        <el-input-number v-model="serviceCtrlTemp.deductBaseNumber" placeholder="0"></el-input-number>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="规避数" prop="deductNumber">
                        <el-input-number v-model="serviceCtrlTemp.deductNumber" placeholder="0"></el-input-number>
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="规避类型" prop="deductType">
                    <el-radio-group v-model="serviceCtrlTemp.deductType">
                        <el-radio :label="0">不规避</el-radio>
                        <el-radio :label="1">规避MO MR</el-radio>
                        <el-radio :label="2">规避MR</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="serviceCtrlTemp.status">
                        <el-radio :label="0">关闭</el-radio>
                        <el-radio :label="1">打开</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="serviceCtrlFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('editServiceCtrlForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from "element-ui";
import { fetchPartnerServiceCtrlList, editpartnerServiceCtrl } from "@/api/partnerServiceCtrl"
export default {
    created() {
        this.servicePK = this.$route.params && this.$route.params.servicePkid
        this.serviceId = this.$route.params && this.$route.params.serviceId
        this.serviceName = this.$route.params && this.$route.params.serviceName
        this.title = this.serviceId + ' | ' + this.serviceName
        this.cpservicePkid = this.servicePK
        this.fetchDateList({cpservicePkid: this.cpservicePkid})
    },
    data() {

        return {
            title: undefined,
            cpservicePkid: undefined,
            serviceCtrlFormVisible: false,
            servicePK: undefined,
            serviceName: undefined,
            cpServiceCtrlList: null,
            listLoading: false,
            serviceCtrlTemp: {
                ctrlId: undefined,
                beginTime: '07:00',
                endTime: '23:30',
                dayProfitLimit: 0,
                monthProfitLimit: 0,
                dayUserLimit: 4,
                monthUserLimit: 8,
                deductBaseNumber: 5,
                deductNumber: 1,
                deductType: 1,
                province: undefined,
                closedCity: undefined,
                status: 1
            },
            serviceCtrlRules: {

            }
        }
    },
    methods : {
        fetchDateList(clause) {
            this.listLoading = true
            fetchPartnerServiceCtrlList(clause).then((res)=>{
                setTimeout(() => { this.listLoading = false }, 1 * 1000);
                if (res.code === 0) {
                    this.cpServiceCtrlList = res.data.cpServiceCtrlList
                } else {
                    this.listLoading = false
                    Message({ message: res.data.msg, type: "error", duration: 3 * 1000 })  
                }
            })
        },
        handleEdit(row) {
            this.serviceCtrlTemp = {
                ctrlId: row.ctrlId,
                beginTime: row.beginTime,
                endTime: row.endTime,
                dayProfitLimit: row.dayProfitLimit,
                monthProfitLimit: row.monthProfitLimit,
                dayUserLimit: row.dayUserLimit,
                monthUserLimit: row.monthUserLimit,
                deductBaseNumber: row.deductBaseNumber,
                deductNumber: row.deductNumber,
                deductType: row.deductType,
                province: row.province,
                closedCity: row.closedCity,
                status: row.status
            }
            console.log(row.status)
            this.serviceCtrlFormVisible = true
            this.$nextTick(() => { this.$refs["editServiceCtrlForm"].clearValidate() });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {//如果验证通过
                    this.serviceCtrlTemp.province=undefined
                    editpartnerServiceCtrl(this.serviceCtrlTemp).then(res=>{
                        if (res.code === 0) {
                            this.$notify({title: "成功", message: "修改成功", type: "success", duration: 2000})
                            this.serviceCtrlFormVisible = false
                            this.fetchDateList({cpservicePkid: this.cpservicePkid})
                        } else {
                            this.$notify({title: "失败", message: "修改失败，请稍后重试", type: "error", duration: 2000})
                        }
                    })
                }
            })
        }
    }
    
}
</script>


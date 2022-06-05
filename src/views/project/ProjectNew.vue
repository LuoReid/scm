

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  title: '',
  craft: '',
  count: null,
  deliverDate: '',
  remark: '',
})

const rules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入项目名', trigger: 'blur' },
    { min: 3, max: 55, message: '项目名称长度3到55', trigger: 'blur' },
  ],
  craft: [{ required: true, message: '请输入工艺' }],
  count: [
    {
      required: true,
      message: '请填写项目数量',
      trigger: 'blur',
    },
  ],
  deliverDate: [
    {
      type: 'date',
      required: true,
      message: '请选择交货日期',
      trigger: 'change',
    },
  ],
  remark: [
    { message: '请输入备注', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // const data = deactive(this.ruleForm)
      const { count, title } = ruleForm
      console.log('submit!', ruleForm, ruleForm.count, count, title, formEl, fields)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<template>
  <h2>创建项目</h2>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-form-item label="项目名称" prop="title">
      <el-input v-model="ruleForm.title" />
    </el-form-item>
    <el-form-item label="项目数量" prop="count">
      <el-input-number v-model="ruleForm.count" placeholder="项目数量" />
    </el-form-item>
    <el-form-item label="交货时间" required>
      <el-col :span="11">
        <el-form-item prop="deliverDate">
          <el-date-picker v-model="ruleForm.deliverDate" type="date" label="交货日期" placeholder="交货日期"
            style="width: 100%" />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="工艺" prop="craft">
      <el-input v-model="ruleForm.craft" placeholder="请输入工艺" />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="ruleForm.remark" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.demo-ruleForm {

  max-width: 450px;
}
</style>
<template>
    <v-modal v-model="show"
             :footer="false"
             header-text="用户反馈">
        <el-form :model="forms"
                 :rules="rules"
                 ref="forms"
                 label-width="50px">
            <el-form-item label="类型"
                          prop="type">
                <el-select v-model="forms.type"
                           placeholder="反馈类型">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详情"
                          prop="desc">
                <el-input type="textarea"
                          :rows="6"
                          v-model.trim="forms.desc"
                          placeholder="非常感谢您的反馈，请填写详细信息方便我们解决"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </v-modal>
</template>

<script>
import Api from '~/api/userApi';

export default {
    name: 'create-feedback',
    props: ['value'],
    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            this.$emit('input', val);
        }
    },
    data() {
        return {
            show: this.value,
            options: [
                {
                    label: '功能建议',
                    value: 1
                },
                {
                    label: '遇到错误',
                    value: 2
                },
                {
                    label: '资源报错',
                    value: 4
                },
                {
                    label: '求资源',
                    value: 5
                },
                {
                    label: '求偶像',
                    value: 6
                },
                {
                    label: '求漫画',
                    value: 7
                },
                {
                    label: '其它问题',
                    value: 3
                }
            ],
            forms: {
                type: '',
                desc: ''
            },
            rules: {
                type: [
                    { type: 'number', required: true, message: '请选择反馈类型', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写反馈内容', trigger: 'blur' },
                    { max: 250, message: '最多可输入250字', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submit() {
            this.$refs.forms.validate(async valid => {
                if (valid) {
                    const api = new Api(this);
                    await api.feedback({
                        type: this.forms.type,
                        desc: this.forms.desc,
                        ua: navigator.userAgent + navigator.appVersion + navigator.vendor
                    });
                    this.show = false;
                    this.$refs.forms.resetFields();
                    this.$toast.success('反馈成功，感谢您的反馈！');
                } else {
                    return false;
                }
            });
        }
    },
    mounted() {
        this.$channel.$on('open-feedback', ({ type, desc }) => {
            this.forms.type = type || '';
            this.forms.desc = desc || '';
            this.show = true;
        });
    }
};
</script>

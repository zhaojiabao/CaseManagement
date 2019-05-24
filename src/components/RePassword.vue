<template>
	<div class="register-main">
		<div class="register-form">
			<div class="register-title">忘记密码</div>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="0">
				<FormItem label="" prop="name">
					<Input type="text" v-model="formCustom.name" placeholder=" 请输入用户名" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
				<FormItem label="" prop="passwd">
					<Input type="password" v-model="formCustom.passwd" placeholder="  请输入原密码" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
				<FormItem label="" prop="email">
					<Input type="password" v-model="formCustom.email" placeholder="  请输入新密码" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
			</Form>
			<Button type="primary" style="width: 100%; border-radius: 16px;color: #fff;margin-bottom: 15px;" @click="handleSubmit('formCustom')">提交</Button>
		</div>
	</div>
</template>
<script>
	import { register, checkEmail, checkUsername,ChangePassword } from '../api/api'
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('原密码不能为空！'));
				} else {
					callback();
				}
			};
			const validateAge = (rule, value, callback) => {
				if(value.trim() == "") {
					return callback(new Error('用户名不能为空！'));
				} else {
					callback();
				}
			};

			const validateEmail = (rule, value, callback) => {
				if(value.trim() == "") {
					return callback(new Error('新密码不能为空！'));
				} else {
					callback();
				}
			};

			return {
				formCustom: {
					passwd: '',
					email: '',
					name: ''
				},
				ruleCustom: {
					passwd: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					email: [{
						validator: validateEmail,
						trigger: 'blur'
					}],
					name: [{
						validator: validateAge,
						trigger: 'blur'
					}],
				},
				social: []
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						ChangePassword({
							username: this.formCustom.name,
							userpass: this.formCustom.passwd,
							new_pass:this.formCustom.email,
							token: sessionStorage.getItem('token')
						}).then(res => {
							if(res.error_code == 2000) {
								this.$Message.success({
									content: res.error_message,
									duration: this.$store.state.duration
								});
								this.$router.push('/Login')
							} else {
								this.$Message.error({
									content: res.error_message,
									duration: this.$store.state.duration
								});
							}
						})

					} else {
						this.$Message.error({
							content: '输入有误!',
							duration: this.$store.state.duration
						});
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
		}
	}
</script>
<style lang="less">
	.register-form {
		width: 300px;
		padding: 0 50px;
		background: #FFFFFF;
		position: absolute;
		top: 35vh;
		left: 60vw;
	}
	
	.register-main {
		height: 100vh;
		width: 100vw;
		background: url(../assets/register.jpg) no-repeat;
		background-size: 100% 100%;
	}
	
	.register-main {
		.ivu-input-group-append,
		.ivu-input-group-prepend,
		.ivu-input,
		.ivu-input-group-append {
			border-radius: 4px;
		}
		.ivu-input {
			border-radius: 4px;
		}
	}
	
	.register-title {
		text-align: center;
		font-size: 14px;
		color: #1890FF;
		margin: 15px 0;
	}
	
	.forget-pass span {
		color: #1890FF;
		text-decoration: underline;
		font-size: 13px;
		display: inline-block;
		width: 95px;
		text-align: center;
		cursor: pointer;
	}
	
	.forget-pass {
		padding-bottom: 15px;
	}
</style>
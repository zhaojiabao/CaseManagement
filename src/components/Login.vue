<template>
	<div class="login-main">
		<div class="login-form">
			<div class="login-title">账号密码登录</div>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="0">
				<FormItem label="" prop="name">
					<Input type="text" placeholder="请输入用户名" v-model="formCustom.name" style="border: 1px solid #1890ff;border-radius: 4px !important;">
					<Icon type="ios-person-outline" slot="prepend" style='font-size: 20px;color: #1890ff;font-weight: bold;'></Icon>
					</Input>
				</FormItem>
				<FormItem label="" prop="passwd">
					<Input type="password" placeholder="请输入密码" v-model="formCustom.passwd" style="border: 1px solid #1890ff;border-radius: 4px !important;">
					<!--<Icon type="ios-lock-outline" slot="prepend"></Icon>-->
					<Icon type="ios-link-outline" slot="prepend" style='font-size: 20px;color: #1890ff;font-weight: bold;'></Icon>
					</Input>
				</FormItem>
			</Form>
			<div class="senven">
				<CheckboxGroup v-model="social">
					<Checkbox label="social">
						<span>7天自动登录</span>
					</Checkbox>
				</CheckboxGroup>
			</div>
			<Button type="primary" style="width: 100%;border-radius: 16px;color: #fff;margin: 15px 0;" @click="handleSubmit('formCustom')">Login</Button>
			<div class="forget-pass">
				<!--<span >忘记密码?</span>-->
				<!--@click="forgetPass()"-->
				<span @click="goRegister()">注册</span>
			</div>
		</div>
	</div>
</template>
<script>
	import { login,index } from '../api/api'
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
				if(value.trim() === '') {
					callback(new Error('请输入密码！'));
				} else {
					callback();
				}
			};
			const validateAge = (rule, value, callback) => {
				if(value == "") {
					return callback(new Error('用户名不能为空！'));
				} else {
					callback();
				}
			};

			return {
				formCustom: {
					passwd: '',
					name: ''
				},
				ruleCustom: {
					passwd: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					name: [{
						validator: validateAge,
						trigger: 'blur'
					}]
				},
				social: []
			}
		},
		methods: {
			//忘记密码
			forgetPass(){
				this.$router.push('/RePassword')
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						login({
							username: this.formCustom.name,
							userpass: this.formCustom.passwd,
							isCheck: 0
						}).then(res => {
							if(res.error_code == 2000) {
								this.$store.state.username = Math.random();
								if(res.data.isActive == 0) {
									this.$router.push('/EmailActive');
									sessionStorage.setItem('username', this.formCustom.name)
									sessionStorage.setItem('token', res.data.token)
									sessionStorage.setItem('userId', res.data.userId)
								} else {
									this.$router.push('/ChangeMain');
									this.$Message.success({
										content: res.error_message,
										duration: this.$store.state.duration
									});
									sessionStorage.setItem('username', this.formCustom.name)
									sessionStorage.setItem('token', res.data.token)
									sessionStorage.setItem('userId', res.data.userId)
								}
							} else {
								this.$Message.error({
									content: res.error_message,
									duration: this.$store.state.duration
								});
							}
						})
					} else {
//						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			goRegister() {
				this.$router.push('/Register')
			}
		}
	}
</script>
<style lang="less" type="text/css">
	.login-form {
		width: 300px;
		padding: 0 50px;
		background: #FFFFFF;
		position: absolute;
		top: 30vh;
		left: 60vw;
	}
	
	.login-main {
		height: 100vh;
		width: 100vw;
		background: url(../assets/login_bg.jpg) no-repeat;
		background-size: 100% 100%;
	}
	/*.login-main {
		.ivu-input-group-append,
		.ivu-input-group-prepend,
		.ivu-input,
		.ivu-input-group-append {
			border-radius: 16px;
		}
		.ivu-input-group-append, .ivu-input-group-prepend{
			border-radius: 16px;
		}
		.ivu-input{
			border-radius: 16px;
		}
	}*/
	
	.login-title {
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
		/*width: 95px;*/
		width: 100%;
		text-align: center;
		cursor: pointer;
	}
	
	.forget-pass {
		padding-bottom: 15px;
	}
</style>
<template>
	<div class="register-main">
		<div class="register-form">
			<div class="register-title">用户注册</div>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="0">
				<FormItem label="" prop="name">
					<Input type="text" @on-blur='userCheck()' v-model="formCustom.name" placeholder=" 请输入用户名" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
				<FormItem label="" prop="passwd">
					<Input type="password" v-model="formCustom.passwd" placeholder="  请输入密码" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
				<FormItem label="" prop="email">
					<Input type="email" @on-blur='emailCheck()' v-model="formCustom.email" placeholder="  请输入邮箱" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
				<FormItem label="" prop="iphone">
					<Input type="text" v-model="formCustom.iphone" placeholder="  请输入手机号码" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
				<FormItem label="" prop="job">
					<Input type="text" v-model="formCustom.job" placeholder="  请输入职业" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
			</Form>
			<Button type="primary" style="width: 100%; border-radius: 16px;color: #fff;margin-bottom: 15px;" @click="handleSubmit('formCustom')">注册</Button>
		</div>
	</div>
</template>
<script>
	import { register, checkEmail, checkUsername } from '../api/api'
	export default {
		data() {
			var textiphone = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/
			const validatePass = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入密码！'));
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
			const validateIphone = (rule, value, callback) => {
				if(value.trim() == "") {
					return callback(new Error('电话号码不能为空！'));
				} else if(!textiphone.test(value)) {
					return callback(new Error('电话号码格式不正确！'));
				} else {
					callback();
				}
			};
			const validateEmail = (rule, value, callback) => {
				var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				if(value.trim() == "") {
					return callback(new Error('邮箱不能为空！'));
				} else if(!reg.test(value)) {
					return callback(new Error('邮箱不规范！'));
				} else {
					callback();
				}
			};

			return {
				formCustom: {
					passwd: '',
					email: '',
					name: '',
					job: '',
					iphone: ''

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
					iphone: [{
						validator: validateIphone,
						trigger: 'blur'
					}]
				},
				social: []
			}
		},
		methods: {
			//用户名校验
			userCheck() {
				checkUsername({
					username: this.formCustom.name
				}).then(res => {
					if(res.error_code == 2000) {

					} else {
						this.$Message.error({
							content: res.error_message,
							duration: this.$store.state.duration
						});
					}
				})
			},
			//邮箱校验
			emailCheck() {
				checkEmail({
					email: this.formCustom.email
				}).then(res => {
					if(res.error_code == 2000) {

					} else {
						this.$Message.error({
							content: res.error_message,
							duration: this.$store.state.duration
						});
					}
				})
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						register({
							username: this.formCustom.name,
							userpass: this.formCustom.passwd,
							email: this.formCustom.email,
							job: this.formCustom.job,
							phone: this.formCustom.iphone
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
		top: 23vh;
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
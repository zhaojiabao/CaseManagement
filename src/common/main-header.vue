<template>
	<div class="main-header clear-both">
		<div style="width: 1200px;margin: 0 auto;clear: both;background: #2c3f50;">
			<div class="float-left">
				<span class="main-header-info" style="font-size: 25px;" @click="goMain()">Emergency Case Cloud</span>
			</div>
			<div class="float-right" >
				<Icon v-if='isAdmin==1' type="ios-apps" class="main-header-info" style='font-size: 25px;cursor: pointer;' @click='goUserMain()' /> <span @click='goUserMain()' v-if='isAdmin==1' class="main-header-info">后台管理</span>
				<span style="position:relative">
					<Icon type="md-person" class="main-header-info" style='font-size: 25px;cursor: pointer;margin-left: 15px;' /> <span class="main-header-info" @click="showChangePass()">{{username}}</span>
					<div v-if="changepassshow" @click="changeMyPass()" style="position: absolute;top:6vh;left: 10px;line-height: 30px;height: 30px;z-index: 120;background: #fafafa;width: 110px;text-align: center;cursor: pointer;">
					修改密码
				</div>
				</span>
				<Icon type="md-home" class="main-header-info" style='font-size: 25px;margin-left: 15px;cursor: pointer;' @click="goMainPage()" /> <span class="main-header-info" @click="goMainPage()">主页面</span>
				<Icon type="md-power" class="main-header-info" style='font-size: 25px;margin-left: 15px;cursor: pointer;' @click="signOut()" /> <span class="main-header-info" @click="signOut()">退出</span>
				
			</div>
		</div>
		<Modal v-model="addDuiCe" width="500" :draggable='true'>
			<p slot="header" style="color:#333;text-align:center;height: 30px;">
				<span style="font-size: 16px;">修改密码</span>
			</p>
			<div>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="0">
				<FormItem label="" prop="name">
					<Input type="text" readonly v-model="formCustom.name" placeholder=" 请输入用户名" style="border: 1px solid #eee; border-radius: 4px;">
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
				<FormItem label="" prop="repassword">
					<Input type="password" v-model="formCustom.repassword" placeholder="  请再次输入新密码" style="border: 1px solid #eee; border-radius: 4px;">
					</Input>
				</FormItem>
			</Form>
			</div>
			<div slot="footer" class="clear-both" style="text-align: center;">
				<Button type="error" size="small" style="width: 80px;" @click="quxiao()">取消</Button>
				<Button type="info" size="small" style="margin-left: 30px;width: 80px;" @click="handleSubmit('formCustom')">确认</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { SignOut, checkAdmin,ChangePassword } from '../api/api'
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
			const validatePassRe = (rule, value, callback) => {
				if(value.trim() == "") {
					return callback(new Error('请再次输入新密码！'));
				}else if (value !== this.formCustom.email) {
                    callback(new Error('两次输入的密码不一致，请重新输入！'));
                }  else {
					callback();
				}
			};
			return {
				username: '',
				isAdmin: '',
				isShow: true,
				changepassshow:false,
				addDuiCe:false,
				formCustom: {
					passwd: '',
					email: '',
					name: '',
					repassword:''
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
					repassword: [{
						validator: validatePassRe,
						trigger: 'blur'
					}],
				},
			}
		},
		methods: {
			quxiao(){
				this.addDuiCe=false;
				this.formCustom.passwd='';
				this.formCustom.email='';
			},
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
								this.addDuiCe=false;
								this.formCustom.passwd='';
								this.formCustom.email='';
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
			changeMyPass(){
				this.addDuiCe=true;
				this.changepassshow=false;
			},
			showChangePass(){
				this.changepassshow=!this.changepassshow;
			},
			//点击logo去主页面
			goMain() {
				this.$router.push('/ChangeMain');
			},
			//点击去主页面
			goMainPage() {
				this.$router.push('/m/Main');
			},
			//退出方法
			signOut() {
				SignOut({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token')
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.push('/Login');
						sessionStorage.clear();
						this.$store.state.typeChange = '';
					} else {
						this.$Message.error(res.error_message);
					}
				})

			},
			//如果身份为管理员可以进入后台管理
			goUserMain() {
				var usermain = this.$router.resolve('/m/UserMain')
				window.open(usermain.href)
			},
			getAdmin() {
				checkAdmin({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token')
				}).then(res => {
					console.log(res)
					if(res.error_code == 4000) {
						this.isAdmin = 1;
					} else {
						this.isAdmin = 0;
					}
				})
			}
		},
		mounted() {
			this.username = sessionStorage.getItem('username');
			this.formCustom.name=sessionStorage.getItem('username');
			this.getAdmin();
		},
		watch: {
			'$store.state.username': function() {
				this.username = sessionStorage.getItem('username');
				this.formCustom.name=sessionStorage.getItem('username');
				this.addDuiCe=false;
				this.getAdmin();
			}
		}
	}
</script>

<style>
	.main-header {
		height: 8vh;
		width: 100%;
		line-height: 8vh;
		background: #2c3f50;
	}
	
	.main-header-info {
		color: #9ca8b4;
		font-size: 16px;
		display: inline-block;
		cursor: pointer;
		line-height: 20px;
	}
</style>
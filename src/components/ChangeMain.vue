<template>
	<div>
		<div>
			<div class="main-header clear-both">
		<div style="width: 1200px;margin: 0 auto;clear: both;background: #2c3f50;">
			<div class="float-left">
				<span class="main-header-info" style="font-size: 25px;" @click="goMain()">Emergency Case Cloud</span>
			</div>
			<div class="float-right">
				<Icon v-if='isAdmin==1' type="ios-apps" class="main-header-info" style='font-size: 25px;cursor: pointer;' @click='goUserMain()' /> <span @click='goUserMain()' v-if='isAdmin==1' class="main-header-info">后台管理</span>
				<Icon type="md-person" class="main-header-info" style='font-size: 25px;cursor: pointer;margin-left: 15px;' /> <span class="main-header-info">{{username}}</span>
				<Icon type="md-power" class="main-header-info" style='font-size: 25px;margin-left: 15px;cursor: pointer;' @click="signOut()" /> <span class="main-header-info" @click="signOut()">退出</span>
			</div>
		</div>
	</div>
		</div>
	<div style="height: 800px;width: 1200px;margin: 0 auto;padding-top: 150px;" class="clear-float">
		<div style="height: 400px;width: 550px;background: #638fb4;float: left;border-radius: 16px;cursor: pointer;" @click="goMainmain()">
			<div style="height: 200px;width: 300px;margin: 0px auto;border-radius: 4px;margin-top: 80px;overflow: hidden;">
				<img src="../assets/huozai.jpg" style="height: 100%;width: 100%;" alt="" />
			</div>
			<div style="height: 120px;line-height: 120px;font-size: 50px;color: #FFFFFF;text-align: center;">
				储罐火灾案例库
			</div>
		</div>
		<div style="height: 400px;width: 550px;background: #638fb4;float: right;border-radius: 16px;cursor: pointer;" @click="goMainmain()">
			<div style="height: 200px;width: 300px;margin: 0px auto;border-radius: 4px;margin-top: 80px;overflow: hidden;">
				<img src="../assets/zidingyi.jpg" style="height: 100%;width: 100%;" alt="" />
			</div>
			<div style="height: 120px;line-height: 120px;font-size: 50px;color: #FFFFFF;text-align: center;">
				自定义案例库
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import { SignOut } from '../api/api'
	export default {
		data() {
			return {
				msg: "hello qinghua",
				username: '',
				isAdmin: '',
				isShow:true,
			};
		},
		methods: {
			goMainmain(){
				this.$router.push('/m/Main')
			},
			//点击logo去主页面
			goMain() {
				this.$router.push('/ChangeMain');
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
		},
		mounted() {
			this.username = sessionStorage.getItem('username');
			this.isAdmin = sessionStorage.getItem('isadmin');
			if(sessionStorage.getItem("username") == '' || sessionStorage.getItem("username") == null) {
				this.$router.push('/Login')
			}
		},
		watch:{
			'$store.state.username':function(){
				this.username = sessionStorage.getItem('username');
				this.isAdmin = sessionStorage.getItem('isadmin');
			}
		}
	};
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
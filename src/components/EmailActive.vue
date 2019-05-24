<template>
	<div style="width: 1200px;margin: 0 auto;color:#333 ;">
		<div style="height: 60px;line-height: 60px;font-size: 25px;border-bottom: 2px solid #EEEEEE;text-shadow: 0 0 5px #ccc;">
			邮箱验证
		</div>
		<div class="clear-float" style="margin-top:30vh;height: 100px;">
			<img src="../assets/email.jpg" class="float-left" style="display: inline-block;height: 60px;width: 80px;margin-left: 400px;" />
			<div class="float-left" style="display: inline-block;width: 700px;margin-left: 15px;">
				<p style="height: 40px;line-height: 50px;font-size: 20px;text-shadow: 0 0 5px #ccc;">验证邮件已发出，请登录邮箱验证</p>
				<p>我们已经向您的邮箱<span style="color: #648fb4;">{{emailPath}}</span>发送了一封激活邮件，请点击邮件中的链接完成注册！</p>
			</div>
		</div>
		<div class="clear-float" style="text-align: center;">
			<Button type="info" style="width: 200px;" @click="goMain()">我已激活去首页</Button>
			<Button type="info" style="width: 200px;" @click="goReEamil()">重新发送邮件</Button>
		</div>
	</div>
</template>

<script>
	import { getEmailByUserName, sendEmailByUserName, checkEmailIsActive } from '../api/api'
	export default {
		methods: {
			//去首页
			goMain() {
				checkEmailIsActive({
					username: sessionStorage.getItem('username'),
					email: this.emailPath
				}).then(res => {
					if(res.error_code == 2000) {
						this.$router.push('/m/Main');
					} else {
						this.$Message.error({
							content: res.error_message,
							duration: this.$store.state.duration
						});
					}
				})
			},
			//重新发送邮件
			goReEamil() {
				sendEmailByUserName({
					username: sessionStorage.getItem('username'),
					email: this.emailPath
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success({
							content: res.error_message,
							duration: this.$store.state.duration
						});
					} else {
						this.$Message.error({
							content: res.error_message,
							duration: this.$store.state.duration
						});
					}
				})
			},
		},
		mounted() {
			getEmailByUserName({
				username: sessionStorage.getItem('username')
			}).then(res => {
				console.log(res)
				if(res.error_code == 2000) {
					this.emailPath = res.data.email;
				} else {
					this.$Message.error({
							content: res.error_message,
							duration: this.$store.state.duration
						});
				}
			})
		},
		data() {
			return {
				emailPath: ''
			}
		},
	}
</script>

<style>

</style>
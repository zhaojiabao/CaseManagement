<template>
	<div class='every-page userlist'>
		<div style="height: 800px;width: 100%;background: #648fb4;border-radius: 16px">
			<div style="height: 80px;line-height: 80px;text-align: center;color: #FFFFFF;font-size: 25px;position:relative">
				用户列表
				<Button style="position: absolute;top: 20px;right:20px;color: #FFFFFF;" icon="ios-trash-outline" type="warning" @click="delectUser()">删除用户</Button>
			</div>
			<div style="padding: 0 30px;">
				<Table border ref="selection" :columns="columns4" :data="userList" @on-selection-change='selectDate'></Table>
			</div>
		</div>

		<Modal v-model="selectDelect" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除用户</span>
			</p>
			<div style="text-align:left">
				<p>
					您正在执行删除用户操作，确认删除吗？删除后的用户无法恢复！
				</p>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="selectDelect=false">取消</Button>
				<Button type="info" @click="readlyDelect()" style="margin-left: 100px;">删除</Button>
			</div>
		</Modal>

	</div>
</template>

<script>
	import { getUserList, deleteUser } from '../../api/api'
	export default {
		data() {
			return {
				current_page: 1, //当前页码
				pageSize: 10, //每页的页数
				myTotal: 0, //总条数
				userList: [],
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: '用户名',
						key: 'username'
					},
					{
						title: '邮箱',
						key: 'email'
					},
					{
						title: '手机号码',
						key: 'phone'
					},
					{
						title: '注册时间',
						key: 'register_time'
					},
					{
						title: '职业',
						key: 'job'
					}
				],
				delectUserList: [], //删除用户id列表
				selectDelect:false,//点击删除按钮弹出的框是否出现
			}
		},
		mounted() {
			this.getUser();
		},
		methods: {
			//获取用户列表
			getUser() {
				getUserList({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					current_page: this.current_page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						this.userList = res.data.result;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//选择用户的时候触发函数
			selectDate(selection) {
				this.delectUserList = [];
				selection.forEach((item, index) => {
					this.delectUserList.push(item.id)
				})
				console.log(this.delectUserList)
			},
			//删除用户
			delectUser() {
				if(this.delectUserList.length == 0) {
					this.$Message.error('请选择您想要删除的用户！');
				} else {
					this.selectDelect=true;
				}
			},
			//当弹出框弹出后点击确认按钮
			readlyDelect(){
				deleteUser({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id:this.delectUserList
				}).then(res=>{
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.getUser();
						this.selectDelect=false;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.userlist {
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
	}
</style>
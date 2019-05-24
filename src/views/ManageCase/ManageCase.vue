<template>
	<div class="manage-case" style="width: 1200px;margin: 0px auto;height: 800px;border-radius: 16px;padding-top: 20px;">
		<div style="height: 750px;width: 1100px;margin: 0 auto;margin-top:15px;background:#fff;padding: 20px;border-radius: 16px;">
			<div style="height: 680px;">
				<div style="padding-bottom: 10px;">
					<div class="clear-float">
						<span>关键字 ：</span>
						<Input v-model="myWhereSearch" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
						<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="selectMyCase()">查询</Button>
					</div>
					<div style="margin-top: 10px;height: 30px;">
						<Button type="info" style="width: 120px;float:right;" @click="shareCaseModel=true">导入共享案例</Button>
						<Button type="info" style="float:left;width: 120px;" @click="createMyCase()">创建案例</Button>
					</div>
					<div class="clear-float" style="height: 280px;width: 100%;border-radius: 10px;background: rgb(52,73,94);margin: 15px 0;position: relative;" v-for="(item,index) in myCaseList" :key='index'>
						<div style="height: 280px;width: 260px;float: left;position: relative;">
							<span style="height: 30px;line-height: 30px;width: 200px;display: inline-block;position: absolute;top: 10px;left:10px;cursor: pointer;">
								<span style="color:#ffffff;font-size: 20px;" v-if="item.is_shared==3&&item.uid==userid">分享成功</span>
							<span style="color:#ffffff;font-size: 20px;" v-if="item.is_shared==3&&item.uid!=userid">共享数据</span>
							<span style="color:#ffffff;font-size: 20px;" v-if="item.is_shared==0" @click="shareCase(item.id)">分享</span>
							<span style="color:#ffffff;font-size: 20px;" v-if="item.is_shared==1">共享审核中</span>
							<span style="color:#ffffff;font-size: 20px;" v-if="item.is_shared==2" @click="shareCase(item.id)">拒绝</span>
							</span>
							<div style="height: 100px;width: 120px;margin-top: 70px;margin-left:70px ;">
								<img v-if='item.img_path!=""' :src="item.img_path" style="width: 100%;height: 100%;" alt="" />
								<img v-else src="../../assets/default.jpg" style="width: 100%;height: 100%;" alt="" />
								<p style="color: #FFFFFF;text-align: center;">创建者：{{item.username}}</p>
								<p style="color: #FFFFFF;text-align: center;">案例状态：
									<span v-if="item.is_shared==3" style="color: #FFFFFF;">已分享</span>
									<span v-if="item.is_shared==2" style="color: #FFFFFF;">已拒绝</span>
									<span v-if="item.is_shared==1" style="color: #FFFFFF;">共享审核中</span>
									<span v-if="item.is_shared==0" style="color: #FFFFFF;">未分享</span>
								</p>
							</div>
						</div>
						<div style="height: 280px;width: 800px;float: left;padding-top: 10px;position:relative;">
							<p v-if="item.is_shared==2|| item.is_shared==0" style='color:#ffffff;height:30px;line-height:30px;text-align: right;' class='overflow-hidden'>
								<span style="color: #FFFFFF;font-size: 20px;cursor: pointer;" @click='editCase(item.id)'>编辑案例</span>
								<span style="color: #FFFFFF;font-size: 20px;margin-left: 30px;cursor: pointer;margin-right: 10px;" @click="delectCase(item.id)">删除</span>
							</p>
							<p v-else style='color:#ffffff;height:30px;line-height:30px;text-align: right;'>

							</p>
							<p style='height:22px;line-height:22px;' class='overflow-hidden' <span class="info-title-left">名称：</span><span style="color:#648fb4;cursor: pointer;" @click="lookCase(item.id)">{{item.name}}</span> </p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'>
								<span class="info-title-left">开始时间：</span>
								{{item.start_time}}
							</p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'>
								<span class="info-title-left">结束时间：</span>
								{{item.end_time}}
							</p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'>
								<span class="info-title-left">地点：</span>{{item.address}}</p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">场所简介：</span><span style='color:#ffffff' :title="item.site_description">{{item.site_description}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">事故后果：</span><span style='color:#ffffff' :title="item.accident_description">{{item.accident_description}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">气象条件：</span><span style='color:#ffffff' :title="item.weather_description">{{item.weather_description}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">直接原因：</span><span style='color:#ffffff' :title="item.direct_cause">{{item.direct_cause}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">经验教训：</span><span style='color:#ffffff' :title="item.experienced_lesson">{{item.experienced_lesson}}</span></p>
						</div>
						<div style="position: absolute; bottom: 5px;right: 5px;color: #333333!important;display: inline-block;width: 80px;text-align: center;height: 35px;line-height: 35px;background: #EEEEEE;border-radius: 4px;cursor: pointer;" @click="goThreeMap(item.mapid,item.id)">案例详情</div>
					</div>
				</div>
			</div>
			<div style="text-align: center;">
				<Page :total="myTotal" :page-size='myPagesize' @on-change='changeMyCase' show-total />
			</div>
		</div>

		<Modal v-model="shareCaseModel" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>添加共享案例</span>
			</p>
			<div style="height: 680px;margin-top:15px;background: #fff;border-radius: 16px;">
				<div style="height: 640px;">
					<div style="padding-bottom: 10px;">
						<div class="clear-float">
							<span>关键字 ：</span>
							<Input v-model="shareWhereSearch" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
							<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="selectShareCase()">查询</Button>
						</div>
						<div class="clear-float" style="height: 280px;width: 100%;border-radius: 4px;margin: 15px 0;position: relative;" v-for="(item,index) in shareCaseList" :key='index'>
							<div style="height: 280px;line-height: 280px;text-align: center;width: 35px;float: left;">
								<input type="checkbox" name="checkbox" :value="item.id" />
							</div>
							<div style="height: 280px;width: 260px;float: left;background: rgb(52,73,94);border-top-left-radius: 10px;border-bottom-left-radius: 10px;">
								<div style="height: 100px;width: 120px;margin-top: 70px;margin-left:70px ;">
									<img v-if='item.img_path!=""' :src="item.img_path" style="width: 100%;height: 100%;" alt="" />
									<img v-else src="../../assets/default.jpg" style="width: 100%;height: 100%;" alt="" />
									<p style="color: #FFFFFF;text-align: center;">创建者：{{item.username}}</p>
									<p style="color: #FFFFFF;text-align: center;">案例状态：
										<span v-if="item.is_shared==3" style="color: #FFFFFF;">已分享</span>
										<span v-else-if="item.is_shared==2" style="color: #FFFFFF;">已拒绝</span>
										<span v-else-if="item.is_shared==1" style="color: #FFFFFF;">共享审核中</span>
										<span v-else style="color: #FFFFFF;">未分享</span>
									</p>
								</div>
							</div>
							<div style="height: 280px;width: 470px;float: left;padding-top: 20px;background: rgb(52,73,94);border-top-right-radius: 10px;border-bottom-right-radius: 10px;">
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'>
									<span class="info-title-left" style="color: #FFFFFF;">名称：</span>{{item.name}}</p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'>
									<span class="info-title-left">开始时间：</span>
									{{item.start_time}}</p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'>
									<span class="info-title-left">结束时间：</span>{{item.end_time}}</p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">地点：</span>{{item.address}}</p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">场所简介：</span><span style='color:#ffffff' :title="item.site_description">{{item.site_description}}</span></p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">事故后果：</span><span style='color:#ffffff' :title="item.accident_description">{{item.accident_description}}</span></p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">气象条件：</span><span style='color:#ffffff' :title="item.weather_description">{{item.weather_description}}</span></p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">直接原因：</span><span style='color:#ffffff' :title="item.direct_cause">{{item.direct_cause}}</span></p>
								<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">经验教训：</span><span style='color:#ffffff' :title="item.experienced_lesson">{{item.experienced_lesson}}</span></p>
							</div>
							<!--<div style="position: absolute; bottom: 5px;right: 5px;color: #333333!important;display: inline-block;width: 80px;text-align: center;height: 35px;line-height: 35px;background: #EEEEEE;border-radius: 4px;cursor: pointer;">案例详情</div>-->
						</div>
					</div>
				</div>
				<div style="text-align: center;">
					<Page :total="shareTotal" :page-size='sharePagesize' @on-change='changeShareCase' show-total />
				</div>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="shareCaseModel=false">取消</Button>
				<Button type="info" @click="addQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>
		<Modal v-model="selectDelect" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除案例</span>
			</p>
			<div style="text-align:left">
				<p>
					您正在执行删除案例操作，确认删除吗？
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
	import { getMyCaseList, getShareCaseList, selectMyCaseList, selectShareCaseList, importShareCase, delCaseInfo, SharingCase } from '../../api/api'
	export default {
		data() {
			return {
				tabvalue: 'sharecase',
				myWhereSearch: '', //我的案例关键字
				myCaseList: [], //我的案例列表
				myPagesize: 2, //我的案例分页每页的页数
				myTotal: 0, //我的案例总数
				myNowPage: 1, //我的当前页码
				shareWhereSearch: '', //共享案例关键字
				shareCaseList: [], //共享案例列表
				sharePagesize: 2, //我的案例分页每页的页数
				shareTotal: 0, //我的案例总数
				shareNowPage: 1, //我的当前页码
				shareCaseModel: false, //共享案例列表
				is_admin: '', //判断是否为管理员
				userid: '', //存在session里面的userid
				selectDelect:false,
				delect_id:'',
			}
		},
		mounted() {
			this.getMyCase();
			this.selectShareCase();
			this.is_admin = sessionStorage.getItem('isadmin')
			this.userid = sessionStorage.getItem('userId');
		},
		methods: {
			readlyDelect(){
				delCaseInfo({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					case_id: this.delect_id,
					user_id: sessionStorage.getItem('userId')
				}).then(res => {
					if(res.error_code == 2000) {
						this.selectDelect=false;
						this.$Message.success(res.error_message);
						this.getMyCase();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击案例详情到32d展示页面
			goThreeMap(id,caseid) {
				this.$router.push('/m/Show3d/' + id+'/'+caseid);
			},
			//点击分享案例
			shareCase(id) {
				SharingCase({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					case_id: id,
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.getMyCase();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//删除案例
			delectCase(id) {
				this.delect_id=id;
				this.selectDelect=true;
			},
			//编辑案例
			editCase(id) {
				this.$router.push('/m/EditCase/' + id);
			},
			//查看案例
			lookCase(id) {
				this.$router.push('/m/LookCase/' + id);
			},
			//点击创建案例按钮
			createMyCase() {
				this.$router.push('/m/BasicInformationOne');
			},
			//选中复选框时添加到我的案例
			addQuren() {
				var id = document.getElementsByName('checkbox');
				var value = [];
				var caseList = [];
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				if(value.length == 0) {
					this.$Message.error('请选择您要添加的共享案例！');
					return;
				}
				this.shareCaseList.forEach((item, index) => {
					value.forEach((val, vdex) => {
						if(item.id == val) {
							caseList.push({
								case_name: item.name,
								case_id: item.id
							})
						}
					})
				})
				importShareCase({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					case_data: caseList,
					user_id: sessionStorage.getItem('userId')
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.shareCaseModel = false;
						this.getMyCase();
						this.getShareList();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//查询共享案例
			selectShareCase() {
				this.shareCaseList = [];
				if(this.shareWhereSearch == '') {
					this.getShareList();
				} else {
					selectShareCaseList({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						whereSearch: this.shareWhereSearch,
						current_page: this.shareNowPage,
						pageSize: this.sharePagesize
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
							this.shareTotal = res.data.count;
							this.shareCaseList = res.data.resultData;
						} else {
							this.$Message.error(res.error_message);
						}
					})
				}
			},
			//查询我的案例
			selectMyCase() {
				this.myCaseList = []
				if(this.myWhereSearch == '') {
					this.getMyCase();
				} else {
					selectMyCaseList({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						whereSearch: this.myWhereSearch,
						current_page: this.myNowPage,
						pageSize: this.myPagesize,
						user_id: sessionStorage.getItem('userId')
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
							this.myTotal = res.data.count;
							this.myCaseList = res.data.resultData;
						} else {
							this.$Message.error(res.error_message);
						}
					})
				}
			},
			//我的案例点击页码
			changeMyCase(data) {
				this.myNowPage = data;
				this.getMyCase();
			},
			changeShareCase(data) {
				this.shareNowPage = data;
				this.getShareList();
			},
			//获取我的案例
			getMyCase() {
				getMyCaseList({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					//					whereSearch:this.myWhereSearch,
					current_page: this.myNowPage,
					pageSize: this.myPagesize,
					user_id: sessionStorage.getItem('userId')
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						this.myCaseList = res.data.resultData;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//获取共享案例
			getShareList() {
				getShareCaseList({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					//					whereSearch: this.shareWhereSearch,
					current_page: this.shareNowPage,
					pageSize: this.sharePagesize,
				}).then(res => {
					if(res.error_code == 2000) {
						this.shareTotal = res.data.count;
						this.shareCaseList = res.data.resultData;
						console.log(this.shareCaseList)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.info-title-left{
		width: 80px;
			text-align: right;
			display: inline-block;
			color: #FFFFFF;
	}
	.ivu-btn>.ivu-icon{
		color: #FFFFFF;
	}
	.manage-case {
		.info-title-left {
			width: 80px;
			text-align: right;
			display: inline-block;
			color: #FFFFFF;
		}
		.ivu-btn {
			.ivu-icon {
				color: #fff;
			}
			span{
				color: #fff;
			}
		}
	}
</style>
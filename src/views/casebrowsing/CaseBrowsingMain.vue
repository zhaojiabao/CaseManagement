<template>
	<div class="every-page CaseBrowsingMain">
		<Tabs type="card" v-model='tabvalue'>
			<TabPane label="共享案例库" name='sharecase'>
				<div style="height: 710px;width: 1200px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px 0;border-radius: 16px;">
					<div style="height: 640px;">
						<div style="padding-bottom: 10px;">
							<div class="clear-float">
								<span>关键字 ：</span>
								<Input v-model="shareWhereSearch" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
								<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="selectShareCase()">查询</Button>
							</div>
							<div class="clear-float" style="height: 280px;width: 100%;border-radius: 10px;background: rgb(52,73,94);margin: 15px 0;position: relative;" v-for="(item,index) in shareCaseList" :key='index'>
								<div style="height: 280px;width: 260px;float: left;border-top-left-radius: 10px;border-bottom-left-radius: 10px;">
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
								<div style="height: 280px;width: 900px;float: left;padding-top: 20px;border-top-right-radius: 10px;border-bottom-right-radius: 10px;">
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">名称：</span>{{item.name}}</p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">开始时间：</span>{{item.start_time}}</p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">结束时间：</span>{{item.end_time}}</p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">地点：</span>{{item.address}}</p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">场所简介：</span><span style='color:#ffffff' :title="item.site_description">{{item.site_description}}</span></p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">事故后果：</span><span style='color:#ffffff' :title="item.accident_description">{{item.accident_description}}</span></p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">气象条件：</span><span style='color:#ffffff' :title="item.weather_description">{{item.weather_description}}</span></p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">直接原因：</span><span style='color:#ffffff' :title="item.direct_cause">{{item.direct_cause}}</span></p>
									<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">经验教训：</span><span style='color:#ffffff' :title="item.experienced_lesson">{{item.experienced_lesson}}</span></p>
								</div>
								<div style="position: absolute; bottom: 5px;right: 5px;color: #333333!important;display: inline-block;width: 80px;text-align: center;height: 35px;line-height: 35px;background: #EEEEEE;border-radius: 4px;cursor: pointer;" @click="goThreeMap(item.mapid,item.id)">案例详情</div>
							</div>
						</div>
					</div>
					<div style="text-align: center;">
						<Page :total="shareTotal" :page-size='sharePagesize' @on-change='changeShareCase' show-total />
					</div>
				</div>
			</TabPane>
			<TabPane label="我的案例库" name='mycase'>
				<div style="height: 710px;width: 1200px;margin: 0 auto;margin-top:15px;position: relative;">
					<!--<div style="position: absolute;position: absolute;top: 250px;right: 30px;">
						<div style="color: #333333!important;display: inline-block;width: 120px;text-align: center;height: 35px;line-height: 35px;background: #fff;border-radius: 4px;cursor: pointer;">显示共享案例</div> <br />
						<div style="color: #333333!important;display: inline-block;width: 120px;text-align: center;height: 35px;line-height: 35px;background: #fff;border-radius: 4px;cursor: pointer;margin-top: 20px;">显示非共享案例</div>
					</div>-->
					<div style="width:1200px;margin: 0 auto;background: #fff;height: 710px;padding: 20px;border-radius: 16px;">
						<div style="height: 640px;">
							<div style="padding-bottom: 10px;">
								<div class="clear-float">
									<span>关键字 ：</span>
									<Input v-model="myWhereSearch" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
									<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="selectMyCase()">查询</Button>
								</div>
								<div class="clear-float" style="height: 280px;width: 100%;border-radius: 10px;background: rgb(52,73,94);margin: 15px 0;position: relative;" v-for="(item,index) in myCaseList" :key='index'>
									<div style="height: 280px;width: 260px;float: left;">
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
									<div style="height: 280px;width: 900px;float: left;padding-top: 20px;">
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">名称：</span>{{item.name}}</p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">开始时间：</span>{{item.start_time}}</p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">结束时间：</span>{{item.end_time}}</p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">地点：</span>{{item.address}}</p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">场所简介：</span><span style='color:#ffffff' :title="item.site_description">{{item.site_description}}</span></p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">事故后果：</span><span style='color:#ffffff' :title="item.accident_description">{{item.accident_description}}</span></p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">气象条件：</span><span style='color:#ffffff' :title="item.weather_description">{{item.weather_description}}</span></p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">直接原因：</span><span style='color:#ffffff' :title="item.direct_cause">{{item.direct_cause}}</span></p>
										<p style='color:#ffffff;height:25px;line-height:25px;' class='overflow-hidden'><span class="info-title-left">经验教训：</span><span style='color:#ffffff' :title="item.experienced_lesson">{{item.experienced_lesson}}</span></p>
									</div>
									<div style="position: absolute; bottom: 5px;right: 5px;color: #333333!important;display: inline-block;width: 80px;text-align: center;height: 35px;line-height: 35px;background: #fff;border-radius: 4px;cursor: pointer;" @click="goThreeMap(item.mapid,item.id)">案例详情</div>
								</div>
							</div>
						</div>
						<div style="text-align: center;">
							<Page :total="myTotal" :page-size='myPagesize' @on-change='changeMyCase' show-total />
						</div>
					</div>
				</div>
			</TabPane>
		</Tabs>

		<!--<Modal v-model="saveSelect" width="360">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>是否录入情空间</span>
			</p>
			<div style="text-align:center">
				<p>情景空间属于描述类信息，是否前往</p>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="savaQuxiao()">取消</Button>
				<Button type="info" @click="savaQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>-->
		<!--<Modal v-model="delectSelect" width="360">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>是否放弃新建对象类型？</span>
			</p>
			<div slot="footer" style="text-align: center;">
				<Button type="error" @click="delectSelect=false">取消</Button>
				<Button type="error" @click="delectQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>-->
	</div>
</template>

<script>
	import { getMyCaseList, getShareCaseList, selectMyCaseList, selectShareCaseList } from '../../api/api'
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
			}
		},
		mounted() {
			this.getMyCase();
			this.selectShareCase();
		},
		methods: {
			//点击案例详情到32d展示页面
			goThreeMap(id, caseid) {
				this.$router.push('/m/Show3d/' + id + '/' + caseid);
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
							this.$Message.success({
								content: res.error_message,
								duration: this.$store.state.duration
							});
							this.shareTotal = res.data.count;
							this.shareCaseList = res.data.resultData;
						} else {
							this.$Message.error({
								content: res.error_message,
								duration: this.$store.state.duration
							});
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
							this.$Message.success({
								content: res.error_message,
								duration: this.$store.state.duration
							});
							this.myTotal = res.data.count;
							this.myCaseList = res.data.resultData;
						} else {
							this.$Message.error({
								content: res.error_message,
								duration: this.$store.state.duration
							});
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
						this.$Message.error({
							content: res.error_message,
							duration: this.$store.state.duration
						});
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
					} else {
						this.$Message.error({
							content: res.error_message,
							duration: this.$store.state.duration
						});
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.CaseBrowsingMain {
		.ivu-tabs-tabpane {
			background: #fff;
			border-bottom-right-radius: 16px;
			border-bottom-left-radius: 16px;
			height: 750px;
		}
		.ivu-tabs-bar {
			margin-bottom: 0;
		}
		.objectinfo-display {
			width: 120px;
			text-align: right;
			display: inline-block;
			font-size: 15px;
			height: 30px;
			line-height: 30px;
		}
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
		.type-guan {
			width: 120px;
			text-align: center;
			display: inline-block;
			font-size: 15px;
			height: 30px;
			line-height: 30px;
			border: 1px solid #EEEEEE;
			border-radius: 4px;
			margin-left: 40px;
			margin-top: 5px;
		}
		.create-type-td {
			display: inline-block;
			width: 33.3%;
			float: left;
			height: 30px;
			line-height: 30px;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.meijuselect {
			.ivu-select-selection {
				height: 25px;
				line-height: 25px;
			}
		}
		.info-title-left {
			width: 80px;
			text-align: right;
			display: inline-block;
			color: #FFFFFF;
		}
	}
</style>
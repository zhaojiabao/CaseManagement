<template>
	<div class="caselist" style="width: 1200px;margin: 15px auto;background: #648fb4;height: 800px;border-radius: 16px;padding-top: 20px;">
		<div style="height: 750px;width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;">
			<div style="height: 670px;">
				<div style="padding-bottom: 10px;">
					<div class="clear-float" style="margin-bottom:30px ;">
						<span>关键字 ：</span>
						<Input v-model="myWhereSearch" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
						<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="selectMyCase()">查询</Button>
					</div>
					<div class="clear-float" style="height: 280px;width: 100%;border-radius: 4px;background: rgb(52,73,94);margin: 15px 0;position: relative;" v-for="(item,index) in myCaseList" :key='index'>
						<div style="height: 280px;width: 260px;float: left;">
							<div style="height: 100px;width: 120px;margin-top: 70px;margin-left:70px ;">
								<img v-if='item.img_path!=""' :src="item.img_path" style="width: 100%;height: 100%;" alt="" />
								<img v-else src="../../../assets/default.jpg" style="width: 100%;height: 100%;" alt="" />
								<p style="color: #FFFFFF;text-align: center;">创建者：{{item.username}}</p>
								<p style="color: #FFFFFF;text-align: center;">案例状态：
									<span v-if="item.is_shared==3" style="color: #FFFFFF;">已分享</span>
									<span v-else-if="item.is_shared==2" style="color: #FFFFFF;">已拒绝</span>
									<span v-else-if="item.is_shared==1" style="color: #FFFFFF;">共享审核中</span>
									<span v-else style="color: #FFFFFF;">未分享</span>
								</p>
							</div>
						</div>
						<div style="height: 280px;width: 500px;float: left;padding-top: 10px;">
							<p style='color:#ffffff;height:30px;line-height:30px;text-align: right;' class='overflow-hidden'>
								<span style="color: #FFFFFF;font-size: 20px;cursor: pointer;" @click='examineCase(item.id,3)'>同意</span>
								<span style="color: #FFFFFF;font-size: 20px;margin-left: 30px;cursor: pointer;margin-right: 10px;" @click="examineCase(item.id,2)">拒绝</span>
							</p>

							<p style='height:22px;line-height:22px;' class='overflow-hidden' <span class="info-title-left">名称：</span><span style="color:#648fb4;cursor: pointer;" @click="lookCase(item.id)">{{item.name}}</span> </p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">开始时间：</span>{{item.start_time}}</p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">结束时间：</span>{{item.end_time}}</p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">地点：</span>{{item.address}}</p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">场所简介：</span><span style='color:#ffffff' :title="item.site_description">{{item.site_description}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">事故后果：</span><span style='color:#ffffff' :title="item.accident_description">{{item.accident_description}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">气象条件：</span><span style='color:#ffffff' :title="item.weather_description">{{item.weather_description}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">直接原因：</span><span style='color:#ffffff' :title="item.direct_cause">{{item.direct_cause}}</span></p>
							<p style='color:#ffffff;height:22px;line-height:22px;' class='overflow-hidden'><span class="info-title-left">经验教训：</span><span style='color:#ffffff' :title="item.experienced_lesson">{{item.experienced_lesson}}</span></p>
						</div>
						<div style="position: absolute; bottom: 5px;right: 5px;color: #333333!important;display: inline-block;width: 80px;text-align: center;height: 35px;line-height: 35px;background: #EEEEEE;border-radius: 4px;cursor: pointer;">案例详情</div>
					</div>
				</div>
			</div>
			<div style="text-align: center;">
				<Page :total="myTotal" :page-size='myPagesize' @on-change='changeMyCase' show-total />
			</div>
		</div>
	</div>
</template>

<script>
	import { getObtainingAuditCases, selectObtainingAuditCases, AuditCase } from '../../../api/api'
	export default {
		data() {
			return {
				tabvalue: 'sharecase',
				myWhereSearch: '', //我的案例关键字
				myCaseList: [], //我的案例列表
				myPagesize: 2, //我的案例分页每页的页数
				myTotal: 0, //我的案例总数
				myNowPage: 1, //我的当前页码
				is_admin: '', //判断是否为管理员
			}
		},
		mounted() {
			this.getMyCase();
			this.is_admin = sessionStorage.getItem('isadmin')
		},
		methods: {
			//审核案例
			examineCase(id, num) {
				AuditCase({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					case_id: id,
					examine_id: num
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.getMyCase();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//查看案例
			lookCase(id) {
				this.$router.push('/m/UserLookCase/' + id);
			},
			//查询我的案例
			selectMyCase() {
				this.myCaseList = []
				if(this.myWhereSearch == '') {
					this.getMyCase();
				} else {
					selectObtainingAuditCases({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						whereSearch: this.myWhereSearch,
						current_page: this.myNowPage,
						pageSize: this.myPagesize,
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
			//获取我的案例
			getMyCase() {
				getObtainingAuditCases({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					//					whereSearch:this.myWhereSearch,
					current_page: this.myNowPage,
					pageSize: this.myPagesize,
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						this.myCaseList = res.data.resultData;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.caselist {
		.info-title-left {
			width: 80px;
			text-align: right;
			display: inline-block;
			color: #FFFFFF;
		}
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
	}
</style>
<template>
	<div class="every-page creat-resoourceslist" style="background: #648fb4;padding: 20px 0;height: 800px;border-radius: 16px;">
		<div style="width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;">
			<div class="clear-float" style="margin-bottom: 15px;">
				<span>关键字 ：</span>
				<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
				<Button type="primary" icon="ios-search" @click="selectData()">查询</Button>
				<Button style="float: right;" type="info" @click="goBack()">返回</Button>
			</div>
			<div style="height: 610px;overflow: auto;">
				<div style="height: 290px;margin-bottom: 10px;border: 1px solid #EEEEEE;border-radius: 4px;" class="clear-float" v-for="(item,index) in shareList" :key='index'>
					<div style="height: 40px;position: relative;">
						<span @click="examineCase(item.id,3)" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 70px;cursor: pointer;font-size: 20px;">
									同意									
								</span>
						<span @click="examineCase(item.id,2)" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 0;cursor: pointer;font-size: 20px;">
									拒绝								
								</span>
					</div>
					<div class="clear-float" style="height: 250px;width: 100%;">
						<div class="float-left" style="width:200px;">
							<img :src="item.img_path" style="display: inline-block;width: 160px;height: 160px;margin: 50px 0 0 20px;" alt="" />
						</div>
						<div class="float-left" style="width:530px;">
							<p>
								<span class="title-left">应急资源：</span>
								<span class="title-right overflow-hidden" :title="item.emergency_resources">
									{{item.emergency_resources}}
								</span>
							</p>
							<p>
								<span class="title-left">资源概述：</span>
								<span class="title-right overflow-hidden" style="height: 70px;overflow: auto;" :title="item.resources_params">
									{{item.resources_params}}
								</span>
							</p>
							<p>
								<span class="title-left">主要技术参数：</span>
								<span class="title-right overflow-hidden" style="height: 70px;overflow: auto;" :title="item.main_resources">
									{{item.main_resources}}
								</span>
							</p>
							<p>
								<span class="title-left">使用注意事项：</span>
								<span class="title-right overflow-hidden" style="height: 70px;overflow: auto;" :title="item.resources_desc">
									{{item.resources_desc}}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div style="text-align: center;">
				<Page :total="myTotal" :page-size='pageSize' @on-change='changeMyCase' show-total />
			</div>
		</div>
	</div>
</template>

<script>
	import { getObtainingAuditEmergency, AuditEmergency, selectObtainingAuditEmergency } from '../../../api/api'
	export default {
		data() {
			return {
				tabvalue: 'gongxiang',
				object_name: '',
				selectTypeId: '',
				saveSelect: false, //点击保存显示的model框
				delectSelect: false, //点击删除显示的model框
				single: false,
				ziyuangaishu: '', //资源概述
				searchCondition: '', //关键字
				shareList: [], //存放共享资源的数组
				emergency_resources: '', //应急资源名称
				resources_params: '', //资源概述
				resources_desc: '', //资源描述
				main_resources: '', //主要参数
				img_path: '', //图片路径
				imgPreview: '', //预览案例图片的路径
				showBigImgOne: false, //预览图片大的弹出框
				pageSize: 2, //每页的条数
				current_page: 1, //当前页码
				myTotal: 0, //总页数
			}
		},
		mounted() {
			this.getResourcesList();
		},
		methods: {
			//查询
			selectData() {
				if(this.searchCondition == "") {
					this.getResourcesList()
				} else {
					selectObtainingAuditEmergency({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						current_page: this.current_page,
						pageSize: this.pageSize,
						whereSearch: this.searchCondition
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
							this.shareList = res.data.resultData;
							this.myTotal = res.data.count;
						} else {
							this.$Message.error(res.error_message);
						}
					})
				}
			}, //返回
			goBack() {
				this.$router.go(-1);
			},
			//改变页面
			changeMyCase(data) {
				this.current_page = data;
				this.getResourcesList();
			},
			//获取共享应急资源
			getResourcesList() {
				getObtainingAuditEmergency({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					current_page: this.current_page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.error_code == 2000) {
						console.log(res)
						this.myTotal = res.data.count;
						this.shareList = res.data.resultData;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//审核应急资源
			examineCase(id, num) {
				AuditEmergency({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: id,
					examine_id: num
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.getResourcesList();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.creat-resoourceslist {
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
		.title-left {
			height: 40px;
			line-height: 40px;
			width: 120px;
			text-align: right;
			display: inline-block;
			font-weight: bold;
			float: left;
		}
		.title-right {
			height: 40px;
			line-height: 40px;
			width: 400px;
			display: inline-block;
			float: left;
		}
	}
</style>
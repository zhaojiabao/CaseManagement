<template>
	<div class="every-page AddResources">
		<Tabs type="card" v-model='tabvalue'>
			<TabPane label="选择共享资源" name='gongxiang'>
				<div style="width: 800px;margin: 0 auto;margin-top:15px;padding: 20px;border-radius: 16px;">
					<div class="clear-float">
						<span style="color: #FFFFFF;">关键字 ：</span>
						<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
						<Button type="primary" icon="ios-search" @click="selectData()">查询</Button>
						<Button style="float: right;" type="info" @click="shareQueren()">确认</Button>
					</div>
					<div style="height: 600px;overflow: auto;">
						<div style="height: 280px;padding: 15px 0;margin-bottom: 10px;" class="clear-float" v-for="(item,index) in shareList" :key='index'>
							<div style="float: left;width: 50px;height: 280px;line-height:280px;text-align: center;">
								<input type="checkbox" name="checkbox" :value="item.id" />
							</div>
							<div style="float: left;border: 1px solid #ccc;border-radius: 10px;background: #fff;">
								<div style="float: left;width: 100px;height: 280px;margin-left: 10px;">
									<img :src="item.img_path" style="width: 100px;height:100px;margin-top: 90px;" alt="" />
								</div>
								<div style="float: right;width: 575px;height: 280px;line-height: 25px;margin-left: 20px;">
									<p style="padding-top: 20px;">
										<span class="text-weight">应急资源：</span>
										<span class="title-right overflow-hidden" :title="item.emergency_resources">{{item.emergency_resources}}</span>
									</p>
									<p>
										<span class="text-weight">资源描述：</span>
										<span class="title-right overflow-hidden" style="height: 70px;overflow: auto;">{{item.resources_desc}}</span>
									</p>
									<p>
										<span class="text-weight">主要技术参数：</span>
										<span class="title-right overflow-hidden" style="height: 70px;overflow: auto;">{{item.main_resources}}</span>
									</p>
									<p>
										<span class="text-weight">使用注意事项：</span>
										<span class="title-right overflow-hidden" style="height: 70px;overflow: auto;">{{item.resources_params}}</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div style="text-align: center;height: 50px;line-height: 50px;position: relative;">
						<Page :total="myTotal" :page-size='pageSize' @on-change='changage' show-total />
						<Button type="primary" icon="ios-undo-outline" style="position: absolute;top: 10px;right: 0px;" @click="goBack()">返回</Button>
					</div>
				</div>
			</TabPane>
			<TabPane label="创建新资源" name='newobject'>
				<div style="width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;">
					<div class="clear-float">
						<span>应急资源名称 ：</span>
						<Input v-model="emergency_resources" placeholder="请输入应急资源名称（10~50以内）" style="width: 250px;display: inline-block;" />
						<div style="position: relative;display: inline-block;margin-left: 230px;width: 100px;height: 32px;cursor: pointer;border-radius: 4px;vertical-align: top;">
							<input type="file" style="display: inline-block;width: 100px;height: 32px;position: absolute;top: 0;left: 0;opacity: 0;z-index: 100;" ref='file' @change="tirggerFile($event)" />
							<Button type="info" icon="ios-cloud-upload-outline" style="color: #333333;">资源图片</Button>
						</div>
						<div v-if="imgPreview!=''" style="display: inline-block;height: 35px;width: 35px;margin-left: 15px;vertical-align: middle;" @click="showBigImgOne=true">
							<img :src="imgPreview" style="width: 100%;height: 100%;" alt="" />
						</div>
					</div>
					<div>
						<p style="margin: 10px 0;">资源描述：</p>
						<Input v-model="resources_desc" type="textarea" :rows="5" placeholder="请输入资源概述" />
						<p style="margin: 10px 0;">主要参数：</p>
						<Input v-model="main_resources" type="textarea" :rows="5" placeholder="请输入主要参数" />
						<p style="margin: 10px 0;">使用注意事项：</p>
						<Input v-model="resources_params" type="textarea" :rows="5" placeholder="请输入使用注意事项" />
					</div>
					<div style="height: 80px;">
						<Button style="float: right;margin-top: 30px;" icon='md-checkmark' type="info" @click="clickQingJing()">确认</Button>
					</div>
				</div>
			</TabPane>
		</Tabs>

		<Modal v-model="saveSelect" width="360" :draggable='true'>
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
		</Modal>
		<Modal v-model="delectSelect" width="360" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>是否放弃新建对象类型？</span>
			</p>
			<div slot="footer" style="text-align: center;">
				<Button type="error" @click="delectSelect=false">取消</Button>
				<Button type="error" @click="delectQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>
		<Modal v-model="showBigImgOne" width="800" :draggable='true'>
			<p slot="header" style="color:#648fb4;text-align:center">
				<Icon type="ios-image-outline" />
				<span>查看大图</span>
			</p>
			<div style="height: 400px;width: 100%;">
				<img :src="imgPreview" style="height: 100%;width: 100%;" alt="" />
			</div>
			<div slot="footer">
				<Button type="info" size="large" long @click="showBigImgOne=false">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getShareEmergency, createEmergency, addShareEmergency, uploadImage } from '../../api/api'
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
				current_page: 1, //当前页码
				pageSize: 2, //每页的页数
				myTotal: 0, //总条数
			}
		},
		mounted() {
			this.getAllShare();
		},
		methods: {
			//返回上一个页面
			goBack() {
				this.$router.go(-1)
			},
			//改变页码
			changage(data) {
				this.current_page = data;
				this.getAllShare();
			},
			//上传图片
			tirggerFile(event) {
				uploadImage({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					image: event.target.files[0]
				}).then(res => {
					if(res.error_code == 2000) {
						this.img_path = res.data.domain + res.data.filepath;
						this.imgPreview = this.img_path;
						this.$Message.success(res.error_message);
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击共享资源的确定按钮
			shareQueren() {
				var id = document.getElementsByName('checkbox');
				var value = [];
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				if(value.length == 0) {
					this.$Message.error('请选择您要添加的资源！');
					return;
				}
				addShareEmergency({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					emergency_id: value.join(',')
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.go(-1)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击确定按钮
			clickQingJing() {
				if(this.emergency_resources == '') {
					this.$Message.error("请输入应急资源名称！");
					return;
				}
				if(this.resources_params == '') {
					this.$Message.error("请输入使用注意事项！");
					return;
				}
				if(this.resources_desc == '') {
					this.$Message.error("请输入资源描述！");
					return;
				}
				if(this.main_resources == '') {
					this.$Message.error("请输入主要参数！");
					return;
				}
				createEmergency({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					img_path: this.img_path,
					main_resources: this.main_resources,
					resources_params: this.resources_params,
					resources_desc: this.resources_desc,
					emergency_resources: this.emergency_resources
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.go(-1)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击查询关键字
			selectData() {
				this.getAllShare();
			},
			//获取所有的共享资源
			getAllShare() {
				getShareEmergency({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					currentPage: this.current_page,
					pageSize: this.pageSize,
					searchCondition: this.searchCondition,
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						this.shareList = res.data.resData;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			saveObject() {
				this.saveSelect = true;
			},
			saveDelete() {
				this.delectSelect = true;
			},
			delectQuren() {
				this.$router.push('/m/BasicInformation')
			},
			savaQuxiao() {
				this.$router.push('/m/BasicInformation')
			},
			savaQuren() {
				this.$router.push('/m/CreateQingjing')
			}
		}
	}
</script>

<style lang="less">
	.AddResources {
		.ivu-tabs-tabpane {
			background: #648fb4;
			border-bottom-right-radius: 16px;
			border-bottom-left-radius: 16px;
			height: 800px !important;
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
			border: 1px solid #ccc;
			border-radius: 4px;
			margin-left: 40px;
			margin-top: 5px;
		}
		.text-weight {
			height: 40px;
			line-height: 40px;
			width: 100px;
			text-align: right;
			display: inline-block;
			font-weight: bold;
			float: left;
		}
		.title-right {
			height: 40px;
			line-height: 40px;
			width: 430px;
			display: inline-block;
			float: left;
		}
	}
</style>
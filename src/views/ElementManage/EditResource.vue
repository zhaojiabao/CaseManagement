<template>
	<div class="every-page edit-resource">
		<div style="width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;">
			<div class="clear-float">
				<span>应急资源名称 ：</span>
				<Input v-model="emergency_resources" placeholder="请输入应急资源名称（10~50以内）" style="width: 250px;display: inline-block;" />
				<div style="position: relative;display: inline-block;margin-left: 230px;width: 100px;height: 32px;cursor: pointer;border-radius: 4px;vertical-align: top;">
					<input type="file" style="display: inline-block;width: 100px;height: 32px;position: absolute;top: 0;left: 0;opacity: 0;z-index: 100;" ref='file' @change="tirggerFile($event)" />
					<Button type="info" icon="ios-cloud-upload-outline" style="color: #333333;">资源图片</Button>
				</div>
				<div v-if="img_path!=''" style="display: inline-block;height: 35px;width: 35px;margin-left: 15px;vertical-align: middle;" @click="showBigImgOne=true">
					<img :src="img_path" style="width: 100%;height: 100%;" alt="" />
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
				<Button style="float: left;margin-top: 30px;" icon='ios-undo-outline' type="info" @click="goBack()">返回</Button>
				
				<Button style="float: right;margin-top: 30px;" icon='md-checkmark' type="info" @click="clickQingJing()">确认</Button>
			</div>
		</div>

		<Modal v-model="showBigImgOne" width="800" :draggable='true'>
			<p slot="header" style="color:#648fb4;text-align:center">
				<Icon type="ios-image-outline" />
				<span>查看大图</span>
			</p>
			<div style="height: 400px;width: 100%;">
				<img :src="img_path" style="height: 100%;width: 100%;" alt="" />
			</div>
			<div slot="footer">
				<Button type="info" size="large" long @click="showBigImgOne=false">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getShareEmergency, createEmergency, addShareEmergency, uploadImage, getSingleEmergency,editorMyEmergency } from '../../api/api'
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
				img_path: '', //预览案例图片的路径
				showBigImgOne: false, //预览图片大的弹出框
			}
		},
		mounted() {
			this.getDateInfo();
		},
		methods: {
			goBack(){
				this.$router.go(-1)
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
						this.img_path = this.img_path;
						this.$Message.success(res.error_message);
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
				editorMyEmergency({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					img_path: this.img_path,
					main_resources: this.main_resources,
					resources_params: this.resources_params,
					resources_desc: this.resources_desc,
					emergency_resources: this.emergency_resources,
					id: this.$route.params.resource_edit_id
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.go(-1)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//根据传过来的id获取指定数据
			getDateInfo() {
				getSingleEmergency({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: this.$route.params.resource_edit_id
				}).then(res => {
					if(res.error_code == 2000) {
						console.log(res)
					this.img_path=res.data.img_path;
					this.main_resources=res.data.main_resources;
					this.resources_params=res.data.resources_params;
					this.resources_desc=res.data.resources_desc;
					this.emergency_resources=res.data.emergency_resources;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.edit-resource{
		background: #648fb4;
			border-radius: 16px;
			height: 700px;
			padding-top:20px ;
	}
	.edit-resource{
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
		.text-weight {
			font-weight: bold;
		}
	}
</style>
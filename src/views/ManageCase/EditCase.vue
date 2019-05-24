<template>
	<div class="every-page basicinfor">
		<div style="display: inline-block;height: 40px;line-height: 40px;border-top-left-radius: 6px;border-top-right-radius: 6px;width: 150px;background: #648fb4;color: #FFF0F6;text-align: center;cursor: pointer;">
			编辑基本信息
		</div>
		<div style="background: #648fb4;">
			<div style="height: 65px;text-align: center;line-height: 65px;">
				<span style="color: #FFFFFF;">案例名称：</span>
				<Input v-model="BaseInfo.name" style="width:300px;" placeholder="请输入案例名称"></Input>
				<div style="position: relative;display: inline-block;width: 100px;height: 32px;cursor: pointer;border-radius: 4px;background: red;vertical-align: middle;">
					<input type="file" style="display: inline-block;width: 100px;height: 32px;position: absolute;top: 0;left: 0;opacity: 0;z-index: 100;" ref='file' @change="tirggerFileOne($event)" />
					<Button type="info" size='small' style="background: #CCCCCC;color: #333333;position: absolute;top: 0;left: 0;z-index: 80;cursor: pointer;" icon="ios-cloud-upload-outline">案例头像</Button>
				</div>
				<div v-if="imgPreview!=''" style="display: inline-block;height: 35px;width: 35px;margin-left: 15px;vertical-align: middle;" @click="showBigImgOne=true">
					<img :src="imgPreview" style="width: 100%;height: 100%;" alt="" />
				</div>
			</div>
			<div style="height: 430px;border: 2px solid #fff; border-radius: 4px;padding: 10px 20px;margin: 0 20px;" class="clear-float">
				<div style="float: left;width: 530px;height: 100%;">
					<div class="clear-float" style="margin: 25px 0;">
						<div class="input_info_text">起始时间：</div>
						<DatePicker :editable='false' @on-open-change="startTimeChange" v-model='BaseInfo.start_time' type="datetime" placeholder="请输入起始时间" style="width: 158px"></DatePicker>
						<div class="input_info_text">结束时间：</div>
						<DatePicker :options="endTimeOptions" :editable='false' @on-open-change="endTimeChange" v-model='BaseInfo.end_time' type="datetime" placeholder="请输入结束时间" style="width: 158px"></DatePicker>
					</div>
					<div class="clear-float" style="margin: 25px 0;">
						<div class="input_info_text">事故地点：</div>
						<Cascader style="width: 425px;display: inline-block;" placeholder='请选择地区' :data="maplist" v-model="address"></Cascader>
					</div>	
					<div class="clear-float" style="margin: 25px 0;">
						<div class="input_info_text">场所简介：</div>
						<Input  v-model="BaseInfo.site_description" :rows="4" style="width: 425px;" type="textarea" placeholder="请输入场所简介" />
					</div>
					<div class="clear-float" style="margin: 25px 0;">
						<div class="input_info_text">事故后果：</div>
						<Input  v-model="BaseInfo.accident_description" :rows="4" style="width: 425px;" type="textarea" placeholder="主要从人员伤亡、环境破坏、财产损失等方面进行描述" />
					</div>
				</div>
				<div style="float: right;width: 530px;height: 100%;">
					<div class="clear-float" style="margin: 30px 0;">
						<div class="input_info_text">气象条件：</div>
						<Input  v-model="BaseInfo.weather_description" :rows="4" style="width: 425px;" type="textarea" placeholder="当日的天气、温度、风度、风向、风级等方面进行描述" />
					</div>
					<div class="clear-float" style="margin: 30px 0;">
						<div class="input_info_text">直接原因：</div>
						<Input  v-model="BaseInfo.direct_cause" :rows="4" style="width: 425px;" type="textarea" placeholder="请输入直接原因" />
					</div>
					<div class="clear-float" style="margin: 25px 0;">
						<div class="input_info_text">经验教训：</div>
						<Input  v-model="BaseInfo.experienced_lesson" :rows="4" style="width: 425px;" type="textarea" placeholder="请输入经验教训" />
					</div>
				</div>
			</div>
			<div style='height: 60px;line-height: 60px;background: #648fb4;'>
				<span style="color: #FFFFFF;margin-left: 20px;">其他案例资料：</span>
				<div style="position: relative;display: inline-block;width: 100px;height: 32px;cursor: pointer;border-radius: 4px;vertical-align: top;">
					<input type="file" style="display: inline-block;width: 100px;height: 32px;position: absolute;top: 0;left: 0;opacity: 0;z-index: 100;" ref='file' @change="tirggerFileTwo($event)" />
					<Button type="info" size='small' style="background: #1890ff;box-shadow: 0 0 15px #fff ;margin-left: 10px;" icon="md-cloud-upload">上传资料</Button>
				</div>
				<div v-if="imgPreviewTwo!=''" style="display: inline-block;height: 35px;width: 35px;margin-left: 15px;vertical-align: middle;" @click="showBigImgTwo=true">
					<img :src="imgPreviewTwo" style="width: 100%;height: 100%;" alt="" />
				</div>
				<Button type="info" size='small' style="background: #1890ff;float: right;margin-top: 10px;margin-right: 20px;width: 80px;" icon="ios-log-in" @click="saveEidtCase()">保存</Button>
			</div>
			<div style="height: 80px;background: #FFF;margin-top: 70px;padding-top: 20px;" class="clear-float">
				<div style="float:left;display: inline-block;height: 50px;width: 100px;background: #648fb4;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;" @click="goBack()">
					返回
				</div>
				<div style="float:right;display: inline-block;height: 50px;width: 100px;background: #648fb4;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;" @click="goNext()">
					下一步
				</div>
			</div>
		</div>
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
		<Modal v-model="showBigImgTwo" width="800" :draggable='true'>
			<p slot="header" style="color:#648fb4;text-align:center">
				<Icon type="ios-image-outline" />
				<span>查看大图</span>
			</p>
			<div style="height: 400px;width: 100%;">
				<img :src="imgPreviewTwo" style="height: 100%;width: 100%;" alt="" />
			</div>
			<div slot="footer">
				<Button type="info" size="large" long @click="showBigImgTwo=false">关闭</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { createBaseInfo, uploadImage,getCaseListDetail,editCaseInfo } from '../../api/api'
	import map from "../../util/js/map";

	export default {
		data() {
			return {
				address: ['', '', ''],
				defaultColor: '#576bb3', //默认颜色
				BaseInfo: { //提交的对象
					name: '',
					start_time: '',
					end_time: '',
					address: {
						sheng: '',
						shi: '',
						qu: ''
					},
					site_description: '',
					accident_description: '',
					weather_description: '',
					direct_cause: '',
					experienced_lesson: '',
					other_case_path: '',
					img_path: '',
				},
				maplist: [],
				imgPreview: '', //预览案例图片的路径
				showBigImgOne: false, //预览图片大的弹出框
				imgPreviewTwo: '', //上传资料的路径
				showBigImgTwo: false, //上传资料大的弹出框
				startTimeOptions: {}, //开始日期设置
				endTimeOptions: {}, //结束日期设置
				change_map_id:'',
			}
		},
		mounted() {
			this.maplist = map;
			this.getCase();
		},
		methods: {
			goNext(){
				this.$router.push('/obed/ChangeObjectInfo/'+this.$route.params.edit_case_id+'/'+this.change_map_id)
			},
			goBack(){
				this.$router.go(-1)
			},
			//获取指定案例详细信息
			getCase(){
				getCaseListDetail({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					case_id:this.$route.params.edit_case_id
				}).then(res=>{
					this.BaseInfo.name=res.data.name;
					this.BaseInfo.start_time=res.data.start_time;
					this.BaseInfo.end_time=res.data.end_time;
					this.address= res.data.address.split(',');
					this.BaseInfo.site_description=res.data.site_description;
					this.BaseInfo.weather_description=res.data.weather_description;
					this.BaseInfo.direct_cause=res.data.direct_cause;
					this.BaseInfo.accident_description=res.data.accident_description;
					this.BaseInfo.experienced_lesson=res.data.experienced_lesson;
					this.imgPreview=res.data.img_path;
					this.imgPreviewTwo=res.data.other_case_path;
					this.change_map_id=res.data.mapid;
				})
			},
			startTimeChange() { //设置开始时间    
				if(new Date(this.BaseInfo.start_time) > new Date(this.BaseInfo.end_time)) {
					this.$Message.error('开始时间需要小于结束时间！');
					this.BaseInfo.start_time='';
					return
				}   
			},
			endTimeChange(e) { //设置结束时间       
				if(new Date(this.BaseInfo.start_time) >new Date(this.BaseInfo.end_time)) {
					this.$Message.error('结束时间需要大于开始时间！');
					this.BaseInfo.end_time='';
					return
				}  
			},
			//上传图片
			tirggerFileOne(event) {
				uploadImage({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					image: event.target.files[0]
				}).then(res => {
					if(res.error_code == 2000) {
						this.BaseInfo.img_path = res.data.domain + res.data.filepath;
						this.imgPreview = this.BaseInfo.img_path;
						this.$Message.success(res.error_message);
					} else {
						this.$Message.error(res.error_message);
					}

				})
			},
			//上传其他的数据
			tirggerFileTwo(event) {
				uploadImage({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					image: event.target.files[0]
				}).then(res => {
					if(res.error_code == 2000) {
						this.BaseInfo.other_case_path = res.data.domain + res.data.filepath;
						this.imgPreviewTwo = this.BaseInfo.other_case_path;
						this.$Message.success(res.error_message);
					} else {
						this.$Message.error(res.error_message);
					}

				})
			},
			//保存修改过的案例
			saveEidtCase() {
				console.log(this.BaseInfo.img_path)
				if(this.BaseInfo.name.trim() == '') {
					this.$Message.error("请输入名称！");
					return;
				}
				if(this.BaseInfo.start_time == '') {
					this.$Message.error("请输入开始时间！");
					return;
				}
				if(this.BaseInfo.end_time == '') {
					this.$Message.error("请输入结束时间！");
					return;
				}
				editCaseInfo({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					uid: sessionStorage.getItem('userId'),
					name: this.BaseInfo.name,
					start_time: this.util.getNowTime(this.BaseInfo.start_time),
					end_time: this.util.getNowTime(this.BaseInfo.end_time),
					address: this.address.join(','),
					site_description: this.BaseInfo.site_description,
					accident_description: this.BaseInfo.accident_description,
					weather_description: this.BaseInfo.weather_description,
					direct_cause: this.BaseInfo.direct_cause,
					experienced_lesson: this.BaseInfo.experienced_lesson,
					other_case_path: this.imgPreviewTwo,
					img_path: this.imgPreview,
					case_id:this.$route.params.edit_case_id
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.go(-1)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
		}
	}
</script>

<style lang="less">
	#zuobiao:after {
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 20px solid #fff;
	}
	
	.basicinfor {
		.ivu-input-group-append,
		.ivu-input-group-prepend,
		.ivu-input,
		.ivu-input-group-append {
			border-radius: 4px;
		}
		.ivu-form-item-label {
			color: #FFFFFF;
			font-size: 14px;
		}
		.ivu-tabs-bar {
			margin-bottom: 0;
		}
		.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
			color: #fff;
			background: #648fb4;
			border: 1px solid #1890FF;
		}
		.ivu-btn>.ivu-icon {
			font-size: 22px;
			color: #FFFFFF;
		}
		.ivu-tabs-tabpane {
			background: #648fb4;
			border-bottom-right-radius: 16px;
			border-bottom-left-radius: 16px;
			height: 700px;
			margin-bottom: 20px;
		}
		.input_info_text {
			display: inline-block;
			width: 100px;
			height: 40px;
			line-height: 40px;
			color: #FFFFFF;
			text-align: center;
		}
		.shigu_address {
			display: inline-block;
			height: 40px;
			line-height: 40px;
			width: 40px;
			color: #FFFFFF;
			text-align: center;
		}
	}
	
	.select-td-background {
		background: chartreuse !important;
	}
	
	.default-td-background {
		width: 25px;
		height: 25px;
		background: #34495e;
		border: 0.5px solid #eee;
	}
	
	.left-operation {
		position: absolute;
		top: 30vh;
		right: 0;
		width: 120px;
		text-align: center;
	}
	
	.left-oper-p:hover {
		cursor: pointer;
	}
	
	.objectinfo-span {
		float: left;
		width: 120px;
		text-align: right;
		font-size: 15px;
		height: 30px;
		line-height: 30px;
	}
	
	.objectinfo-lianggang {
		float: left;
		width: 100px;
		text-align: center;
		font-size: 15px;
		height: 30px;
		line-height: 30px;
	}
	
	.ivu-color-picker-confirm {
		.ivu-btn-default {
			span {
				color: #333333;
			}
		}
	}
	
	.select-color {
		display: inline-block;
		width: 40px;
		height: 40px;
		background: #34495e;
		position: relative;
	}
	
	.span-block {
		width: 25%;
		float: left;
		text-align: left;
		height: 40px;
		line-height: 40px;
	}
	
	.span-block:nth-of-type(2n+1) {
		text-align: right;
	}
	
	.ivu-picker-confirm {
		.ivu-btn>span {
			color: #333333;
		}
		.ivu-btn-primary {
			span {
				color: #FFFFFF;
			}
		}
	}
</style>
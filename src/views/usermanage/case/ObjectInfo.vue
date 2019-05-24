<template>
	<div class="every-page basicinfor">
		<div style="display: inline-block;height: 40px;line-height: 40px;border-top-left-radius: 6px;border-top-right-radius: 6px;width: 150px;background: #648fb4;color: #fff;text-align: center;cursor: pointer;" >
			录入基本信息
		</div>
		<div style="margin-left:895.5px;display: inline-block;height: 40px;line-height: 40px;border-top-left-radius: 6px;border-top-right-radius: 6px;width: 150px;background: #648fb4;color: #FFF;text-align: center;cursor: pointer;">
			<span style='color: #FFF;font-size: 16px;' @click="examineCase(3)">同意</span><span style='color: #FFF;font-size: 16px;margin-left: 20px;' @click="examineCase(2)">拒绝</span>  
		</div>
		<div style="background: #648fb4;height: 705px;border-bottom-left-radius: 16px;border-bottom-right-radius: 16px;position: relative;">
			<img v-if="zhinanzhen" src="../../../assets/zhinanzhen.png" style="position: absolute;top: 50px;right: 100px;" alt="" />
			<div style="width: 100%;height: 100%;" class="clear-both shiguform">
				<Form :model="accidentScene" ref='accidentScene' :rules="ruleCustom" :label-width="150" style="width: 400px;float: left;margin-top: 200px;">
					<FormItem label="事故场所长度：" prop="length" style='margin: 30px 0;'>
						<Input type="text" v-model="accidentScene.length" placeholder="请输入事故场所长度 单位（m）"></Input>
					</FormItem>
					<FormItem label="事故场所宽度：" prop="width" style='margin: 30px 0;'>
						<Input type="text" v-model="accidentScene.width" placeholder="请输入事故场所宽度 单位（m）"></Input>
					</FormItem>
					<!--<FormItem label="单个网格边长：" prop="perimeter" style='margin: 30px 0;'>
						<Input type="text" v-model="accidentScene.perimeter" number placeholder="请输入事故场所长度 单位（m）"></Input>
					</FormItem>
					<div style="text-align: right;">
						<Button type="primary" @click="handleSubmit('accidentScene')" style="width: 80%;">生成地图</Button>
					</div>
					<div style="text-align: right;margin-top: 25px;">
						<Button type="primary" @click="createObject()" style="width: 80%;background: #57b663;">创建对象</Button>
					</div>-->
				</Form>
				<div style="width: 800px;height: 100%;float: right;position: relative;">
					<table style="position: absolute;top: 20%;left: 20%;cursor: pointer;">
						<tr v-for="(i,index) in chang" :key='index' style="height: 25px;line-height: 25px;">
							<span style="height: 25px;line-height: 25px;display: inline-block;color: #FFF;margin-right: 5px;">{{(i-chang)*-1+1}} </span>
							<td v-for="(j,suo) in kuan" :key='suo' :id="(i-chang)*-1+1+'-'+j" class="default-td-background" style="position: relative;">
								<span v-if="index==chang-1" style="position: absolute;display: inline-block;top: 22px;width: 25px;left: 0;height: 25px;text-align: center;color: #FFF">{{j}}</span>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div style="height: 80px;background: #FFF;padding-top: 20px;position: relative;" class="clear-float">
				<div style="display: inline-block;height: 50px;width: 100px;background: #13C2C2;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;position: absolute;top: 20px;left: 0;" @click="goBack()">
					返回
				</div>
				<div style="display: inline-block;height: 50px;width: 100px;background: #13C2C2;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;position: absolute;top: 20px;right: 0;" @click="goObjectInfo()">
					下一步
				</div>
			</div>
	</div>
</template>

<script>
	import {createMap,AuditCase,getCaseByMapDetail	} from '../../../api/api'
	export default {
		data() {
			const validateLength = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入事故现场长度！'));
				} else {
					callback();
				}
			};
			const validateWidth = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入事故现场宽度！'));
				} else {
					callback();
				}
			};
			const validatePerimeter = (rule, value, callback) => {
				if(value == '') {
					callback(new Error('请输入单个网格周长！'));
				} else {
					callback();
				}
			};

			return {
				accidentScene: {
					length: '',
					width: '',
					perimeter: ''
				},
				ruleCustom: {
					length: [{
						validator: validateLength,
						trigger: 'blur'
					}],
					width: [{
						validator: validateWidth,
						trigger: 'blur'
					}],
					perimeter: [{
						validator: validatePerimeter,
						trigger: 'blur'
					}]
				},
				chang: 0,
				kuan: 0,
				idList: [],
				isCreatWang: false, //是否创建了网格对象，点击创建对象时需要验证
				isObject: true, //判断是否点击了创建对象按钮
				objectChang: 0, //创建对象之后的边长
				selectObject: false,
				value: '',
				zhinanzhen:false,
			}
		},
		mounted() {
			this.getMapInfo()
		},
		methods: {
			//返回上一步
			goBack(){
				this.$router.go(-1)
			},
			//获取地图详情以及数量
			getMapInfo(){
				getCaseByMapDetail({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					case_id: this.$route.params.object_case_id,
					map_id:this.$route.params.object_map_id
				}).then(res=>{
					console.log(res)
					this.accidentScene.length=res.data.accident_long;
					this.accidentScene.width=res.data.accident_width;
					this.chang=parseInt(res.data.accident_width) ;
					this.kuan=parseInt(res.data.accident_long);
				})
			},
			//点击第一个选项卡
			goOne(){
				this.$router.push('/m/BasicInformationOne')
			},
			//点击第三个选项卡
			goFour(){
				this.$router.push('/m/BasicInformationFour')
			},	
			//点击创建对象按钮
			createObject() {
				if(this.isCreatWang) {
					if(this.chang > this.kuan) {
						this.objectChang = this.chang;
					} else {
						this.objectChang = this.kuan;
					}
					createMap({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						case_id: sessionStorage.getItem('case_insertId'),
						accident_long: this.chang,
						accident_width: this.kuan,
						accident_border_length: this.accidentScene.perimeter,
						map_mun: this.chang * this.kuan
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
							sessionStorage.setItem('map_insertId', res.data.map_insertId)
							sessionStorage.setItem('length', this.chang)
							sessionStorage.setItem('width', this.kuan)
							this.$router.push('/m/BasicInformationThree')
						} else {
							this.$Message.error(res.error_message);
						}

					})
				} else {
					this.$Message.error('请先生成网格!');
				}

			},
			//点击创建网格按钮
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(Math.ceil(parseInt(this.accidentScene.width) / parseInt(this.accidentScene.perimeter)) * (Math.ceil(parseInt(this.accidentScene.length) / parseInt(this.accidentScene.perimeter))) > 200) {
							this.$Message.error('格子数不能大于200个！');
						} else {
							this.isCreatWang = true;
							this.zhinanzhen=true;
							this.$Message.success('生成地图成	功！');
							this.chang = Math.ceil(parseInt(this.accidentScene.width) / parseInt(this.accidentScene.perimeter));
							this.kuan = Math.ceil(parseInt(this.accidentScene.length) / parseInt(this.accidentScene.perimeter));
						}
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
		},
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
	.shiguform{
		.ivu-form-item-label{
			color: #FFFFFF;
		}
	}
</style>
<template>
	<div class="every-page basicinfor"  style="margin-top:0;">
		<div style="height: 100px;width: 100%;">
			<img src="../../assets/chuangjiandituji.png" style="height: 100px;width: 100%;" alt="" />
		</div>
		<div style="background: #648fb4;height: 705px;border-bottom-left-radius: 16px;border-bottom-right-radius: 16px;position: relative;">
			<img v-if="zhinanzhen" src="../../assets/zhinanzhen.png" style="position: absolute;top: 10px;left: 5px;" alt="" />
			<div style="width: 100%;height: 100%;" class="clear-both shiguform">
				<Form :model="accidentScene" ref='accidentScene' :rules="ruleCustom" :label-width="180" style="width: 400px;float: left;margin-top: 150px;">
					<FormItem label="事故场所东西走向长度：" prop="length" style='margin: 30px 0;'>
						<Input type="text" v-model="accidentScene.length" placeholder="请输入事故场所长度 单位（m）"></Input>
						<span style="position: absolute;top: 0;right: -22px;font-size: 18px;color: #FFFFFF;">m</span>
					</FormItem>
					<FormItem label="事故场所南北走向长度：" prop="width" style='margin: 30px 0;'>
						<Input type="text" v-model="accidentScene.width" placeholder="请输入事故场所宽度 单位（m）"></Input>
						<span style="position: absolute;top: 0;right: -22px;font-size: 18px;color: #FFFFFF;">m</span>
					</FormItem>
					<FormItem label="单个网格边长：" prop="perimeter" style='margin: 30px 0;'>
						<Input type="text" v-model="accidentScene.perimeter" number placeholder="请输入事故场所长度 单位（m）"></Input>
						<span style="position: absolute;top: 0;right: -22px;font-size: 18px;color: #FFFFFF;">m</span>
					</FormItem>
					<div style="text-align: right;">
						<Button type="primary" @click="handleSubmit('accidentScene')" style="width: 80%;">生成地图</Button>
					</div>
					<div style="text-align: right;margin-top: 25px;">
						<Button type="primary" @click="createObject()" style="width: 80%;background: #57b663;">创建对象</Button>
					</div>
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
	</div>
</template>

<script>
	import {createMap} from '../../api/api'
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
			
		},
		methods: {
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
					sessionStorage.setItem('shiguchangdu',this.accidentScene.length)
					sessionStorage.setItem('shigukuandu',this.accidentScene.width)
					sessionStorage.setItem('shigubianchang',this.accidentScene.perimeter)
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
						}else if(Math.ceil(parseInt(this.accidentScene.width) / parseInt(this.accidentScene.perimeter)) * (Math.ceil(parseInt(this.accidentScene.length) / parseInt(this.accidentScene.perimeter))) < 20) {
							this.$Message.error('格子数不能小于20个！');
						}else {
							this.isCreatWang = true;
							this.zhinanzhen=true;
							this.$Message.success('生成地图成功！');
							this.chang = Math.ceil(parseInt(this.accidentScene.width) / parseInt(this.accidentScene.perimeter));
							this.kuan = Math.ceil(parseInt(this.accidentScene.length) / parseInt(this.accidentScene.perimeter));
						}
					} else {
//						this.$Message.error('Fail!');
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
	.ivu-form .ivu-form-item-label{
		color: #FFFFFF !important;
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
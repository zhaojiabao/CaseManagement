<template>
	<div class="every-page qingjinkongjian" style="padding-top: 1px;background: #648fb4;padding-bottom: 30px;border-radius:16px ;">
		<div style="width: 800px;margin: 20px auto;background: #fff;padding: 30px;border-radius: 16px;" class="clear-float">
			<div>
				<div class="clear-both" style="padding-bottom: 15px;border-bottom: 1px solid #EEEEEE;">
					<span class="objectinfo-span">承灾对象 ：</span>
					<Select style="width:250px;float: left;" v-model="selectdDIsasterBearing">
						<Option v-for="(item,index) in disasterBearing" :key='index' :value="index">{{item.object_name}}</Option>
					</Select>
				</div>
				<span style="display: inline-block;height: 40px;line-height: 40px;">类型：{{chengzaiInfo.category_name}}</span><br />
				<span style="display: inline-block;height: 40px;line-height: 40px;">对象属性：</span>
				<div class="clear-both" style="padding-bottom: 15px;border-bottom: 1px solid #EEEEEE;height: 200px;overflow: auto;">
					<table class="qingjing">
						<tr>
							<th style="width: 33%;">属性名</th>
							<!--<th style="width: 22%;">属性类型</th>-->
							<!--<th style="width: 22%;">属性区间</th>-->
							<th style="width: 33%;">属性值</th>
							<th style="width: 33%;">属性量纲</th>
						</tr>
						<tr v-for='(item,index) in chengzaiInfo.object_body' :key="index">
							<td style="width: 33%;">{{item.property}}</td>
							<!--<td style="width: 22%;">
							<span v-if="item.type=='int'">
								数值型
							</span>
							<span v-else-if="item.type=='char'">
								字符型
							</span>
							<span v-else>
								枚举型
							</span>
						</td>-->
							<!--<td style="width: 22%;">
							<span v-if="item.type=='int'">
								[{{item.range}}]
							</span>
							<span v-else-if="item.type=='char'">
								<span v-if="item.range==''">
									无
								</span>
								<span v-else>
									{{item.range}}
								</span>
							</span>
							<span v-else>
								<Select style="width:100px;" v-model="index">
									<Option v-for="(item,i) in item.range" :key='i' :value="i">{{item}}</Option>
								</Select>
							</span>
						</td>-->
							<td style="width: 33%;">
								{{item.value}}
							</td>
							<td style="width: 33%;">
								{{item.dimension}}
							</td>
						</tr>
					</table>
				</div>
				<div style="margin: 15px 0;">
					<Button type="info" @click="lookScene()">查看</Button>
					<Button type="success" @click="addScene()">添加</Button>
					<Button type="error" @click="delectScene()">删除</Button>
					<Button type="warning" @click="eidtScene()">编辑</Button>
				</div>
				<div style="height: 200px;overflow: auto;">
					<div class="clear-float">
						<div class="table-common" style="width: 100px;">
							选择
						</div>
						<div class="table-common" style="width: 100px;">
							情景编号
						</div>
						<div class="table-common" style="width: 170px;">
							起始时间
						</div>
						<div class="table-common" style="width: 170px;">
							结束时间
						</div>
						<div class="table-common" style="width: 170px;">
							文本描述
						</div>
					</div>
					<div class="clear-float" v-for='(item,index) in scenarioList' :key="index">
						<div class="table-common-td" style="width: 100px;">
							<input type="checkbox" name="checkbox" id="checkbox" :value="item.id" />
						</div>
						<div class="table-common-td" style="width: 100px;" :title="item.scenario_id">
							情景 {{index+1}}
						</div>
						<div class="table-common-td" style="width: 170px;"  :title="item.start_time">
							{{item.start_time}}
						</div>
						<div class="table-common-td" style="width: 170px;" :title="item.end_time">
							{{item.end_time}}
						</div>
						<div class="table-common-td overflow-hidden" style="width: 170px;" :title="item.sence_desc">
							{{item.sence_desc}}
						</div>
					</div>
					
					<!--<table class="qingjing" style="width: 730px;">
						<tr>
							<th style="width: 11%;display: inline-block;">选择</th>
							<th style="width: 11%;display: inline-block;">情景编号</th>
							<th style="width: 26%;display: inline-block;">起始时间</th>
							<th style="width: 26%;display: inline-block;">结束时间</th>
							<th style="width: 26%;display: inline-block;">文本描述</th>
						</tr>
						<tr v-for='(item,index) in scenarioList' :key="index">
							<td style="width: 11%;display: inline-block;">
								<input type="checkbox" name="checkbox" id="checkbox" :value="item.id" />
							</td>
							<td style="width: 11%;display: inline-block;" :title="item.scenario_id"></td>
							<td style="width: 26%;display: inline-block;" :title="item.start_time"></td>
							<td style="width: 26%;display: inline-block;" :title="item.end_time">{{item.end_time}}</td>
							<td style="width: 26%;display: inline-block;" :title="item.sence_desc">{{item.sence_desc}}</td>
						</tr>
					</table>-->
				</div>
			</div>
			<div slot="footer" class="clear-both">
				<Button type="info" size="large" class="float-left" style="width: 100px;" @click="goBack()">返回</Button>
				<!--<Button type="info" size="large" class="float-right" style="width: 100px;" @click="saveNeiYanhua()">保存</Button>-->
			</div>
		</div>
	</div>
</template>

<script>
	import { createMap, getType, getTypeById, createObject, getAllByObject, getAllByScenario, deleteScenario } from '../../api/api'
	export default {
		data() {
			return {
				chang: 0,
				kuan: 0,
				idList: [],
				isCreatWang: false, //是否创建了网格对象，点击创建对象时需要验证
				isObject: true, //判断是否点击了创建对象按钮
				objectChang: 0, //创建对象之后的边长
				selectObject: false,
				defaultColor: '#576bb3', //默认颜色
				value: '',
				typeList: [], //所有类型存放的数组
				selectTypeId: '', //当前选中的类型id绑定在select上
				selectTypeInfo: [], //选中不同类型出现不同通的属性
				object_name: '', //弹出框中的对象名称
				internalEvolution: false, //内演化创建与编辑是否出现。
				disasterBearing: [], //承灾对象select的数组
				selectdDIsasterBearing: 0, //当前选中的承灾对象的index
				chengzaiInfo: {}, //承灾对象的选中某一个的时候对应数组里面的值
				disasterBearingInfo: [], //选中承灾对象后出现对应的info
				operationScene: false, //点击创建内演化的添加按钮
				addCountermeasure: false, //添加对策的div是否显示
				editObject: true, //编辑对象是否出现
				scenarioList: [], //点击创建内演化的弹窗中出现的情景列表
				nowObjectId: '', //当前的对象id
				category_id: '', //当前选中的类型id
				frompath: '',
			}
		},
		mounted() {
			this.getAllType();
			this.clickInternalEvolution();
			this.chang = parseInt(sessionStorage.getItem('length'));
			this.kuan = parseInt(sessionStorage.getItem('width'));
			this.frompath = sessionStorage.getItem('frompath');
			if(this.chang > this.kuan) {
				this.objectChang = this.chang;
			} else {
				this.objectChang = this.kuan;
			}
			setTimeout(() => {
				console.log(this.frompath)
				if(this.frompath.indexOf('BasicInformationFour') > -1) {
					console.log(this.disasterBearing)
					this.nowObjectId = this.disasterBearing[0].object_id;
				} else {
					if(this.$store.state.qingjingChange != '' && this.$store.state.nowselectdDIsasterBearing != 0) {
						this.nowObjectId = this.$store.state.qingjingChange;
						this.disasterBearing.forEach((item, index) => {
							if(this.nowObjectId == item.object_id) {
								this.selectdDIsasterBearing = index;
							}
						})
					} else {
						this.nowObjectId = this.disasterBearing[0].object_id;
					}
				}
			}, 500)
		},
		methods: {
			//点击删除按钮
			delectScene() {
				var id = document.getElementsByName('checkbox');
				var value = [];
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				if(value.length == 0) {
					this.$Message.error('请选择您想要删除的情景空间！');
					return;
				}
				deleteScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: value.join(',')
				}).then(res => {
					if(res.error_code == 2000) {
						this.getDisasterBearingInfo();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击编辑按钮
			eidtScene() {
				var id = document.getElementsByName('checkbox');
				var value = [];
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				if(value.length != 1) {
					this.$Message.error('请选择您想要编辑的一条情景空间！');
					return;
				}
				this.typeList.forEach((item, index) => {
					if(item.object_name == this.chengzaiInfo.category_name) {
						this.category_id = item.id;
					}
				})
				this.$store.state.qingjingChange = this.nowObjectId;
				this.$router.push('/m/EidtEditScene/' + value[0] + '/' + this.nowObjectId + '/' + this.category_id)
			},
			//点击查看按钮
			lookScene() {
				var id = document.getElementsByName('checkbox');
				var value = [];
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				if(value.length != 1) {
					this.$Message.error('请选择您想要查看的一条情景空间！');
					return;
				}
				this.$store.state.qingjingChange = this.nowObjectId;
				this.$router.push('/m/LookScene/' + value[0] + '/' + this.nowObjectId)
			},
			//点击返回按钮
			goBack() {
				this.$router.push('/m/BasicInformationFour')
			},
			saveNeiYanhua() {
				this.internalEvolution = false;
			},
			//点击添加按钮
			addScene() {
				this.typeList.forEach((item, index) => {
					if(item.object_name == this.chengzaiInfo.category_name) {
						this.category_id = item.id;
					}
				})
				this.$store.state.qingjingChange = this.nowObjectId;
				this.$router.push('/m/EditingScene/' + this.nowObjectId + '/' + this.category_id)
			},
			// 点击创建内演化的弹窗中出现的情景列表
			getDisasterBearingInfo() {
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					object_id: this.nowObjectId,
					pageSize: 10,
					current_page: 1
				}).then(res => {
					if(res.error_code == 2000) {
						this.scenarioList = res.data.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击内演化创建与编辑出现弹窗
			clickInternalEvolution() {
				this.internalEvolution = true;
				//弹窗中的承灾对象出现的列表
				getAllByObject({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId')
				}).then(res => {
					if(res.error_code == 2000) {
						this.disasterBearing = res.data;
						this.chengzaiInfo = this.disasterBearing[this.selectdDIsasterBearing]
						this.chengzaiInfo.object_body = JSON.parse(this.chengzaiInfo.object_body)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//获取所有类型数据
			getAllType() {
				getType({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId')
				}).then(res => {
					if(res.error_code == 2000) {
						if(res.data.categoryShare == undefined) {
							this.typeList = res.data.categoryData
						} else {
							this.typeList = res.data.categoryData.concat(res.data.categoryShare);
						}
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//根据类型id获取指定的一组数据
			getTypeValue() {
				getTypeById({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: this.selectTypeId
				}).then(res => {
					this.selectTypeInfo = res.data;
					this.selectTypeInfo.forEach((item, index) => {
						item.value = '';
						if(item.type == 'enumer') {
							item.range = item.range.split(',');
						}
					})
				})
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
							this.isObject = false;
							this.editObject = true;
						} else {
							this.$Message.error(res.error_message);
						}

					})
				} else {
					this.$Message.error('请先生成网格!');
				}

			},
			//点击图片创建对象
			clickIconCreateObject() {
				if(this.idList.length == 0) {
					this.$Message.error('请选择对应网格!');
				} else {
					this.selectObject = true;
				}
			},
			//选中某几个网格变色
			selectTd(id) {
				this.idList.push(id)
				var aa = new Set(this.idList)
				this.idList = [...aa];
				document.getElementById(id).classList.add('select-td-background')
			},
			//点击第一个面板中的前往创建地图与对象按钮
			goMapObject() {
				this.tabvalue = 'dituduixiang'
			},
			//点击创建网格按钮
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						if(Math.ceil(parseInt(this.accidentScene.width) / parseInt(this.accidentScene.perimeter)) * (Math.ceil(parseInt(this.accidentScene.length) / parseInt(this.accidentScene.perimeter))) > 200) {
							this.$Message.error('格子数不能大于200个！');
						} else {
							this.isCreatWang = true;
							this.$Message.success('生成地图成功！');
							this.chang = Math.ceil(parseInt(this.accidentScene.width) / parseInt(this.accidentScene.perimeter));
							this.kuan = Math.ceil(parseInt(this.accidentScene.length) / parseInt(this.accidentScene.perimeter));
						}
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
		},
		watch: {
			'selectTypeId': function() {
				if(this.selectTypeId == 'xinleixing') {
					this.$router.push('/m/CreateNewType')
				} else {
					this.getTypeValue();
				}
			},
			"selectdDIsasterBearing": function() {
				this.disasterBearing.forEach((item, index) => {
					if(index == this.selectdDIsasterBearing) {
						this.$store.state.nowselectdDIsasterBearing = index;
						this.nowObjectId = item.object_id;
					}
				})
				this.chengzaiInfo = this.disasterBearing[this.selectdDIsasterBearing];
				this.chengzaiInfo.object_body = JSON.parse(this.chengzaiInfo.object_body);
			},
			nowObjectId: function() {
				this.getDisasterBearingInfo();
			}
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
</style>
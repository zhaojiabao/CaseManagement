<template>
	<div class="every-page basicinfor"  style="margin-top:0;overflow: hidden;position: relative;">
		<div style="height: 100px;width: 100%;">
			<img src="../../assets/luruqingjingyuyanhua.png" style="height: 100px;width: 100%;" alt="" />
		</div>
		<div style="background: #648fb4;height: 705px;border-bottom-left-radius: 16px;border-bottom-right-radius: 16px;position: relative;overflow: hidden;">
			<div v-if="showThree" style="height: 1000px;width: 1000px;background-color: #648fb4;">
				<iframe :src="util.getDefaultSrc()+'three/index.html?map_id='+map_id" width="100%" height="100%" frameborder="no" border="0"></iframe>
				<!--<iframe :src="'http://dphp.yysoul.com/three/index.html?map_id='+map_id" width="100%" height="100%" frameborder="no" border="0"></iframe>-->
			</div>
			<div v-else style="height: 670px;width: 800px;line-height: 670px;text-align: center;color: #FFFFFF;font-size: 20px;">
				地图渲染中，请稍候...
			</div>
			<div class="left-operation">
				<p class="left-oper-p" @click="clickInternalEvolution()">
					<Icon type="md-git-compare" style='font-size: 45px;color: #fff;' /><br />
					<span style="color: #fff;padding: 8px 0;display: inline-block;">创建/编辑内演化</span>
				</p>
				<p class="left-oper-p" style="margin-top: 15px;" @click="clickExtrinsicEvolution()">
					<Icon type="md-git-network" style='font-size: 45px;color: #fff;' /><br />
					<span style="color: #fff;padding: 8px 0;display: inline-block;">创建/编辑外演化</span>
				</p>
			</div>
		</div>
		<div style="cursor: pointer;height: 60px;background: #FFF;margin-top: 0px;padding-top: 20px;text-align: right;" class="clear-float">
			<div style="float:right;display: inline-block;height: 50px;width: 100px;background: #648fb4;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;" @click="clickSaveEcase()">
				保存案例
			</div>
		</div>
		<!--点击创建内演化-->
		<Modal v-model="internalEvolution" width="800" :draggable='true'>
			<p slot="header" style="color:#333;text-align:center;height: 30px;">
				<!--<Icon type="ios-paper-outline"></Icon>-->
				<span style="font-size: 16px;">创建内演化</span>
			</p>
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
							<th style="width: 22%;">属性名</th>
							<th style="width: 22%;">属性类型</th>
							<th style="width: 22%;">属性区间</th>
							<th style="width: 22%;">属性值</th>
						</tr>
						<tr v-for='(item,index) in chengzaiInfo.object_body' :key="index">
							<td style="width: 22%;">{{item.property}}</td>
							<td style="width: 22%;">
								<span v-if="item.type=='int'">
								数值型
							</span>
								<span v-else-if="item.type=='char'">
								字符型
							</span>
								<span v-else>
								枚举型
							</span>
							</td>
							<td style="width: 22%;">
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
							</td>
							<td style="width: 22%;">
								{{item.value}}
							</td>
						</tr>
					</table>
				</div>
				<div style="margin: 15px 0;">
					<Button type="success" @click="addScene()">添加情景</Button>
					<Button type="error">删除情景</Button>
				</div>
				<div style="height: 200px;overflow: auto;">
					<table class="qingjing">
						<tr>
							<th style="width: 10%;display: inline-block;">选择</th>
							<th style="width: 18%;display: inline-block;">情景编号</th>
							<th style="width: 18%;display: inline-block;">起始时间</th>
							<th style="width: 18%;display: inline-block;">结束时间</th>
							<th style="width: 18%;display: inline-block;">文本描述</th>
							<th style="width: 18%;display: inline-block;">操作</th>
						</tr>
						<tr v-for='(item,index) in 2' :key="index">
							<td style="width: 10%;display: inline-block;">
								<Checkbox label="twitter">
								</Checkbox>
							</td>
							<td style="width: 18%;display: inline-block;" :title="item.scenario_id">{{item.scenario_id}}</td>
							<td style="width: 18%;display: inline-block;" :title="item.start_time">{{item.start_time}}</td>
							<td style="width: 18%;display: inline-block;" :title="item.end_time">{{item.end_time}}</td>
							<td style="width: 18%;display: inline-block;" :title="item.sence_desc">{{item.sence_desc}}</td>
							<td style="width: 18%;display: inline-block;" :title="item.scenario_id">
								<Button type="info" size='small'>查看</Button>
								<Button type="warning" size='small'>编辑</Button>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div slot="footer" class="clear-both">
				<Button type="info" size="large" class="float-left" style="width: 100px;" @click="internalEvolution=false">返回</Button>
				<Button type="info" size="large" class="float-right" style="width: 100px;" @click="saveNeiYanhua()">保存</Button>
			</div>
		</Modal>
		<Modal v-model="sceneInfoModal" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<!--<Icon type="ios-information-circle"></Icon>-->
				<span>情景详情</span>
			</p>
			<div>
				<div class="scene-info-left-block">
					对象：
				</div>
				<div class="scene-info-right-block">
					{{sceneInfo.objectName}}
				</div>
				<div class="scene-info-left-block">
					起始时间：
				</div>
				<div class="scene-info-right-block">
					{{sceneInfo.start_time}}
				</div>
				<div class="scene-info-left-block">
					结束时间：
				</div>
				<div class="scene-info-right-block">
					{{sceneInfo.end_time}}
				</div>
				<div class="scene-info-left-block">
					情景描述：
				</div>
				<div class="scene-info-right-block">
					{{sceneInfo.sence_desc}}
				</div>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="sceneInfoModal=false" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>
		<div style="min-height: 100px;width:200px;position: absolute;background: #4f6e8a;border-radius: 4px;top:120px;right:180px;padding-bottom:20px">
			<div style="height: 40px;line-height: 40px;text-align: center;color: #fff;font-size: 20px;">
				图例
			</div>
			<div v-for="(item,index) in object_list" :key="index" style="clear: both;width: 180px;margin: 0 auto;">
				<div style="width: 80px;float: left;">
					<div :style="'display: inline-block;width: 60px;height: 30px;background:'+item.object_color"></div>
				</div>
				<div class="overflow-hidden" :title="item.object_name" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					{{item.object_name}}
				</div>
			</div>
			<div style="clear: both;width: 180px;margin: 0 auto;">
				<div style="width: 80px;float: left;">
					<div style="display: inline-block;width: 60px;height: 30px;">
						<img src="../../assets/waiyanhuajiantotu.png" style="width:100%;height: 10px;margin-top: 10px;" alt="" />
					</div>
				</div>
				<div class="overflow-hidden" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					外演化
				</div>
			</div>
			<div style="width: 180px;margin: 0 auto;clear: both;">
				<div style="width: 80px;float: left;">
					<div style="display: inline-block;width: 60px;height: 5px;background: #fff;margin-top:13px"></div>
				</div>
				<div class="overflow-hidden" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					内演化
				</div>
			</div>
			<div style="width: 180px;margin: 0 auto;clear: both;">
				<div style="width: 80px;float: left;">
					<div style="display: inline-block;width: 10px;height: 10px;margin: 13px 0 0 25px;background: #fff;border-radius: 5px;">
						
					</div>
				</div>
				<div class="overflow-hidden" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					情景
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getMapInformation,createMap, getType, getTypeById, createObject, getAllByObject, getAllByScenario, getTheEntireMapInformation, saveEcase } from '../../api/api'
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
				selectList: [], //查询数组
				sceneInfoModal:false,//情景详情是否出现
				sceneInfo:{//弹窗中的数据
					objectName:'',
					start_time:'',
					end_time:'',
					sence_desc:'',
				},
				map_id:'',//获取地图id
				showThree:false,
				object_list:[]
			}
		},
		mounted() {
			setTimeout(()=>{
				this.showThree=true;
			},1000)
			this.getAllType();
			this.chang = parseInt(sessionStorage.getItem('length'));
			this.kuan = parseInt(sessionStorage.getItem('width'));
			this.map_id = parseInt(sessionStorage.getItem('map_insertId'));
			//获取对应的情景空间的点
			this.getDisasterBearingInfo();
			this.getThreeD();
			getMapInformation({
				map_id:this.map_id
			}).then(res=>{
				this.object_list=res.data.map_object;
			})
		},
		methods: {
			//点击情景的时候出现的
			showSceneInfo(scene,id){
				this.typeList.forEach((item,index)=>{
					if(item.id==id){
						this.sceneInfo.objectName=item.object_name;
					}
				})
				this.sceneInfo.start_time=scene.start_time;
				this.sceneInfo.end_time=scene.end_time;
				this.sceneInfo.sence_desc=scene.sence_desc;
				this.sceneInfoModal=true;
			},
			//点击保存案例
			clickSaveEcase() {
				saveEcase({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_insertId: sessionStorage.getItem('map_insertId'),
					case_insertId: sessionStorage.getItem('case_insertId')
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.push('/m/Main')
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//获取3D地图
			getThreeD() {
				getTheEntireMapInformation({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_insertId: sessionStorage.getItem('map_insertId')
				}).then(res => {
					var map = {},
						dest = [],arr=[];
					for(var i = 0; i < res.data.scenario.length; i++) {
						var ai = res.data.scenario[i];
						if(!map[ai.object_id]) {
							dest.push({
								id: ai.object_id,
								data: [ai]
							});
							map[ai.object_id] = ai;
						} else {
							for(var j = 0; j < dest.length; j++) {
								var dj = dest[j];
								if(dj.id == ai.object_id) {
									dj.data.push(ai);
									break;
								}
							}
						}
					}
					this.selectList = res.data.map_object;
					this.selectList.forEach((item, index) => {
						dest.forEach((ele, elei) => {
							if(item.id == ele.id) {
								item.scenario = ele.data;
							}
						})
					})
				})
			},
			//点击第一个选项卡
			goOne() {
				this.$router.push('/m/BasicInformationOne')
			},
			//点击第二个选项卡并且判定是去two还是three
			goTwo() {
				var chang = sessionStorage.getItem('length');
				if(chang != null) {
					this.$router.push('/m/BasicInformationThree');
				} else {
					this.$router.push('/m/BasicInformationTwo');
				}
			},
			//点击创建内演化
			clickExtrinsicEvolution() {
				this.$router.push('/m/AddExtrinsicEvolution')
			},
			saveNeiYanhua() {
				this.internalEvolution = false;
			},
			//在创建内演化的时候点击添加按钮
			addScene() {
				this.$router.push('/m/EditingScene')
			},
			// 点击创建内演化的弹窗中出现的情景列表
			getDisasterBearingInfo() {
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					object_id: sessionStorage.getItem('object_id'),
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
				this.$router.push('/m/ceaterNeiYanhua')
			},
			//获取所有类型数据
			getAllType() {
				getType({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId')
				}).then(res => {
					if(res.error_code == 2000) {
						if(res.data.categoryShare==undefined){
							this.typeList = res.data.categoryData
						}else{
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
				this.chengzaiInfo = this.disasterBearing[this.selectdDIsasterBearing];
				this.chengzaiInfo.object_body = JSON.parse(this.chengzaiInfo.object_body);
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
	
	#hovertwo {
		display: none;
	}
	
	#hoverone:hover #hovertwo {
		display: block;
	}
	.scene-info-left-block{
		width: 100px;
		height: 40px;
		display: inline-block;
		line-height: 40px;
		text-align: right;
		padding-right: 15px;
	}
	.scene-info-right-block{
		width: 660px;
		height: 40px;
		display: inline-block;
		line-height: 40px;
	}
</style>
<template>
	<div class="every-page basicinfor"  style="margin-top:0;overflow: hidden;position:relative">
		<div style="height: 100px;width: 100%;">
			<img src="../../../assets/luruqingjingyuyanhua.png" style="height: 100px;width: 100%;" alt="" />
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
			<div style="float:left;display: inline-block;height: 50px;width: 100px;background: #648fb4;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;" @click="goback()">
				返回
			</div>
			<div style="float:right;display: inline-block;height: 50px;width: 100px;background: #648fb4;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;" @click="clickSaveEcase()">
				保存案例
			</div>
		</div>
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
						<img src="../../../assets/waiyanhuajiantotu.png" style="width:100%;height: 10px;margin-top: 10px;" alt="" />
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
	import { getMapInformation,createMap, getType, getTypeById, createObject, getAllByObject, getAllByScenario, getTheEntireMapInformation, saveEcase } from '../../../api/api'
	export default {
		data() {
			return {
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
				getMapInformation({
					map_id:this.$route.params.scene_map_id
				}).then(res=>{
					this.object_list=res.data.map_object;
				})
			},1000)
			this.map_id=this.$route.params.scene_map_id;
		},
		methods: {
			goback(){
				this.$router.go(-1);
			},
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
			//点击内演化创建与编辑出现弹窗
			clickInternalEvolution() {
				this.$router.push('/m/ceaterNeiYanhua')
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
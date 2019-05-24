<template>
	<div class="every-page qingjinkongjian" style="padding-top: 10px;overflow: auto;">
		<div style="width: 1100px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;" class="clear-float">
			<div class="clear-both shijian" style="padding-bottom: 15px;">
				<span class="objectinfo-span">开始时间 ：</span>
				<DatePicker readonly v-model='editObject.start_time' type="datetime" placeholder="请输入起始时间" style="width: 410px;float: left;"></DatePicker>
				<span class="objectinfo-span">结束时间 ：</span>
				<DatePicker readonly v-model='editObject.end_time' type="datetime" placeholder="请输入结束时间" style="width: 410px;float: left;"></DatePicker>
			</div>
			<div class="clear-both" style="padding-bottom: 15px;">
				<span class="objectinfo-span">致灾因子：</span>
				<Input readonly v-model="editObject.extinguishing_factor" style="width: 410px;float: left;" placeholder="请输入致灾因子"></Input>
				<span class="objectinfo-span">孕灾条件 ：</span>
				<Input readonly v-model="editObject.pregnancy_condition" style="width: 410px;float: left;" placeholder="请输入孕灾条件"></Input>
			</div>
			<div class="clear-both" style="padding-bottom: 15px;">
				<span class="objectinfo-span">文本描述：</span>
				<Input readonly v-model="editObject.sence_desc" type="textarea" style="width: 940px;float: left;" :rows='3' placeholder="请输入文本描述"></Input>
			</div>
			<div class="clear-both" style="padding-bottom: 15px;">
				<span class="objectinfo-span">灾情向量：</span>
				<div style="width: 450px;float:left;">
					<div class="clear-float" style="padding: 5px 0 10px 0;">
						<span>对象破坏相关</span>
						<!--<Button type="success" size='small' icon="ios-add-circle-outline" class="float-right" style="color: #FFF;" @click="goAddYaoOne()">添加要素</Button>-->
					</div>
					<div style="border: 1px solid #ccc;border-radius: 4px;height: 250px; overflow: auto;">
						<div style="width: 550px;">
							<div class="clear-float" style="height: 100px;" v-for="(item,index) in objectList"  v-if='item.is_deleted==0'>
								<span class="chihuo-size scenename" :title="item.ele_desc">{{item.ele_name}}</span>
								<span style="width: 370px;height: 100px;display: inline-block;float: left;">
								<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
									<div :style="'height: 10px;width: 10px;border-radius: 5px;background:rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" v-for="(ele,i) in item.ele_content" :class="{changeBack:ele.selectvalue}">
										<div class="overflow-hidden" :title="ele.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='ele.selectvalue'>
											<span class="clickdotshow">{{ele.ele_protery_desc}}</span>  <br />
											<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
										</div>
										<div class="overflow-hidden" :title="ele.ele_protery_key" style="position: absolute; top: 15px;left: -45px;font-size: 11px;width: 100px;text-align: center;">
											<span v-if="typeof ele.ele_protery_key == 'string'">{{ele.ele_protery_key}}</span>
											<span v-else>[{{ele.ele_protery_key[0]}}~{{ele.ele_protery_key[1]}})</span>
										</div>
									</div>
								</div>
							</span>
								<span style="width: 100px;height: 100px;line-height: 100px;display: inline-block;float: left;" class="chihuo-size overflow-hidden" :title="'量纲：'+item.ele_dimension">量纲：{{item.ele_dimension}}</span>
							</div>
						</div>
					</div>
				</div>
				<div style="width: 450px;float:right;">
					<div class="clear-float" style="padding: 5px 0 10px 0;">
						<span>灾害作用相关</span>
						<!--<Button type="success" size='small' icon="ios-add-circle-outline" class="float-right" style="color: #FFF;" @click="goAddYaoTwo()">添加要素</Button>-->
					</div>
					<div style="border: 1px solid #ccc;border-radius: 4px;height: 250px;overflow: auto;">
						<div style="width: 550px;">
							<div class="clear-float" style="height: 100px;" v-for="(item,index) in zaiqingList"  v-if='item.is_deleted==0'>
								<span   class="chihuo-size scenename" :title='item.ele_desc'>{{item.ele_name}}</span>
								<span style="width: 370px;height: 100px;display: inline-block;float: left;">
								<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
									<div  v-for="(ele,i) in item.ele_content" :style="'height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" :class="{changeBack:ele.selectvalue}"  @click="clickZaiqingDot(ele,index)">
										<div class="overflow-hidden" :title="ele.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='ele.selectvalue'>
											<span class="clickdotshow">{{ele.ele_protery_desc}}</span>  <br />
											<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
										</div>
										<div class="overflow-hidden" :title="ele.ele_protery_key" style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;font-size: 11px;">
											<span v-if="typeof ele.ele_protery_key == 'string'">{{ele.ele_protery_key}}</span>
											<span v-else>[{{ele.ele_protery_key[0]}}~{{ele.ele_protery_key[1]}})</span>
										</div>
									</div>
								</div>
							</span>
								<span style="width: 100px;height: 100px;line-height: 100px;display: inline-block;float: left;" class="chihuo-size overflow-hidden" :title="'量纲：'+item.ele_dimension">量纲：{{item.ele_dimension}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="clear-both" style="padding-bottom: 15px;position: relative;">
				<div>
					<span class="objectinfo-span">情景对策：</span>
					<div style="width: 940px;display: inline-block;border: 1px solid #ccc;border-radius: 4px;margin-top: 5px;padding:15px 0;line-height: 25px;height: 200px;overflow: auto;">
						<!--<div class="clear-float" style="height: 40px;line-height: 40px;">-->
							<!--<Button type="success" size='small' icon="ios-add-circle-outline" style="color: #FFF;float: right;margin-right: 10px;" @click="addDuiCe=true">添加对策</Button>-->
						<!--</div>-->
						<div style="border-bottom: 1px solid #ccc;padding: 10px 0;" v-for="(item,index) in qingjingList" :key='index'>
							<div style="display: inline-block;width: 190px;text-align: center;">
								<span style="font-weight: bold;">情景对策{{index+1}}</span> <br />
								<!--<Button type="error" size="small" style="font-size: 10px;" @click="delectQingjing(index)">删除</Button>-->
							</div>
							<div style="display: inline-block;width: 400px;">
								<span style="font-weight: bold;">资源名称：</span>{{item.emergency_name}}
								<span style="font-weight: bold;margin-left: 30px;">资源数目：</span>{{item.resource_num}} <br />
								<span style="font-weight: bold;">具体措施：</span>{{item.resource_desc}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="clear-both" style="margin-top: 20px;">
				<Button type="info" size="large" class="float-left" style="width: 100px;" @click="reset()">返回</Button>
				<!--<Button type="info" size="large" class="float-right" style="width: 100px;" @click="saveObject()">保存</Button>-->
			</div>
		</div>
		<Modal v-model="resetModel" width="360px" :draggable='true'>
			<p slot="header" style="color:#333;text-align:center;height: 30px;">
				<span style="font-size: 16px;">是否清空所有信息</span>
			</p>
			<div style="text-align: center;">
				信息清空后将销毁数据，是否确认！
			</div>
			<div slot="footer" class="clear-both">
				<Button type="info" size="large" class="float-left" style="width: 100px;" @click="resetModel=false">取消</Button>
				<Button type="info" size="large" class="float-right" style="width: 100px;" @click="querenReset()">确认</Button>
			</div>
		</Modal>
		<Modal v-model="addDuiCe" width="800" :draggable='true'>
			<p slot="header" style="color:#333;text-align:center;height: 30px;">
				<span style="font-size: 16px;">添加对策</span>
			</p>
			<div style="padding-bottom: 15px;">
				<span class="objectinfo-span"></span>
				<div style="width: 100%;display: inline-block;border: 1px solid #ccc;border-radius: 4px;margin-top: 5px;padding:15px 0;line-height: 25px;">
					<span style="width: 120px;text-align: center;display: inline-block;height: 32px;line-height: 32px;">应急资源：</span>
					<Select style="width:250px;" v-model="yingji">
						<Option v-for="(item,index) in yingjiList" :key='index' :value="item.id">{{item.emergency_resources}}</Option>
						<Option value="addResources">+添加资源+</Option>
					</Select>
					<span style="width: 120px;text-align: center;display: inline-block;height: 32px;line-height: 32px;">资源数目 ：</span>
					<Input v-model="ziyuanNumber" style="width: 250px;" placeholder="请输入资源数目"></Input>
					<span style="width: 120px;text-align: center;display: inline-block;height: 32px;line-height: 32px;">具体措施：</span>
					<Input v-model="jutiCuoshi" style="width: 628px;margin-top: 15px;" type="textarea" :rows='4' placeholder="请输入具体措施"></Input>
				</div>
			</div>
			<div slot="footer" class="clear-both">
				<Button type="error" size="small" style="width: 80px;" @click="addDuiCe=false">撤销</Button>
				<Button type="info" size="small" style="margin-left: 30px;width: 80px;" @click="addDuiceQueren()">确认</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getSingleScenario } from '../../api/api'
	export default {
		data() {
			return {
				editObject:{
					start_time:'',
					end_time:'',
					sence_desc:'',
					extinguishing_factor:'',
					pregnancy_condition:''
				},
				addCountermeasure: false,
				resetModel: false, //重置页面是否出现
				yingji: '',
				objectList: [], //对象破坏建设灾情向量列表
				zaiqingList: [], //灾情作用情况灾情向量列表
				addDuiCe: false, //添加对策弹窗是否出现
				yingjiList: [], //应急资源列表
				qingjingList: [], //情景对策列表
				ziyuanNumber: '', //弹窗里面的资源数目
				jutiCuoshi: '', //弹窗里面的具体措施
			}
		},
		mounted() {
//			this.getListElements();
//			this.getMyYingJi();
			setTimeout(()=>{
				this.getPageInfo();
			},200)
			
		},
		methods: {
			//刚刚进入页面的时候获取到指定的数据
			getPageInfo(){
				getSingleScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id:this.$route.params.look_id
				}).then(res=>{
					console.log(res)
					if(res.error_code == 2000) {
						this.editObject.start_time = res.data.start_time;
						this.editObject.end_time = res.data.end_time;
						this.editObject.extinguishing_factor = res.data.extinguishing_factor;
						this.editObject.pregnancy_condition = res.data.pregnancy_condition;
						this.editObject.sence_desc = res.data.sence_desc;
						this.objectList=JSON.parse(res.data.destruction_build);
						this.zaiqingList=JSON.parse(res.data.disaster_situation);
						this.qingjingList=JSON.parse(res.data.scenario_countermeasures);
						
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击页面的保存
			saveObject(){
				if(this.editObject.start_time == '') {
					this.$Message.error('请输入开始时间！');
					return;
				}
				if(this.editObject.end_time == '') {
					this.$Message.error('请输入结束时间！');
					return;
				}
				if(this.editObject.extinguishing_factor == '') {
					this.$Message.error('请输入致灾因子！');
					return;
				}
				if(this.editObject.pregnancy_condition == '') {
					this.$Message.error('请输入孕灾条件！');
					return;
				}
				createScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					object_id:this.$route.params.look_now_object_id,
					case_id: sessionStorage.getItem('case_insertId'),
					map_id: sessionStorage.getItem('map_insertId'),
					start_time: this.util.getNowTime(this.editObject.start_time),
					end_time: this.util.getNowTime(this.editObject.end_time),
					sence_desc: this.editObject.sence_desc,
					extinguishing_factor: this.editObject.extinguishing_factor,
					pregnancy_condition: this.editObject.pregnancy_condition,
					destruction_build:this.objectList,
					disaster_situation:this.zaiqingList,
					scenario_countermeasures:this.qingjingList
				}).then(res=>{
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.push('/m/ceaterNeiYanhua')
					} else {
						this.$Message.error('用户登录信息已过期，请重新登录！');
					}
				})
			},
			//删除指定情景对策
			delectQingjing(index){
				this.qingjingList.splice(index,1);
			},
			//添加对策弹窗里面的确认 
			addDuiceQueren() {
				var yijingname = '';
				this.yingjiList.forEach((item, index) => {
					if(item.id == this.yingji) {
						yijingname = item.emergency_resources;
					}
				})
				if(yijingname == '') {
					this.$Message.error('请选择应急资源！');
					return;
				}
				if(this.ziyuanNumber == '') {
					this.$Message.error('请填写资源数目！');
					return;
				}
				if(this.jutiCuoshi == '') {
					this.$Message.error('请填写具体描述！');
					return;
				}
				var obj = {
					emergency_id: this.yingji,
					emergency_name: yijingname,
					resource_num: this.ziyuanNumber,
					resource_desc: this.jutiCuoshi
				}
				this.qingjingList.push(obj);
				this.yingji = '';
				this.ziyuanNumber = '';
				this.jutiCuoshi = '';
				this.addDuiCe = false;
				console.log(this.qingjingList)
			},
			//获取我的应急资源
			getMyYingJi() {
				MyEmergencyResources({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					currentPage: 1,
					pageSize: 10
				}).then(res => {
					if(res.error_code == 2000) {
						console.log(res)
						this.yingjiList = res.data.resData;
					} else {
						this.$Message.error('用户登录信息已过期，请重新登录！');
					}
				})
			},
			//获取我的元素（对象破坏建设和灾情作用情况）-包括我从共享的拉过来的和我的以及我的共享数据
			getListElements() {
				//获取对象破坏建设灾情向量列表
				getListElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					currentPage: 1,
					pageSize: 1,
					ele_object_type: 1,
					searchCondition: '',
				}).then(res => {
					if(res.error_code == 2000) {
						this.objectList = res.data;
						this.objectList.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content)
						})
					} else {
						this.$Message.error('用户登录信息已过期，请重新登录！');
					}
				})
				//获取灾情作用情况灾情向量列表
				getListElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					currentPage: 1,
					pageSize: 1,
					ele_object_type: 2,
					searchCondition: '',
				}).then(res => {
					if(res.error_code == 2000) {
						this.zaiqingList = res.data;
						this.zaiqingList.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content)
						})
					} else {
						this.$Message.error('用户登录信息已过期，请重新登录！');
					}
				})
			},
			clickBack() {
				this.$router.push('/m/CreateNewType')
			},
			clickSave() {
				this.$router.push('/m/BasicInformation')
			},
			addElement() {
				this.$router.push('/m/AddElement')
			},
			reset() {
//				this.resetModel = true;
				this.$router.go(-1)
			},
			querenReset() {
				this.BaseInfo = {};
				this.resetModel = false;
			},
			//点击添加对象要素按钮
			goAddYaoOne() {
				this.$router.push('/m/AddElement/' + 1)
			},
			//点击灾情作用的添加要素按钮
			goAddYaoTwo() {
				this.$router.push('/m/AddElement/' + 2)
			},
		},
		watch: {
			yingji: function() {
				if(this.yingji == 'addResources') {
					this.$router.push('/m/AddResources')
				}
			}
		}
	}
</script>

<style lang="less">
	.qingjinkongjian {
		background:#648fb4;
		height: 840px;
		overflow: auto;
		border-radius: 16px;
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
		.objectinfo-span {
			float: left;
			width: 120px;
			text-align: right;
			font-size: 15px;
			height: 30px;
			line-height: 30px;
		}
		.chihuo-size {
			font-size: 13px;
			text-align: center;
		}
		.shijian{
			.ivu-btn>span{
				color: #333333;
			}
		}
	}
</style>
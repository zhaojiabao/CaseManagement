<template>
	<div class="every-page qingjinkongjian" style="padding-top: 10px;overflow: auto;">
		<div style="width: 1100px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;" class="clear-float">
			<div class="clear-both shijian" style="padding-bottom: 15px;">
				<span class="objectinfo-span">开始时间 ：</span>
				<DatePicker :editable='false' @on-open-change="startTimeChange" v-model='editObject.start_time' type="datetime" placeholder="请输入起始时间" style="width: 410px;float: left;"></DatePicker>
				<span class="objectinfo-span">结束时间 ：</span>
				<DatePicker :editable='false' @on-open-change="endTimeChange" v-model='editObject.end_time' type="datetime" placeholder="请输入结束时间" style="width: 410px;float: left;"></DatePicker>
			</div>
			<div class="clear-both" style="padding-bottom: 15px;">
				<span class="objectinfo-span">致灾因子：</span>
				<Input v-model="editObject.extinguishing_factor" style="width: 410px;float: left;" placeholder="请输入致灾因子"></Input>
				<span class="objectinfo-span">孕灾条件 ：</span>
				<Input v-model="editObject.pregnancy_condition" style="width: 410px;float: left;" placeholder="请输入孕灾条件"></Input>
			</div>
			<div class="clear-both" style="padding-bottom: 15px;">
				<span class="objectinfo-span">文本描述：</span>
				<Input v-model="editObject.sence_desc" type="textarea" style="width: 940px;float: left;" :rows='3' placeholder="请输入文本描述"></Input>
			</div>
			<div class="clear-both" style="padding-bottom: 15px;">
				<span class="objectinfo-span">灾情向量：</span>
				<div style="width: 450px;float:left;">
					<div class="clear-float" style="padding: 5px 0 10px 0;">
						<span>对象破坏相关</span>
						<Button type="success" size='small' icon="ios-add-circle-outline" class="float-right" style="color: #FFF;" @click="goAddYaoOne()">添加要素</Button>
					</div>
					<div style="border: 1px solid #cccccc;border-radius: 4px;height: 250px; overflow: auto;">
						<div style="width: 550px;">
							<div class="clear-float" style="height: 100px;" v-for="(item,index) in objectList">
								<span class="chihuo-size scenename" :title="item.ele_desc">{{item.ele_name}}</span>
								<span style="width: 370px;height: 100px;display: inline-block;float: left;">
								<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
									<div :style="'height: 10px;width: 10px;border-radius: 5px;background:rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" v-for="(ele,i) in item.ele_content" :class="{changeBack:ele.selectvalue}" @click="clickObjectDot(ele,index)">
										<div class="overflow-hidden" :title="ele.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='ele.selectvalue'>
											<span class="clickdotshow">{{ele.ele_protery_desc}}</span> <br />
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
			<Button type="success" size='small' icon="ios-add-circle-outline" class="float-right" style="color: #FFF;" @click="goAddYaoTwo()">添加要素</Button>
		</div>
		<div style="border: 1px solid #cccccc;border-radius: 4px;height: 250px;overflow: auto;">
			<div style="width: 550px;">
				<div class="clear-float" style="height: 100px;" v-for="(item,index) in zaiqingList" :key='index'>
					<span class="chihuo-size scenename" :title='item.ele_desc'>{{item.ele_name}}</span>
					<span style="width: 370px;height: 100px;display: inline-block;float: left;">
								<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
									<div  v-for="(ele,i) in item.ele_content" :style="'height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" :class="{changeBack:ele.selectvalue}" @click="clickZaiqingDot(ele,index)">
										<div class="overflow-hidden" :title="ele.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='ele.selectvalue'>
											<span class="clickdotshow">{{ele.ele_protery_desc}}</span> <br />
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
			<div style="width: 940px;display: inline-block;border: 1px solid #cccccc;border-radius: 4px;margin-top: 5px;padding:15px 0;line-height: 25px;height: 200px;overflow: auto;">
				<div class="clear-float" style="height: 40px;line-height: 40px;">
					<Button type="success" size='small' icon="ios-add-circle-outline" style="color: #FFF;float: right;margin-right: 10px;" @click="addDuiCe=true">添加对策</Button>
				</div>
				<div style="border-bottom: 1px solid #cccccc;padding: 10px 0;" v-for="(item,index) in qingjingList" :key='index'>
					<div style="display: inline-block;width: 190px;text-align: center;">
						<span style="font-weight: bold;">情景对策{{index+1}}</span> <br />
						<Button type="error" size="small" style="font-size: 10px;" @click="delectQingjing(index)">删除</Button>
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
		<Button type="info" size="large" class="float-right" style="width: 100px;" @click="saveObject()">保存</Button>
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
			<div style="width: 100%;display: inline-block;border: 1px solid #cccccc;border-radius: 4px;margin-top: 5px;padding:15px 0;line-height: 25px;">
				<span style="width: 120px;text-align: center;display: inline-block;height: 32px;line-height: 32px;">应急资源：</span>
				<Select style="width:250px;" v-model="yingji">
					<Option v-for="(item,index) in yingjiList" :key='index' :value="item.id">{{item.emergency_resources}}</Option>
					<Option value="addResources">+添加资源+</Option>
				</Select>
				<span style="width: 120px;text-align: center;display: inline-block;height: 32px;line-height: 32px;">资源数目 ：</span>
				<Input @on-change='yanzhengNumber()' v-model="ziyuanNumber" style="width: 250px;" placeholder="请输入资源数目"></Input>
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
	import { getListElements, MyEmergencyResources, createScenario, getElementByCategory, getAllByScenario } from '../../api/api'
	export default {
		data() {
			return {
				editObject: {
					start_time: '',
					end_time: '',
					sence_desc: '',
					extinguishing_factor: '',
					pregnancy_condition: ''
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
				startTimeOptions: {}, //开始日期设置
				endTimeOptions: {}, //结束日期设置
				caseStartTime: '', //案例开始时间
				caseEndTime: '', //案例结束时间
				scenarioList: '',
				zailaiyige1:[],
				zailaiyige2:[],
				
			}
		},
		mounted() {
			setTimeout((item, index) => {
				this.getListElements();
			}, 100)
			this.getMyYingJi();
			this.caseStartTime = parseInt(sessionStorage.getItem('start_time'));
			this.caseEndTime = parseInt(sessionStorage.getItem('end_time'));
			this.getDisasterBearingInfo();

			this.editObject.start_time = sessionStorage.getItem('start_time_add');
			this.editObject.end_time = sessionStorage.getItem('end_time_add');
			this.editObject.extinguishing_factor = sessionStorage.getItem('extinguishing_factor');
			this.editObject.pregnancy_condition = sessionStorage.getItem('pregnancy_condition');
			this.editObject.sence_desc = sessionStorage.getItem('sence_desc');
			this.qingjingList = JSON.parse(sessionStorage.getItem('qingjingList'));
			if(this.objectList != null) {
				setTimeout(() => {
					this.objectList = this.zailaiyige1.splice(JSON.parse(sessionStorage.getItem('objectList')).length).concat(JSON.parse(sessionStorage.getItem('objectList')));
					this.zaiqingList = this.zailaiyige2.splice(JSON.parse(sessionStorage.getItem('zaiqingList')).length).concat(JSON.parse(sessionStorage.getItem('zaiqingList')));
				}, 300)
			}
			if(this.editObject.start_time_add == null) {
				this.editObject.start_time_add = ''
			}
			if(this.editObject.end_time_add == null) {
				this.editObject.end_time_add = ''
			}
			if(this.editObject.extinguishing_factor == null) {
				this.editObject.extinguishing_factor = ''
			}
			if(this.editObject.pregnancy_condition == null) {
				this.editObject.pregnancy_condition = ''
			}
			if(this.editObject.sence_desc == null) {
				this.editObject.sence_desc = ''
			}
			if(this.qingjingList == null) {
				this.qingjingList = []
			}
			if(this.objectList == null) {
				this.objectList = []
			}
			if(this.zaiqingList == null) {
				this.zaiqingList = []
			}
		},
		methods: {
			// 点击创建内演化的弹窗中出现的情景列表
			getDisasterBearingInfo() {
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					object_id: this.$route.params.now_object_id,
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
			//点击灾情要素的箭头上的点
			clickZaiqingDot(dot, index) {
				this.zaiqingList[index].ele_content.forEach((ele, elei) => {
					if(ele.ele_protery_desc == dot.ele_protery_desc) {
						ele.selectvalue = true;
					} else {
						ele.selectvalue = false;
					}
				})
				this.zaiqingList.reverse().reverse();
			},
			//点击对象破坏建设的箭头上的点
			clickObjectDot(dot, index) {
				this.objectList[index].ele_content.forEach((ele, elei) => {
					if(ele.ele_protery_desc == dot.ele_protery_desc) {
						ele.selectvalue = true;
					} else {
						ele.selectvalue = false;
					}
				})
				this.objectList.reverse().reverse();
			},
			//验证资源数目
			yanzhengNumber() {
				var yan = /^\+?[1-9][0-9]*$/;
				if(!yan.test(this.ziyuanNumber)) {
					this.$Message.error('请输入正整数！');
					this.ziyuanNumber = '';
				}
			},
			startTimeChange(e) { //设置开始时间     
				if(new Date(this.editObject.start_time) < new Date(this.caseStartTime)) {
					this.$Message.error('情景开始时间需大于案例开始时间！');
					this.$Message.error('案例开始时间为：' + this.util.getNowTime(this.caseStartTime));
					return;
				}
				if(new Date(this.editObject.start_time).valueOf() > new Date(this.caseEndTime)) {
					this.$Message.error('情景开始时间需小于案例结束时间！');
					this.$Message.error('案例结束时间为：' + this.util.getNowTime(this.caseEndTime));
					return;
				}
				if(new Date(this.editObject.start_time) > new Date(this.editObject.end_time)) {
					this.$Message.error('情景开始时间需小于情景结束时间！');
					return
				}
			},
			endTimeChange(e) { //设置结束时间    
				if(new Date(this.editObject.end_time) < new Date(this.caseStartTime)) {
					this.$Message.error('情景结束时间需大于案例开始时间！');
					this.$Message.error('案例开始时间为：' + this.util.getNowTime(this.caseStartTime));
					return;
				}
				if(new Date(this.editObject.end_time) > new Date(this.caseEndTime)) {
					this.$Message.error('情景结束时间需小于案例结束时间！');
					this.$Message.error('案例结束时间为：' + this.util.getNowTime(this.caseEndTime));
					return;
				}   
				if(new Date(this.editObject.start_time) > new Date(this.editObject.end_time)) {
					this.$Message.error('情景开始时间需小于情景结束时间！');
					return
				}
			},
			//点击页面的保存
			saveObject() {
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
				if(this.editObject.sence_desc.length > 100) {
					this.$Message.error('文本描述的长度需小于100！');
					return;
				}
				createScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					object_id: this.$route.params.now_object_id,
					case_id: sessionStorage.getItem('case_insertId'),
					map_id: sessionStorage.getItem('map_insertId'),
					start_time: this.util.getNowTime(this.editObject.start_time),
					end_time: this.util.getNowTime(this.editObject.end_time),
					sence_desc: this.editObject.sence_desc,
					extinguishing_factor: this.editObject.extinguishing_factor,
					pregnancy_condition: this.editObject.pregnancy_condition,
					destruction_build: this.objectList,
					disaster_situation: this.zaiqingList,
					scenario_countermeasures: this.qingjingList
				}).then(res => {
					if(res.error_code == 2000) {
						sessionStorage.removeItem('start_time_add');
						sessionStorage.removeItem('end_time_add');
						sessionStorage.removeItem('extinguishing_factor');
						sessionStorage.removeItem('pregnancy_condition');
						sessionStorage.removeItem('sence_desc');
						sessionStorage.removeItem('qingjingList');
						sessionStorage.removeItem('objectList');
						sessionStorage.removeItem('zaiqingList');
						this.$Message.success(res.error_message);
						this.$router.go(-1)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//删除指定情景对策
			delectQingjing(index) {
				this.qingjingList.splice(index, 1);
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
				sessionStorage.setItem('start_time_add', this.editObject.start_time);
				sessionStorage.setItem('end_time_add', this.editObject.end_time);
				sessionStorage.setItem('extinguishing_factor', this.editObject.extinguishing_factor);
				sessionStorage.setItem('pregnancy_condition', this.editObject.pregnancy_condition);
				sessionStorage.setItem('sence_desc', this.editObject.sence_desc);
				sessionStorage.setItem('qingjingList', JSON.stringify(this.qingjingList));
				sessionStorage.setItem('objectList', JSON.stringify(this.objectList));
				sessionStorage.setItem('zaiqingList', JSON.stringify(this.zaiqingList));
				this.qingjingList.push(obj);
				this.yingji = '';
				this.ziyuanNumber = '';
				this.jutiCuoshi = '';
				this.addDuiCe = false;
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
						this.yingjiList = res.data.resData;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//获取我的元素（对象破坏建设和灾情作用情况）-包括我从共享的拉过来的和我的以及我的共享数据
			getListElements() {
				//获取对象破坏建设灾情向量列表
				getElementByCategory({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					category_id: this.$route.params.add_category_id,
					ele_object_type: 1,
				}).then(res => {
					if(res.error_code == 2000) {
						this.objectList = res.data;
						this.objectList.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content)
						})
						this.zailaiyige1=this.objectList;
					} else {
						this.$Message.error(res.error_message);
					}
				})
				//获取灾情作用情况灾情向量列表
				getElementByCategory({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					category_id: this.$route.params.add_category_id,
					ele_object_type: 2,
				}).then(res => {
					if(res.error_code == 2000) {
						this.zaiqingList = res.data;
						this.zaiqingList.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content)
						})
						this.zailaiyige2=this.zaiqingList;
					} else {
						this.$Message.error(res.error_message);
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
				sessionStorage.removeItem('start_time_add');
				sessionStorage.removeItem('end_time_add');
				sessionStorage.removeItem('extinguishing_factor');
				sessionStorage.removeItem('pregnancy_condition');
				sessionStorage.removeItem('sence_desc');
				sessionStorage.removeItem('qingjingList');
				sessionStorage.removeItem('objectList');
				sessionStorage.removeItem('zaiqingList');
				this.$router.push('/m/ceaterNeiYanhua')
			},
			querenReset() {
				this.BaseInfo = {};
				this.resetModel = false;
			},
			//点击添加对象要素按钮
			goAddYaoOne() {
				sessionStorage.setItem('start_time_add', this.editObject.start_time);
				sessionStorage.setItem('end_time_add', this.editObject.end_time);
				sessionStorage.setItem('extinguishing_factor', this.editObject.extinguishing_factor);
				sessionStorage.setItem('pregnancy_condition', this.editObject.pregnancy_condition);
				sessionStorage.setItem('sence_desc', this.editObject.sence_desc);
				sessionStorage.setItem('qingjingList', JSON.stringify(this.qingjingList));
				sessionStorage.setItem('objectList', JSON.stringify(this.objectList));
				sessionStorage.setItem('zaiqingList', JSON.stringify(this.zaiqingList));
				this.$router.push('/m/AddElement/' + 1 + '/' + this.$route.params.add_category_id +'/' + this.$route.params.now_object_id)
			},
			//点击灾情作用的添加要素按钮
			goAddYaoTwo() {
				sessionStorage.setItem('start_time_add', this.editObject.start_time);
				sessionStorage.setItem('end_time_add', this.editObject.end_time);
				sessionStorage.setItem('extinguishing_factor', this.editObject.extinguishing_factor);
				sessionStorage.setItem('pregnancy_condition', this.editObject.pregnancy_condition);
				sessionStorage.setItem('sence_desc', this.editObject.sence_desc);
				sessionStorage.setItem('qingjingList', JSON.stringify(this.qingjingList));
				sessionStorage.setItem('objectList', JSON.stringify(this.objectList));
				sessionStorage.setItem('zaiqingList', JSON.stringify(this.zaiqingList));
				this.$router.push('/m/AddElement/' + 2 + '/' + this.$route.params.add_category_id +'/' + this.$route.params.now_object_id)
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
		background: #648fb4;
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
		.shijian {
			.ivu-btn>span {
				color: #333333;
			}
			.ivu-picker-confirm {
				.ivu-btn-primary {
					span {
						color: #fff !important;
					}
				}
			}
		}
	}
</style>
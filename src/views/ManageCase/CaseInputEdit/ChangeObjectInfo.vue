<template>
	<div class="every-page basicinfor" style="margin-top:0;">
		<div style="height: 100px;width: 100%;">
			<img src="../../../assets/chuangjiandituji.png" style="height: 100px;width: 100%;" alt="" />
		</div>
		<div style="background: #648fb4;height: 650px;position: relative;">
			<img src="../../../assets/zhinanzhen.png" style="position: absolute;top: 10px;left: 5px;" alt="" />
			<div style="position: absolute;top: 150px;left: 0px;height: 180px;margin-left: 50px;line-height: 30px;">
				 <span class="font-size-color">事故场所东西走向长度：{{kuan}} (m) </span> <br /><span class="font-size-color"> 事故场所南北走向长度：{{chang}} (m)</span> <br /> 
				<span class="font-size-color">单个网格边长：{{accident_border_length}} (m)</span> <br />
			</div>
			<div id="this111" style='position: relative;width: 100%;height: 100%;'>
				<table style="position: absolute;top: 80px;left: 300px;cursor: pointer;">
					<tr v-for="(i,index) in chang">
						<span style="color: #FFF;margin-right: 5px;">{{(i-chang)*-1+1}} </span>
						<td v-for="j in kuan" @click="selectTd(j+'-'+((i-chang)*-1+1))" :id="j+'-'+((i-chang)*-1+1)" class="default-td-background" :style="'position:relative;width:'+500/objectChang+'px;height:'+500/objectChang+'px'">
							<span v-if="index==chang-1" :style="'position: absolute;display: inline-block;top:'+550/objectChang+'px;width: '+550/objectChang+'px;left: 0;height: '+550/objectChang+'px;text-align: center;color: #FFF'">{{j}}</span>
							<div v-for="(item,itemid) in selectList" :key='itemid'>
								<div @click.stop="selectObjectOperation(item,j+'-'+((i-chang)*-1+1))" v-for="(element,iele) in item.object_index.split(',')" :key='iele' v-if="element==(j+'-'+((i-chang)*-1+1))" :style="'position:absolute;top:0;left:0;height:100%;width:100%;background-color:'+item.object_color+'!important'"></div>
							</div>
						</td>
					</tr>
				</table>
				<div class="left-operation">
					<p class="left-oper-p" @click="clickIconCreateObject()">
						<Icon type="ios-paper-outline" style='font-size: 40px;color: #fff;' /> <br />
						<span style="color: #fff;padding: 5px 0;">创建对象</span>
					</p>
					<p class="left-oper-p" @click="resetSelectElement()"><br />
						<Icon type="ios-sync" style='font-size: 40px;color: #fff;' /><br />
						<span style="color: #fff;padding: 5px 0;">清除所选网格</span>
					</p>
					<p class="left-oper-p" style="margin-top: 15px;" v-if='editObject' @click="clickEditObject()">
						<Icon type="ios-settings-outline" style='font-size: 40px;color: #fff;' /> <br />
						<span style="color: #fff;padding: 5px 0;">编辑对象</span>
					</p>
					<p class="left-oper-p" style="margin-top: 15px;" v-if='editObject' @click="delectObject()">
						<Icon type="ios-trash-outline" style='font-size: 40px;color: #fff;' /> <br />
						<span style="color: #fff;padding: 5px 0;">删除对象</span>
					</p>
				</div>
			</div>
		</div>
		<div style="height: 80px;background: #FFF;margin-top: 20px;padding-top: 20px;text-align: right;" class="clear-float">
			<div style="float:left;display: inline-block;height: 50px;width: 100px;background: #648fb4;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;" @click="goBack()">
				返回
			</div>
			<div style="float:right;display: inline-block;height: 50px;width: 100px;background: #648fb4;background-size: 100% 100%;line-height: 50px;color: #FFFFFF;text-align: center;border-radius: 4px;cursor: pointer;" @click="goScene()">
				下一步
			</div>
		</div>
		<!--点击创建对象-->
		<Modal v-model="selectObject" width="800" :draggable='true'>
			<p slot="header" style="color:#333;text-align:center;height: 30px;">
				<!--<Icon type="ios-paper-outline"></Icon>-->
				<span style="font-size: 16px;">对象信息</span>
			</p>
			<div>
				<div class="clear-both" style="padding-bottom: 15px;border-bottom: 1px solid #EEEEEE;">
					<span class="objectinfo-span">类型 ：</span>
					<Select style="width:250px;float: left;" v-model="selectTypeId">
						<Option v-for="(item,index) in typeList" :key='index' :value="item.id">{{item.object_name}}</Option>
						<!--<Option value='xinleixing'>+新类型+</Option>-->
					</Select>
					<span class="objectinfo-span">对象名称 ：</span>
					<Input v-model="object_name" placeholder="请输入对象名称" style="width: 250px;float: left;" />
				</div>
				<div class="clear-both" style="margin-top: 30px;display: inline-block;" v-for="(item,index) in selectTypeInfo" :key="index">
					<span class="objectinfo-span">{{item.property}} ：</span>
					<Input v-if="item.type=='int'" v-model="item.value" placeholder="请输入" style="width: 150px;float: left;" />
					<Select v-else-if="item.type=='enumer'" style="width:150px;float: left;" v-model="item.value">
						<Option v-for="(option,i) in item.range" :key='i' :value="option">{{option}}</Option>
					</Select>
					<Input v-else v-model="item.value" placeholder="请输入" style="width: 150px;float: left;" />
					<span class="objectinfo-lianggang">量纲：{{item.dimension}}</span>
				</div>
				<div class="clear-both" style="margin: 30px 0;">
					<span class="objectinfo-span">对象颜色 ：</span>
					<ColorPicker v-model="defaultColor" />
				</div>
			</div>
			<div slot="footer" class="clear-both">
				<Button type="info" size="large" class="float-left" style="width: 100px;" @click="Rrvoke()">撤销</Button>
				<Button type="info" size="large" class="float-right" style="width: 100px;" @click="saveObject()">保存</Button>
			</div>
		</Modal>
		<!--点击编辑对象-->
		<Modal v-model="editObjectModel" width="800" :draggable='true'>
			<p slot="header" style="color:#333;text-align:center;height: 30px;">
				<!--<Icon type="ios-paper-outline"></Icon>-->
				<span style="font-size: 16px;">对象信息</span>
			</p>
			<div>
				<div class="clear-both" style="padding-bottom: 15px;border-bottom: 1px solid #EEEEEE;">
					<span class="objectinfo-span">类型 ：</span>
					<Select style="width:250px;float: left;" v-model="editObjectInfo.category_id" :disabled='true'>
						<Option v-if="typeList.length!=0" v-for="(item,index) in typeList" :key='index' :value="item.id">{{item.object_name}}</Option>
						<Option value='xinleixing'>+新类型+</Option>
					</Select>
					<span class="objectinfo-span">对象名称 ：</span>
					<Input readonly="readonly" v-model="editObjectInfo.object_name" placeholder="请输入对象名称" style="width: 250px;float: left;" />
				</div>
				<div class="clear-both" style="margin-top: 30px;display: inline-block;" v-for="(item,index) in editObjectInfo.object_body" :key="index">
					<span class="objectinfo-span">{{item.property}} ：</span>
					<Input v-if="item.type=='int'" v-model="item.value" placeholder="请输入" style="width: 150px;float: left;" />
					<Select v-else-if="item.type=='enumer'" style="width:150px;float: left;" v-model="item.value">
						<Option v-for="(option,i) in item.range" :key='i' :value="option">{{option}}</Option>
					</Select>
					<Input v-else v-model="item.value" placeholder="请输入" style="width: 150px;float: left;" />
					<span class="objectinfo-lianggang">量纲：{{item.dimension}}</span>
				</div>
				<div class="clear-both" style="margin: 30px 0;">
					<span class="objectinfo-span">对象颜色 ：</span>
					<ColorPicker v-model="editDefaultColor" />
				</div>
			</div>
			<div slot="footer" class="clear-both">
				<Button type="info" size="large" class="float-left" style="width: 100px;" @click="editObjectModel=false">撤销</Button>
				<Button type="info" size="large" class="float-right" style="width: 100px;" @click="saveEditObject()">保存</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getCaseByMapDetail, createMap, getType, getTypeById, createObject, getAllByObject, getAllByScenario, getTheEntireMapInformation, deleteObject, editorObject } from '../../../api/api'
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
				tabvalue: 'jibenxinxi',
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
					img_path: ''
				},
				value: '',
				typeList: [], //所有类型存放的数组
				selectTypeId: '', //当前选中的类型id绑定在select上
				selectTypeInfo: [], //选中不同类型出现不同通的属性
				object_name: '', //弹出框中的对象名称
				internalEvolution: false, //内演化创建与编辑是否出现。
				disasterBearing: [], //承灾对象select的数组
				selectdDIsasterBearing: '', //当前选中的承灾对象id
				disasterBearingInfo: [], //选中承灾对象后出现对应的info
				operationScene: false, //点击创建内演化的添加按钮
				addCountermeasure: false, //添加对策的div是否显示
				editObject: false, //编辑对象是否出现
				selectList: [], //所有的对象数组数据
				object_id: '', //选中操作的对象id
				editObjectInfo: {}, //选中某个对象的时候填充弹出框的数据
				editObjectModel: false, //编辑框是否出现
				editDefaultColor: '', //编辑的默认的颜色
				idNumber: [], //id算数的数组
				changdu: '', //地图长度
				kuandu: '', //地图宽度
				bianchang: '', //地图bianchang
				editObjectCategoryId: '', //点击编辑的时候看的类型id
				accident_border_length:'',
			}
		},
		mounted() {
			sessionStorage.setItem('map_insertId',this.$route.params.change_map_id),
			sessionStorage.setItem('case_insertId',this.$route.params.change_edit_id)
			getCaseByMapDetail({
				username: sessionStorage.getItem('username'),
				token: sessionStorage.getItem('token'),
				case_id: this.$route.params.change_edit_id,
				map_id: this.$route.params.change_map_id
			}).then(res => {
				this.chang = parseInt(res.data.accident_long);
				this.kuan = parseInt(res.data.accident_width);
				this.accident_border_length=res.data.accident_border_length;
				if(this.chang > this.kuan) {
					this.objectChang = this.chang;
				} else {
					this.objectChang = this.kuan;
				}
				console.log(res)
				this.getThreeD();
			})
			//			this.bianchang = sessionStorage.getItem('shigubianchang');
						this.getAllType();
	
			//			if(this.$store.state.typeChange != '') {
			//				this.selectObject = true;
			//				this.idList = sessionStorage.getItem('idList').split(',');
			//				this.idNumber = sessionStorage.getItem('idNumber').split(',');
			//				setTimeout(() => {
			//					this.idList.forEach((item, index) => {
			//						document.getElementById(item).classList.add('select-td-background');
			//						document.getElementById(item).classList.remove('default-td-background')
			//					})
			//				}, 200)
			//			}
		},
		methods: {
			//去下一步
			goBack(){
				this.$router.go(-1)
			},
			//清除所选的要素
			resetSelectElement() {
				for(var i = 0; i < this.kuan; i++) {
					for(var j = 0; j < this.chang; j++) {
						document.getElementById((i + 1) + '-' + (j + 1)).style.border = '1px solid #fff';
						document.getElementById((i + 1) + '-' + (j + 1)).classList.remove('select-td-background')
						document.getElementById((i + 1) + '-' + (j + 1)).classList.add('default-td-background')

					}
				}
				this.idList = [];
				this.idNumber = [];
			},
			//点击编辑的弹出框的保存
			saveEditObject() {
				console.log('编辑')
				if(this.editObjectInfo.category_id == '') {
					this.$Message.error('请选择对象！');
					return;
				}
				if(this.editObjectInfo.object_name == '') {
					this.$Message.error('请输入对象名称！');
					return;
				}
				var type_name = '';
				var type_id = '';
				this.typeList.forEach((item, index) => {
					if(item.id == this.editObjectInfo.category_id) {
						type_name = item.object_name;
						type_id = item.id;
					}
				})
				editorObject({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					object_id: this.editObjectInfo.id,
					userId: sessionStorage.getItem('userId'),
					map_id: this.$route.params.change_map_id,
					case_id: this.$route.params.change_edit_id,
					category_name: type_name,
					category_id: type_id,
					object_anchors: this.idNumber,
					object_index: this.editObjectInfo.object_index,
					object_name: this.editObjectInfo.object_name,
					object_body: this.editObjectInfo.object_body,
					object_color: this.editDefaultColor
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.editObjectModel = false;
						this.getThreeD();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//编辑某个对象
			clickEditObject() {
				if(this.object_id == '') {
					this.$Message.warning('请选择对象！');
				} else {
					this.editObjectModel = true;
					this.editDefaultColor = this.editObjectInfo.object_color;
				}
			},
			//删除某个对象
			delectObject() {
				if(this.object_id == '') {
					this.$Message.warning('请选择对象！');
					return
				} else {
					deleteObject({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						object_id: this.object_id
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
							this.idList = [];
							this.idNumber = [];
							this.getThreeD();
						} else {
							this.$Message.error(res.error_message);
						}
					})
				}
			},
			//选中某个对象
			selectObjectOperation(item, zuobiao) {
				for(var i = 0; i < this.kuan; i++) {
					for(var j = 0; j < this.chang; j++) {
						document.getElementById((i + 1) + '-' + (j + 1)).style.border = '1px solid #fff';

					}
				}
				document.getElementById(zuobiao).style.border = '3px solid #faf5a1';
				item.object_index.split(',').forEach((item, index) => {
					var num = item.split('-');
					var idnum = (this.chang - parseInt(num[1])) * this.kuan + parseInt(num[0]) - 1;
					//					var idnum = (num[0]-1)*this.chang+parseInt(num[1])-1;
					this.idNumber.push(idnum)
				})
				this.editObjectCategoryId = item.category_id;
				this.object_id = item.id;
				this.editObjectInfo = item;

				if(typeof this.editObjectInfo.object_body == 'string') {
					this.editObjectInfo.object_body = JSON.parse(this.editObjectInfo.object_body)
				}
				console.log(this.editObjectInfo.object_body)
				this.$Message.warning('您已经选中该对象！');
			},
			//获取3d地图的数据
			getThreeD() {
				getTheEntireMapInformation({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_insertId: this.$route.params.change_map_id
				}).then(res => {
					console.log(res)
					this.selectList = res.data.map_object;
					this.selectList.forEach((item, index) => {
						item.scenario = res.data.scenario;
					})
					if(this.selectList.length != 0) {
						this.editObject = true;
					}

					for(var i = 0; i < this.chang; i++) {
						for(var j = 0; j < this.kuan; j++) {
							document.getElementById((i + 1) + '-' + (j + 1)).classList.remove('select-td-background')
							document.getElementById((i + 1) + '-' + (j + 1)).classList.add('default-td-background')
						}
					}
				})
			},
			//点击最下方的按钮录入情景与演化
			goScene() {
				this.$router.push('/obed/ChangeSceneInfo/'+this.$route.params.change_edit_id+'/'+this.$route.params.change_map_id)
			},
			//点击第一个选项卡
			goOne() {
				this.$router.push('/m/BasicInformationOne')
			},
			//点击第三个选项卡
			goFour() {
				this.$router.push('/m/BasicInformationFour')
			},
			//点击创建内演化
			clickExtrinsicEvolution() {
				this.$router.push('/m/AddExtrinsicEvolution')
			},
			saveNeiYanhua() {
				this.internalEvolution = false;
			},
			//在创建内演化的时候点击添加按钮
			lookScene() {
				this.$router.push('/m/EditingScene')

			},
			//根据不同的承灾对象获取不同的属性值
			getDisasterBearingInfo() {
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: this.$route.params.change_map_id,
					object_id: this.selectdDIsasterBearing,
					pageSize: 1,
					current_page: 1
				}).then(res => {
					if(res.error_code == 2000) {
						this.disasterBearingInfo = res.data;
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
					map_id: this.$route.params.change_map_id,
				}).then(res => {
					if(res.error_code == 2000) {
						this.disasterBearing = res.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//保存对象
			saveObject() {
				if(this.selectTypeId == '') {
					this.$Message.error('请选择对象！');
					return;
				}
				if(this.object_name == '') {
					this.$Message.error('请输入对象名称！');
					return;
				}
				var type_name = '';
				var type_id = '';
				this.typeList.forEach((item, index) => {
					if(item.id == this.selectTypeId) {
						type_name = item.object_name;
						type_id = item.id;
					}
				})
				createObject({
					username: sessionStorage.getItem('username'),
					userId: sessionStorage.getItem('userId'),
					token: sessionStorage.getItem('token'),
					map_id: this.$route.params.change_map_id,
					case_id: this.$route.params.change_edit_id,
					object_anchors: this.idNumber,
					category_name: type_name,
					category_id: type_id,
					object_index: this.idList,
					object_name: this.object_name,
					object_body: this.selectTypeInfo,
					object_color: this.defaultColor
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						sessionStorage.setItem('object_id', res.data.object_id);
						this.selectObject = false;
						this.editObject = true;
						sessionStorage.setItem('category_id', type_id)
						this.idList = [];
						this.idNumber = [];
						this.getThreeD();
						this.selectTypeId = '';
						this.object_name = '';
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//在第二个面板的弹窗中点击撤销
			Rrvoke() {
				this.selectObject = false;
			},
			//获取所有类型数据
			getAllType() {
				getType({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId')
				}).then(res => {
					if(res.error_code == 2000) {
						if(res.data.categoryShare == undefined || 　res.data.categoryShare == null) {
							this.typeList = res.data.categoryData;
						} else {
							this.typeList = res.data.categoryData.concat(res.data.categoryShare);
							//							this.typeList = res.data.categoryData;
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
						case_id: this.$route.params.change_edit_id,
						accident_long: this.chang,
						accident_width: this.kuan,
						accident_border_length: this.accidentScene.perimeter,
						map_mun: this.chang * this.kuan
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
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
//				this.chang = parseInt(sessionStorage.getItem('length'));
//				this.kuan = parseInt(sessionStorage.getItem('width'));
				for(var i = 0; i < this.kuan; i++) {
					for(var j = 0; j < this.chang; j++) {
						document.getElementById((i + 1) + '-' + (j + 1)).style.border = '1px solid #fff';

					}
				}
				this.object_id = '';
				this.idList.push(id)
				var aa = new Set(this.idList)
				this.idList = [...aa];
				//				console.log(this.idList)
				document.getElementById(id).classList.remove('default-td-background');
				document.getElementById(id).classList.add('select-td-background');
				this.idList.forEach((item, index) => {
					var num = item.split('-');
					var idnum = (this.chang - parseInt(num[1])) * this.kuan + parseInt(num[0]) - 1;
					//					var idnum = (num[0]-1)*this.chang+parseInt(num[1])-1;
					this.idNumber.push(idnum)
				})
				this.idNumber = new Set(this.idNumber);
				this.idNumber = [...this.idNumber]
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
					var router = this.$router.push('/m/CreateNewType');
					sessionStorage.setItem('idList', this.idList)
					sessionStorage.setItem('idNumber', this.idNumber)
				} else {
					this.getTypeValue();
				}
			},
			"selectdDIsasterBearing": 'getDisasterBearingInfo',
			'editObjectInfo.category_id': function() {
				if(this.editObjectInfo.category_id == 'xinleixing') {
					var router = this.$router.resolve('/m/CreateNewType');
					window.open(router.href, '_blank');
				} else {
					if(this.editObjectInfo.category_id == this.editObjectCategoryId) {

					} else {
						getTypeById({
							username: sessionStorage.getItem('username'),
							token: sessionStorage.getItem('token'),
							id: this.editObjectInfo.category_id
						}).then(res => {
							this.editObjectInfo.object_body = res.data;
							this.editObjectInfo.object_body.forEach((item, index) => {
								item.value = '';
								if(item.type == 'enumer') {
									item.range = item.range.split(',');
								}
							})
						})
					}

				}
			},
			'$store.state.typeChange': function() {
				this.selectObject = true;
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
		background: chartreuse;
	}
	
	.default-td-background {
		width: 25px;
		height: 25px;
		background: #34495e;
		border: 0.5px solid #eee;
	}
	
	.left-operation {
		position: absolute;
		top: 25vh;
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
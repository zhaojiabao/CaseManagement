<template>
	<div class="every-page creat-new-type" style="margin-top: 0;">
		<div style="width: 100%;height: 100px;position: relative;cursor: pointer;">
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 50px;" @click="goElementManageMain()">
				
			</div>
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 520px;" @click="goMyElement()" >
				
			</div>
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 950px;"  @click='goMyResources()' >
				
			</div>
			<img src="../../assets/wodeduixiangmoban.png" style="height: 100%;width: 100%;" />
		</div>
		<div style="background: #648fb4;padding: 20px 0;height: 800px;">
			<div style="width: 1100px;margin: 0 auto;padding: 20px;border-radius: 16px;">
				<div class="clear-float" style="text-align: right;">
					<!--<span>关键字 ：</span>
					<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />-->
					<Button icon="ios-add-circle-outline" type="info" @click="addObject()">添加对象模板</Button>
				</div>
				<div style="height: 590px;overflow: auto;">
					<div class="clear-float" style="height: 280px;margin-top: 15px;background: #FFFFFF;border-radius: 10px;" v-for="(item,index) in resData" :key='index'>
						<div style="width: 100%;float: left;height: 280px;border: 1px solid #ccc;border-radius: 10px;">
							<div style="width: 100%;text-align: center;height: 40px;line-height: 40px;font-weight: bold;position: relative;">
								对象类型：{{item.object_name}}
								<span v-if="item.userId==userid && item.is_shared==3" style="height: 40px;line-height: 40px;width: 100px;text-align: center;position: absolute;top: 0;left: 0;cursor: pointer;">
									<Icon type="md-share" style='font-size: 20px;' /> 分享成功
								</span>
								
										<span style="height: 40px;line-height: 40px;width: 100px;text-align: left;position: absolute;top: 0;left: 0;cursor: pointer;">
										<Icon type="md-share" style='font-size: 20px;' /> 
											<span v-if="item.is_shared==0"  @click="shenHeShare(item.id)">分享</span>
								<span v-if="item.is_shared==1">分享审核中</span>
								<span v-if="item.is_shared==2" @click="shenHeShare(item.id)">拒绝</span>
								<span v-if='item.is_shared==3&&item.userId!=userid'>共享数据</span>
								</span>
								<span v-if="item.is_shared==0 || item.is_shared==2" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 70px;cursor: pointer;" @click="editObject(item.id)">
											<Icon type="ios-paper" style='font-size: 20px;'/> 编辑									
										</span>
								<span v-if="item.is_shared==0 || item.is_shared==2" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 0;cursor: pointer;" @click="delectShare(item.id)">
											<Icon type="ios-trash"  style='font-size: 23px;'/> 删除									
										</span>
								
							</div>
							<div class="clear-float">
								<div style="float: left;width: 257px;height: 230px;border: 1px solid #ccc;border-radius: 4px;margin-left: 5px;overflow: auto;">
									<div style="height: 30px;line-height: 30px;text-align: center;border-bottom: 1px solid #ccc;">
										对象表达模型
									</div>
									<div class="clear-float" style="border-bottom: 1px solid #ccc;height: 30px;">
										<span class="create-type-td">属性名称</span>
										<span class="create-type-td">属性值类型</span>
										<span class="create-type-td">属性值范围</span>
									</div>
									<div class="clear-float" :key='i' v-for="(ele,i) in item.object_module_name">
										<span class="create-type-td" :title="ele.property">
												{{ele.property}}
											</span>
										<span class="create-type-td">
												<span v-if="ele.type=='int'">
													数值型
												</span>
										<span v-else-if="ele.type=='char'">
													字符型
												</span>
										<span v-else>
													枚举型
												</span>
										</span>
										<span class="create-type-td">
												<span v-if="ele.type=='int'">
													[{{ele.range}}]
												</span>
										<span v-else-if="ele.type=='char'">
													{{ele.range}}
												</span>
										<span v-else class="meijuselect">
													<Select style="width:90%;display: inline-block;height: 25px;" v-model="ele.range.split(',')[0]">
														<Option v-for="(two,dex) in ele.range.split(',')" :key='dex' :value="two">{{two}}</Option>
													</Select>
												</span>
										</span>
									</div>
								</div>
								<div style="float: left;width: 792px;">
									<div style="height: 30px;line-height:30px;box-sizing: border-box;border:1px solid#ccc ;text-align:center;margin-left: 5px;border-top-left-radius:4px ;border-top-right-radius:4px ;">
										情景空间
									</div>
									<div class="clear-float" style="height: 30px;line-height:30px;box-sizing: border-box;margin-left: 5px;border-left:1px solid#ccc ;border-right:1px solid#ccc ;">
										<div style="width: 50%;float: left;text-align: center;">
											与对象破坏相关要素
										</div>
										<div style="width: 50%;float: left;text-align: center;">
											与灾害相关要素
										</div>
									</div>
									<div style="float: left;width: 391px;height: 170px;border: 1px solid #ccc;border-radius: 4px;margin-left: 5px;overflow: auto;">
										<div style="width: 550px;">
											<div class="clear-float" v-for="(ele,eleindex) in item.element" :key='eleindex' v-if="ele.ele_object_type==1" style="height: 100px;">
												<div class="chihuo-size scenename" :title="ele.ele_desc">
													{{ele.ele_name}}
												</div>
												<div style="float: left;width:350px;">
													<div style=" position: relative;height: 20px;margin-top: 40px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
														<div :style="'height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickObjectDot(item,three)">
															<div class="overflow-hidden" :title="three.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='three.selectvalue'>
																<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
																<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
															</div>
															<div class="overflow-hidden" :title="three.ele_protery_key" style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;">
																<span v-if="typeof three.ele_protery_key == 'string'">{{three.ele_protery_key}}</span>
																<span v-else>[{{three.ele_protery_key[0]}}~{{three.ele_protery_key[1]}})</span>
															</div>
														</div>
													</div>
												</div>
												<div :title="'量纲：'+ele.ele_name" class="overflow-hidden float-left" style="display: inline-block;width:100px;height: 100px;line-height: 100px;text-align: center;">
													量纲：{{ele.ele_dimension}}
												</div>
											</div>
										</div>
									</div>
									<div style="float: left;width: 391px;height: 170px;border: 1px solid #ccc;border-radius: 4px;margin-left: 5px;overflow: auto;">
										<div style="width: 550px;">
											<div class="clear-float" v-for="(ele,eleindex) in item.element" :key='eleindex' v-if="ele.ele_object_type==2" style="height: 100px;">
												<div class="chihuo-size scenename" :title="ele.ele_desc">
													{{ele.ele_name}}
												</div>
												<div style="float: left;width:350px;">
													<div style=" position: relative;height: 20px;margin-top: 45px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
														<div :style="'height:10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickZaiqingDot(item,three)">
															<div class="overflow-hidden" :title="three.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='three.selectvalue'>
																<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
																<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
															</div>
															<div class="overflow-hidden" :title="three.ele_protery_key" style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;">
																<span v-if="typeof three.ele_protery_key == 'string'">{{three.ele_protery_key}}</span>
																<span v-else>[{{three.ele_protery_key[0]}}~{{three.ele_protery_key[1]}})</span>
															</div>
														</div>
													</div>
												</div>
												<div :title="'量纲：'+ele.ele_name" class="overflow-hidden float-left" style="display: inline-block;width:100px;height: 100px;line-height: 100px;text-align: center;">
													量纲：{{ele.ele_dimension}}
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div style="text-align: center;height: 50px;line-height: 50px;">
					<Page :total="myTotal" :page-size='pageSize' @on-change='changage' show-total />
				</div>
				<div style="height: 40px;line-height: 40px;text-align: center;">
					<Button style="" icon="ios-undo-outline" type="warning" @click="goBack()">返回</Button>
				</div>
			</div>
		</div>
		<Modal v-model="selectDelect" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除对象</span>
			</p>
			<div style="text-align:left">
				<p>
					您正在执行删除对象操作，确认删除吗？
				</p>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="selectDelect=false">取消</Button>
				<Button type="info" @click="readlyDelect()" style="margin-left: 100px;">删除</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import { createCategory, getShareCategoryByObject, getShareByDataCategory, getMyObjectTemplate, shareObjectTemplate, deleteObjectTemplate } from '../../api/api'
	export default {
		data() {
			return {
				tabvalue: 'gongxiang',
				object_name: '',
				saveSelect: false, //点击保存显示的model框
				delectSelect: false, //点击删除显示的model框
				addObjectInfo: {
					property: "",
					type: "",
					dimension: "",
					range: ""
				}, //单独添加的属性
				isAddAttribute: true, //是否显示添加属性值div
				isInt: {
					min: '',
					max: ''
				}, //如果addObjectInfo.type为int类型
				isChar: '', //如果addObjectInfo.type为char类型
				isEnumer: [{
					title: ''
				}], //如果addObjectInfo.type为枚举类型
				attributeList: [], //属性列表数据
				objectType: '', //对象类型
				searchCondition: '', //关键字
				resData: [], //共享类型的数组
				sceneId: '', //如果要创建情景空间就带着这个id过去
				current_page: 1, //当前页码
				pageSize: 2, //每页的页数
				myTotal: 0, //总条数
				userid: '', //存在session里面的userid
				selectDelect:false,
				delect_id:'',
			}
		},
		mounted() {
			//			this.getShareInfo();
			setTimeout(() => {
				this.getDate();
			}, 200)
			this.userid = sessionStorage.getItem('userId');
		},
		methods: {
			readlyDelect(){
				deleteObjectTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: this.delect_id
				}).then(res => {
					if(res.error_code == 2000) {
						this.selectDelect=false;
						this.$Message.success(res.error_message);
						setTimeout(() => {
							this.getDate();
						}, 200)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//编辑某一个对象
			editObject(id){
				this.$router.push('/m/EditObjectInfo/'+id)
			},
			//删除指定对象
			delectShare(id) {
				this.selectDelect=true;
				this.delect_id=id;
			},
			//点击对象的分享
			shenHeShare(id) {
				shareObjectTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: id
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						setTimeout(() => {
							this.getDate();
						}, 200)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//去到我的对象模板库
			goElementManageMain() {
				this.$router.push('/m/ElementManageMain')
			},
			//去到我的应急资源库
			goMyResources() {
				this.$router.push('/m/MyResources')
			},
			//去到我的灾情库
			goMyElement() {
				this.$router.push('/m/MyElement')
			},
			//点击添加对象模板
			addObject() {
				this.$router.push('/m/ElementNewType')
			},
			//改变页码
			changage(data) {
				this.current_page = data;
				this.getDate();
			},
			//点击灾情要素上的点
			clickZaiqingDot(item, ele) {
				item.element.forEach((it, i1) => {
					it.ele_content.forEach(eleitem => {
						if(eleitem.ele_protery_desc == ele.ele_protery_desc) {
							eleitem.selectvalue = true;
						} else {
							eleitem.selectvalue = false;
						}
					})
				})
				this.resData.reverse().reverse();
			},
			//点击对象破坏建设的箭头上的点
			clickObjectDot(item, ele) {
				item.element.forEach((it, i1) => {
					it.ele_content.forEach(eleitem => {
						if(eleitem.ele_protery_desc == ele.ele_protery_desc) {
							eleitem.selectvalue = true;
						} else {
							eleitem.selectvalue = false;
						}
					})
				})
				this.resData.reverse().reverse();
			},
			//获取我的对象
			getDate() {
				getMyObjectTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					whereCondition: this.searchCondition,
					current_page: this.current_page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						this.resData = res.data.categoryData;
						this.resData.forEach((item, index) => {
							item.object_module_name = JSON.parse(item.object_module_name);
							item.element.forEach((ele, i) => {
								ele.ele_content = JSON.parse(ele.ele_content);
							})
						})
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//在共享页面点击返回
			goBack() {
				this.$router.go(-1);
			},
			//在共享页面点击保存
			saveGongXiang() {
				var id = document.getElementsByName('checkbox');
				var value = [];
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				if(value.length == 0) {
					this.$Message.error('请选择您要添加的对象！');
					return;
				}
				getShareByDataCategory({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					category_id: value.join(',')
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.$router.push('/m/BasicInformationThree')
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//在共享页面点击查询
			selectClick() {
				this.getDate();
			},
			//获取所有的共享页面
			getShareInfo() {
				getShareCategoryByObject({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					currentPage: 1,
					pageSize: 10,
					searchCondition: this.searchCondition
				}).then(res => {
					if(res.error_code == 2000) {
						this.resData = res.data.resData;
						this.resData.forEach((item, index) => {
							item.object_module_name = JSON.parse(item.object_module_name);
							item.element.forEach((ele, i) => {
								ele.ele_content = JSON.parse(ele.ele_content);
							})
						})
					} else {
						this.$Message.error('用户登录信息已过期，请重新登录！');
					}
				})
			},
			//点击属性列表中的某个属性进行删除
			delectAttribute(index) {
				this.attributeList.splice(index, 1);
			},
			//点击属性列表中的某个属性进行编辑
			//			editAttribute(index){
			//				this.isAddAttribute=false;
			//				this.addObjectInfo=this.attributeList(index)
			//	
			//			},
			//删除指定的枚举类型
			delectEnumer(index) {
				this.isEnumer.splice(index, 1);
			},
			//点击每一个添加枚举类型的确认按钮
			confirmAddEnumer() {
				if(this.addObjectInfo.property == '') {
					this.$Message.error('请输入属性名称！');
					return;
				}
				if(this.addObjectInfo.type == '') {
					this.$Message.error('请输入属性类型！');
					return;
				}
				if(this.addObjectInfo.type == 'enumer') {
					var arr = [];
					this.isEnumer.forEach((item, index) => {
						arr.push(item.title);
					})
					this.addObjectInfo.range = arr.join(',');
				} else if(this.addObjectInfo.type == 'int') {
					this.addObjectInfo.range = this.isInt.min + ',' + this.isInt.max;
				} else {
					this.addObjectInfo.range = this.isChar;
				}
				this.attributeList.push(this.addObjectInfo);
				this.addObjectInfo = {};
				this.isAddAttribute = true;
			},
			//点击每一个添加枚举类型的撤销按钮
			clickReset() {
				this.addObjectInfo = {};
				this.isAddAttribute = true;
			},
			//点击添加枚举类型按钮
			addEnumer() {
				this.isEnumer.push({
					title: ''
				});
			},
			//点击添加属性值按钮
			addAttribute() {
				this.isAddAttribute = false;
				this.isEnumer = [{
					title: ''
				}];
				this.isChar = '';
				this.isInt = {
					min: '',
					max: ''
				}
			},
			//点击保存
			saveObject() {
				if(this.objectType == '') {
					this.$Message.error('请输入对象类型！');
					return;
				}
				createCategory({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					object_name: this.objectType,
					object_module_name: this.attributeList
				}).then(res => {
					if(res.error_code == 2000) {
						this.sceneId = res.data.category_id;
						this.$Message.success(res.error_message);
						sessionStorage.setItem('object_type', this.objectType)
						this.saveSelect = true;
						this.$store.state.typeChange = res.data.category_id;
					} else {
						this.$Message.error(res.error_message);
					}
				})

			},
			saveDelete() {
				this.delectSelect = true;
			},
			delectQuren() {
				this.$router.push('/m/BasicInformationThree')
			},
			savaQuxiao() {
				this.$router.push('/m/BasicInformationThree')
			},
			savaQuren() {
				this.$router.push('/m/CreateQingjing/' + this.sceneId)
			}
		}
	}
</script>

<style lang="less">
	.creat-new-type {
		.ivu-tabs-tabpane {
			background: #648fb4;
			border-bottom-right-radius: 16px;
			border-bottom-left-radius: 16px;
			height: 700px;
		}
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
			border: 1px solid #ccc;
			border-radius: 4px;
			margin-left: 40px;
			margin-top: 5px;
		}
		.create-type-td {
			display: inline-block;
			width: 33.3%;
			float: left;
			height: 30px;
			line-height: 30px;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.meijuselect {
			.ivu-select-selection {
				height: 25px;
				line-height: 25px;
			}
		}
	}
</style>
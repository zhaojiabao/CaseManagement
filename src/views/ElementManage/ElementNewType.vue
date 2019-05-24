<template>
	<div class="every-page creat-new-type">
		<Tabs type="card" v-model='tabvalue'>
			<TabPane label="从共享模板中选择" name='gongxiang'>
				<div style="width: 1100px;margin: 0 auto;margin-top:15px;padding: 20px;border-radius: 16px;">
					<div class="clear-float">
						<span style="color: #FFFFFF;">关键字 ：</span>
						<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
						<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="selectClick()">查询</Button>
					</div>
					<div style="height: 500px;overflow: auto;">
						<div class="clear-float" style="height: 230px;margin-top: 15px;" v-for="(item,index) in resData" :key='index'>
							<div style="width: 30px;float: left;text-align: center;height: 200px;line-height: 200px;">
								<input type="checkbox" name="checkbox" :disabled="userId==item.userId" id="checkbox" :value='item.id' />
							</div>
							<div style="width: 1010px;float: left;height: 240px;border: 1px solid #ccc;border-radius: 4px;background: #fff;">
								<div style="width: 100%;text-align: center;height: 40px;line-height: 40px;font-weight: bold;">
									对象类型：{{item.object_name}}
								</div>
								<div class="clear-float">
									<div style="float: left;width: 230px;height: 190px;border: 1px solid #ccc;border-radius: 4px;margin-left: 5px;overflow: auto;">
										<div style="height: 30px;line-height: 30px;text-align: center;border-bottom: 1px solid #cccccc;">
											对象表达模型
										</div>
										<div class="clear-float" style="border-bottom: 1px solid #cccccc;height: 30px;">
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
									<div style="float: left;width: 380px;height: 190px;border: 1px solid #ccc;border-radius: 4px;margin-left: 5px;overflow: auto;">
										<div style="width: 550px;">
											<div class="clear-float" v-for="(ele,eleindex) in item.element" :key='eleindex' v-if="ele.ele_object_type==1" style="height: 100px;">
												<div class="chihuo-size scenename" :title="ele.ele_desc">
													{{ele.ele_name}}
												</div>
												<div style="float: left;width:350px;">
													<div style=" position: relative;height: 20px;margin-top: 40px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
														<div :style="'height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickObjectDot(item,three)">
															<div style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='three.selectvalue'>
																<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
																<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
															</div>
															<div style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;">
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
									<div style="float: left;width: 380px;height: 190px;border: 1px solid #ccc;border-radius: 4px;margin-left: 5px;overflow: auto;">
										<div style="width: 550px;">
											<div class="clear-float" v-for="(ele,eleindex) in item.element" :key='eleindex' v-if="ele.ele_object_type==2" style="height: 100px;">
												<div class="chihuo-size scenename" :title="ele.ele_desc">
													{{ele.ele_name}}
												</div>
												<div style="float: left;width:350px;">
													<div style=" position: relative;height: 20px;margin-top: 40px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
														<div :style="'height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickObjectDot(item,three)">
															<div style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='three.selectvalue'>
																<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
																<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
															</div>
															<div style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;">
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
					<div style="text-align: center;height: 50px;line-height: 50px;">
						<Page :total="myTotal" :page-size='pageSize' @on-change='changage' show-total />
					</div>
					<div style="height: 40px;line-height: 40px;text-align: center;">
						<Button style="margin-top: 3px;" icon="ios-undo-outline" type="warning" @click="goBack()">返回</Button>
						<Button style="margin-top: 3px;margin-left: 200px	;" icon="ios-log-in" type="info" @click="saveGongXiang()">保存</Button>
					</div>
				</div>
			</TabPane>
			<TabPane label="创建新对象模板" name='newobject'>
				<div style="width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;">
					<div class="clear-float">
						<span>对象类型 ：</span>
						<Input v-model="objectType" placeholder="请输入对象类型" style="width: 250px;display: inline-block;" />
						<Button style="float: right;" icon="ios-add-circle-outline" type="success" @click="addAttribute()">添加属性值</Button>
					</div>

					<div style="height: 30px;line-height: 30px;background: #2c3f50;border-radius: 15px;text-align: center;color: #fff;margin: 10px 0;">
						对象表达模型
					</div>
					<div style="height: 200px;overflow: auto;">
						<table class="qingjing">
							<tr>
								<th style="width: 25%;">属性名称</th>
								<th style="width: 25%;">属性类值</th>
								<th style="width: 25%;">属性值范围</th>
								<th style="width: 25%;">操作</th>
							</tr>
							<tr v-for='(item,index) in attributeList' :key="index">
								<td style="width: 25%;">{{item.property}}</td>
								<td style="width: 25%;">
									<span v-if="item.type=='enumer'">
										枚举型
									</span>
									<span v-if="item.type=='int'">
										数值型
									</span>
									<span v-if="item.type=='char'">
										字符型
									</span>
								</td>
								<td style="width: 25%;">
									<span v-if="item.type=='enumer'">
										<Select style="width:150px;display: inline-block;" v-model="item.range.split(',')[0]">
											<Option v-for="(two,twoindex) in item.range.split(',')" :key='twoindex' :value="two">{{two}}</Option>
										</Select>
									</span>
									<span v-if="item.type=='int'">
										[ {{item.range}} ]
 									</span>
									<span v-if="item.type=='char'">
										{{item.range}}
									</span>
								</td>
								<td style="width: 25%;">
									<!--<Button type="info" size='small' @click="editAttribute(index)">编辑</Button>-->
									<Button type="warning" size='small' icon='ios-trash-outline' @click="delectAttribute(index)">删除</Button>
								</td>
							</tr>
						</table>
					</div>

					<div style="margin: 10px 0;text-align: center;">
						<Button type="warning" style="width: 100px;" icon='ios-trash-outline' @click="saveDelete()">返回</Button>
						<Button type="primary" style="margin-left: 300px;width: 100px;" icon='ios-log-in' @click="saveObject()">保存</Button>
					</div>
					<div style="border: 1px solid #cccccc;border-radius: 4px;min-height: 250px;text-align: center;line-height: 250px;" v-if='isAddAttribute'>
						请添加属性值
					</div>
					<div style="border: 1px solid #cccccc;border-radius: 4px;min-height: 200px;" v-else>
						<div style="margin: 15px 0;">
							<span class="objectinfo-display">属性名称 ：</span>
							<Input v-model="addObjectInfo.property" placeholder="请输入属性名称" style="width: 250px;display: inline-block;" />
							<span class="objectinfo-display">属性值量纲 ：</span>
							<Input v-model="addObjectInfo.dimension" placeholder="请输入属性值量纲(未填写默认为空)" style="width: 250px;display: inline-block;" />
						</div>
						<div>
							<div style="display:inline-block;vertical-align: top;">
								<span class="objectinfo-display">属性类型 ：</span>
								<Select style="width:250px;display: inline-block;" v-model="addObjectInfo.type">
									<Option value='enumer'>枚举型</Option>
									<Option value='int'>数值型</Option>
									<Option value='char'>字符型</Option>
								</Select>
							</div>

							<div style="display:inline-block;" v-if='addObjectInfo.type=="char"'>
								<span class="objectinfo-display">字符上限值 ：</span>
								<Input v-model="isChar" placeholder="请输入字符上限" style="width: 250px;display: inline-block;" />
							</div>
							<div style="display:inline-block;margin: 15px 0;" v-if='addObjectInfo.type=="int"'>
								<span class="objectinfo-display">最小值 ：</span>
								<Input v-model="isInt.min" placeholder="请输入最小值" style="width: 250px;display: inline-block;" />
								<span class="objectinfo-display">最大值 ：</span>
								<Input v-model="isInt.max" placeholder="请输入最大值" style="width: 250px;display: inline-block;" />
							</div>
							<div style="display:inline-block;padding-left: 25px;height: 150px;overflow: auto;" v-if='addObjectInfo.type=="enumer"'>
								<div v-for='(item,index) in isEnumer' :key='index' style="margin-bottom: 10px;">
									<Input v-model="item.title" style="width: 250px;" placeholder="请输入枚举类型"></Input>
									<Button type="warning" style="margin-left: 15px;height: 32px;" icon='ios-trash-outline' size='small' @click="delectEnumer(index)">删除</Button>
								</div>
								<Button type="success" long style="height: 32px;margin-top:10px ;" icon='ios-add-circle-outline' size='small' @click="addEnumer()">添加枚举类型</Button>
							</div>
							<div style="margin: 20px 0;text-align: center;width: 800px;">
								<Button type="info" style="width: 100px;" icon='ios-undo-outline' @click="clickReset()">撤销</Button>
								<Button type="primary" style="margin-left: 300px;width: 100px;" icon='md-checkmark' @click="confirmAddEnumer()">确认</Button>
							</div>
						</div>
					</div>
				</div>
			</TabPane>
		</Tabs>

		<Modal v-model="saveSelect" width="360" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>是否录入情景空间</span>
			</p>
			<div style="text-align:center">
				<p>情景空间是对灾情的量化描述，构建情景空间有助于量化评估灾情，确认前往？</p>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="savaQuxiao()">取消</Button>
				<Button type="info" @click="savaQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>
		<Modal v-model="delectSelect" width="360" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>是否放弃新建对象类型？</span>
			</p>
			<div slot="footer" style="text-align: center;">
				<Button type="error" @click="delectSelect=false">取消</Button>
				<Button type="error" @click="delectQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { createCategory, getShareCategoryByObject, getShareByDataCategory } from '../../api/api'
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
				userId: '', //当前登录的id
			}
		},
		mounted() {
			setTimeout(() => {
				this.getShareInfo();
			}, 200)
			this.userId = sessionStorage.getItem('userId')
		},
		methods: {
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
			//改变页码
			changage(data) {
				this.current_page = data;
				this.getShareInfo();
			},
			//在共享页面点击返回
			goBack() {
				this.$router.push('/m/ElementManageMain')
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
						this.$router.push('/m/ElementManageMain')
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//在共享页面点击查询
			selectClick() {
				this.getShareInfo();
			},
			//获取所有的共享页面
			getShareInfo() {
				getShareCategoryByObject({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					currentPage: this.current_page,
					pageSize: this.pageSize,
					searchCondition: this.searchCondition
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
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
				this.$router.push('/m/ElementManageMain')
			},
			savaQuxiao() {
				this.$router.push('/m/ElementManageMain')
			},
			savaQuren() {
				this.$router.push('/m/ElementQingjing/' + this.sceneId)
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
			border: 1px solid #cccccc;
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
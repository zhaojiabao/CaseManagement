<template>
	<div class="every-page edit-object-info">
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
				<Button type="warning" style="width: 100px;" icon='ios-undo-outline' @click="goBack()">返回</Button>
				<Button type="primary" style="margin-left: 300px;width: 100px;" icon='ios-log-in' @click="saveObject()">保存</Button>
			</div>
			<div style="border: 1px solid #EEEEEE;border-radius: 4px;min-height: 250px;text-align: center;line-height: 250px;" v-if='isAddAttribute'>
				请添加属性值
			</div>
			<div style="border: 1px solid #EEEEEE;border-radius: 4px;min-height: 200px;" v-else>
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
		<Modal v-model="saveSelect" width="360" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>是否编辑情景空间</span>
			</p>
			<div style="text-align:center">
				<p>情景空间是对灾情的量化描述，构建情景空间有助于量化评估灾情，确认前往？</p>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="savaQuxiao()">取消</Button>
				<Button type="info" @click="savaQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>
		<!--<Modal v-model="delectSelect" width="360">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>是否放弃新建对象类型？</span>
			</p>
			<div slot="footer" style="text-align: center;">
				<Button type="error" @click="delectSelect=false">取消</Button>
				<Button type="error" @click="delectQuren()" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>-->
	</div>
</template>

<script>
	import { createCategory, getShareCategoryByObject, getShareByDataCategory, getSingleObjectTemplate, editorObjectTemplate } from '../../api/api'
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
			}
		},
		mounted() {
			setTimeout(() => {
				this.getDataInfo();
			}, 200)
		},
		methods: {
			savaQuren() {
				sessionStorage.setItem("object_type",this.objectType)
				this.$router.push('/m/EditQingJing/' +this.$route.params.object_edit_id )
			},
			savaQuxiao() {
				this.$router.go(-1);
			},
			//根据传来的id获取数据
			getDataInfo() {
				getSingleObjectTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: this.$route.params.object_edit_id
				}).then(res => {
					if(res.error_code == 2000) {
						console.log(res)
						this.objectType = res.data.object_name;
						this.attributeList = JSON.parse(res.data.object_module_name);
					} else {
						this.$Message.error(res.error_message);
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
			goBack() {
				this.$router.go(-1);
			},
			//点击保存
			saveObject() {
				if(this.objectType == '') {
					this.$Message.error('请输入对象类型！');
					return;
				}
				editorObjectTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					object_name: this.objectType,
					object_module_name: this.attributeList,
					id: this.$route.params.object_edit_id
				}).then(res => {
					if(res.error_code == 2000) {
//						this.$router.go(-1);
						//						this.sceneId = res.data.category_id;
						this.$Message.success(res.error_message);
						//						sessionStorage.setItem('object_type', this.objectType)
						this.saveSelect = true;
						//						this.$store.state.typeChange = res.data.category_id;
					} else {
						this.$Message.error(res.error_message);
					}
				})

			},
		}
	}
</script>

<style lang="less">
	.edit-object-info {
		background: #648fb4;
		border-radius: 16px;
		height: 700px;
		padding-top: 20px;
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
			border: 1px solid #EEEEEE;
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
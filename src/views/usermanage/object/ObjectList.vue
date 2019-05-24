<template>
	<div class="every-page creat-new-type">
		<div style="background: #648fb4;padding: 20px 0;height: 800px;border-radius: 16px;">
			<div style="width: 800px;margin: 0 auto;background: #fff;padding: 20px;border-radius: 16px;">
				<div class="clear-float" style="text-align: left;" >
					<span>关键字 ：</span>
					<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
					<Button type="info" @click="selectObject()">查询</Button>
				</div>
				<div style="height: 590px;overflow: auto;">
					<div class="clear-float" style="height: 280px;margin-top: 15px;" v-for="(item,index) in resData" :key='index'>
						<div style="width: 758px;float: left;height: 280px;border: 1px solid #eee;border-radius: 4px;">
							<div style="width: 100%;text-align: center;height: 40px;line-height: 40px;font-weight: bold;position: relative;">
								对象类型：{{item.object_name}}
								<span @click="examineCase(item.id,3)" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 70px;cursor: pointer;font-size: 20px;font-weight: 100;">
									同意									
								</span>
								<span @click="examineCase(item.id,2)" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 0;cursor: pointer;font-size: 20px;font-weight: 100;">
									拒绝									
								</span>
							</div>
							<div class="clear-float">
								<div style="float: left;width: 257px;height: 230px;border: 1px solid #eee;border-radius: 4px;margin-left: 5px;overflow: auto;">
									<div style="height: 30px;line-height: 30px;text-align: center;border-bottom: 1px solid #EEEEEE;">
										对象表达模型
									</div>
									<div class="clear-float" style="border-bottom: 1px solid #EEEEEE;height: 30px;">
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
								<div style="float: left;width: 490px;">
									<div style="height: 30px;line-height:30px;box-sizing: border-box;border:1px solid#EEEEEE ;text-align:center;margin-left: 5px;border-top-left-radius:4px ;border-top-right-radius:4px ;">
										情景空间
									</div>
									<div class="clear-float" style="height: 30px;line-height:30px;box-sizing: border-box;margin-left: 5px;border-left:1px solid#EEEEEE ;border-right:1px solid#EEEEEE ;">
										<div style="width: 50%;float: left;text-align: center;">
											与对象破坏相关要素
										</div>
										<div style="width: 50%;float: left;text-align: center;">
											与灾害相关要素
										</div>
									</div>
									<div style="float: left;width: 240px;height: 170px;border: 1px solid #eee;border-radius: 4px;margin-left: 5px;overflow: auto;">
										<div style="width: 700px;">
											<div class="clear-float" v-for="(ele,eleindex) in item.element" :key='eleindex' v-if="ele.ele_object_type==1" style="height: 100px;">
												<div :title="ele.ele_desc" class="chihuo-size scenename">
													{{ele.ele_name}}
												</div>
												<div style="float: left;width:450px;">
													<div style=" position: relative;height: 8px;margin-top: 45px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
														<div :style="'height: 8px;width: 8px;border-radius: 4px;background: rgba(0,0,0,0.7);position: absolute;top: 0px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickObjectDot(item,three)">
															<div class="overflow-hidden" :title="three.ele_protery_desc"  style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='three.selectvalue'>
																<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
																<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
															</div>
															<div class="overflow-hidden" :title="three.ele_protery_key"  style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;">
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
									<div style="float: left;width: 240px;height: 170px;border: 1px solid #eee;border-radius: 4px;margin-left: 5px;overflow: auto;">
										<div style="width: 700px;">
											<div class="clear-float" v-for="(ele,eleindex) in item.element" :key='eleindex' v-if="ele.ele_object_type==2" style="height: 100px;">
												<div :title="ele.ele_desc" class="chihuo-size scenename">
													{{ele.ele_name}}
												</div>
												<div style="float: left;width:450px;">
													<div style=" position: relative;height: 8px;margin-top: 45px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
														<div :style="'height: 8px;width: 8px;border-radius: 4px;background: rgba(0,0,0,0.7);position: absolute;top: 1px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickZaiqingDot(item,three)">
															<div class="overflow-hidden" :title="three.ele_protery_desc"  style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='three.selectvalue'>
																<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
																<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
															</div>
															<div class="overflow-hidden" :title="three.ele_protery_key"  style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;">
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
	</div>
</template>
<script>
	import { createCategory, getShareCategoryByObject, getShareByDataCategory, getMyObjectTemplate,getObtainingAuditObjects,selectObtainingAuditObjects,AuditTemplate} from '../../../api/api'
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
				current_page: 1,//当前页码
				pageSize: 2,//每页的页数
				myTotal:0,//总条数
			}
		},
		mounted() {
			setTimeout(() => {
				this.getDate();
			}, 200)

		},
		methods: {
			//审核指定对象
			examineCase(id,num){
				AuditTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id:id,
					examine_id:num
				}).then(res=>{
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
			//查询指定对象
			selectObject(){
				if(this.searchCondition==""){
					setTimeout(() => {
						this.getDate();
					}, 200)
				}
				selectObtainingAuditObjects({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						current_page: this.current_page,
						pageSize: this.pageSize,
						whereSearch:this.searchCondition
				}).then(res=>{
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.myTotal=res.data.count;
						this.resData = res.data.resultData;
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
			//改变页码
			changage(data){
				this.current_page=data;
				this.getDate();
			},
			//点击灾情要素上的点
			clickZaiqingDot(item, ele){
				item.element.forEach((it, i1) => {
					it.ele_content.forEach(eleitem=>{
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
					it.ele_content.forEach(eleitem=>{
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
				getObtainingAuditObjects({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					current_page: this.current_page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal=res.data.count;
						this.resData = res.data.resultData;
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
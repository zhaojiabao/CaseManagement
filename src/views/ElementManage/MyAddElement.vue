<template>
	<div class="every-page creat-new-type">
		<Tabs type="card" v-model='tabvalue'>
			<TabPane label="选择已有要素" name='yiyou'>
				<div class="clear-float" style="width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;">
					<div class="clear-float">
						<span>关键字 ：</span>
						<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
						<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="selectElement()">查询</Button>
					</div>
					<div style="border: 1px solid #EEEEEE;border-radius: 4px;margin: 15px 0;padding:0 20px;height: 500px;overflow: auto;">
						<div class="clear-float" style="margin-top: 15px;">
							<Button type="info" @click="goEditingScene()">确认</Button>
							<Button type="success" style="float: right;" icon="ios-add-circle-outline" @click="addElement()">导入共享要素</Button>
						</div>
						<div style="height: 100px;clear: both;" v-for="(item,index) in objectList" :key='index'>
							<div style="float: left;width: 20px;height: 100px;text-align: center;line-height: 100px;">
								<input type="checkbox" name="gongxiang" :value="item.id" />
							</div>
							<span class="chihuo-size scenename" :title="item.ele_desc">{{item.ele_name}}</span>
							<span style="width: 480px;height: 100px;display: inline-block;float: left;">
								<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
									<div :style="'height: 10px;width: 10px;border-radius: 5px;background:rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" :class="{changeBack:ele.selectvalue}" v-for="(ele,i) in item.ele_content" @click="clickDot(ele,index)">
										<div :title="ele.ele_protery_desc" class="overflow-hidden" style="position: absolute; top: -45px;left: -95px;width:200px;text-align: center;" v-if='ele.selectvalue'>
											<span class="clickdotshow">{{ele.ele_protery_desc}}</span>  <br />
											<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
						</div>
						<div class="overflow-hidden" style="position: absolute; top: 15px;left: -45px;font-size: 11px;width:100px;text-align: center;" :title="ele.ele_protery_key">
							<span v-if="typeof ele.ele_protery_key == 'string'">{{ele.ele_protery_key}}</span>
							<span v-else>[{{ele.ele_protery_key[0]}}~{{ele.ele_protery_key[1]}})</span>
						</div>
					</div>
				</div>
				</span>
				<div class="overflow-hidden" style="float: left;width: 100px;height: 100%;text-align: center;line-height: 100px;" :title="'量纲：'+item.ele_dimension">
					量纲：{{item.ele_dimension}}
				</div>
	</div>
	</div>
	<div class="clear-float" style="height: 50px;">
		<Button class="float-left" icon='ios-undo-outline' type="info" @click="goBack()">返回</Button>
		<Page class="float-right" :total="object_total" :page-size='object_pagesize' @on-change='changeObjectPage' show-total />
	</div>
	</div>
	</TabPane>
	<TabPane label="新建要素" name='newelement'>
		<div style="width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;">
			<div class="clear-float" style="margin: 10px 0;">
				<div class="new-yaoshu-text">
					要素名称：
				</div>
				<Input v-model="importantInfo.ele_name" style="width: 630px;" placeholder="请输入要素名称"></Input>
			</div>
			<div class="clear-float" style="margin: 10px 0;">
				<div class="new-yaoshu-text">
					要素量纲：
				</div>
				<Input v-model="importantInfo.ele_dimension" style="width: 630px;" placeholder="请输入要素量纲(若不填则默认无量纲)"></Input>
			</div>
			<div class="clear-float" style="margin: 10px 0;">
				<div class="new-yaoshu-text">
					要素最小值：
				</div>
				<Input v-model="importantInfo.ele_min" style="width: 630px;" placeholder="请输入要素最小值"></Input>
			</div>
			<div class="clear-float" style="margin: 10px 0;">
				<div class="new-yaoshu-text">
					要素最大值：
				</div>
				<Input v-model="importantInfo.ele_max" style="width: 630px;" placeholder="请输入要素最大值"></Input>
			</div>
			<div class="clear-float" style="margin: 10px 0;">
				<div class="new-yaoshu-text">
					备注说明：
				</div>
				<Input v-model="importantInfo.ele_desc" :rows="3" style="width: 630px;" type="textarea" placeholder="请输入备注说明" />
			</div>
			<div class="yaosuzhi">
				<div v-for='(item,index) in yaosu_tab' :class="{select_tab:index==default_index}" :key='index' style="display: inline-block;width: 60px;box-sizing: border-box;text-align: center;margin-right: 10px;height: 40px;line-height: 40px;cursor: pointer;" @click="ysTabClick(index)">
					{{item.title}}
				</div>
				<div style="height: 230px;margin-top: 5px;" v-if="default_index==0">
					<div class="clear-both">
						<div style="width: 40%;background: #EEEEEE;" class="element-table-td">数值区间</div>
						<div style="width: 40%;background: #EEEEEE;" class="element-table-td">严重描述</div>
						<div style="width: 20%;background: #EEEEEE;" class="element-table-td">最不严重</div>
					</div>
					<div class="clear-both">
						<div style="width: 80%;float:left;height: 160px;overflow: auto;padding-top: 20px;">
							<div class="clear-float" v-for="(item,index) in lianxuList" :key='index'>
								<div style="width: 50%;float: left;height: 60px;line-height: 60px;">
									<!--<Slider v-model="item.ele_protery_key" range show-tip='always'></Slider>-->
									<Input v-model="item.ele_protery_key[0]" style="width: 80px;" placeholder="请输入" />
									<div style="width: 80px;display: inline-block;text-align: center;">
										~
									</div>
									<Input v-model="item.ele_protery_key[1]" style="width: 80px;" placeholder="请输入" />
								</div>
								<div style="width: 50%;float: left;height: 60px;line-height: 60px;padding: ;">
									<Input v-model="item.ele_protery_desc" style="width: 70%;margin-left: 10%;" placeholder="请输入"></Input>
									<Button type="error" size="small" icon='ios-trash-outline' style="width: 10%;margin-left: 5%;height: 31px;" @click="delectLianxuElement(index)"></Button>
								</div>
							</div>
						</div>
						<div style="width: 20%;float:left;text-align: center;">
							<img style="display: inline-block;height: 140px;width: 10px;margin-top: 10px;" src="../../assets/tobottom.png" />
						</div>
					</div>
					<Button type="success" long icon='ios-add-circle-outline' @click="addLianxuAddElement()">添加要素值</Button>
				</div>

				<div style="height: 230px;margin-top: 5px;" v-else>
					<div class="clear-both">
						<div style="width: 40%;background: #EEEEEE;" class="element-table-td">数值区间</div>
						<div style="width: 40%;background: #EEEEEE;" class="element-table-td">严重描述</div>
						<div style="width: 20%;background: #EEEEEE;" class="element-table-td">最不严重</div>
					</div>
					<div class="clear-both">
						<div style="width: 80%;float:left;height: 160px;overflow: auto;padding-top: 20px;">
							<div class="clear-float" v-for="(item,index) in lisanList" :key='index'>
								<div style="width: 50%;float: left;height: 60px;line-height: 60px;padding: 0 20px 0;">
									<Input v-model="item.ele_protery_key" style="width: 100%;margin-left: 10%;" placeholder="请输入"></Input>
								</div>
								<div style="width: 50%;float: left;height: 60px;line-height: 60px;padding: ;">
									<Input v-model="item.ele_protery_desc" style="width: 70%;margin-left: 10%;" placeholder="请输入"></Input>
									<Button type="error" size="small" icon='ios-trash-outline' style="width: 10%;margin-left: 5%;height: 31px;" @click="delectLisanElement(index)"></Button>
								</div>
							</div>
						</div>
						<div style="width: 20%;float:left;text-align: center;">
							<img style="display: inline-block;height: 140px;width: 10px;margin-top: 10px;" src="../../assets/tobottom.jpg" />
						</div>
					</div>
					<Button type="success" long icon='ios-add-circle-outline' @click="addLisanAddElement()">添加要素值</Button>
				</div>
				<div style="height: 60px;line-height: 60px;text-align: center;margin-top: 10px;clear: both;">
					<Button type="info" icon='ios-undo-outline' @click="goBack()">返回</Button>
					<!--<Button type="error" icon='ios-trash-outline'>删除</Button>-->
					<Button type="info" icon='ios-log-in' style="margin-left: 200px;" @click="importantSave()">保存</Button>
				</div>
			</div>
		</div>
	</TabPane>
	</Tabs>

	<Modal v-model="addeEementModel" width="800" :draggable='true'>
		<p slot="header" style="color:#f60;text-align:center">
			<Icon type="ios-information-circle"></Icon>
			<span>添加要素</span>
		</p>
		<div class="clear-float">
			<span>关键字 ：</span>
			<Input v-model="shareSearchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
			<Button icon="ios-search" type="info" style="margin-left: 20px;" @click="shareClick()">查询</Button>
		</div>
		<div style="border: 1px solid #EEEEEE;border-radius: 4px;margin: 15px 0;padding:0 20px;height: 450px;overflow: auto;">
			<div style="height: 100px;clear: both;" v-for="(item,index) in shareList">
				<div style="float: left;width: 50px;height: 100%;text-align: center;line-height: 100px;">
					<input type="checkbox" name="checkbox" id="checkbox" :value="item.id" />
				</div>
				<span class="chihuo-size scenename" :title="item.ele_desc">{{item.ele_name}}</span>
				<div style="width: 450px;height: 100px;display: inline-block;float: left;">
					<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
						<div v-for="(ele,i) in item.ele_content" :style="'height: 10px;width: 10px;border-radius: 5px;background:rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" :class="{changeBack:ele.selectvalue}" @click="clickShareDot(ele,index)">
							<div style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='ele.selectvalue'>
									<span class="clickdotshow">{{ele.ele_protery_desc}}</span>  <br />
											<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
							</div>
							<div style="position: absolute; top: 15px;left: -45px;font-size: 11px;width: 100px;text-align: center;">
								<span class="clickdotshow">{{ele.ele_protery_desc}}</span>  <br />
								<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
							</div>
						</div>
					</div>
				</div>
				<div class="overflow-hidden" :title="'量纲：'+item.ele_dimension" style="float: left;width: 100px;height: 100%;text-align: center;line-height: 100px;">
					量纲：{{item.ele_dimension}}
				</div>
			</div>
		</div>
		<div style="text-align: right;">
			<Page :total="share_total" :page-size='share_pagesize' @on-change='changeSharePage' show-total />
		</div>
		<div slot="footer" style="text-align: center;">
			<Button type="warning" @click="addeEementModel=false">取消</Button>
			<Button type="info" style="margin-left: 50px;" @click="clickTrue()">确认</Button>
		</div>
	</Modal>
	</div>
</template>

<script>
	import { getListElements, getSharesAllElements, addShareAllElements, createScene, getType, addMyElements } from '../../api/api'
	export default {
		data() {
			return {
				tabvalue: 'yiyou',
				object_name: '',
				addeEementModel: false, //点击删除显示的model框
				yaosu_tab: [{
					title: '连续型'
				}, {
					title: '离散型'
				}],
				default_index: 0,
				value2: [20, 50],
				searchCondition: '', //关键字
				concatList: [], //联合起来的遍历数组
				objectList: [],
				zaiqingList: [],
				shareList: [], //共享列表数组
				shareSearchCondition: '', //共享弹窗里面的关键字
				importantInfo: {
					ele_name: '',
					ele_desc: '',
					ele_dimension: '',
					ele_min: '',
					ele_max: ''
				},
				contentList: [],
				lianxuList: [],
				lisanList: [],
				typeList: [], //类型列表
				element_insertId: '',
				object_total: 0,
				object_page: 1,
				object_pagesize: 4,
				share_total: 0,
				share_page: 1,
				share_pagesize: 4,
			}
		},
		mounted() {
			this.getListElements(this.object_page);
			this.getShareAll();
			this.getAllType();
		},
		watch: {

		},
		methods: {
			//点击返回按钮
			goBack() {
				this.$router.go(-1)
			},
			//对象列表中得改变页面调用方法
			changeObjectPage(data) {
				this.getListElements(data);
			},
			//分享列表中改变页码
			changeSharePage(data) {
				this.share_page = data;
				this.getShareAll();
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
							this.typeList = res.data.categoryData;
						} else {
							this.typeList = res.data.categoryData.concat(res.data.categoryShare);
						}
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击连续型的添加要素按钮
			addLianxuAddElement() {
				this.lianxuList.push({
					ele_protery_key: ['', ''],
					ele_protery_desc: ''
				})
			},
			//点击删除连续型要素
			delectLianxuElement(index) {
				this.lianxuList.splice(index, 1);
			},
			//点击离散型的添加元素按钮
			addLisanAddElement() {
				this.lisanList.push({
					ele_protery_key: '',
					ele_protery_desc: ''
				})
			},
			//点击删除离散型的数据
			delectLisanElement(index) {
				this.lisanList.splice(index, 1)
			},
			//点击创建要素页面的保存按钮
			importantSave() {
				if(this.default_index == 0) {
					this.contentList = this.lianxuList;
				} else {
					this.contentList = this.lisanList;
				}
				if(this.importantInfo.ele_name.trim() == '') {
					this.$Message.error('请输入要素名称！');
					return;
				}
				if(this.importantInfo.ele_name.trim() == '') {
					this.$Message.error('请输入要素名称！');
					return;
				}
				if(this.importantInfo.ele_dimension.trim() == "") {
					this.importantInfo.ele_dimension = '无'
				}
				var arr = [];
				var category_name = '';
				this.typeList.forEach((item, index) => {
					if(item.id == this.$route.params.my_category_id) {
						category_name = item.object_name;
					}
				})

				createScene({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					object_id: 0,
					category_id: 0,
					ele_name: this.importantInfo.ele_name,
					ele_desc: this.importantInfo.ele_desc,
					ele_dimension: this.importantInfo.ele_dimension,
					ele_min: this.importantInfo.ele_min,
					ele_max: this.importantInfo.ele_max,
					ele_type: this.default_index + 1,
					ele_object_type: this.$route.params.my_element_type,
					ele_content: this.contentList
				}).then(res => {
					if(res.error_code == 2000) {
						this.element_insertId = res.data.element_insertId;
						this.$Message.success(res.error_message);
						this.$router.go(-1)
//						arr.push({
//							element_id: this.element_insertId,
//							element_name: this.importantInfo.ele_name,
//							ele_object_type: this.$route.params.my_element_type
//						})
//						addMyElements({
//							username: sessionStorage.getItem('username'),
//							token: sessionStorage.getItem('token'),
//							category_id: 0,
//							object_data: arr,
//							category_name: category_name
//						}).then(res => {
//							if(res.error_code == 2000) {
//								this.$Message.success(res.error_message);
//								//								this.$router.push('/m/CreateQingjing/' + this.$route.params.my_category_id)
//								this.$router.go(-1)
//							} else {
//								this.$Message.error(res.error_message);
//							}
//						})
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//在共享页面点击确定按钮然后添加到该类型下
			goEditingScene() {
				var arr = [];
				var id = document.getElementsByName('gongxiang');
				var value = [];
				var category_name = '';
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				this.objectList.forEach((item, index) => {
					value.forEach((val, ind) => {
						if(item.id == val) {
							arr.push({
								element_id: item.id,
								element_name: item.ele_name,
								ele_object_type: 0
							});
						}
					})
				})
				this.typeList.forEach((item, index) => {
					if(item.id == this.$route.params.my_category_id) {
						category_name = item.object_name;
					}
				})
				addMyElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					category_id: 0,
					object_data: arr,
					category_name: category_name
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						//						this.$router.push('/m/CreateQingjing/' + this.$route.params.my_category_id)
						this.$router.go(-1)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击共享弹窗里面的确定按钮
			clickTrue() {
				var id = document.getElementsByName('checkbox');
				var value = [];
				for(var i = 0; i < id.length; i++) {
					if(id[i].checked)
						value.push(id[i].value);
				}
				if(value.length == 0) {
					this.$Message.error("请选择共享元素！");
				} else {
					addShareAllElements({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						userId: sessionStorage.getItem('userId'),
						element_id: value.join(',')
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
							this.getListElements(this.object_page);
							this.addeEementModel = false;
						} else {
							this.$Message.error(res.error_message);
						}
					})
				}
			},
			//点击查询方法
			selectElement() {
				//				this.getListElements(this.object_page);
				console.log()
			},
			//点击我的元素条上的某一个点
			clickDot(dot, index) {
				this.objectList[index].ele_content.forEach((ele, elei) => {
					if(ele.ele_protery_desc == dot.ele_protery_desc) {
						ele.selectvalue = true;
					} else {
						ele.selectvalue = false;
					}
				})
				this.objectList.reverse().reverse();

			},
			//点击共享元素条上的某一个点 
			clickShareDot(dot, index) {
				this.shareList[index].ele_content.forEach((ele, elei) => {
					if(ele.ele_protery_desc == dot.ele_protery_desc) {
						ele.selectvalue = true;
					} else {
						ele.selectvalue = false;
					}
				})
				this.shareList.reverse().reverse();
			},
			//点击添加要素的弹窗里面的查询
			shareClick() {
				this.getShareAll();
			},
			//获取所有共享的元素并排除自身从共享库拉取的元素（对象破坏建设和灾情作用情况）  在添加共享要素时弹出框里面的东西
			getShareAll() {
				getSharesAllElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					currentPage: this.share_page,
					pageSize: this.share_pagesize,
					ele_object_type: 0,
					searchCondition: this.shareSearchCondition
				}).then(res => {
					if(res.error_code == 2000) {
						this.shareList = res.data;
						this.share_total = res.count;
						this.shareList.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content)
						})
					} else {
						this.$Message.error(res.error_message);
					}

				})
			},
			addElement() {
				this.addeEementModel = true;
			},
			sava() {},
			ysTabClick(index) {
				this.default_index = index
			},
			getListElements(index) {
				getListElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					currentPage: index,
					pageSize: this.object_pagesize,
					ele_object_type: 0,
					searchCondition: this.searchCondition
				}).then(res => {
					if(res.error_code == 2000) {
						console.log(res)
						this.objectList = res.data;
						this.object_total = res.count;
						this.objectList.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content)
						})
					} else {
						this.$Message.error(res.error_message);
					}

				})
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
		.addment-display {
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
		.new-yaoshu-text {
			width: 120px;
			text-align: right;
			display: inline-block;
			height: 40px;
			line-height: 40px;
			color: #333333;
		}
		.select_tab {
			color: #1890FF;
			border-bottom: 2px solid #1890FF;
		}
		.element-table-td {
			float: left;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
	}
</style>
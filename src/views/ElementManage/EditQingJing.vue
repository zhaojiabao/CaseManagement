<template>
	<div class="every-page qingjinkongjian" style="padding-top: 1px;">
		<div style="width: 800px;margin: 0 auto;margin-top:15px;background: #fff;padding: 20px;border-radius: 16px;" class="clear-float">
			<div class="clear-float">
				<span>对象类型 ：</span>
				<Input v-model="object_type" readonly placeholder="请输入对象类型" style="width: 250px;display: inline-block;" />
			</div>
			<div style="height: 30px;line-height: 30px;background: #2c3f50;border-radius: 15px;text-align: center;color: #fff;margin: 10px 0;">
				对象表达模型
			</div>
			<div style="height: 250px;overflow: auto;">
				<table class="qingjing">
					<tr>
						<th style="width: 33%;">属性名称</th>
						<th style="width: 33%;">属性类值</th>
						<th style="width: 33%;">属性值范围</th>
						<!--<th style="width: 25%;">操作</th>-->
					</tr>
					<tr v-for='(item,index) in infoList' :key="index">
						<td style="width: 33%;">{{item.property}}</td>
						<td style="width: 33%;">
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
						<td style="width: 33;">
							<span v-if="item.type=='int'">[{{item.range}}]</span>
							<span v-else-if="item.type=='char'">{{item.range}}</span>
							<span v-else class="meijuselect">
													<Select style="width:90%;display: inline-block;height: 25px;" v-model="item.range.split(',')[0]">
														<Option v-for="(two,dex) in item.range.split(',')" :key='dex' :value="two">{{two}}</Option>
													</Select>
												</span>
						</td>
						<!--<td style="width: 25%;">-->
						<!--<Button type="info" size='small'>编辑</Button>-->
						<!--<Button type="warning" style="margin-left: 15px;" size='small' @click="delectElement(index)">删除</Button>-->
						<!--</td>-->
					</tr>
				</table>
			</div>
			<div style="height: 30px;line-height: 30px;background: #2c3f50;border-radius: 15px;text-align: center;color: #fff;margin: 10px 0;">
				情景空间
			</div>
			<div style="border: 1px solid #EEEEEE;border-radius: 4px;">
				<div style="height: 100px;clear: both;border-bottom: 1px solid #EEEEEE;">
					<div style="float: left;width: 200px;border-right: 1px solid #EEEEEE;height: 100%;line-height:100px;text-align: center;">
						对象破坏相关的要素
						<!--<Button type="success" size='small' @click="addElementOne()">添加要素</Button>-->
					</div>
					<div style="height: 100%;float: left;width: 550px;overflow: auto;">
						<div style="width: 800px;height: auto;">
							<div v-for="(ele,index) in objectList" :key='index'>
								<div class="chihuo-size scenename" :title="ele.ele_desc">
									{{ele.ele_name}}
								</div>
								<div class="float-left" style="width: 480px;padding-top: 40px;">
									<div style="position: relative;height: 20px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;">
										<div :style="'cursor: pointer;height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' :class="{changeBack:three.selectvalue}" v-for="(three,threeindex) in ele.ele_content" @click="clickObjectDot(three,index)">
											<div class="overflow-hidden" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" :title="three.ele_protery_desc" v-if="three.selectvalue">
												<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
												<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
											</div>
											<div style="position: absolute; top: 15px;left: -45px;font-size: 11px;width: 100px;text-align: center;">
												<span v-if="typeof three.ele_protery_key == 'string'">{{three.ele_protery_key}}</span>
												<span v-else>[{{three.ele_protery_key[0]}}~{{three.ele_protery_key[1]}})</span>
											</div>
										</div>
									</div>
								</div>
								<div class="float-left overflow-hidden" :title="'量纲：'+ele.ele_dimension" style="width: 100px;line-height: 100px;text-align: center;">
									量纲：{{ele.ele_dimension}}
								</div>
								<div class="float-left" style="width: 100px;line-height: 100px;text-align: center;">
									<Button type="info" size='small' @click="editElement(ele.id,ele.category_id,ele.ele_object_type)">编辑</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="height: 100px;clear: both;border-bottom: 1px solid #EEEEEE;">
					<div style="float: left;width: 200px;border-right: 1px solid #EEEEEE;height: 100%;line-height:100px;text-align: center;">
						灾害作用相关的要素
						<!--<Button type="success" size='small' @click="addElementTwo()">添加要素</Button>-->
					</div>
					<div style="height: 100%;float: left;width: 550px;overflow: auto;">
						<div style="width: 800px;height: auto;">
							<div v-for="(ele,index) in zaihaiList" :key='index'>
								<div class="chihuo-size scenename" :title="ele.ele_desc">
									{{ele.ele_name}}
								</div>
								<div class="float-left" style="width: 480px;padding-top: 40px;">
									<div style="position: relative;height: 20px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;">
										<div :style="'cursor: pointer;height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' :class="{changeBack:three.selectvalue}" v-for="(three,threeindex) in ele.ele_content" @click="clickZaiqingDot(three,index)">
											<div class="overflow-hidden" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" :title="three.ele_protery_desc" v-if='three.selectvalue'>
												<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
												<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
											</div>
											<div style="position: absolute; top: 15px;left: -45px;font-size: 11px;width: 100px;text-align: center;">
												<span v-if="typeof three.ele_protery_key == 'string'">{{three.ele_protery_key}}</span>
												<span v-else>[{{three.ele_protery_key[0]}}~{{three.ele_protery_key[1]}})</span>
											</div>
										</div>
									</div>
								</div>
								<div class="float-left overflow-hidden" :title="'量纲：'+ele.ele_dimension" style="width: 100px;line-height: 100px;text-align: center;">
									量纲：{{ele.ele_dimension}}
								</div>
								<div class="float-left" style="width: 100px;line-height: 100px;text-align: center;">
									<Button type="info" size='small' @click="editElement(ele.id,ele.category_id,ele.ele_object_type)">编辑</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="margin: 20px 0;text-align: center;">
				<Button type="info" style="width: 100px;" icon='ios-undo-outline' @click="clickBack()">返回</Button>
				<Button type="primary" style="margin-left: 300px;width: 100px;" icon='md-checkmark' @click="clickSave()">保存</Button>
			</div>
		</div>
	</div>
</template>

<script>
	import { getTypeById, getSharesAllElements, getElementByCategory } from '../../api/api'
	export default {
		data() {
			return {
				object_name: '',
				infoList: [], //获取到指定的内容数组
				object_type: '', //对象名称，不能修改的
				objectList: [], //对象破坏相关要素
				zaihaiList: [], //灾害对象相关要素
			}
		},
		mounted() {
			setTimeout(() => {
				this.getTypeInfo();
				this.object_type = sessionStorage.getItem('object_type');
				this.getDataList();
			}, 200)
		},
		methods: {
			//点击编辑指定元素
			editElement(id, leiixing_id, ele_object_type) {
				this.$router.push('/m/ObjectEditElement/' + this.$route.params.qingjing_edit_id + '/' + id + '/' + leiixing_id + '/' + ele_object_type)
			},
			//点击对象破坏建设箭头上面的点
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
			//点击灾情对象中箭头上的点点
			clickZaiqingDot(dot, index) {
				this.zaihaiList[index].ele_content.forEach((ele, elei) => {
					if(ele.ele_protery_desc == dot.ele_protery_desc) {
						ele.selectvalue = true;
					} else {
						ele.selectvalue = false;
					}
				})
				this.zaihaiList.reverse().reverse();
			},
			getDataList() {
				console.log(this.$route.params.qingjing_edit_id)
				getElementByCategory({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					category_id: this.$route.params.qingjing_edit_id,
					ele_object_type: 1
				}).then(res => {
					this.objectList = res.data;
					this.objectList.forEach((item, index) => {
						item.ele_content = JSON.parse(item.ele_content)
					})
				})
				getElementByCategory({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					category_id: this.$route.params.qingjing_edit_id,
					ele_object_type: 2
				}).then(res => {
					console.log(res)
					this.zaihaiList = res.data;
					this.zaihaiList.forEach((item, index) => {
						item.ele_content = JSON.parse(item.ele_content)
					})
				})
			},
			//根据类型id获取类型的元素
			getTypeInfo() {
				getTypeById({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: this.$route.params.qingjing_edit_id
				}).then(res => {
					this.infoList = res.data;
				})
			},
			clickBack() {
				this.$router.go(-1)
			},
			clickSave() {
				this.$router.push('/m/ElementManageMain')
			},
			//对象破坏要素
			addElementOne() {
				this.$router.push('/m/AddElement/' + 1 + '/' + this.$route.params.qingjing_edit_id)
			},
			//灾害破坏要素
			addElementTwo() {
				this.$router.push('/m/AddElement/' + 2 + '/' + this.$route.params.qingjing_edit_id)
			},
			//在属性列表中删除指定的元素
			delectElement(index) {
				this.infoList.splice(index, 1);
			}
		}
	}
</script>

<style lang="less">
	.qingjinkongjian {
		background: #648fb4;
		height: 840px;
		border-radius: 16px;
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
	}
</style>
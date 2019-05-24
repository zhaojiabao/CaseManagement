<template>
	<div class="every-page myelement" style="margin-top: 0;">
		<div style="width: 100%;height: 100px;position: relative;cursor: pointer;">
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 50px;" @click="goElementManageMain()">

			</div>
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 520px;" @click="goMyElement()">

			</div>
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 950px;" @click='goMyResources()'>

			</div>
			<img src="../../assets/wodezaiqingyaosu.png" style="height: 100%;width: 100%;" />
		</div>
		<div style="height: 800px;width: 100%;background: #648fb4;border-bottom-right-radius: 16px;border-bottom-left-radius: 16px;padding-top: 20px;">
			<div style="width: 1100px;margin: 0 auto;border-radius: 16px;padding:20px;">
				<div class="clear-float" style="text-align: left;height: 40px;">
					<!--<span>关键字 ：</span>
					<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
					<Button type="info" @click="selectElement()">查询</Button>-->
					<Button icon="ios-add-circle-outline" style="float: right;margin-right:130px ;" type="info" @click="addElement()">添加要素</Button>
				</div>
				<div style="width: 800px;height: 600px;margin: 0 auto;">
					<div class="clear-float" v-for="(ele,eleindex) in resData" :key='eleindex' style="height: 140px;border: 1px solid #ccc;border-radius: 10px;margin: 15px 0;background: #FFFFFF;">
						<div style="height: 40px;position: relative;">
							<span v-if="ele.userId==userid && ele.is_share==3" style="height: 40px;line-height: 40px;width: 100px;text-align: center;position: absolute;top: 0;left: 0;cursor: pointer;">
								<Icon type="md-share" style='font-size: 20px;' /> 分享成功	
							</span>
							<span style="height: 40px;line-height: 40px;width: 100px;text-align: left;position: absolute;top: 0;left: 0;cursor: pointer;">
									
									<span v-if="ele.is_share==0"  @click="shareResour(ele.id)"><Icon type="md-share" style='font-size: 20px;' /> 分享</span>
							<span v-if="ele.is_share==1"><Icon type="md-share" style='font-size: 20px;' /> 分享审核中</span>
							<span v-if="ele.is_share==2" @click="shareResour(ele.id)"><Icon type="md-share" style='font-size: 20px;' /> 拒绝</span>
							<span v-if='ele.userId!=userid&&ele.is_share==3'><Icon type="md-share" style='font-size: 20px;' /> 共享数据</span>
							</span>
							<span v-if="ele.is_share==0 || ele.is_share==2" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 70px;cursor: pointer;" @click="editElement(ele.id,ele.ele_object_type)">
									<Icon type="ios-paper" style='font-size: 20px;'/> 编辑									
								</span>
							<span v-if="ele.is_share==0 || ele.is_share==2" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 0;cursor: pointer;" @click="delectResour(ele.id)">
									<Icon type="ios-trash"  style='font-size: 23px;'/> 删除									
								</span>
						</div>
						<span class="chihuo-size scenename" :title="ele.ele_desc">
									{{ele.ele_name}}
								</span>
						<div style="float: left;width:580px;">
							<div style=" position: relative;height: 20px;margin-top: 40px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
								<div :style="'height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickZaiqingDot(ele,three)">
									<div class="overflow-hidden" :title="three.ele_protery_desc" style=";position: absolute; top: -40px;left: -95px;width: 200px;text-align: center;line-height: 15px;" v-if='three.selectvalue'>
										<span class="clickdotshow">{{three.ele_protery_desc}}</span> <br />
										<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
									</div>
									<div class="overflow-hidden" :title="three.ele_protery_key" style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;">
										<span v-if="typeof three.ele_protery_key == 'string'">{{three.ele_protery_key}}</span>
										<span v-else>[{{three.ele_protery_key[0]}}~{{three.ele_protery_key[1]}})</span>
									</div>
								</div>
							</div>
						</div>
						<div :title="'量纲：'+ele.ele_dimension" class="overflow-hidden float-left" style="display: inline-block;width:100px;height: 100px;line-height: 100px;text-align: center;">
							量纲：{{ele.ele_dimension}}
						</div>
					</div>
				</div>
				<div style="text-align: right;height: 50px;line-height: 50px;width: 630px;">
					<Page :total="myTotal" :page-size='pageSize' @on-change='changage' show-total />
				</div>
			</div>
		</div>
		<Modal v-model="chooseElementType" width="800">
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>请选择您要添加的要素类型</span>
			</p>
			<div>
				<div @click="clickTrue(1)" style="width: 100%;margin: 0 auto;height: 140px;cursor: pointer;background: #648fb4;line-height:140px;margin-bottom: 30px;color: #FFFFFF;border-radius:16px;padding-left: 50px;">
					<Icon type="ios-contact" style='font-size: 60px;color: #FFFFFF;float: left;margin-top: 44px;' /> <span style="font-size: 27px;color: #FFFFFF;margin-left: 15px;float: left;">对象破坏相关要素</span>
					<Icon type="ios-arrow-dropright-circle" style='font-size: 40px;color: #FFFFFF;float: right;margin-top: 54px;margin-right: 30px;'  />
				</div>
				<div @click="clickTrue(2)" style="width: 100%;margin: 0 auto;height: 140px;cursor: pointer;background: #648fb4;line-height:140px;color: #FFFFFF;border-radius:16px;padding-left: 50px;">
					<Icon type="ios-flame" style='font-size: 60px;color: #FFFFFF;float: left;margin-top: 44px;' /> <span style="font-size: 27px;color: #FFFFFF;margin-left: 15px;float: left;">灾害作用相关要素</span>
					<Icon type="ios-arrow-dropright-circle" style='font-size: 40px;color: #FFFFFF;float: right;margin-top: 54px;margin-right: 30px;'  />
				</div>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="warning" @click="chooseElementType=false">取消</Button>
				<!--<Button type="info" style="margin-left: 50px;" @click="clickTrue()">确认</Button>-->
		</div>
		</Modal>
		<Modal v-model="selectDelect" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除元素</span>
			</p>
			<div style="text-align:left">
				<p>
					您正在执行删除元素操作，确认删除吗？
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
	import { getAllByListElements, shareElementsTemplate, deleteElementsTemplate } from '../../api/api'
	export default {
		data() {
			return {
				currentPage: 1, //当前页码
				pageSize: 4, //每页的页数
				myTotal: 0, //总条数
				resData: [], //应急资源列表
				searchCondition: "", //关键字
				userid: '', //存在session里面的userid
				chooseElementType:false,//选择是哪一个要素类型
				selectDelect:false,
				delect_id:'',
			}
		},
		mounted() {
			this.getElement();
			this.userid = sessionStorage.getItem('userId');
		},
		methods: {
			readlyDelect(){
				deleteElementsTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: this.delect_id
				}).then(res => {
					if(res.error_code == 2000) {
						this.selectDelect=false;
						this.$Message.success(res.error_message);
						this.getElement();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			clickTrue(id){
				this.$router.push('/m/MyAddElement/'+id)
			},
			//编辑元素
			editElement(id, type_id) {
				this.$router.push('/m/EditElement/' + id + '/' + type_id)
			},
			//添加要素
			addElement() {
				this.chooseElementType=true;
			},
			//删除指定元素
			delectResour(id) {
				this.delect_id=id;
				this.selectDelect=true;
				
			},
			//分享我的元素
			shareResour(id) {
				shareElementsTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: id
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.getElement();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击点点
			clickZaiqingDot(item, ele) {
				console.log(item)
				item.ele_content.forEach((a, index) => {
					if(a.ele_protery_desc == ele.ele_protery_desc) {
						a.selectvalue = true;
					} else {
						a.selectvalue = false;
					}
				})
				this.resData.reverse().reverse();
			},
			//点击添加资源按钮
			addZiyuan() {
				this.$router.push('/m/AddResources')
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
			//获取我的灾情元素
			getElement() {
				getAllByListElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					userId: sessionStorage.getItem('userId'),
					currentPage: this.currentPage,
					pageSize: this.pageSize,
					searchCondition: this.searchCondition
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.count;
						this.resData = res.data;
						this.resData.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content);
						})
						console.log(this.resData)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//改变页码
			changage(data) {
				this.currentPage = data;
				this.getElement();
			},
		}
	}
</script>

<style lang="less">
	.myelement {
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
		.title-left {
			height: 40px;
			line-height: 40px;
			width: 100px;
			text-align: right;
			display: inline-block;
			font-weight: bold;
			float: left;
		}
		.title-right {
			height: 40px;
			line-height: 40px;
			width: 450px;
			display: inline-block;
			float: left;
		}
	}
</style>
<template>
	<div class="every-page myresources" style="margin-top: 0;">
		<div style="width: 100%;height: 100px;position: relative;cursor: pointer;">
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 50px;" @click="goElementManageMain()">
				
			</div>
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 520px;" @click="goMyElement()" >
				
			</div>
			<div style="display: inline-block;position: absolute;width: 200px;height: 70px;z-index: 100;top: 20px;left: 950px;"  @click='goMyResources()' >
				
			</div>
			<img src="../../assets/wodeyingjiziyuan.png" style="height: 100%;width: 100%;" />
		</div>
		<div style="height: 800px;width: 100%;background: #648fb4;border-bottom-right-radius: 16px;border-bottom-left-radius: 16px;padding-top: 20px;">
			<div style="width: 800px;margin: 0 auto;border-radius: 16px;padding:20px;">
				<div class="clear-float" style="text-align: right;">
					<Button icon="ios-add-circle-outline" type="info" @click="addZiyuan()">添加资源</Button>
				</div>
				<div style="height: 630px;">
					<div style="height: 300px;width: 100%;border: 1px solid #ccc;border-radius: 10px;margin:15px 0;background: #FFFFFF;" v-for='(item,index) in resourcesList' :key='index'>
						<div style="height: 40px;position: relative;">
							<span v-if="item.user_id==userid && item.is_shared==3" style="height: 40px;line-height: 40px;width: 100px;text-align: center;position: absolute;top: 0;left: 0;cursor: pointer;" >
								<Icon type="md-share" style='font-size: 20px;' /> 分享成功	
							</span>
								<span style="height: 40px;line-height: 40px;width: 100px;text-align: left;position: absolute;top: 0;left: 0;cursor: pointer;">
									
									<span v-if="item.is_shared==0"  @click="shareResour(item.id)"> <Icon type="md-share" style='font-size: 20px;' /> 分享</span>
								<span v-if="item.is_shared==1"><Icon type="md-share" style='font-size: 20px;' /> 分享审核中</span>
								<span v-if="item.is_shared==2" @click="shareResour(item.id)"><Icon type="md-share" style='font-size: 20px;' /> 拒绝</span>
								<span v-if='item.user_id!=userid &&item.is_shared==3'><Icon type="md-share" style='font-size: 20px;' /> 共享数据</span>
								</span>
							<span  v-if="item.is_shared==0 || item.is_shared==2" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 70px;cursor: pointer;" @click="editResour(item.id)">
									<Icon type="ios-paper" style='font-size: 20px;'/> 编辑									
								</span>
							<span  v-if="item.is_shared==0 || item.is_shared==2" style="height: 40px;line-height: 40px;width: 60px;text-align: center;position: absolute;top: 0;right: 0;cursor: pointer;" @click="delectResour(item.id)">
									<Icon type="ios-trash"  style='font-size: 23px;'/> 删除									
								</span>
						</div>
						<div class="clear-float" style="height: 260px;width: 100%;">
							<div class="float-left" style="width:200px;">
								<img :src="item.img_path" style="display: inline-block;width: 160px;height: 160px;margin: 50px 0 0 20px;" alt="" />
							</div>
							<div class="float-left" style="width:558px;">
								<p>
									<span class="title-left">应急资源：</span>
									<span class="title-right" :title="item.emergency_resources">
									{{item.emergency_resources}}
								</span>
								</p>
								<p>
									<span class="title-left">资源描述：</span>
									<span class="title-right" style="height: 70px;overflow: auto;line-height: 20px;" :title="item.resources_desc">
									{{item.resources_desc}}
								</span>
								</p>
								<p>
									<span class="title-left">主要技术参数：</span>
									<span class="title-right" style="height: 70px;overflow: auto;line-height: 20px;" :title="item.main_resources">
									{{item.main_resources}}
								</span>
								</p>
								<p>
									<span class="title-left">使用注意事项：</span>
									<span class="title-right" style="height: 70px;overflow: auto;line-height: 20px;" :title="item.resources_params">
									{{item.resources_params}}
								</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div style="text-align: center;height: 50px;line-height: 50px;">
					<Page :total="myTotal" :page-size='pageSize' @on-change='changage' show-total />
				</div>
			</div>
		</div>
		<Modal v-model="selectDelect" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>删除应急资源</span>
			</p>
			<div style="text-align:left">
				<p>
					您正在执行删除应急资源操作，确认删除吗？
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
	import { MyEmergencyResources, shareEmergencyTemplate, deleteEmergencyTemplate } from '../../api/api'
	export default {
		data() {
			return {
				current_page: 1, //当前页码
				pageSize: 2, //每页的页数
				myTotal: 0, //总条数
				resourcesList: [], //应急资源列表
				userid: '', //存在session里面的userid
				selectDelect:false,
				delect_id:'',
			}
		},
		mounted() {
			this.getMyReources();
			this.userid = sessionStorage.getItem('userId');
		},
		methods: {
			readlyDelect(){
				deleteEmergencyTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: this.delect_id
				}).then(res => {
					if(res.error_code == 2000) {
						this.selectDelect=false;
						this.$Message.success(res.error_message);
						this.getMyReources();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//去到编辑应急资源页面
			editResour(id){
				this.$router.push('/m/EditResource/'+id)
			},
			//点击分享
			shareResour(id) {
				shareEmergencyTemplate({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: id
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.getMyReources();
					} else {
						this.$Message.error(res.error_message);
					}
				})

			},
			//点击删除
			delectResour(id) {
				this.delect_id=id;
				this.selectDelect=true;
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
			//获取我的应急资源
			getMyReources() {
				MyEmergencyResources({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					currentPage: this.current_page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						this.resourcesList = res.data.resData;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//改变页码
			changage(data) {
				this.current_page = data;
				this.getMyReources();
			},
		}
	}
</script>

<style lang="less">
	.myresources {
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
		.title-left {
			height: 40px;
			line-height: 40px;
			width: 120px;
			text-align: right;
			display: inline-block;
			font-weight: bold;
			float: left;
		}
		.title-right {
			height: 40px;
			line-height: 40px;
			width: 430px;
			display: inline-block;
			float: left;
		}
	}
</style>
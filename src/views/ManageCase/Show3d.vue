<template>
	<div style="height: 1900px;width: 1200px;margin: 30px auto;border-radius: 16px;position: relative;" class="threeshow">
		<div style="height: 1800px;width: 1200px;margin: 0 auto;border-radius: 16px;background: #648fb4;position: relative;overflow: hidden">
			<div style="height: 680px;width: 1000px;margin: 20px 100px;border-radius: 4px;background: #FFFFFF;padding: 10px 100px;">
				<div style="height: 80px;line-height: 80px;font-size: 24px;text-align: center;">案例基本信息</div>
				<!--<Button type="info" style="margin-left: 20px;" @click="showInfo()">基本信息</Button>-->
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					案例名称：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.name" style="width:650px;" placeholder="请输入案例名称"></Input>
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					起始时间：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<DatePicker readonly :editable='false' v-model='newsInfo.start_time' type="datetime" placeholder="请输入起始时间" style="width: 650px"></DatePicker>
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					结束时间：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<DatePicker readonly :editable='false' v-model='newsInfo.end_time' type="datetime" placeholder="请输入起始时间" style="width: 650px"></DatePicker>
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					事故地点：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.address" style="width:650px;" placeholder="请输入案例名称"></Input>
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					场所简介：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.site_description" :rows="3" style="width: 650px;" type="textarea" placeholder="请输入场所简介" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					事故后果：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.accident_description" :rows="3" style="width: 650px;" type="textarea" placeholder="主要从人员伤亡、环境破坏、财产损失等方面进行描述" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					气象条件：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.weather_description" :rows="3" style="width: 650px;" type="textarea" placeholder="当日的天气、温度、风度、风向、风级等方面进行描述" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					直接原因：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.direct_cause" :rows="3" style="width: 650px;" type="textarea" placeholder="请输入直接原因" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					经验教训：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.experienced_lesson" :rows="3" style="width: 650px;" type="textarea" placeholder="请输入经验教训" />
				</div>
			</div>
			<iframe v-if="showThree" :src="util.getDefaultSrc()+'three/index.html?map_id='+$route.params.three_map_id" width="100%" height="100%" frameborder="no" border="0" style="border-radius: 16px;height: 1200px;width:1200px;"></iframe>
			<!--<iframe v-if="showThree" :src="'http://dphp.yysoul.com/three/index.html?map_id='+$route.params.three_map_id" width="100%" height="100%" frameborder="no" border="0" style="border-radius: 16px;height: 800px;width:1200px;"></iframe>-->
			<div v-else style="height: 800px;width: 100%;line-height: 500px;text-align:center;color: #FFFFFF;font-size: 20px;">
				地图渲染中，请稍候...
			</div>
		</div>
		<div style="min-height: 100px;width:200px;position: absolute;background: #4f6e8a;border-radius: 4px;top:800px;right:100px;padding-bottom:20px">
			<div style="height: 40px;line-height: 40px;text-align: center;color: #fff;font-size: 20px;">
				图例
			</div>
			<div v-for="(item,index) in object_list" :key="index" style="clear: both;width: 180px;margin: 0 auto;">
				<div style="width: 80px;float: left;">
					<div :style="'display: inline-block;width: 60px;height: 30px;background:'+item.object_color"></div>
				</div>
				<div class="overflow-hidden" :title="item.object_name" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					{{item.object_name}}
				</div>
			</div>
			<div style="clear: both;width: 180px;margin: 0 auto;">
				<div style="width: 80px;float: left;">
					<div style="display: inline-block;width: 60px;height: 30px;">
						<img src="../../assets/waiyanhuajiantotu.png" style="width:100%;height: 10px;margin-top: 10px;" alt="" />
					</div>
				</div>
				<div class="overflow-hidden" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					外演化
				</div>
			</div>
			<div style="width: 180px;margin: 0 auto;clear: both;">
				<div style="width: 80px;float: left;">
					<div style="display: inline-block;width: 60px;height: 5px;background: #fff;margin-top:13px"></div>
				</div>
				<div class="overflow-hidden" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					内演化
				</div>
			</div>
			<div style="width: 180px;margin: 0 auto;clear: both;">
				<div style="width: 80px;float: left;">
					<div style="display: inline-block;width: 10px;height: 10px;margin: 13px 0 0 25px;background: #fff;border-radius: 5px;">
						
					</div>
				</div>
				<div class="overflow-hidden" style="width: 100px;float: left;color: #fff;height: 30px;line-height: 30px;">
					情景
				</div>
			</div>
		</div>
		<div style="height: 60px;line-height: 60px;text-align: right;">
			<Button type="info" @click="goBack()">返回</Button>
		</div>
		<Modal v-model="showModel" width="800" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<!--<Icon type="ios-information-circle"></Icon>-->
				<span>基本信息</span>
			</p>
			<div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					案例名称：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.name" style="width:650px;" placeholder="请输入案例名称"></Input>
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					起始时间：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<DatePicker readonly :editable='false' v-model='newsInfo.start_time' type="datetime" placeholder="请输入起始时间" style="width: 650px"></DatePicker>
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					结束时间：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<DatePicker readonly :editable='false' v-model='newsInfo.end_time' type="datetime" placeholder="请输入起始时间" style="width: 650px"></DatePicker>
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 100px;text-align: center;">
					事故地点：
				</div>
				<div style="display: inline-block;height: 40px;line-height: 40px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.address" style="width:650px;" placeholder="请输入案例名称"></Input>
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					场所简介：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.site_description" :rows="3" style="width: 650px;" type="textarea" placeholder="请输入场所简介" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					事故后果：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.accident_description" :rows="3" style="width: 650px;" type="textarea" placeholder="主要从人员伤亡、环境破坏、财产损失等方面进行描述" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					气象条件：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.weather_description" :rows="3" style="width: 650px;" type="textarea" placeholder="当日的天气、温度、风度、风向、风级等方面进行描述" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					直接原因：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.direct_cause" :rows="3" style="width: 650px;" type="textarea" placeholder="请输入直接原因" />
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 100px;text-align: center;">
					经验教训：
				</div>
				<div style="display: inline-block;height: 80px;line-height: 80px;width: 650px;text-align: left;">
					<!--{{sceneInfo.objectName}}-->
					<Input readonly v-model="newsInfo.experienced_lesson" :rows="3" style="width: 650px;" type="textarea" placeholder="请输入经验教训" />
				</div>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="info" @click="showModel=false" style="margin-left: 50px;">确认</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getCaseListDetail,getMapInformation } from '../../api/api'
	export default {
		data() {
			return {
				showThree: false,
				showModel: false,
				newsInfo: {},
				object_list:[]
			}
		},
		mounted() {
			setTimeout(() => {
				this.showThree = true;
				this.getInfo();
				this.getMapInfo()
			}, 500)
		},
		methods: {
			//根据map_id获取3d图的详情
			getMapInfo(){
				getMapInformation({
					map_id:this.$route.params.three_map_id
				}).then(res=>{
					console.log(res)
					this.object_list=res.data.map_object;
				})
			},
			goBack() {
				this.$router.go(-1)
			},
			showInfo() {
				this.showModel = true;
			},
			getInfo() {
				getCaseListDetail({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					case_id: this.$route.params.three_case_id
				}).then(res => {
					if(res.error_code == 2000) {
						this.newsInfo = res.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.threeshow {
		.scene-info-left-block {
			display: inline-block;
			height: 40px;
			line-height: 40px;
			width: 100px;
			text-align: center;
		}
		.scene-info-right-block {
			display: inline-block;
			min-height: 40px;
			line-height: 40px;
			width: 650px;
		}
	}
</style>
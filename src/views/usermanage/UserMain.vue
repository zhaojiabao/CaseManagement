<template>
	<div class="every-page usermain">
		<div style="height: 140px;cursor: pointer;background: #648fb4;line-height: 150px;margin-bottom: 30px;color: #FFFFFF;border-radius:16px;padding-left: 50px;" @click="goUserList()">
			<Icon type="ios-people" style='font-size: 60px;color: #FFFFFF;float: left;margin-top: 44px;' /> <span style="font-size: 27px;color: #FFFFFF;margin-left: 15px;float: left;">用户管理</span>  
			<Icon type="ios-arrow-dropright-circle" style='font-size: 40px;color: #FFFFFF;float: right;margin-top: 54px;margin-right: 30px;'  />
		</div>                                                                                             
		<div style="height: 140px;cursor: pointer;background: #648fb4;line-height: 150px;margin-bottom: 30px;color: #FFFFFF;border-radius:16px;padding-left: 50px;" @click="goCaseManage()">
			<Icon type="ios-folder" style='font-size: 60px;color: #FFFFFF;float: left;margin-top: 44px;' /> <span style="font-size: 27px;color: #FFFFFF;margin-left: 15px;float: left;">案例管理</span>
			<Icon type="ios-arrow-dropright-circle" style='font-size: 40px;color: #FFFFFF;float: right;margin-top: 54px;margin-right: 30px;'  />
		</div>                                                                                             
		<div style="height: 140px;cursor: pointer;background: #648fb4;line-height: 150px;margin-bottom: 30px;color: #FFFFFF;border-radius:16px;padding-left: 50px;" @click="goObjectList()">
			<Icon type="ios-globe" style='font-size: 60px;color: #FFFFFF;float: left;margin-top: 44px;' /> <span style="font-size: 27px;color: #FFFFFF;margin-left: 15px;float: left;">对象模板</span>
			<Icon type="ios-arrow-dropright-circle" style='font-size: 40px;color: #FFFFFF;float: right;margin-top: 54px;margin-right: 30px;'  />
		</div>
		<div style="height: 140px;cursor: pointer;background: #648fb4;line-height: 150px;margin-bottom: 30px;color: #FFFFFF;border-radius:16px;padding-left: 50px;" @click="goResourcesList()">
			<Icon type="ios-flame" style='font-size: 60px;color: #FFFFFF;float: left;margin-top: 44px;' /> <span style="font-size: 27px;color: #FFFFFF;margin-left: 15px;float: left;">应急资源</span>
			<Icon type="ios-arrow-dropright-circle" style='font-size: 40px;color: #FFFFFF;float: right;margin-top: 54px;margin-right: 30px;'  />
		</div>                                                                                        
		<div style="height: 140px;cursor: pointer;background: #648fb4;line-height: 150px;margin-bottom: 30px;color: #FFFFFF;border-radius:16px;padding-left: 50px;" @click="goElementList()">
			<Icon type="ios-hammer" style='font-size: 60px;color: #FFFFFF;float: left;margin-top: 44px;' /> <span style="font-size: 27px;color: #FFFFFF;margin-left: 15px;float: left;">灾情要素</span>
			<Icon type="ios-arrow-dropright-circle" style='font-size: 40px;color: #FFFFFF;float: right;margin-top: 54px;margin-right: 30px;'  />
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		mounted(){
			
		},
		methods:{
			//去到用户列表页面
			goUserList(){
				this.$router.push('/m/UserList')
			},
			//点击去案例管理页面
			goCaseManage(){
				this.$router.push('/m/Caselist')
			},
			//去应急资源列表
			goResourcesList(){
				this.$router.push('/m/resourcesList')
			},
			//去对象管理列表
			goObjectList(){
				this.$router.push('/m/ObjectList')
			},
			//去我的灾情要素
			goElementList(){
				this.$router.push('/m/ElementList')
			}
		}
	}
</script>

<style lang="less">
	.usermain{
		
	}
</style>
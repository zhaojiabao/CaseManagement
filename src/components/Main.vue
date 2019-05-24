<template>
	<div style="width: 1200px;margin: 0 auto;">
		<div class="clear-both manager-bewteen">
			<div class="float-left manager-left">
				<img src="../assets/guanlianliku.png"/>
				<p>管理案例库</p>
			</div>
			<div class="float-right manager-right">
				<div class="manager-right-top clear-both"  @click="goManageCase()">
					<div class="top-left float-left">
						<img src="../assets/guanlianli.png" alt="" />
					</div>
					<div class="top-right float-left">
						<p class="p-first">管理案例</p>
						<p class="p-last">您可以对自己的案例进行增、删、改、查</p>
					</div>
				</div>
				<div class="manager-right-top clear-both" @click="goCaseEntry()">
					<div class="top-left float-left">
						<img src="../assets/anliluru.png" alt="" />
					</div>
					<div class="top-right float-left">
						<p class="p-first">案例录入</p>
						<p class="p-last">您可根据引导将您需要录入的案例文本录入案例库</p>
					</div>
				</div>
				<div class="manager-right-top clear-both" style="border: none;" @click="goElementManage()">
					<div class="top-left float-left">
						<img src="../assets/yaosuguanli.png" alt="" />
					</div>
					<div class="top-right float-left">
						<p class="p-first">属性与要素管理</p>
						<p class="p-last">您可以根据需要操作对象属性、灾情要素与相关的属性</p>
					</div>
				</div>
			</div>
		</div>
		<div class="clear-both manager-bewteen">
			<div class="float-left manager-bottom-left">
				<img src="../assets/liulananliku.png"/>
				<p>浏览案例库</p>
			</div>
			<div class="float-right manager-bottom-right">
				<div class="manager-right-top clear-both" @click="goCaseBrowsingMain()">
					<div class="top-left float-left">
						<img src="../assets/liulananli.png" alt="" />
					</div>
					<div class="top-right float-left">
						<p class="p-first">案例浏览</p>
						<p class="p-last">您可以同时浏览自己创建的案例和系统原有的案例</p>
					</div>
				</div>
				<div class="manager-right-top clear-both" style="border: none;" @click="goQingTui()">
					<div class="top-left float-left">
						<img src="../assets/anliyanhua.png" alt="" />
					</div>
					<div class="top-right float-left">
						<p class="p-first">基于情景推理的应急决策支持</p>
						<p class="p-last" style="width: 580px;">系统会为您所构建的问题情景匹配可行的对策，并帮助您完成对策的效用评估和修正</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg:"hello qinghua"
			};
		},
		methods: {
			clickme() {
				
			},
			getSummaries(param) {
				
			},
			//跳转到案例录入页面
			goCaseEntry(){
				this.$router.push('/m/BasicInformationOne')
			},
			//去案例浏览页面
			goCaseBrowsingMain(){
				this.$router.push('/m/CaseBrowsingMain')
			},
			//跳转到案例管理页面
			goManageCase(){
				this.$router.push('/m/ManageCase')
			},
			//去对象案例管理页面
			goElementManage(){
				this.$router.push('/m/ElementManageMain')
			},
			//点击情景演化
			goQingTui(){
				 this.$Message.info({
	                content: '正在开发中，敬请期待！',
	                duration: 2.5
	            });
			}
		},
		mounted() {
			console.log(this.$route.name)
			console.log(sessionStorage.getItem("username"))
			if(sessionStorage.getItem("username")=='' ||sessionStorage.getItem("username")==null){
				this.$router.push('/Login')
			}
		}
	};
</script>

<style lang="less">
	.manager-bewteen{
		background: #648fb4;
		width: 100%;
		border-radius: 10px;
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.manager-bottom-left{
		width: 480px;
		height: 320px;
		border-right:2px solid #FFFFFF ;
		box-sizing: border-box;
		img{
			display: inline-block;
			width: 115px;
			height: 115px;
			margin:  60px 0 0 185px;
		}
		p{
			font-size: 32px;
			color: #fff;
			text-align: center;
			margin-top: 10px;
		}
	}
	.manager-bottom-right{
		width: 720px;
		height: 320px;
		.manager-right-top:hover{
			background: #99cbee;
		}
		.manager-right-top{
			cursor: pointer;
			height: 160px;
			border-bottom:2px solid #FFFFFF ;
			box-sizing: border-box;
			.top-left{
				width: 120px;
				height:140px;
				img{
					height: 80px;
					width: 60px;
					margin: 50px 0 0 30px;
				}
			}
			.top-right{
				.p-first{
					margin-top: 45px;
					color: #FFFFFF;
					font-size: 30px;
				}
				.p-last{
					margin-top: 1vh;
					color: #FFFFFF;
					font-size: 18px;
				}
			}
		}
	}
	.manager-left{
		width: 480px;
		height: 480px;
		border-right:2px solid #FFFFFF ;
		box-sizing: border-box;
		img{
			display: inline-block;
			width: 120px;
			height: 120px;
			margin:  140px 0 0 170px;
		}
		p{
			font-size: 32px;
			color: #fff;
			text-align: center;
			margin-top: 10px;
		}
	}
	.manager-right{
		width: 720px;
		height: 480px;
		.manager-right-top:hover{
			background: #99cbee;
		}
		.manager-right-top{
			cursor: pointer;
			height: 160px;
			border-bottom:2px solid #FFFFFF ;
			box-sizing: border-box;
			.top-left{
				width: 120px;
				height: 140px;
				img{
					height: 70px;
					width: 60px;
					margin: 50px 0 0 35px;
				}
			}
			.top-right{
				.p-first{
					margin-top: 45px;
					color: #FFFFFF;
					font-size: 30px;
				}
				.p-last{
					margin-top: 1vh;
					color: #FFFFFF;
					font-size: 20px;
				}
			}
		}
	}
	.text-hidden{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
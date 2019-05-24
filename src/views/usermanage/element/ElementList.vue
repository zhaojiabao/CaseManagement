<template>
	<div style="height: 800px;width: 1200px;margin: 0 auto;margin-top: 30px;background: #648fb4;border-radius: 16px;padding-top: 20px;">
		<div style="width: 800px;margin: 0 auto;background: #FFFFFF;border-radius: 16px;padding: 20px;">
			<div class="clear-float" style="text-align: left;">
				<span>关键字 ：</span>
				<Input v-model="searchCondition" placeholder="请输入关键字" style="width: 250px;display: inline-block;" />
				<Button type="info" @click="selectElement()">查询</Button>
				<Button type="info" style="margin-left: 300px;" @click="goBack()">返回</Button>
			</div>
			<div style="width: 800px;height: 600px;">
				<div class="clear-float" v-for="(ele,eleindex) in resData" :key='eleindex' style="height: 100px;">
					<div :title="ele.ele_desc" class="chihuo-size scenename">
						{{ele.ele_name}}
					</div>
					<div style="float: left;width:450px;">
						<div style=" position: relative;height: 8px;margin-top: 45px;width: 100%;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
							<div :style="'height: 8px;width: 8px;border-radius: 4px;background: rgba(0,0,0,0.7);position: absolute;top: 0px;box-shadow: 0 0 10px #FFFFFF;left:' +100/ele.ele_content.length*threeindex+'%;'" :key='threeindex' v-for="(three,threeindex) in ele.ele_content" :class="{changeBack:three.selectvalue}" @click="clickZaiqingDot(ele,three)">
								<div class="overflow-hidden" :title="three.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='three.selectvalue'>
									<span class="clickdotshow">{{three.ele_protery_desc}}</span>  <br />
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
					<div class="float-left" style="width: 100px;padding-top: 30px;">
						<span @click="examineCase(ele.id,3)" style="height: 40px;line-height: 40px;width: 60px;text-align: center;cursor: pointer;font-size: 20px;font-weight: 100;">
									同意									
								</span>
						<span @click="examineCase(ele.id,2)" style="height: 40px;line-height: 40px;width: 60px;text-align: center;cursor: pointer;font-size: 20px;font-weight: 100;">
									拒绝									
								</span>
					</div>
				</div>
			</div>
			<div style="text-align: center;height: 50px;line-height: 50px;">
				<Page :total="myTotal" :page-size='pageSize' @on-change='changage' show-total />
			</div>
		</div>
	</div>
</template>

<script>
	import { getObtainingAuditElements, selectObtainingAuditElements, AuditElements } from '../../../api/api'
	export default {
		data() {
			return {
				searchCondition: '', //关键字
				current_page: 1, //当前页码
				pageSize: 6, //每页的页数
				myTotal: 0, //总条数
				resData: [], //数据存放的数组
			}
		},
		mounted() {
			setTimeout(() => {
				this.getElement()
			}, 200)
		},
		methods: {
			goBack(){
				this.$router.go(-1);
			},
			//查询元素
			selectElement() {
				if(this.searchCondition == "") {
					this.getElement();
				} else {
					selectObtainingAuditElements({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						current_page: this.current_page,
						pageSize: this.pageSize,
						whereSearch: this.searchCondition
					}).then(res => {
						if(res.error_code == 2000) {
							this.$Message.success(res.error_message);
							this.myTotal = res.data.count;
							this.resData = res.data.resultData;
							this.resData.forEach((item, index) => {
								item.ele_content = JSON.parse(item.ele_content);
							})
						} else {
							this.$Message.error(res.error_message);
						}
					})
				}
			},
			//审核元素
			examineCase(id, num) {
				AuditElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: id,
					examine_id: num
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						setTimeout(() => {
							this.getElement();
						}, 200)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			changage(data) {
				this.current_page = data;
				this.getElement();
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
			getElement() {
				getObtainingAuditElements({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					current_page: this.current_page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						this.resData = res.data.resultData;
						this.resData.forEach((item, index) => {
							item.ele_content = JSON.parse(item.ele_content);
						})
						console.log(this.resData)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}
		}
	}
</script>

<style>

</style>
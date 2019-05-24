<template>
	<div style="width: 1200px;margin: 0 auto;background: #648fb4;height: 780px;border-radius: 16px;padding-top: 1px;margin-top: 30px;" class="adextrinsic">
		<div style="width: 1100px;margin: 0 auto;margin-top:15px;padding: 0 20px;border-radius: 16px;height: 700px;">
			<div class="clear-both" style="height: 50px;line-height: 50px;">
				<Button type="success" size='small' icon="ios-add-circle-outline" class="float-right" style="color: #FFF;margin: 5px 10px 0 0;" @click="addXulie()">新建序列</Button>
			</div>
			<div style="height: 620px;">
				<div class="clear-float" style="margin-bottom: 20px;height: 300px;" v-for="(re,i) in relationList" :key='i'>
					<div style="float: left;width: 25px;height: 300px;padding-top: 100px;background:#2c3f50;text-align: center;color: #FFFFFF;border-top-left-radius: 4px;border-bottom-left-radius: 4px;">
						外演化序列
					</div>
					<div style="float: left;width: 1030px;height: 300px;border: 1px solid #ccc;border-top-right-radius: 4px;border-bottom-right-radius: 4px;background: #fff;">
						<div style="height: 30px;line-height: 30px;text-align: right;">
							<span style="display: inline-block;width: 60px;font-size: 18px;cursor: pointer;" @click="editWaiyanhua(re.id)">编辑</span>
							<span style="display: inline-block;width: 60px;font-size: 18px;cursor: pointer;" @click="delectWaiyanhua(re.id)">删除</span>
						</div>
						<div style="width: 1030px;height: 270px;" class="clear-float">
							<div style="width: 322px;height: 240px;border-radius: 4px;float: left;border:1px solid #ccc;margin: 15px 0 15px 15px;padding: 0 5px;box-sizing: border-box;">
								<p style="font-weight: bold;text-align: center;height: 30px;line-height: 30px;border-bottom: 1px solid #ccc;">
									起点情景
								</p>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">对象 ：</span>
									<Select style="width:200px;" v-model="re.object_start_id" size="small" disabled>
										<Option v-for="(item,index) in disasterBearing" :key='index' :value="item.object_id">{{item.object_name}}</Option>
									</Select>
								</div>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">情景 ：</span>
									<!--{{re.scenario_start_id}}
								<Select style="width:200px;" v-model="re.scenario_start_id" size="small">
									<Option v-for='(item,index) in re.startSence' :key='index' :value="item.id">情景{{index+1}}</Option>
								</Select>-->
									<Input readonly v-model="re.scenario_start_name" placeholder="请输入" style="width: 200px;" size="small" />
								</div>
								<p class="small-text" style="padding: 0 20px;margin-top: 15px;height: 60px;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:3; " :title="'情景描述：'+re.startDesc">
									情景描述：{{re.startDesc}}
								</p>
								<div style="padding: 0 20px;text-align: right;cursor: pointer;color: #648fb4;" @click="startQingjing(re.scenario_start_id)">
									>>>详情
								</div>
							</div>
							<div style="width: 322px;height: 270px;border-radius: 4px;float: left;margin:15px 15px 15px 15px;padding: 0 5px;">
								<div style="height: 30px;width:300px;margin: 15px;padding: 0 5px;">
									<img src="../../assets/jiantoua.png" style="width: 100%;height: 100%;" />
								</div>
								<div style="height: 160px;background: rgb(44,63,80);width: 100%;border-radius: 4px;padding: 0 5px;">
									<div style="margin: 25px 0;padding-top: 20px;">
										<span class="kongjian-size"> 空间拓扑关系：</span>
										<!--<Select style="width:180px;" v-model="re.topology_relation" size="small">
										<Option v-for="(item,index) in space_topology" :key='index' :value="item.id">{{item.space_topology_name}}</Option>
									</Select>-->
										<Input readonly v-model="re.topology_relation" placeholder="请输入" style="width: 180px;" size="small" />
									</div>
									<div style="margin: 25px 0;">
										<span class="kongjian-size"> 空间方向关系：</span>
										<Input readonly v-model="re.direction_relation" placeholder="请输入" style="width: 180px;" size="small" />
									</div>
									<div style="margin: 25px 0;">
										<span class="kongjian-size"> 空间具体距离：</span>
										<Input readonly v-model="re.distance_relation" placeholder="请输入" style="width: 160px;" size="small" />
										<span style="color: #FFFFFF;">m</span>
									</div>
								</div>
							</div>
							<div style="width: 322px;height: 240px;border-radius: 4px;float: left;border:1px solid #ccc;padding: 0 5px;margin: 15px 0 15px 0;  ">
								<p style="font-weight: bold;text-align: center;height: 30px;line-height: 30px;border-bottom: 1px solid #ccc;">
									终点情景
								</p>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">对象 ：</span>
									<Select style="width:200px;" v-model="re.object_end_id" size="small" disabled>
										<Option v-for="(item,index) in disasterBearing" :key='index' :value="item.object_id">{{item.object_name}}</Option>
									</Select>
								</div>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">情景 ：</span>
									<!--<Select style="width:200px;" v-model="re.scenario_end_id" size="small">
									<Option v-for='(item,index) in re.sceneEndList' :key='index' :value="item.id">情景{{index+1}}</Option>
								</Select>-->
									<Input readonly v-model="re.scenario_end_name" placeholder="请输入" style="width: 200px;" size="small" />
								</div>
								<p class="small-text" style="padding: 0 20px;margin-top: 15px;height: 60px;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:3; " :title="'情景描述：'+re.endDesc">
									情景描述：{{re.endDesc}}
								</p>
								<div style="padding: 0 20px;text-align: right;cursor: pointer;color: #648fb4;" @click="endQingjing(re.scenario_end_id)">
									>>>详情
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="text-align: center;height: 60px;line-height: 60px;width: 100%;position: relative;" class="clear-float">
				<Page :total="myTotal" :page-size='pageSize' @on-change='changage' show-total />
				<Button type="primary" icon='ios-undo-outline' style="position: absolute;top: 15px;right: 10px;" @click="goBack()">返回</Button>
			</div>
		</div>
		<Modal v-model="addModel" width="1100" @on-cancel='closeAddModel()' :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>添加外演化</span>
			</p>
			<div style="height: 320px;">
				<div class="clear-float" style="margin: 20px 0;">
					<div style="float: left;width: 25px;height: 300px;padding-top: 100px;background:#2c3f50;text-align: center;color: #FFFFFF;border-top-left-radius: 4px;border-bottom-left-radius: 4px;">
						外演化序列
					</div>
					<div style="float: left;width: 1030px;height: 300px;border: 1px solid #ccc;border-top-right-radius: 4px;border-bottom-right-radius: 4px;background: #fff;">
						<div style="width: 1030px;height: 300px;" class="clear-float">
							<div style="width: 322px;height: 270px;border-radius: 4px;float: left;border:1px solid #ccc;margin: 15px 0 15px 15px;padding: 0 5px;box-sizing: border-box;">
								<p style="font-weight: bold;text-align: center;height: 30px;line-height: 30px;border-bottom: 1px solid #ccc;">
									起点情景
								</p>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">对象 ：</span>
									<Select style="width:200px;" v-model="selectStartObjectId" size="small">
										<Option v-for="(item,index) in disasterBearing" :key='index' :value="item.object_id">{{item.object_name}}</Option>
									</Select>
								</div>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">情景 ：</span>
									<Select style="width:200px;" v-model="selectStartSceneId" size="small">
										<Option v-for='(item,index) in sceneStartList' :key='index' :value="item.id">情景{{index+1}}</Option>
									</Select>
								</div>
								<p class="small-text" style="padding: 0 20px;margin-top: 15px;height: 100px;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:5; " :title="'情景描述：'+startSceneDesc">
									情景描述：{{startSceneDesc}}
								</p>
								<!--<div style="padding: 0 20px;text-align: right;cursor: pointer;color: #648fb4;" @click="startQingjing()">
								>>>详情
							</div>-->
							</div>
							<div style="width: 326px;height: 270px;border-radius: 4px;float: left;margin:15px;padding: 0 5px;">
								<div style="height: 30px;width: 300px;margin: 15px;padding: 0 5px;">
									<img src="../../assets/jiantoua.png" style="width: 100%;height: 100%;" />
								</div>
								<div style="height: 180px;background: rgb(44,63,80);width: 100%;border-radius: 4px;padding: 0 5px;">
									<div style="margin: 25px 0;padding-top: 20px;">
										<span class="kongjian-size" style="color: #fff;"> 空间拓扑关系：</span>
										<Select style="width:200px;" v-model="space_topology_id" size="small">
											<Option v-for="(item,index) in space_topology" :key='index' :value="item.id">{{item.space_topology_name}}</Option>
										</Select>
									</div>
									<div style="margin: 25px 0;">
										<span class="kongjian-size" style="color: #fff;"> 空间方向关系：</span>
										<Select style="width:200px;" v-model="spatial_direction_id" size="small">
											<Option :value="item.id" v-for="(item,index) in spatial_direction" :key='index'>{{item.spatial_direction_name}}</Option>
										</Select>
									</div>
									<div style="margin: 25px 0;">
										<span class="kongjian-size" style="color: #fff;"> 空间具体距离：</span>
										<Input v-model="distance_relation" placeholder="请输入" style="width: 180px;" size="small" />
										<span style="color: #FFFFFF;">m</span>
									</div>
								</div>
							</div>
							<div style="width: 326px;height: 270px;border-radius: 4px;float: left;border:1px solid #ccc;padding: 0 5px;margin: 15px 0;">
								<p style="font-weight: bold;text-align: center;height: 30px;line-height: 30px;border-bottom: 1px solid #ccc;">
									终点情景
								</p>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">对象 ：</span>
									<Select style="width:200px;" v-model="selectEndObjectId" size="small">
										<Option v-for="(item,index) in disasterBearing" :key='index' :value="item.object_id">{{item.object_name}}</Option>
									</Select>
								</div>
								<div style="margin-top: 15px;padding: 0 20px;">
									<span class="small-text">情景 ：</span>
									<Select style="width:200px;" v-model="selectEndSceneId" size="small">
										<Option v-for='(item,index) in sceneEndList' :key='index' :value="item.id">情景{{index+1}}</Option>
									</Select>
								</div>
								<p class="small-text" style="padding: 0 20px;margin-top: 15px;height: 100px;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:5; " :title="'情景描述：'+endSceneDesc">
									情景描述：{{endSceneDesc}}
								</p>
								<!--<div style="padding: 0 20px;text-align: right;cursor: pointer;color: #648fb4;" @click="endQingjing()">
								>>>详情
							</div>-->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" style="text-align: center;">
				<Button type="error" @click="closeAddModel()">取消</Button>
				<Button type="error" @click="saveScene()" style="margin-left: 100px;">确认</Button>
			</div>
		</Modal>
		<Modal v-model="lookScene" width="1100" :draggable='true'>
			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>查看情景详情</span>
			</p>
			<div>
				<div class="clear-both shijian" style="padding-bottom: 15px;">
					<span style="float: left;width: 120px;text-align: right;font-size: 15px;height: 30px;line-height: 30px;">开始时间 ：</span>
					<DatePicker readonly v-model='editObject.start_time' type="datetime" placeholder="请输入起始时间" style="width: 410px;float: left;"></DatePicker>
					<span style="float: left;width: 120px;text-align: right;font-size: 15px;height: 30px;line-height: 30px;">结束时间 ：</span>
					<DatePicker readonly v-model='editObject.end_time' type="datetime" placeholder="请输入结束时间" style="width: 410px;float: left;"></DatePicker>
				</div>
				<div class="clear-both" style="padding-bottom: 15px;">
					<span style="float: left;width: 120px;text-align: right;font-size: 15px;height: 30px;line-height: 30px;">致灾因子：</span>
					<Input readonly v-model="editObject.extinguishing_factor" style="width: 410px;float: left;" placeholder="请输入致灾因子"></Input>
					<span style="float: left;width: 120px;text-align: right;font-size: 15px;height: 30px;line-height: 30px;">孕灾条件 ：</span>
					<Input readonly v-model="editObject.pregnancy_condition" style="width: 410px;float: left;" placeholder="请输入孕灾条件"></Input>
				</div>
				<div class="clear-both" style="padding-bottom: 15px;">
					<span style="float: left;width: 120px;text-align: right;font-size: 15px;height: 30px;line-height: 30px;">文本描述：</span>
					<Input readonly v-model="editObject.sence_desc" type="textarea" style="width: 940px;float: left;" :rows='3' placeholder="请输入文本描述"></Input>
				</div>
				<div class="clear-both" style="padding-bottom: 15px;">
					<span style="float: left;width: 120px;text-align: right;font-size: 15px;height: 30px;line-height: 30px;">灾情向量：</span>
					<div style="width: 450px;float:left;">
						<div class="clear-float" style="padding: 5px 0 10px 0;">
							<span>对象破坏相关</span>
							<!--<Button type="success" size='small' icon="ios-add-circle-outline" class="float-right" style="color: #FFF;" @click="goAddYaoOne()">添加要素</Button>-->
						</div>
						<div style="border: 1px solid #ccc;border-radius: 4px;height: 250px; overflow: auto;">
							<div style="width: 550px;">
								<div class="clear-float" style="height: 100px;" v-for="(item,index) in objectList">
									<span class="chihuo-size scenename" :title="item.ele_desc">{{item.ele_name}}</span>
									<span style="width: 370px;height: 100px;display: inline-block;float: left;">
								<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
									<div :style="'height: 10px;width: 10px;border-radius: 5px;background:rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" v-for="(ele,i) in item.ele_content" :class="{changeBack:ele.selectvalue}">
										<div class="overflow-hidden" :title="ele.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='ele.selectvalue'>
										<span class="clickdotshow">{{ele.ele_protery_desc}}</span> <br />
									<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
								</div>
								<div class="overflow-hidden" :title="ele.ele_protery_key" style="position: absolute; top: 15px;left: -45px;font-size: 11px;width: 100px;text-align: center;">
									<span v-if="typeof ele.ele_protery_key == 'string'">{{ele.ele_protery_key}}</span>
									<span v-else>[{{ele.ele_protery_key[0]}}~{{ele.ele_protery_key[1]}})</span>
								</div>
							</div>
						</div>
						</span>
						<span style="width: 100px;height: 100px;line-height: 100px;display: inline-block;float: left;" class="chihuo-size overflow-hidden" :title="'量纲：'+item.ele_dimension">量纲：{{item.ele_dimension}}</span>
					</div>
				</div>
			</div>
	</div>
	<div style="width: 450px;float:right;">
		<div class="clear-float" style="padding: 5px 0 10px 0;">
			<span>灾情作用相关</span>
			<!--<Button type="success" size='small' icon="ios-add-circle-outline" class="float-right" style="color: #FFF;" @click="goAddYaoTwo()">添加要素</Button>-->
		</div>
		<div style="border: 1px solid #ccc;border-radius: 4px;height: 250px;overflow: auto;">
			<div style="width: 550px;">
				<div class="clear-float" style="height: 100px;" v-for="(item,index) in zaiqingList">
					<span class="chihuo-size scenename" :title='item.ele_desc'>{{item.ele_name}}</span>
					<span style="width: 370px;height: 100px;display: inline-block;float: left;">
								<div style="height: 20px;width: 100%;margin-top: 40px;background: url(http://dphp.yysoul.com/img/toright.png);background-size: 100% 100%;position: relative;">
									<div  v-for="(ele,i) in item.ele_content" :style="'height: 10px;width: 10px;border-radius: 5px;background: rgba(0,0,0,0.7);position: absolute;top: 5px;left:' +100/item.ele_content.length*i+'%'" :class="{changeBack:ele.selectvalue}"  @click="clickZaiqingDot(ele,index)">
										<div class="overflow-hidden" :title="ele.ele_protery_desc" style="position: absolute; top: -45px;left: -95px;width: 200px;text-align: center;" v-if='ele.selectvalue'>
											<span  class="clickdotshow">{{ele.ele_protery_desc}}</span> <br />
					<Icon type="ios-pin" style='color:#1890FF;font-size: 20px;' />
				</div>
				<div class="overflow-hidden" :title="ele.ele_protery_key" style="position: absolute; top: 15px;left: -45px;width: 100px;text-align: center;font-size: 11px;">
					<span v-if="typeof ele.ele_protery_key == 'string'">{{ele.ele_protery_key}}</span>
					<span v-else>[{{ele.ele_protery_key[0]}}~{{ele.ele_protery_key[1]}})</span>
				</div>
			</div>
		</div>
		</span>
		<span style="width: 100px;height: 100px;line-height: 100px;display: inline-block;float: left;" class="chihuo-size overflow-hidden" :title="'量纲：'+item.ele_dimension">量纲：{{item.ele_dimension}}</span>
	</div>
	</div>
	</div>
	</div>
	</div>
	<div class="clear-both" style="padding-bottom: 15px;position: relative;">
		<div>
			<span style="float: left;width: 120px;text-align: right;font-size: 15px;height: 30px;line-height: 30px;">情景对策：</span>
			<div style="width: 946px;display: inline-block;border: 1px solid #ccc;border-radius: 4px;margin-top: 5px;padding:15px 0;line-height: 25px;height: 200px;overflow: auto;">
				<!--<div class="clear-float" style="height: 40px;line-height: 40px;">-->
				<!--<Button type="success" size='small' icon="ios-add-circle-outline" style="color: #FFF;float: right;margin-right: 10px;" @click="addDuiCe=true">添加对策</Button>-->
				<!--</div>-->
				<div style="border-bottom: 1px solid #ccc;padding: 10px 0;" v-for="(item,index) in qingjingList" :key='index'>
					<div style="display: inline-block;width: 190px;text-align: center;">
						<span style="font-weight: bold;">情景对策{{index+1}}</span> <br />
						<!--<Button type="error" size="small" style="font-size: 10px;" @click="delectQingjing(index)">删除</Button>-->
					</div>
					<div style="display: inline-block;width: 400px;">
						<span style="font-weight: bold;">资源名称：</span>{{item.emergency_name}}
						<span style="font-weight: bold;margin-left: 30px;">资源数目：</span>{{item.resource_num}} <br />
						<span style="font-weight: bold;">具体措施：</span>{{item.resource_desc}}
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	<div slot="footer" style="text-align: center;">
		<!--<Button type="error" @click="lookScene=false">取消</Button>-->
		<Button type="error" @click="lookScene=false">确认</Button>
	</div>
	</Modal>
	<Modal v-model="editModel" width="1100" :draggable='true'>
		<p slot="header" style="color:#f60;text-align:center">
			<Icon type="ios-information-circle"></Icon>
			<span>编辑外演化</span>
		</p>
		<div style="height: 320px;">
			<div class="clear-float" style="margin: 20px 0;">
				<div style="float: left;width: 25px;height: 300px;padding-top: 100px;background:#2c3f50;text-align: center;color: #FFFFFF;border-top-left-radius: 4px;border-bottom-left-radius: 4px;">
					外演化序列
				</div>
				<div style="float: left;width: 1030px;height: 300px;border: 1px solid #ccc;border-top-right-radius: 4px;border-bottom-right-radius: 4px;background: #fff;">
					<div style="width: 1030px;height: 300px;" class="clear-float">
						<div style="width: 322px;height: 270px;border-radius: 4px;float: left;border:1px solid #ccc;margin: 15px 0 15px 15px;padding: 0 5px;box-sizing: border-box;">
							<p style="font-weight: bold;text-align: center;height: 30px;line-height: 30px;border-bottom: 1px solid #ccc;">
								起点情景
							</p>
							<div style="margin-top: 15px;padding: 0 20px;">
								<span class="small-text">对象 ：</span>
								<Select style="width:200px;" v-model="editStartObjectId" size="small">
									<Option v-for="(item,index) in disasterBearing" :key='index' :value="item.object_id">{{item.object_name}}</Option>
								</Select>
							</div>
							<div style="margin-top: 15px;padding: 0 20px;">
								<span class="small-text">情景 ：</span>
								<Select style="width:200px;" v-model="editStartSceneId" size="small">
									<Option v-for='(item,index) in editStartList' :key='index' :value="item.id">情景{{index+1}}</Option>
								</Select>
							</div>
							<p class="small-text" style="padding: 0 20px;margin-top: 15px;height: 100px;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:5; " :title="'情景描述：'+startSceneDesc">
								情景描述：{{editStartSceneDesc}}
							</p>
							<!--<div style="padding: 0 20px;text-align: right;cursor: pointer;color: #648fb4;" @click="startQingjing()">
								>>>详情
							</div>-->
						</div>
						<div style="width: 326px;height: 270px;border-radius: 4px;float: left;margin:15px;padding: 0 5px;">
							<div style="height: 30px;width: 300px;margin: 15px;padding: 0 5px;">
								<img src="../../assets/jiantoua.png" style="width: 100%;height: 100%;" />
							</div>
							<div style="height: 180px;background: rgb(44,63,80);width: 100%;border-radius: 4px;padding: 0 5px;">
								<div style="margin: 25px 0;padding-top: 20px;">
									<span class="kongjian-size" style="color: #fff;"> 空间拓扑关系：</span>
									<Select style="width:200px;" v-model="edit_space_topology_id" size="small">
										<Option v-for="(item,index) in space_topology" :key='index' :value="item.id">{{item.space_topology_name}}</Option>
									</Select>
								</div>
								<div style="margin: 25px 0;">
									<span class="kongjian-size" style="color: #fff;"> 空间方向关系：</span>
									<Select style="width:200px;" v-model="edit_spatial_direction_id" size="small">
										<Option :value="item.id" v-for="(item,index) in spatial_direction" :key='index'>{{item.spatial_direction_name}}</Option>
									</Select>
								</div>
								<div style="margin: 25px 0;">
									<span class="kongjian-size" style="color: #fff;"> 空间具体距离：</span>
									<Input v-model="edit_distance_relation" placeholder="请输入" style="width: 180px;" size="small" />
									<span style="color: #FFFFFF;">m</span>
								</div>
							</div>
						</div>
						<div style="width: 326px;height: 270px;border-radius: 4px;float: left;border:1px solid #ccc;padding: 0 5px;margin: 15px 0;">
							<p style="font-weight: bold;text-align: center;height: 30px;line-height: 30px;border-bottom: 1px solid #ccc;">
								终点情景
							</p>
							<div style="margin-top: 15px;padding: 0 20px;">
								<span class="small-text">对象 ：</span>
								<Select style="width:200px;" v-model="editEndObjectId" size="small">
									<Option v-for="(item,index) in disasterBearing" :key='index' :value="item.object_id">{{item.object_name}}</Option>
								</Select>
							</div>
							<div style="margin-top: 15px;padding: 0 20px;">
								<span class="small-text">情景 ：</span>
								<Select style="width:200px;" v-model="editEndSceneId" size="small">
									<Option v-for='(item,index) in editEndList' :key='index' :value="item.id">情景{{index+1}}</Option>
								</Select>
							</div>
							<p class="small-text" style="padding: 0 20px;margin-top: 15px;height: 100px;overflow:hidden; text-overflow:ellipsis;display:-webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:5; " :title="'情景描述：'+endSceneDesc">
								情景描述：{{editEndSceneDesc}}
							</p>
							<!--<div style="padding: 0 20px;text-align: right;cursor: pointer;color: #648fb4;" @click="endQingjing()">
								>>>详情
							</div>-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div slot="footer" style="text-align: center;">
			<Button type="error" @click="editModel=false">取消</Button>
			<Button type="error" @click="editSaveScene()" style="margin-left: 100px;">确认</Button>
		</div>
	</Modal>
	</div>
</template>

<script>
	import { getAllByObject, getAllByScenario, createRelation, getSpatialDirectionList, getRelationList, getSingleScenario, getDetailByRelation, editRelation, delScenario } from '../../api/api'
	export default {
		data() {
			return {
				yingji: '',
				disasterBearing: [], //当前地图所有的对象数组
				selectStartObjectId: '', //当前选中的开始对象id
				sceneStartList: [], //开始情景空间的下拉列表
				selectStartSceneId: '', //当前选中开始的情景空间
				startSceneDesc: '', //选中的情景空间对应的情景描述
				selectEndObjectId: '', //当前选中的结束对象id
				sceneEndList: [], //结束情景空间的下拉列表
				selectEndSceneId: '', //当前选中结束的情景空间
				endSceneDesc: '', //选中的结束情景空间对应的情景描述
				spatial_direction: [], //空间方向
				space_topology: [], //空间拓扑
				spatial_direction_id: '', //选中的空间方向id
				space_topology_id: '', //选中的空间拓扑id
				distance_relation: '', //空间距离
				current_page: 1, //当前页码
				pageSize: 2, //每页的页数
				myTotal: 0, //总条数
				relationList: [], //外演化列表
				addModel: false, //添加外演化的弹窗
				lookScene: false, //查看情景详情弹窗
				editObject: {
					start_time: '',
					end_time: '',
					sence_desc: '',
					extinguishing_factor: '',
					pregnancy_condition: ''
				},
				objectList: [], //对象破坏建设灾情向量列表
				zaiqingList: [], //灾情作用情况灾情向量列表
				qingjingList: [], //情景对策列表
				editModel: false, //编辑页面
				editStartObjectId: '', //编辑时对象开始id
				editStartSceneId: '', //编辑时情景开始id
				editEndObjectId: '', //编辑时对象结束id
				editEndSceneId: '', //编辑时情景结束id
				editStartList: [], //编辑时的开始情景列表
				editEndList: [], //编辑时的结束情景列表
				editStartSceneDesc: '', //编辑时开始情景的详情
				editEndSceneDesc: '', //编辑时结束情景的详情
				editId: '', //编辑时外演化的id
				edit_space_topology_id: '', //编辑时空间拓扑关系
				edit_spatial_direction_id: '', //编辑时空间方向关系
				edit_distance_relation: '', //编辑时空间具体距离
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getAllObject();
				this.getYanHua();
				this.getWaiYanhua();
			})
		},
		methods: {
			//删除指定外演化
			delectWaiyanhua(id) {
				delScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: id
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.getWaiYanhua();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击编辑外演化的弹窗里面的确认
			editSaveScene() {
				var selectStartObjectName = '';
				var selectEndObjectName = '';
				var selectStartSceneName = '';
				var selectEndSceneName = '';
				this.disasterBearing.forEach((item, index) => {
					if(item.object_id == this.editStartObjectId) {
						selectStartObjectName = item.object_name
					}
				})
				this.disasterBearing.forEach((item, index) => {
					if(item.object_id == this.editEndObjectId) {
						selectEndObjectName = item.object_name
					}
				})
				this.editStartList.forEach((item, index) => {
					if(item.id == this.editStartSceneId) {
						selectStartSceneName = '情景' + (index + 1)
					}
				})
				this.editEndList.forEach((item, index) => {
					if(item.id == this.editEndSceneId) {
						selectEndSceneName = '情景' + (index + 1)
					}
				})
				var topology_relation = '';
				var direction_relation = '';
				this.space_topology.forEach((item, index) => {
					if(item.id == this.edit_space_topology_id) {
						topology_relation = item.space_topology_name;
					}
				})
				this.spatial_direction.forEach((item, index) => {
					if(item.id == this.edit_spatial_direction_id) {
						direction_relation = item.spatial_direction_name;
					}
				})
				if(this.editEndSceneDesc==''){
					this.$Message.error('终点情景描述不能为空！');
					return;
				}
				if(this.editStartSceneDesc==''){
					this.$Message.error('起点情景描述不能为空！');
					return;
				}
				editRelation({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					object_start_id: this.editStartObjectId,
					scenario_start_id: this.editStartSceneId,
					object_end_id: this.editEndObjectId,
					scenario_end_id: this.editEndSceneId,
					topology_relation: topology_relation,
					direction_relation: direction_relation,
					distance_relation: this.edit_distance_relation,
					map_id: sessionStorage.getItem('map_insertId'),
					case_id: sessionStorage.getItem('case_insertId'),
					userid: sessionStorage.getItem('userId'),
					object_start_name: selectStartObjectName,
					scenario_start_name: selectStartSceneName,
					object_end_name: selectEndObjectName,
					scenario_end_name: selectEndSceneName,
					id: this.editId
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.editModel = false;
						this.getWaiYanhua();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//编辑外演化
			editWaiyanhua(id) {
				this.editId = id;
				this.editModel = true;
				getDetailByRelation({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					user_id: sessionStorage.getItem('userId'),
					id: id
				}).then(res => {
					this.editStartObjectId = res.data.object_start_id;
					this.editStartSceneId = res.data.scenario_start_id;
					this.editEndObjectId = res.data.object_end_id;
					this.editEndSceneId = res.data.scenario_end_id;
					this.edit_distance_relation = res.data.distance_relation;
					this.space_topology.forEach((item, index) => {
						if(item.space_topology_name == res.data.topology_relation) {
							this.edit_space_topology_id = item.id;
						}
					})
					this.spatial_direction.forEach((item, index) => {
						if(item.spatial_direction_name == res.data.direction_relation) {
							this.edit_spatial_direction_id = item.id;
						}
					})
					getAllByScenario({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						map_id: sessionStorage.getItem('map_insertId'),
						object_id: this.editStartObjectId,
						pageSize: 1000,
						current_page: 1,
					}).then(res1 => {
						if(res1.error_code == 2000) {
							res1.data.data.forEach((desc) => {
								if(desc.id == this.editStartSceneId) {
									this.editStartSceneDesc = desc.sence_desc;
								}
							})
						} else {
							this.$Message.error(res1.error_message);
						}
					})
					getAllByScenario({
						username: sessionStorage.getItem('username'),
						token: sessionStorage.getItem('token'),
						map_id: sessionStorage.getItem('map_insertId'),
						object_id: this.editEndObjectId,
						pageSize: 1000,
						current_page: 1,
					}).then(res1 => {
						if(res1.error_code == 2000) {
							res1.data.data.forEach((desc) => {
								if(desc.id == this.editEndSceneId) {
									this.editEndSceneDesc = desc.sence_desc;
								}
							})
						} else {
							this.$Message.error(res1.error_message);
						}
					})
				})
			},
			closeAddModel() {
				this.addModel = false;
				this.selectStartObjectId='';
				this.selectEndObjectId='';
				this.selectStartSceneId='';
				this.selectEndSceneId='';
				this.endSceneDesc='';
				this.startSceneDesc='';
			},
			//改变页码
			changage(data) {
				this.current_page = data;
				this.getWaiYanhua();
			},
			//打开添加序列的弹窗
			addXulie() {
				this.addModel = true;
			},
			//添加的弹窗点击确认
			clickQueren() {

			},
			//获取外演化的列表
			getWaiYanhua() {
				getRelationList({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					username: sessionStorage.getItem('username'),
					current_page: this.current_page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.error_code == 2000) {
						this.myTotal = res.data.count;
						res.data.data.forEach((item, index) => {
							getAllByScenario({
								username: sessionStorage.getItem('username'),
								token: sessionStorage.getItem('token'),
								map_id: sessionStorage.getItem('map_insertId'),
								object_id: item.object_start_id,
								pageSize: 1000,
								current_page: 1,
							}).then(res1 => {
								if(res1.error_code == 2000) {
									item.startSence = res1.data.data;
									item.startSence.forEach((desc) => {
										if(desc.id == item.scenario_start_id) {
											item.startDesc = desc.sence_desc;
										}
									})
								} else {
									this.$Message.error(res1.error_message);
								}
							})
							getAllByScenario({
								username: sessionStorage.getItem('username'),
								token: sessionStorage.getItem('token'),
								map_id: sessionStorage.getItem('map_insertId'),
								object_id: item.object_end_id,
								pageSize: 1000,
								current_page: 1,
							}).then(res2 => {
								if(res2.error_code == 2000) {
									item.sceneEndList = res2.data.data;
									item.sceneEndList.forEach((desc) => {
										if(desc.id == item.scenario_end_id) {
											item.endDesc = desc.sence_desc;
										}
									})
								} else {
									this.$Message.error(res2.error_message);
								}
							})

						})
						setTimeout(() => {
							this.relationList = res.data.data;
							this.relationList.reverse().reverse();
						}, 500)
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}, //点击起点情景的详情
			startQingjing(id) {
				this.lookScene = true;
				getSingleScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: id
				}).then(res => {
					if(res.error_code == 2000) {
						this.editObject.start_time = res.data.start_time;
						this.editObject.end_time = res.data.end_time;
						this.editObject.extinguishing_factor = res.data.extinguishing_factor;
						this.editObject.pregnancy_condition = res.data.pregnancy_condition;
						this.editObject.sence_desc = res.data.sence_desc;
						this.objectList = JSON.parse(res.data.destruction_build);
						this.zaiqingList = JSON.parse(res.data.disaster_situation);
						this.qingjingList = JSON.parse(res.data.scenario_countermeasures);
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//终点情景的详情
			endQingjing(id) {
				this.lookScene = true;
				getSingleScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					id: id
				}).then(res => {
					if(res.error_code == 2000) {
						this.editObject.start_time = res.data.start_time;
						this.editObject.end_time = res.data.end_time;
						this.editObject.extinguishing_factor = res.data.extinguishing_factor;
						this.editObject.pregnancy_condition = res.data.pregnancy_condition;
						this.editObject.sence_desc = res.data.sence_desc;
						this.objectList = JSON.parse(res.data.destruction_build);
						this.zaiqingList = JSON.parse(res.data.disaster_situation);
						this.qingjingList = JSON.parse(res.data.scenario_countermeasures);
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			//点击返回
			goBack() {
				this.$router.go(-1)
			},
			//点击保存
			saveScene() {
				if(this.selectStartObjectId == '') {
					this.$Message.error('起点情景的对象不能为空！');
					return;
				}
				if(this.selectStartSceneId == '') {
					this.$Message.error('起点情景的情景不能为空！');
					return;
				}
				if(this.space_topology_id == '') {
					this.$Message.error('空间拓扑关系不能为空！');
					return;
				}
				if(this.spatial_direction_id == '') {
					this.$Message.error('空间方向关系不能为空！');
					return;
				}
				if(this.distance_relation == '') {
					this.$Message.error('空间具体距离不能为空！');
					return;
				}
				if(this.selectEndObjectId == '') {
					this.$Message.error('终点情景的对象不能为空！');
					return;
				}
				if(this.selectEndSceneId == '') {
					this.$Message.error('终点情景的情景不能为空！');
					return;
				}
				if(this.endSceneDesc==''){
					this.$Message.error('终点情景描述不能为空！');
					return;
				}
				if(this.startSceneDesc==''){
					this.$Message.error('起点情景描述不能为空！');
					return;
				}
				var selectStartObjectName = '';
				var selectEndObjectName = '';
				var selectStartSceneName = '';
				var selectEndSceneName = '';
				this.disasterBearing.forEach((item, index) => {
					if(item.object_id == this.selectStartObjectId) {
						selectStartObjectName = item.object_name
					}
				})
				this.disasterBearing.forEach((item, index) => {
					if(item.object_id == this.selectEndObjectId) {
						selectEndObjectName = item.object_name
					}
				})
				this.sceneStartList.forEach((item, index) => {
					if(item.id == this.selectStartSceneId) {
						selectStartSceneName = '情景' + (index + 1)
					}
				})
				this.sceneEndList.forEach((item, index) => {
					if(item.id == this.selectEndSceneId) {
						selectEndSceneName = '情景' + (index + 1)
					}
				})
				var topology_relation = '';
				var direction_relation = '';
				this.space_topology.forEach((item, index) => {
					if(item.id == this.space_topology_id) {
						topology_relation = item.space_topology_name;
					}
				})
				this.spatial_direction.forEach((item, index) => {
					if(item.id == this.spatial_direction_id) {
						direction_relation = item.spatial_direction_name;
					}
				})
				createRelation({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					object_start_id: this.selectStartObjectId,
					scenario_start_id: this.selectStartSceneId,
					object_end_id: this.selectEndObjectId,
					scenario_end_id: this.selectEndSceneId,
					topology_relation: topology_relation,
					direction_relation: direction_relation,
					distance_relation: this.distance_relation,
					map_id: sessionStorage.getItem('map_insertId'),
					case_id: sessionStorage.getItem('case_insertId'),
					userid: sessionStorage.getItem('userId'),
					object_start_name: selectStartObjectName,
					scenario_start_name: selectStartSceneName,
					object_end_name: selectEndObjectName,
					scenario_end_name: selectEndSceneName
				}).then(res => {
					if(res.error_code == 2000) {
						this.$Message.success(res.error_message);
						this.addModel = false;
						this.selectStartObjectId='';
						this.selectEndObjectId='';
						this.selectStartSceneId='';
						this.selectEndSceneId='';
						this.endSceneDesc='';
						this.startSceneDesc='';
						this.getWaiYanhua();
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			getAllObject() {
				//弹窗中的承灾对象出现的列表
				getAllByObject({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId')
				}).then(res => {
					if(res.error_code == 2000) {
						this.disasterBearing = res.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			getYanHua() {
				getSpatialDirectionList({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token')
				}).then(res => {
					if(res.error_code == 2000) {
						this.spatial_direction = res.data.spatial_direction;
						this.space_topology = res.data.space_topology;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			}
		},
		watch: {
			'editStartSceneId': function() {
				this.editStartList.forEach((item, index) => {
					if(item.id == this.editStartSceneId) {
						this.editStartSceneDesc = item.sence_desc;
					}
				})
			},
			'editEndSceneId': function() {
				this.editEndList.forEach((item, index) => {
					if(item.id == this.editEndSceneId) {
						this.editEndSceneDesc = item.sence_desc;
					}
				})
			},
			'editEndObjectId': function() {
				this.editEndSceneDesc='';
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					object_id: this.editEndObjectId,
					pageSize: 1000,
					current_page: 1,
				}).then(res => {
					if(res.error_code == 2000) {
						this.editEndList = res.data.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			'editStartObjectId': function() {
				this.editStartSceneDesc='';
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					object_id: this.editStartObjectId,
					pageSize: 1000,
					current_page: 1,
				}).then(res => {
					if(res.error_code == 2000) {
						this.editStartList = res.data.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			'selectStartObjectId': function() {
//				if(this.selectStartObjectId != "" && this.selectStartObjectId == this.selectEndObjectId) {
//					this.$Message.error('起点情景与终点情景不能为同一对象！');
//					return
//				}
				this.sceneStartList=[]
				this.startSceneDesc=''
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					object_id: this.selectStartObjectId,
					pageSize: 1000,
					current_page: 1,
				}).then(res => {
					if(res.error_code == 2000) {
						this.sceneStartList = res.data.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			'selectStartSceneId': function() {
				this.sceneStartList.forEach((item, index) => {
					if(item.id == this.selectStartSceneId) {
						this.startSceneDesc = item.sence_desc;
					}
				})
			},
			"selectEndObjectId": function() {
//				if(this.selectStartObjectId != "" && this.selectStartObjectId == this.selectEndObjectId) {
//					this.$Message.error('起点情景与终点情景不能为同一对象！');
//					return
//				}
				this.sceneEndList=[];
				this.endSceneDesc='';
				getAllByScenario({
					username: sessionStorage.getItem('username'),
					token: sessionStorage.getItem('token'),
					map_id: sessionStorage.getItem('map_insertId'),
					object_id: this.selectEndObjectId,
					pageSize: 1000,
					current_page: 1,
				}).then(res => {
					if(res.error_code == 2000) {
						this.sceneEndList = res.data.data;
					} else {
						this.$Message.error(res.error_message);
					}
				})
			},
			'selectEndSceneId': function() {
				this.sceneEndList.forEach((item, index) => {
					if(item.id == this.selectEndSceneId) {
						this.endSceneDesc = item.sence_desc;
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.adextrinsic {
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
		.small-text {
			font-size: 13px;
		}
		.kongjian-size {
			color: #FFFFFF;
			font-size: 13px;
			padding-left: 6px;
		}
		.ivu-btn>.ivu-icon {
			color: #FFF;
		}
		.chihuo-size {
			font-size: 13px;
			text-align: center;
		}
		.shijian {
			.ivu-btn>span {
				color: #333333;
			}
		}
	}
</style>
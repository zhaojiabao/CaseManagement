import axios from 'axios';
import qs from 'qs';

let config = {
	headers: {
		'Content-Type': 'multipart/form-data'
	}
};
//let qinghua = 'https://www.case-cloud.com/api/v1/'
let qinghua = 'https://www.ecase-study.com/api/v1/'
//let qinghua = 'http://39.106.115.99/api/v1/'

//登录接口
export const index = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('image', params.image);
	return axios.post(`${qinghua}index`, param, config).then(res => res.data);
};
//登录接口
export const login = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('userpass', params.userpass);
	param.append('isCheck', params.isCheck);
	return axios.post(`${qinghua}login`, param, config).then(res => res.data);
};
//注册接口
export const register = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('userpass', params.userpass);
	param.append('phone', params.phone);
	param.append('email', params.email);
	param.append('job', params.job);
	return axios.post(`${qinghua}register`, param, config).then(res => res.data);
};
//案例录入基本信息
export const createBaseInfo = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('uid', params.uid);
	param.append('name', params.name);
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	param.append('address', params.address);
	param.append('site_description', params.site_description);
	param.append('accident_description', params.accident_description);
	param.append('weather_description', params.weather_description);
	param.append('direct_cause', params.direct_cause);
	param.append('experienced_lesson', params.experienced_lesson);
	param.append('img_path', params.img_path);
	param.append('other_case_path', params.other_case_path);
	return axios.post(`${qinghua}createBaseInfo`, param, config).then(res => res.data);
};
//获取所有的类型
export const getType = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}getType`, param, config).then(res => res.data);
};
//创建对象
export const createMap = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('case_id', params.case_id);
	param.append('accident_long', params.accident_long);
	param.append('accident_width', params.accident_width);
	param.append('accident_border_length', params.accident_border_length);
	param.append('map_mun', params.map_mun);
	return axios.post(`${qinghua}createMap`, param, config).then(res => res.data);
};
//根据类型动态获取对应的一组值
export const getTypeById = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	return axios.post(`${qinghua}getTypeById`, param, config).then(res => res.data);
};
//对象信息录入
export const createObject = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('map_id', params.map_id);
	param.append('case_id', params.case_id);
	param.append('category_id', params.category_id);
	param.append('category_name', params.category_name);
	param.append('object_anchors', params.object_anchors);
	param.append('object_index', params.object_index);
	param.append('object_name', params.object_name);
	param.append('object_body', JSON.stringify(params.object_body));
	param.append('object_color', params.object_color);
	return axios.post(`${qinghua}createObject`, param, config).then(res => res.data);
};
//创建内演化时获取对应的承灾对象
export const getAllByObject = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('map_id', params.map_id);
	return axios.post(`${qinghua}getAllByObject`, param, config).then(res => res.data);
};
//根据情景值获取所有的点 用于点击创建内演化的弹窗中的情景列表展示
export const getAllByScenario = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('map_id', params.map_id);
	param.append('object_id', params.object_id);
	param.append('pageSize', params.pageSize);
	param.append('current_page', params.current_page);
	return axios.post(`${qinghua}getAllByScenario`, param, config).then(res => res.data);
};
//添加新类型
export const createCategory = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('object_name', params.object_name);
	param.append('object_module_name', JSON.stringify(params.object_module_name));
	return axios.post(`${qinghua}createCategory`, param, config).then(res => res.data);
};
//获取所有分享的对象模型及其元素在添加新类型 从共享模板中选择页面数据
export const getShareCategoryByObject = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('currentPage', params.currentPage);
	param.append('pageSize', params.pageSize);
	param.append('searchCondition', params.searchCondition);
	return axios.post(`${qinghua}getShareCategoryByObject`, param, config).then(res => res.data);
};
//在共享列表点击勾选复选框传到后台  -- 获取所有分享的对象模型选中后添加到我的对象模型中
export const getShareByDataCategory = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('category_id', params.category_id);
	return axios.post(`${qinghua}getShareByDataCategory`, param, config).then(res => res.data);
};
//获取我的元素（对象破坏建设和灾情作用情况）-包括我从共享的拉过来的和我的以及我的共享数据  在添加情景的时候
export const getListElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('currentPage', params.currentPage);
	param.append('pageSize', params.pageSize);
	param.append('ele_object_type', params.ele_object_type);
	param.append('searchCondition', params.searchCondition);
	return axios.post(`${qinghua}getListElements`, param, config).then(res => res.data);
};
//获取所有共享的元素并排除自身从共享库拉取的元素（对象破坏建设和灾情作用情况）  在添加共享要素时弹出框里面的东西
export const getSharesAllElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('currentPage', params.currentPage);
	param.append('pageSize', params.pageSize);
	param.append('ele_object_type', params.ele_object_type);
	param.append('searchCondition', params.searchCondition);
	return axios.post(`${qinghua}getSharesAllElements`, param, config).then(res => res.data);
};
//从共享库拉去到自己的元素中  点击弹窗里面的确定按钮
export const addShareAllElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('element_id', params.element_id);
	return axios.post(`${qinghua}addShareAllElements`, param, config).then(res => res.data);
};
//创建情景空间  也是在添加要素页面的创建新要素接口
export const createScene = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('object_id', params.object_id);
	param.append('category_id', params.category_id);
	param.append('ele_name', params.ele_name);
	param.append('ele_desc', params.ele_desc);
	param.append('ele_dimension', params.ele_dimension);
	param.append('ele_min', params.ele_min);
	param.append('ele_max', params.ele_max);
	param.append('ele_type', params.ele_type);
	param.append('ele_content', JSON.stringify(params.ele_content));
	param.append('ele_object_type', params.ele_object_type);
	return axios.post(`${qinghua}createScene`, param, config).then(res => res.data);
};
//获取我的应急资源
export const MyEmergencyResources = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('currentPage', params.currentPage);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}MyEmergencyResources`, param, config).then(res => res.data);
};
//创建对象上的点  其实就是在编辑情景空间的时候点击保存
export const createScenario = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('object_id', params.object_id);
	param.append('case_id', params.case_id);
	param.append('map_id', params.map_id);
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	param.append('sence_desc', params.sence_desc);
	param.append('extinguishing_factor', params.extinguishing_factor);
	param.append('pregnancy_condition', params.pregnancy_condition);
	param.append('destruction_build', JSON.stringify(params.destruction_build));
	param.append('disaster_situation', JSON.stringify(params.disaster_situation));
	param.append('scenario_countermeasures', JSON.stringify(params.scenario_countermeasures));
	return axios.post(`${qinghua}createScenario`, param, config).then(res => res.data);
};
//获取共享情景对策 
export const getShareEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('currentPage', params.currentPage);
	param.append('pageSize', params.pageSize);
	param.append('searchCondition', params.searchCondition);
	return axios.post(`${qinghua}getShareEmergency`, param, config).then(res => res.data);
};
//创建情景对策（汽车）
export const createEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('img_path', params.img_path);
	param.append('emergency_resources', params.emergency_resources);
	param.append('resources_desc', params.resources_desc);
	param.append('resources_params', params.resources_params);
	param.append('main_resources', params.main_resources);
	return axios.post(`${qinghua}createEmergency`, param, config).then(res => res.data);
};
//将共享选中的情景对策添加到自己的库中 
export const addShareEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('emergency_id', params.emergency_id);
	return axios.post(`${qinghua}addShareEmergency`, param, config).then(res => res.data);
};
//获取3D地图列表
export const getTheEntireMapInformation = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('map_insertId', params.map_insertId);
	return axios.post(`${qinghua}getTheEntireMapInformation`, param, config).then(res => res.data);
};
//根据情景的ID获取单个点的详情 查看某个点的数据
export const getSingleScenario = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	return axios.post(`${qinghua}getSingleScenario`, param, config).then(res => res.data);
};
//根据情景的ID获取单个点的详情 编辑某个点
export const editorScenario = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('id', params.id);
	param.append('object_id', params.object_id);
	param.append('case_id', params.case_id);
	param.append('map_id', params.map_id);
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	param.append('sence_desc', params.sence_desc);
	param.append('extinguishing_factor', params.extinguishing_factor);
	param.append('pregnancy_condition', params.pregnancy_condition);
	param.append('destruction_build', JSON.stringify(params.destruction_build));
	param.append('disaster_situation', JSON.stringify(params.disaster_situation));
	param.append('scenario_countermeasures', JSON.stringify(params.scenario_countermeasures));
	return axios.post(`${qinghua}editorScenario`, param, config).then(res => res.data);
};
//根据情景的ID获取单个点的详情 删除某个点或者某几个点
export const deleteScenario = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	return axios.post(`${qinghua}deleteScenario`, param, config).then(res => res.data);
};
//上传图片接口
export const uploadImage = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('image', params.image);
	return axios.post(`${qinghua}uploadImage`, param, config).then(res => res.data);
};
//删除某个对象
export const deleteObject = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('object_id', params.object_id);
	return axios.post(`${qinghua}deleteObject`, param, config).then(res => res.data);
};
//编辑某个对象
export const editorObject = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('object_id', params.object_id);
	param.append('userId', params.userId);
	param.append('map_id', params.map_id);
	param.append('case_id', params.case_id);
	param.append('object_anchors', params.object_anchors);
	param.append('category_id', params.category_id);
	param.append('category_name', params.category_name);
	param.append('object_index', params.object_index);
	param.append('object_name', params.object_name);
	param.append('object_body', JSON.stringify(params.object_body));
	param.append('object_color', params.object_color);
	return axios.post(`${qinghua}editorObject`, param, config).then(res => res.data);
};
//添加类型元素
export const addMyElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('category_id', params.category_id);
	param.append('category_name', params.category_name);
	param.append('object_data', JSON.stringify(params.object_data));
	return axios.post(`${qinghua}addMyElements`, param, config).then(res => res.data);
};
//获取类型下的元素  
export const getElementByCategory = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('category_id', params.category_id);
	param.append('ele_object_type', params.ele_object_type);
	return axios.post(`${qinghua}getElementByCategory`, param, config).then(res => res.data);
};
//保存案例
export const saveEcase = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('case_insertId', params.case_insertId);
	param.append('map_insertId', params.map_insertId);
	return axios.post(`${qinghua}saveEcase`, param, config).then(res => res.data);
};
//获取共享案例
export const getShareCaseList = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	//	param.append('whereSearch', params.whereSearch);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getShareCaseList`, param, config).then(res => res.data);
};
//获取共享案例
export const selectShareCaseList = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('whereSearch', params.whereSearch);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getShareCaseList`, param, config).then(res => res.data);
};
//获取我的案例
export const getMyCaseList = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	//	param.append('whereSearch', params.whereSearch);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}getMyCaseList`, param, config).then(res => res.data);
};
//获取我的案例
export const selectMyCaseList = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('whereSearch', params.whereSearch);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}getMyCaseList`, param, config).then(res => res.data);
};
//创建外演化
export const createRelation = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('object_start_id', params.object_start_id);
	param.append('scenario_start_id', params.scenario_start_id);
	param.append('object_end_id', params.object_end_id);
	param.append('scenario_end_id', params.scenario_end_id);
	param.append('topology_relation', params.topology_relation);
	param.append('direction_relation', params.direction_relation);
	param.append('distance_relation', params.distance_relation);
	param.append('map_id', params.map_id);
	param.append('case_id', params.case_id);
	param.append('userid', params.userid);
	param.append('object_start_name', params.object_start_name);
	param.append('scenario_start_name', params.scenario_start_name);
	param.append('object_end_name', params.object_end_name);
	param.append('scenario_end_name', params.scenario_end_name);
	return axios.post(`${qinghua}createRelation`, param, config).then(res => res.data);
};
//获取外演化列表（spatial_direction空间方向 , space_topology空间拓扑）
export const getSpatialDirectionList = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	return axios.post(`${qinghua}getSpatialDirectionList`, param, config).then(res => res.data);
};
//检测邮箱是否已经注册
export const checkEmail = params => {
	let param = new FormData();
	param.append('email', params.email);
	return axios.post(`${qinghua}checkEmail`, param, config).then(res => res.data);
};
//检测用户名是否可以注册
export const checkUsername = params => {
	let param = new FormData();
	param.append('username', params.username);
	return axios.post(`${qinghua}checkUsername`, param, config).then(res => res.data);
};
//根据用户名获取邮箱地址
export const getEmailByUserName = params => {
	let param = new FormData();
	param.append('username', params.username);
	return axios.post(`${qinghua}getEmailByUserName`, param, config).then(res => res.data);
};
//重新发送邮件
export const sendEmailByUserName = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('email', params.email);
	return axios.post(`${qinghua}sendEmailByUserName`, param, config).then(res => res.data);
};
//检测用户是否激活
export const checkEmailIsActive = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('email', params.email);
	return axios.post(`${qinghua}checkEmailIsActive`, param, config).then(res => res.data);
};
//退出
export const SignOut = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	return axios.post(`${qinghua}SignOut`, param, config).then(res => res.data);
};
//将共享案例添加到我的案例中
export const importShareCase = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('case_data', JSON.stringify(params.case_data));
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}importShareCase`, param, config).then(res => res.data);
};
//获取单条案例详情  
export const getCaseListDetail = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('case_id', params.case_id);
	return axios.post(`${qinghua}getCaseListDetail`, param, config).then(res => res.data);
};
//修改单条案例 
export const editCaseInfo = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('uid', params.uid);
	param.append('name', params.name);
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	param.append('address', params.address);
	param.append('site_description', params.site_description);
	param.append('accident_description', params.accident_description);
	param.append('weather_description', params.weather_description);
	param.append('direct_cause', params.direct_cause);
	param.append('experienced_lesson', params.experienced_lesson);
	param.append('img_path', params.img_path);
	param.append('other_case_path', params.other_case_path);
	param.append('case_id', params.case_id);
	return axios.post(`${qinghua}editCaseInfo`, param, config).then(res => res.data);
};
//我的对象模板库  
export const getMyObjectTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('whereCondition', params.whereCondition);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getMyObjectTemplate`, param, config).then(res => res.data);
};
//用户列表
export const getUserList = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getUserList`, param, config).then(res => res.data);
};
//删除案例
export const delCaseInfo = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('case_id', params.case_id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}delCaseInfo`, param, config).then(res => res.data);
};
//删除用户
export const deleteUser = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}deleteUser`, param, config).then(res => res.data);
};
//获取待共享案例
export const getObtainingAuditCases = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getObtainingAuditCases`, param, config).then(res => res.data);
};
//查询指定共享案例
export const selectObtainingAuditCases = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	param.append('whereSearch', params.whereSearch);
	return axios.post(`${qinghua}getObtainingAuditCases`, param, config).then(res => res.data);
};
//审核指定共享案例
export const AuditCase = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('case_id', params.case_id);
	param.append('examine_id', params.examine_id);
	return axios.post(`${qinghua}AuditCase`, param, config).then(res => res.data);
};
//获取地图详情及其数量 
export const getCaseByMapDetail = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('case_id', params.case_id);
	param.append('map_id', params.map_id);
	return axios.post(`${qinghua}getCaseByMapDetail`, param, config).then(res => res.data);
};
//获取共享的应急资源
export const getObtainingAuditEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getObtainingAuditEmergency`, param, config).then(res => res.data);
};
//查询共享的应急资源
export const selectObtainingAuditEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('whereSearch', params.whereSearch);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getObtainingAuditEmergency`, param, config).then(res => res.data);
};
//审核应急资源
export const AuditEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('examine_id', params.examine_id);
	return axios.post(`${qinghua}AuditEmergency`, param, config).then(res => res.data);
};
//获取审核对象
export const getObtainingAuditObjects = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getObtainingAuditObjects`, param, config).then(res => res.data);
};
//查询审核对象
export const selectObtainingAuditObjects = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	param.append('whereSearch', params.whereSearch);
	return axios.post(`${qinghua}getObtainingAuditObjects`, param, config).then(res => res.data);
};
//审核指定对象
export const AuditTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('examine_id', params.examine_id);
	return axios.post(`${qinghua}AuditTemplate`, param, config).then(res => res.data);
};
//获取灾情元素
export const getObtainingAuditElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getObtainingAuditElements`, param, config).then(res => res.data);
};
//查询灾情元素
export const selectObtainingAuditElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	param.append('whereSearch', params.whereSearch);
	return axios.post(`${qinghua}getObtainingAuditElements`, param, config).then(res => res.data);
};
//审核灾情元素
export const AuditElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('examine_id', params.examine_id);
	return axios.post(`${qinghua}AuditElements`, param, config).then(res => res.data);
};
//我的对象模板-分享模板
export const shareObjectTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}shareObjectTemplate`, param, config).then(res => res.data);
};
//我的对象模板-删除对象模板
export const deleteObjectTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}deleteObjectTemplate`, param, config).then(res => res.data);
};
//我的应急资源-分享模板
export const shareEmergencyTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}shareEmergencyTemplate`, param, config).then(res => res.data);
};
//我的应急资源-删除应急资源
export const deleteEmergencyTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}deleteEmergencyTemplate`, param, config).then(res => res.data);
};
//我的要素-获取我的要素
export const getAllByListElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('currentPage', params.currentPage);
	param.append('pageSize', params.pageSize);
	param.append('searchCondition', params.searchCondition);
	return axios.post(`${qinghua}getAllByListElements`, param, config).then(res => res.data);
};
//我的灾情元素-分享模板
export const shareElementsTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}shareElementsTemplate`, param, config).then(res => res.data);
};
//我的灾情元素-删除应急资源
export const deleteElementsTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}deleteElementsTemplate`, param, config).then(res => res.data);
};
//获取应急资源点击ID详情  根据id获取详情
export const getSingleEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}getSingleEmergency`, param, config).then(res => res.data);
};
//我的应急资源-编辑保存
export const editorMyEmergency = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('img_path', params.img_path);
	param.append('emergency_resources', params.emergency_resources);
	param.append('resources_desc', params.resources_desc);
	param.append('resources_params', params.resources_params);
	param.append('main_resources', params.main_resources);
	param.append('id', params.id);
	return axios.post(`${qinghua}editorMyEmergency`, param, config).then(res => res.data);
};
//获取单个id对象模板详情
export const getSingleObjectTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	return axios.post(`${qinghua}getSingleObjectTemplate`, param, config).then(res => res.data);
};
//我的对象模板-编辑对象模板
export const editorObjectTemplate = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('id', params.id);
	param.append('object_name', params.object_name);
	param.append('object_module_name', JSON.stringify(params.object_module_name));
	return axios.post(`${qinghua}editorObjectTemplate`, param, config).then(res => res.data);
};
//获取单个id元素详情
export const getSingleElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	param.append('user_id', params.user_id);
	param.append('ele_object_type', params.ele_object_type);
	return axios.post(`${qinghua}getSingleElements`, param, config).then(res => res.data);
};
//我的元素-编辑元素
export const editorElements = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userId', params.userId);
	param.append('object_id', params.object_id);
	param.append('category_id', params.category_id);
	param.append('ele_name', params.ele_name);
	param.append('ele_desc', params.ele_desc);
	param.append('ele_dimension', params.ele_dimension);
	param.append('ele_min', params.ele_min);
	param.append('ele_max', params.ele_max);
	param.append('ele_type', params.ele_type);
	param.append('ele_content', JSON.stringify(params.ele_content));
	param.append('ele_object_type', params.ele_object_type);
	param.append('id', params.id);
	return axios.post(`${qinghua}editorElements`, param, config).then(res => res.data);
};
//分享案例
export const SharingCase = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('case_id', params.case_id);
	return axios.post(`${qinghua}SharingCase`, param, config).then(res => res.data);
};
//根据map_id获取3d图数据
export const getMapInformation = params => {
	let param = new FormData();
	param.append('map_id', params.map_id);
	return axios.post(`${qinghua}getMapInformation`, param, config).then(res => res.data);
};
//获取案例的外演化列表
export const getRelationList = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('map_id', params.map_id);
	param.append('current_page', params.current_page);
	param.append('pageSize', params.pageSize);
	return axios.post(`${qinghua}getRelationList`, param, config).then(res => res.data);
};
//根据外演化ID获取详情
export const getDetailByRelation = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('user_id', params.user_id);
	param.append('id', params.id);
	return axios.post(`${qinghua}getDetailByRelation`, param, config).then(res => res.data);
};
//编辑外演化  
export const editRelation = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('object_start_id', params.object_start_id);
	param.append('scenario_start_id', params.scenario_start_id);
	param.append('object_end_id', params.object_end_id);
	param.append('scenario_end_id', params.scenario_end_id);
	param.append('topology_relation', params.topology_relation);
	param.append('direction_relation', params.direction_relation);
	param.append('distance_relation', params.distance_relation);
	param.append('map_id', params.map_id);
	param.append('case_id', params.case_id);
	param.append('userid', params.userid);
	param.append('object_start_name', params.object_start_name);
	param.append('scenario_start_name', params.scenario_start_name);
	param.append('object_end_name', params.object_end_name);
	param.append('scenario_end_name', params.scenario_end_name);
	param.append('id', params.id);
	return axios.post(`${qinghua}editRelation`, param, config).then(res => res.data);
};
//删除外演化
export const delScenario = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('id', params.id);
	return axios.post(`${qinghua}delScenario`, param, config).then(res => res.data);
};
//检测用户是否有管理员权限
export const checkAdmin = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	return axios.post(`${qinghua}checkAdmin`, param, config).then(res => res.data);
};
//修改密码
export const ChangePassword = params => {
	let param = new FormData();
	param.append('username', params.username);
	param.append('token', params.token);
	param.append('userpass', params.userpass);
	param.append('new_pass', params.new_pass);
	return axios.post(`${qinghua}ChangePassword`, param, config).then(res => res.data);
};















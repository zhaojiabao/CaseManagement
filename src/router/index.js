import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Layout from '@/components/Layout'
import Main from '@/components/Main'
import ChangeMain from '@/components/ChangeMain'
import BasicInformationOne from '@/views/caseentry/BasicInformationOne' //基本信息录入
import BasicInformationTwo from '@/views/caseentry/BasicInformationTwo' //创建地图与对象 创建网格 
import BasicInformationThree from '@/views/caseentry/BasicInformationThree' //创建地图与对象 创建对象  
import BasicInformationFour from '@/views/caseentry/BasicInformationFour' //录入情景与演化  
import CreateQingjing from '@/views/caseentry/CreateQingjing' //对象信息录入页面 
import CreateNewType from '@/views/caseentry/CreateNewType' //创建新类型跳转页面  
import AddElement from '@/views/caseentry/AddElement' //添加要素
import EditingScene from '@/views/caseentry/EditingScene' //编辑场景  
import AddResources from '@/views/caseentry/AddResources' //添加资源页面  
import ceaterNeiYanhua from '@/views/caseentry/ceaterNeiYanhua' //跳转到创建内演化页面  
import AddExtrinsicEvolution from '@/views/caseentry/AddExtrinsicEvolution' //创建外演化  
import LookScene from '@/views/caseentry/LookScene' //单独查看某一条情景空间的值 也就是某个点的值   
import threeLookScene from '@/views/caseentry/threeLookScene' //单独查看某一条情景空间的值 也就是某个点的值   
import EidtEditScene from '@/views/caseentry/EidtEditScene' //单独编辑某一条情景空间的值 
import CaseBrowsingMain from '@/views/casebrowsing/CaseBrowsingMain' //案例浏览首页  
import EmailActive from '@/components/EmailActive' //判断邮箱是否激活  
import ManageCase from '@/views/ManageCase/ManageCase' //判断邮箱是否激活     
import LookCase from '@/views/ManageCase/LookCase' //查看案例  
import EditCase from '@/views/ManageCase/EditCase' //编辑案例      
import Show3d from '@/views/ManageCase/Show3d' //查看3d案例     
import ElementManageMain from '@/views/ElementManage/ElementManageMain' //对象创建要素的第一页对象模板      
import ElementNewType from '@/views/ElementManage/ElementNewType' //在我的对象模板页点击添加对象模板
import ElementQingjing from '@/views/ElementManage/ElementQingjing' //在我的对象模板页点击添加对象模板继续添加情景空间   
import EditObjectInfo from '@/views/ElementManage/EditObjectInfo' //在我的对象模板页点击某一条的编辑按钮 
import EditQingJing from '@/views/ElementManage/EditQingJing' //在我的对象模板页点击某一条的编辑按钮点击保存去到编辑情景空间页面   
import ObjectEditElement from '@/views/ElementManage/ObjectEditElement' //在我的对象模板页点击某一条的编辑按钮点击保存去到编辑情景空间页面给情景空间的元素进行编辑   
import MyResources from '@/views/ElementManage/MyResources' //我的应急资源库  
import EditResource from '@/views/ElementManage/EditResource' //我的应急资源库的数据点击编辑  
import MyElement from '@/views/ElementManage/MyElement' //我的灾情要素库  
import MyAddElement from '@/views/ElementManage/MyAddElement' //我的灾情要素添加要素
import MyElementAddType from '@/views/ElementManage/MyElementAddType' //我的灾情要素添加要素  
import EditElement from '@/views/ElementManage/EditElement' //我的灾情修改我的要素
import UserMain from '@/views/usermanage/UserMain' //当前用户如果是管理员可以显示后台管理字样 
import UserList from '@/views/usermanage/UserList' //后台管理的用户列表  
import Caselist from '@/views/usermanage/case/Caselist' //后台管理的案例列表  
import UserLookCase from '@/views/usermanage/case/LookCase' //后台管理的案例详情  
import ObjectInfo from '@/views/usermanage/case/ObjectInfo' //后台管理的案例详情下一步的对象信息   
import resourcesList from '@/views/usermanage/resources/resourcesList' //后台管理的应急资源列表   
import ObjectList from '@/views/usermanage/object/ObjectList' //后台管理的对象模板列表
import ElementList from '@/views/usermanage/element/ElementList' //后台管理的元素列表 
import ChangeObjectInfo from '@/views/ManageCase/CaseInputEdit/ChangeObjectInfo' //案例管理的时候需要每个页面都要可以修改这个是第二步对象部分的内容。
import ChangeSceneInfo from '@/views/ManageCase/CaseInputEdit/ChangeSceneInfo' //案例管理的时候需要每个页面都要可以修改这个是第三步显示3d图并且可以添加修改内外演化
import RePassword from '@/components/RePassword'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/ChangeMain'
		},
		{
			path: '/ChangeMain',
			name: 'ChangeMain',
			component: ChangeMain
		},
		{
			path: '/Login',
			name: 'Login',
			component: Login
		},
		{
			path: '/Register',
			name: 'Register',
			component: Register
		},
		{
			path: '/RePassword',
			name: 'RePassword',
			component: RePassword
		}, {
			path: '/EmailActive',
			name: 'EmailActive',
			component: EmailActive
		},
		{
			path: '/obed',
			component: Layout,
			children:[{
				path: 'ChangeObjectInfo/:change_edit_id/:change_map_id',
				name: 'ChangeObjectInfo',
				component: ChangeObjectInfo
			},{
				path: 'ChangeSceneInfo/:scene_case_id/:scene_map_id',
				name: 'ChangeSceneInfo',
				component: ChangeSceneInfo
			}]
		},
		{
			path: '/m',
			component: Layout,
			children: [{
				path: 'Main',
				name: 'Main',
				component: Main
			}, {
				path: 'BasicInformationOne',
				name: 'BasicInformationOne',
				component: BasicInformationOne
			}, {
				path: 'BasicInformationTwo',
				name: 'BasicInformationTwo',
				component: BasicInformationTwo
			}, {
				path: 'BasicInformationThree',
				name: 'BasicInformationThree',
				component: BasicInformationThree
			}, {
				path: 'BasicInformationFour',
				name: 'BasicInformationFour',
				component: BasicInformationFour
			}, {
				path: 'CreateQingjing/:scene_id',
				name: 'CreateQingjing',
				component: CreateQingjing
			}, {
				path: 'CreateNewType',
				name: 'CreateNewType',
				component: CreateNewType
			}, {
				path: 'AddElement/:element_id/:category_id/:add_element_object_id',
				name: 'AddElement',
				component: AddElement
			}, {
				path: 'EditingScene/:now_object_id/:add_category_id',
				name: 'EditingScene',
				component: EditingScene,
				meta: {
					keepAlive: true
				}
			}, {
				path: 'AddResources',
				name: 'AddResources',
				component: AddResources
			}, {
				path: 'AddExtrinsicEvolution',
				name: 'AddExtrinsicEvolution',
				component: AddExtrinsicEvolution
			}, {
				path: 'ceaterNeiYanhua',
				name: 'ceaterNeiYanhua',
				component: ceaterNeiYanhua
			}, {
				path: 'LookScene/:look_id/:look_now_object_id',
				name: 'LookScene',
				component: LookScene
			},{
				path: 'threeLookScene/:three_look_id',
				name: 'threeLookScene',
				component: threeLookScene
			}, {
				path: 'EidtEditScene/:edit_id/:edit_now_object_id/:edit_category_id',
				name: 'EidtEditScene',
				component: EidtEditScene
			}, {
				path: 'CaseBrowsingMain',
				name: 'CaseBrowsingMain',
				component: CaseBrowsingMain
			}, {
				path: 'ManageCase',
				name: 'ManageCase',
				component: ManageCase
			}, {
				path: 'LookCase/:look_case_id',
				name: 'LookCase',
				component: LookCase
			}, {
				path: 'EditCase/:edit_case_id',
				name: 'EditCase',
				component: EditCase
			}, {
				path: 'ElementManageMain',
				name: 'ElementManageMain',
				component: ElementManageMain
			}, {
				path: 'ElementNewType',
				name: 'ElementNewType',
				component: ElementNewType
			}, {
				path: 'ElementQingjing/:element_scene_id',
				name: 'ElementQingjing',
				component: ElementQingjing
			}, {
				path: 'MyResources',
				name: 'MyResources',
				component: MyResources
			}, {
				path: 'MyElement',
				name: 'MyElement',
				component: MyElement
			}, {
				path: 'UserMain',
				name: 'UserMain',
				component: UserMain
			}, {
				path: 'UserList',
				name: 'UserList',
				component: UserList
			}, {
				path: 'Caselist',
				name: 'Caselist',
				component: Caselist
			}, {
				path: 'UserLookCase/:user_look_case_id',
				name: 'UserLookCase',
				component: UserLookCase
			}, {
				path: 'ObjectInfo/:object_case_id/:object_map_id',
				name: 'ObjectInfo',
				component: ObjectInfo
			}, {
				path: 'resourcesList',
				name: 'resourcesList',
				component: resourcesList
			}, {
				path: 'ObjectList',
				name: 'ObjectList',
				component: ObjectList
			}, {
				path: 'ElementList',
				name: 'ElementList',
				component: ElementList
			}, {
				path: 'MyAddElement/:my_element_type',
				name: 'MyAddElement',
				component: MyAddElement
			}, {
				path: 'MyElementAddType',
				name: 'MyElementAddType',
				component: MyElementAddType
			}, {
				path: 'EditResource/:resource_edit_id',
				name: 'EditResource',
				component: EditResource
			}, {
				path: 'EditObjectInfo/:object_edit_id',
				name: 'EditObjectInfo',
				component: EditObjectInfo
			}, {
				path: 'EditElement/:element_edit_id/:edit_element_type_id',
				name: 'EditElement',
				component: EditElement
			}, {
				path: 'EditQingJing/:qingjing_edit_id',
				name: 'EditQingJing',
				component: EditQingJing
			}, {
				path: 'ObjectEditElement/:object_element_edit_id/:object_element_id/:object_category_id/:object_ele_object_type',
				name: 'ObjectEditElement',
				component: ObjectEditElement
			}, {
				path: 'Show3d/:three_map_id/:three_case_id',
				name: 'Show3d',
				component: Show3d
			}]
		}
	]
})
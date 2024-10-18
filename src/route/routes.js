import React from 'react'

const RolePermission = React.lazy(() => import('../containers/RolePermission'))

const UserRequest = React.lazy(() => import('../containers/UserRequest'))
const UserRequestDetail = React.lazy(() => import('../containers/UserRequest/detail'))

const UserList = React.lazy(() => import('../containers/User'))
// const UserDetail = React.lazy(() => import('../containers/User/detail'))
// const UserAddEdit = React.lazy(() => import('../containers/User/addEdit'))

const GroupList = React.lazy(() => import('../containers/Group'))
const GroupListAddEdit = React.lazy(() => import('../containers/Group/addEdit'))

const ContactList = React.lazy(() => import('../containers/Contact'))


const GroupCategory = React.lazy(() => import('../containers/GroupCategory'))
const GroupCategoryAddEdit = React.lazy(() => import('../containers/GroupCategory/addEdit'))

const GroupActivity = React.lazy(() => import('../containers/GroupActivity'))
const GroupActivityAddEdit = React.lazy(() => import('../containers/GroupActivity/addEdit'))

const DigitalLibrary = React.lazy(() => import('../containers/DigitalLibrary'))
const DigitalLibraryAddEdit = React.lazy(() => import('../containers/DigitalLibrary/addEdit'))

const FaqList = React.lazy(() => import('../containers/Faqs'))
const FaqAddEdit = React.lazy(() => import('../containers/Faqs/addEdit'))

const Replays = React.lazy(() => import('../containers/DatasetMeta'))
const ReplayAddEdit = React.lazy(() => import('../containers/DatasetMeta/addEdit'))

const Dataset_meta = React.lazy(() => import('../containers/DatasetMeta'))
const Dataset_metaAddEdit = React.lazy(() => import('../containers/DatasetMeta/addEdit'))

const Material = React.lazy(() => import('../containers/Material'))
const MaterialAddEdit = React.lazy(() => import('../containers/Material/addEdit'))

const Role = React.lazy(() => import('../containers/Role'))
const RoleAddEdit = React.lazy(() => import('../containers/Role/addEdit'))

const Events = React.lazy(() => import('../containers/Material'))
const EventAddEdit = React.lazy(() => import('../containers/Material/addEdit'))

const Category = React.lazy(() => import('../containers/Category'))
const CategoryAddEdit = React.lazy(() => import('../containers/Category/addEdit'))

const User = React.lazy(() => import('../containers/User'))
const UserAddEdit = React.lazy(() => import('../containers/User/addEdit'))
const UserGetDetail = React.lazy(() => import('../containers/User/addEdit'))

const BillingInfo = React.lazy(() => import('../containers/BillingInfo'))

const routes = [

  { path: '/members', name: 'Members', element: Material, exact: true },
  { path: '/members/add', name: 'Add Member', element: MaterialAddEdit, exact: true },
  { path: '/members/edit/:memberId', name: 'Edit Member', element: MaterialAddEdit },
  // { path: '/members/:memberId', name: 'Member Detail', element: UserDetail },

  // { path: '/group_management', name: 'Group Management', element: GroupList, exact: true },
  // { path: '/group_management/add', name: 'Group Management', element: GroupListAddEdit, exact: true },
  // { path: '/group_management/edit/:groupId', name: 'Group Management', element: GroupListAddEdit, exact: true },

  { path: '/contributor_meta', name: 'Contributor Meta', element: GroupList, exact: true },
  { path: '/contributor_meta/add', name: 'Contributor Meta', element: GroupListAddEdit, exact: true },
  { path: '/contributor_meta/edit/:groupId', name: 'Contributor Meta', element: GroupListAddEdit, exact: true },

  // { path: '/material', name: 'Material', element: GroupList, exact: true },
  // { path: '/material/add', name: 'Material', element: GroupListAddEdit, exact: true },
  // { path: '/material/edit/:groupId', name: 'Material', element: GroupListAddEdit, exact: true },

  { path: '/contact_management', name: 'Contact Us', element: ContactList, exact: true },

  { path: '/group_category_management', name: 'Group Management', element: GroupCategory, exact: true },
  { path: '/group_category_management/add', name: 'Group Management', element: GroupCategoryAddEdit, exact: true },
  { path: '/group_category_management/edit:categoryId', name: 'Group Management', element: GroupCategoryAddEdit, exact: true },

  { path: '/group_activity_management/:categoryName/:groupId', name: 'Group Management', element: GroupActivity, exact: true },
  { path: '/group_activity_management/add/:categoryName/:groupId/:maxRows', name: 'Group Management', element: GroupActivityAddEdit, exact: true },
  { path: '/group_activity_management/edit/:categoryName/:groupId/:maxRows/:taskId', name: 'Group Management', element: GroupActivityAddEdit, exact: true },

  { path: '/digital_library', name: 'Digital Library', element: DigitalLibrary, exact: true },
  { path: '/digital_library/add', name: 'Add Digital Library', element: DigitalLibraryAddEdit, exact: true },
  { path: '/digital_library/edit/:digitalId', name: 'Edit Digital Library', element: DigitalLibraryAddEdit },

  { path: '/faqs', name: 'FAQs', element: FaqList, exact: true },
  { path: '/faqs/add', name: 'Add FAQ', element: FaqAddEdit, exact: true },
  { path: '/faqs/edit/:faqId', name: 'Edit FAQ', element: FaqAddEdit },
  
  { path: '/replays/add', name: 'Replay Add', element: ReplayAddEdit, exact: true },
  { path: '/replays/edit/:replayId', name: 'Replay Edit', element: ReplayAddEdit },
  { path: '/replays', name: 'Replays', element: Replays, exact: true },

  { path: '/dataset_meta/add', name: 'Dataset Meta Add', element: Dataset_metaAddEdit, exact: true },
  { path: '/dataset_meta/edit/:replayId', name: 'Dataset meta Edit', element: Dataset_metaAddEdit },
  { path: '/dataset_meta', name: 'Dataset Meta', element: Dataset_meta, exact: true },

  { path: '/events', name: 'Events', element: Events, exact: true },
  { path: '/events/add', name: 'Events', element: EventAddEdit, exact: true },
  { path: '/events/edit/:eventId', name: 'Events', element: EventAddEdit },

  { path: '/materials', name: 'Materials', element: Material, exact: true },
  { path: '/materials/add', name: 'Materials', element: MaterialAddEdit, exact: true },
  { path: '/materials/edit/:materialId', name: 'Materials', element: MaterialAddEdit },

  { path: '/roles', name: 'Roles', element: Role, exact: true },
  { path: '/roles/add', name: 'Roles', element: RoleAddEdit, exact: true },
  { path: '/roles/edit/:roleId', name: 'Roles', element: RoleAddEdit },

  { path: '/category', name: 'Category', element: Category, exact: true },
  { path: '/category/add', name: 'Category Add', element: CategoryAddEdit, exact: true },
  { path: '/category/edit/:categoryId', name: 'Category Edit', element: CategoryAddEdit },

  { path: '/billing_info', name: 'Billing info', element: BillingInfo, exact: true },

  { path: '/role_permission', name: 'Role Permission', element: RolePermission, exact: true },

  { path: '/user_request', name: 'User Request', element: UserRequest, exact: true },  
  { path: '/user/request/:memberId', name: 'User Request', element: UserRequestDetail },

  { path: '/users', name: 'User', element: User, exact: true },
  { path: '/users/add', name: 'User Add', element: UserAddEdit, exact: true },
  { path: '/users/edit/:id', name: 'User Edit', element: UserGetDetail },
]

export default routes

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard } from '../../guard/dashboard.guard';
import { IAMDashboardComponent } from './iam-dashboard/iam-dashboard.component';
import { ManagePolicyComponent } from './policy-management/manage-policy/manage-policy.component';
import { AddPolicyComponent } from './policy-management/add-policy/add-policy.component';
import { PolicyDetailComponent } from './policy-management/policy-detail/policy-detail.component';
import { AttachComponentsActionsComponent } from './policy-management/attach-components-actions/attach-components-actions.component';
import { PreviewPolicyComponent } from './policy-management/preview-policy/preview-policy.component';
import { ManageUserComponent } from './user-management/manage-user/manage-user.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';
import { AttachUserPermissionComponent } from './user-management/attach-user-permission/attach-user-permission.component';
import { PreviewUserComponent } from './user-management/preview-user/preview-user.component';
import { ManageGroupComponent } from './group-management/manage-group/manage-group.component';
import { AddGroupComponent } from './group-management/add-group/add-group.component';
import { AttachGroupPermissionComponent } from './group-management/attach-group-permission/attach-group-permission.component';
import { AttachGroupUserComponent } from './group-management/attach-group-user/attach-group-user.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { PreviewGroupComponent } from './group-management/preview-group/preview-group.component';
import { GroupDetailComponent } from './group-management/group-detail/group-detail.component';
import { ManageRoleComponent } from './role-management/manage-role/manage-role.component';
import { AddRoleComponent } from './role-management/add-role/add-role.component';
import { AttachRolePolicyComponent } from './role-management/attach-role-policy/attach-role-policy.component';
import { PreviewRoleComponent } from './role-management/preview-role/preview-role.component';
import { RoleDetailComponent } from './role-management/role-detail/role-detail.component';



const routes: Routes = [               
  { path: '', component:IAMDashboardComponent,canActivate:[DashboardGuard] },
  { path: 'ManageUser',component: ManageUserComponent,canActivate: [DashboardGuard] },
  { path: 'AddUser',component: AddUserComponent, canActivate: [DashboardGuard] },
  { path: 'UserDetail',component: UserDetailComponent, canActivate: [DashboardGuard] },
  { path: 'AttachUserPermission', component: AttachUserPermissionComponent,canActivate: [DashboardGuard] },
  { path: 'PreviewUser',component: PreviewUserComponent, canActivate: [DashboardGuard] },
  { path: 'ManagePolicy',component: ManagePolicyComponent,canActivate: [DashboardGuard] },
  { path: 'AddPolicy',component: AddPolicyComponent, canActivate: [DashboardGuard] },  
  { path: 'PolicyDetail',component: PolicyDetailComponent, canActivate: [DashboardGuard] },
  { path: 'AttachComponentsActions', component: AttachComponentsActionsComponent,canActivate: [DashboardGuard] },
  { path: 'PreviewPolicy',component: PreviewPolicyComponent, canActivate: [DashboardGuard] },
  { path: 'GroupDetail',component: GroupDetailComponent, canActivate: [DashboardGuard] },
  { path: 'ManageGroup',component: ManageGroupComponent, canActivate: [DashboardGuard] },
  { path: 'AddGroup',component: AddGroupComponent, canActivate: [DashboardGuard] },
  { path: 'AttachGroupPermission', component: AttachGroupPermissionComponent,canActivate: [DashboardGuard] },
  { path: 'AttachGroupUser', component: AttachGroupUserComponent,canActivate: [DashboardGuard] }, 
  { path: 'PreviewGroup',component: PreviewGroupComponent, canActivate: [DashboardGuard] }, 
  { path: 'ManageRole',component: ManageRoleComponent, canActivate: [DashboardGuard] },
  { path: 'AddRole',component: AddRoleComponent, canActivate: [DashboardGuard] },
  { path: 'AttachRolePolicy', component: AttachRolePolicyComponent,canActivate: [DashboardGuard] },
  { path: 'PreviewRole',component: PreviewRoleComponent, canActivate: [DashboardGuard] },
  { path: 'RoleDetail',component: RoleDetailComponent, canActivate: [DashboardGuard] },

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class IAMRoutingModule { }
  export const routingComponents = [
    IAMDashboardComponent,
    ManageUserComponent,
    AddUserComponent,
    AttachUserPermissionComponent,
    PreviewUserComponent,
    ManagePolicyComponent,
    AddPolicyComponent,
    AttachComponentsActionsComponent,
    PreviewPolicyComponent,
    ManageGroupComponent,
    AddGroupComponent,
    AttachGroupPermissionComponent,    
    AttachGroupUserComponent,
    PreviewGroupComponent,
    ManageRoleComponent,
    AddRoleComponent,
    AttachRolePolicyComponent,
    PreviewRoleComponent,
    UserDetailComponent,
    PolicyDetailComponent,
    RoleDetailComponent,
    GroupDetailComponent
  ]
  
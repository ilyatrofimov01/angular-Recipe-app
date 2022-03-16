import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import { UnAuthorizedComponent } from "./un-authorized/un-authorized.component";

const appRoutes: Routes = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {path: "not-found", component: NotFoundComponent},
  {path: "unAuthorized", component: UnAuthorizedComponent},
  //{path: "**", redirectTo: "not-found"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

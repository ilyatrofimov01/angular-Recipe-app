import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgModule } from "@angular/core";
import { UnAuthorizedComponent } from "./un-authorized/un-authorized.component";

const appRoutes: Routes = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {path: "recipes", loadChildren: () => import("./recipes/recipes.module").then(mod=>mod.RecipesModule)},
  {path: "shopping-list", loadChildren: () => import("./shopping-list/shopping-list.module").then(mod=>mod.ShoppingListModule)},
  {path: "auth", loadChildren: () => import("./auth/auth.module").then(mod=>mod.AuthModule)},
  {path: "not-found", component: NotFoundComponent},
  {path: "unAuthorized", component: UnAuthorizedComponent}
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

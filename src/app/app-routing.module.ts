import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NgModule } from "@angular/core";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { UnAuthorizedComponent } from "./un-authorized/un-authorized.component";

const appRoutes: Routes = [
  {path: "", redirectTo: "/recipes", pathMatch: "full"},
  {
    path: "recipes", component: RecipesComponent, children: [
      {path: "", component: RecipeStartComponent},
      {path: "new", component: RecipeEditComponent},
      {path: ":id", component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ":id/edit", component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]
  },
  {path: "shopping-list", component: ShoppingListComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "auth", component: AuthComponent},
  {path: "unAuthorized", component: UnAuthorizedComponent},
  {path: "**", redirectTo: "not-found"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

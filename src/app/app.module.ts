import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import ShoppingListService from "./services/shopping-list.service";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import RecipeService from "./services/recipe.service";
import { CommonModule } from "@angular/common";
import { ShortDescriptionPipe } from "./custom-pipes/short-description.pipe";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthComponent } from "./auth/auth.component";
import { UnAuthorizedComponent } from "./un-authorized/un-authorized.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { LoadingSpinnerProgressbarComponent } from "./shared/loading-spinner-progressbar/loading-spinner-progressbar.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";
import { RecipesModule } from "./recipes/recipes.module";
// import { PipesModule } from "./pipes.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerProgressbarComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    NotFoundComponent,
    UnAuthorizedComponent,
    LoadingSpinnerProgressbarComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    RecipesModule
  ],
  providers: [ShoppingListService, RecipeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

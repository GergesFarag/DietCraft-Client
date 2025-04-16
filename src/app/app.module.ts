import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ScrollupComponent } from './components/scrollup/scrollup.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { HeroComponent } from './components/hero/hero.component';
import { DetailedServicesComponent } from './components/detailed-services/detailed-services.component';
import { CtaComponent } from './components/cta/cta.component';
import { StatsComponent } from './components/stats/stats.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ChatBotComponent } from './components/chatbot/chatbot.component';
import { AnimationBuilder, ɵBrowserAnimationBuilder } from '@angular/animations';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ButtonComponent } from './unitComponents/button/button.component';
import { ServicesComponent } from './components/services/services.component';
import { DoubleSizeDirective } from './directives/double-size.directive';
import { MealDetectionComponent } from './components/meal-detection/meal-detection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './components/contact/contact.component'; // Import the animations module

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PreloaderComponent,
    ScrollupComponent,
    SignupComponent,
    UserInfoComponent,
    LoginComponent,
    HomeComponent,
    HeroComponent,
    AboutComponent,
    FeaturesComponent,
    DetailedServicesComponent,
    CtaComponent,
    StatsComponent,
    ChatBotComponent,
    ConfirmationComponent,
    ButtonComponent,
    ServicesComponent,
    DoubleSizeDirective,
    MealDetectionComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule here
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

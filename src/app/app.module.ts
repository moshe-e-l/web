import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Renderer2, APP_INITIALIZER } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { MainTemplateComponent } from './main-template/main-template.component';
import { HomeComponent } from './page-template/home/home.component';
import { RegestritionLogInComponent } from './components/regestration-log-in/regestrition-log-in.component';
import { SearchCorporationComponent } from './components/search-corporation/search-corporation.component';
import { GetJsonService } from './services/get-json.service';
import { CommonService } from './services/common.service';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';
import { ContentComponent } from './page-template/content/content.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesComponent } from './page-template/services/services.component';
import { SafePipe } from './pipes/safe-pipe';
import { GetLoctaionService } from './services/get-location.service';
import { RegistraionLogInPageComponent } from './page-template/registraion-log-in-page/registraion-log-in-page.component';
import { Call106Component } from './page-template/call-106/call-106.component';
import { ChangePhoneNumberComponent } from './page-template/change-phone-number/change-phone-number.component';
import { TestCameraComponent } from './page-template/test-camera/test-camera.component';
import { ManagerSpeechComponent } from './page-template/manager-speech/manager-speech.component';
import { CityContentComponent } from './page-template/city-content/city-content.component';
import { UserSideMenuComponent } from './components/user-side-menu/user-side-menu.component';
import { UserServicesPageComponent } from './user-pages/user-services-page/user-services-page.component';
import { UserFormsPageComponent } from './user-pages/user-forms-page/user-forms-page.component';
import { UserFormPageComponent } from './user-pages/user-form-page/user-form-page.component';
import { UserPaymentsPageComponent } from './user-pages/user-payments-page/user-payments-page.component';
import { UserPaymentPageComponent } from './user-pages/user-payment-page/user-payment-page.component';
import { UserNewsPageComponent } from './user-pages/user-news-page/user-news-page.component';
import { UserBillsPageComponent } from './user-pages/user-bills-page/user-bills-page.component';
import { UserBillPageComponent } from './user-pages/user-bill-page/user-bill-page.component';
import { UserManagCorPageComponent } from './user-pages/user-manag-cor-page/user-manag-cor-page.component';
import { UserMyDetailsPageComponent } from './user-pages/user-my-details-page/user-my-details-page.component';
import { UserChangeCreditDetailsPageComponent } from './user-pages/user-change-credit-details-page/user-change-credit-details-page.component';
import { User106CallPageComponent } from './user-pages/user-106-call-page/user-106-call-page.component';
import { UserPrevious106CallPageComponent } from './user-pages/user-previous-106-call-page/user-previous-106-call-page.component';
import { UserMyDocumentsPageComponent } from './user-pages/user-my-documents-page/user-my-documents-page.component';
import { UserMidotArnonaPageComponent } from './user-pages/user-midot-arnona-page/user-midot-arnona-page.component';
import { UserMyOpendPageComponent } from './user-pages/user-my-opend-page/user-my-opend-page.component';
import { UserWaterDetailsPageComponent } from './user-pages/user-water-details-page/user-water-details-page.component';
import { UserFastMastPageComponent } from './user-pages/user-fast-mast-page/user-fast-mast-page.component';
import { SuccessBillToMaiLComponent } from './page-template/success-bill-to-mai-l/success-bill-to-mai-l.component';
import { UserContactCityPageComponent } from './user-pages/user-contact-city-page/user-contact-city-page.component';
import { SearchFilterPipe } from './pipes/filter-pipe';
import { BillInMailComponent } from './page-template/bill-in-mail/bill-in-mail.component';
import { GetUserIpService } from './services/get-user-ip.service';
import { UserBillInMailComponent } from './user-pages/user-bill-in-mail/user-bill-in-mail.component';
import { UserPointsOfIntrestPageComponent } from './user-pages/user-points-of-intrest-page/user-points-of-intrest-page.component';
import { NotFoundPageComponent } from './page-template/not-found-page/not-found-page.component';
import { StepOneComponent } from './user-pages/user-appointments-page/step-one/step-one.component';
import { StepTowComponent } from './user-pages/user-appointments-page/step-tow/step-tow.component';
import { StepThreeComponent } from './user-pages/user-appointments-page/step-three/step-three.component';
import { StepFourComponent } from './user-pages/user-appointments-page/step-four/step-four.component';
import { StepFiveComponent } from './user-pages/user-appointments-page/step-five/step-five.component';
import { StepSixComponent } from './user-pages/user-appointments-page/step-six/step-six.component';
import { StepSevenComponent } from './user-pages/user-appointments-page/step-seven/step-seven.component';
import { GeneralComponent } from './user-pages/user-appointments-page/general/general.component';
import { AppointmentsService } from './services/appointments.service';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ValidationService } from './services/validation.service';
import { UserVetrerinariaGeneralPageComponent } from './user-pages/user-veterinaria-page/user-vetrerinaria-general-page/user-vetrerinaria-general-page.component';
import { UserMyPetsComponent } from './user-pages/user-veterinaria-page/user-my-pets/user-my-pets.component';
import { UserVaccinesComponent } from './user-pages/user-veterinaria-page/user-vaccines/user-vaccines.component';
import { UserVertrinariaFormsComponent } from './user-pages/user-veterinaria-page/user-vertrinaria-forms/user-vertrinaria-forms.component';
import { VeterinariaService } from './services/vetrinaria.service';
import { UserVerificationAssetPageComponent } from './user-pages/user-verification-asset-page/user-verification-asset-page.component';
import { UserChetPageComponent } from './user-pages/user-chet-page/user-chet-page.component';
import { UserSummerCampPageComponent } from './user-pages/user-summer-camp-page/user-summer-camp-page.component';
import { CityDropDownComponent } from './components/city-drop-down/city-drop-down.component';
import { AppStoreMenuComponent } from './page-template/app-store-menu/app-store-menu.component';
import { EncryptionService } from './services/encryption.service';
import { UserAfternoonKidsPaymentComponent } from './user-pages/user-afternoon-kids-payment/user-afternoon-kids-payment.component';
import { UserVaccinesPaymentsComponent } from './user-pages/user-veterinaria-page/user-vaccines-payments/user-vaccines-payments.component';
import { AddYearPipe } from './pipes/add-year-pipe';
import { UserAddPetComponent } from './user-pages/user-veterinaria-page/user-add-pet/user-add-pet.component';
import { ManagerLogInComponent } from './page-template/manager-log-in/manager-log-in.component';
import { MagicCitizensComponent } from './page-template/magic-citizens/magic-citizens.component';
import { SpinnerLoaderComponent } from './components/spinner-loader/spinner-loader.component';
import { B2mTableComponent } from './components/b2m-table/b2m-table.component';
import { EditableInputComponent } from './components/editable-input/editable-input.component';
import {MatTooltipModule} from '@angular/material';
import { SearchEngineResultsComponent } from './components/search-engine-results/search-engine-results.component';
import { LangPipe } from './pipes/lang.pipe';
import { MyAppointmentsComponent } from './user-pages/user-appointments-page/my-appointments/my-appointments.component';
import { LifeBeltComponent } from './page-template/life-belt/life-belt.component';
import { FastMastArnonaComponent } from './user-pages/user-fast-mast-details/fast-mast-arnona/fast-mast-arnona.component';
import { FastMastCodeComponent } from './user-pages/user-fast-mast-details/fast-mast-code/fast-mast-code.component';
import { FastMastDetailsComponent } from './user-pages/user-fast-mast-details/fast-mast-details/fast-mast-details.component';
import { UserFastMastGeneralComponent } from './user-pages/user-fast-mast-details/user-fast-mast-general/user-fast-mast-general.component';
import { FastMastService } from './services/fast-mast.service';
import { DynamicFormComponent } from './modules/dynamic-form/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './modules/dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { FormValidationService } from './modules/dynamic-form/services/form-validation.service';
import { ReCaptchaDirective } from './modules/dynamic-form/directives/recaptha.directive';


declare var System: any; 
//Load localized messages (English included by default)
var messagesDe;
var messagesJa;
var messagesRu;

//Set locale according the browser language

@NgModule({
  declarations: [
    AppComponent,  
    MainTemplateComponent,
    HomeComponent,
    RegestritionLogInComponent,
    SearchCorporationComponent, 
    ContentComponent,
    FooterMenuComponent,
    HamburgerMenuComponent,
    ServicesComponent,
    AddYearPipe,
    SafePipe,
    LangPipe,
    SearchFilterPipe,
    RegistraionLogInPageComponent, 
    Call106Component,
    ChangePhoneNumberComponent, 
    TestCameraComponent,
    ManagerSpeechComponent,
    CityContentComponent,
    UserSideMenuComponent,
    UserServicesPageComponent,
    UserFormsPageComponent,
    UserFormPageComponent,
    UserPaymentsPageComponent,    
    UserPaymentPageComponent, 
    UserNewsPageComponent,
    UserBillsPageComponent,
    UserBillPageComponent,
    UserManagCorPageComponent,
    UserMyDetailsPageComponent,
    UserChangeCreditDetailsPageComponent,
    User106CallPageComponent,
    UserPrevious106CallPageComponent,
    UserMyDocumentsPageComponent,
    UserMidotArnonaPageComponent,
    UserMyOpendPageComponent,
    UserWaterDetailsPageComponent,
      UserFastMastPageComponent,
      SuccessBillToMaiLComponent,
      UserContactCityPageComponent,
      BillInMailComponent,
      UserBillInMailComponent,
      UserPointsOfIntrestPageComponent,
      NotFoundPageComponent,
      StepOneComponent,
      StepTowComponent,
      StepThreeComponent,
      StepFourComponent,
      StepFiveComponent,
      StepSixComponent,
      StepSevenComponent,
      GeneralComponent,
      UserVetrerinariaGeneralPageComponent,
      UserMyPetsComponent,
      UserVaccinesComponent,
      UserVertrinariaFormsComponent,
      UserVerificationAssetPageComponent,
      ReCaptchaDirective,
      UserChetPageComponent,
      UserSummerCampPageComponent,
      CityDropDownComponent,
      AppStoreMenuComponent,
      UserAfternoonKidsPaymentComponent,
      UserVaccinesPaymentsComponent,
      UserAddPetComponent,
      ManagerLogInComponent,
      MagicCitizensComponent,
      SpinnerLoaderComponent,     
      EditableInputComponent,
      B2mTableComponent,
      DynamicFormComponent,
      DynamicFormQuestionComponent,
      SearchEngineResultsComponent,
      MyAppointmentsComponent,
      LifeBeltComponent,
      FastMastArnonaComponent,
      FastMastCodeComponent,
      FastMastDetailsComponent,
      UserFastMastGeneralComponent

  ],
  imports: [    
    AppRoutingModule,
    ReactiveFormsModule,   
    MatAutocompleteModule,   
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule, 
    Ng2DeviceDetectorModule.forRoot(),
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [GetJsonService,CommonService, GetLoctaionService, GetUserIpService,
       VeterinariaService, AppointmentsService, HamburgerMenuComponent, ContentComponent, 
       AppointmentsService, ValidationService,EncryptionService, FormValidationService,
       FastMastService
      
              ],
  bootstrap: [AppComponent]
})
export class AppModule {}

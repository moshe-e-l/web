import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTemplateComponent } from '../../main-template/main-template.component';
import { HomeComponent } from '../../page-template/home/home.component';
import { ContentComponent } from '../../page-template/content/content.component'
import { ServicesComponent } from '../../page-template/services/services.component';
import { RegistraionLogInPageComponent } from '../../page-template/registraion-log-in-page/registraion-log-in-page.component';
import { Call106Component } from '../../page-template/call-106/call-106.component';
import { ChangePhoneNumberComponent } from '../../page-template/change-phone-number/change-phone-number.component';
import { TestCameraComponent } from '../../page-template/test-camera/test-camera.component';
import { ManagerSpeechComponent } from '../../page-template/manager-speech/manager-speech.component';
import { CityContentComponent } from '../../page-template/city-content/city-content.component';
import { UserServicesPageComponent } from '../../user-pages/user-services-page/user-services-page.component';
import { UserFormPageComponent } from '../../user-pages/user-form-page/user-form-page.component';
import { UserFormsPageComponent } from '../../user-pages/user-forms-page/user-forms-page.component';
import { UserPaymentPageComponent } from '../../user-pages/user-payment-page/user-payment-page.component';
import { UserPaymentsPageComponent } from '../../user-pages/user-payments-page/user-payments-page.component';
import { UserNewsPageComponent } from '../../user-pages/user-news-page/user-news-page.component';
import { UserBillsPageComponent } from '../../user-pages/user-bills-page/user-bills-page.component';
import { UserManagCorPageComponent } from '../../user-pages/user-manag-cor-page/user-manag-cor-page.component';
import { UserMyDetailsPageComponent } from '../../user-pages/user-my-details-page/user-my-details-page.component';
import { UserBillPageComponent } from '../../user-pages/user-bill-page/user-bill-page.component';
import { UserChangeCreditDetailsPageComponent } from '../../user-pages/user-change-credit-details-page/user-change-credit-details-page.component';
import { User106CallPageComponent } from '../../user-pages/user-106-call-page/user-106-call-page.component';
import { UserPrevious106CallPageComponent } from '../../user-pages/user-previous-106-call-page/user-previous-106-call-page.component';
import { UserMyDocumentsPageComponent } from '../../user-pages/user-my-documents-page/user-my-documents-page.component';
import { UserMidotArnonaPageComponent } from '../../user-pages/user-midot-arnona-page/user-midot-arnona-page.component';
import { UserMyOpendPageComponent } from '../../user-pages/user-my-opend-page/user-my-opend-page.component';
import { UserWaterDetailsPageComponent } from '../../user-pages/user-water-details-page/user-water-details-page.component';
import { UserFastMastPageComponent } from '../../user-pages/user-fast-mast-page/user-fast-mast-page.component';
import { SuccessBillToMaiLComponent } from '../../page-template/success-bill-to-mai-l/success-bill-to-mai-l.component';
import { UserContactCityPageComponent } from '../../user-pages/user-contact-city-page/user-contact-city-page.component';
import { BillInMailComponent } from '../../page-template/bill-in-mail/bill-in-mail.component';
import { UserBillInMailComponent } from '../../user-pages/user-bill-in-mail/user-bill-in-mail.component';
import { UserPointsOfIntrestPageComponent } from '../../user-pages/user-points-of-intrest-page/user-points-of-intrest-page.component';
import { NotFoundPageComponent } from '../../page-template/not-found-page/not-found-page.component';
import { GeneralComponent } from '../../user-pages/user-appointments-page/general/general.component';
import { UserVetrerinariaGeneralPageComponent } from '../../user-pages/user-veterinaria-page/user-vetrerinaria-general-page/user-vetrerinaria-general-page.component';
import { UserVerificationAssetPageComponent } from '../../user-pages/user-verification-asset-page/user-verification-asset-page.component';
import { UserChetPageComponent } from '../../user-pages/user-chet-page/user-chet-page.component';
import { UserSummerCampPageComponent } from '../../user-pages/user-summer-camp-page/user-summer-camp-page.component';
import { AppStoreMenuComponent } from '../../page-template/app-store-menu/app-store-menu.component';
import { UserAfternoonKidsPaymentComponent } from '../../user-pages/user-afternoon-kids-payment/user-afternoon-kids-payment.component';
import { ManagerLogInComponent } from '../../page-template/manager-log-in/manager-log-in.component';
import { MagicCitizensComponent } from '../../page-template/magic-citizens/magic-citizens.component';
import { SearchEngineResultsComponent } from '../../components/search-engine-results/search-engine-results.component';
import { MyAppointmentsComponent } from '../../user-pages/user-appointments-page/my-appointments/my-appointments.component';
import { LifeBeltComponent } from '../../page-template/life-belt/life-belt.component';
import { UserFastMastGeneralComponent } from '../../user-pages/user-fast-mast-details/user-fast-mast-general/user-fast-mast-general.component';


 const routes: Routes = [    
    { path: 'content/:pageName', component: ContentComponent },
    { path: 'content/:pageName/:city', component: ContentComponent },
    { path: '', component: HomeComponent },
    { path: ':city/services', component: ServicesComponent },
    { path: ':city/services/:parent', component: ServicesComponent },
    { path: ':city/payments', component: UserPaymentsPageComponent },
    { path: ':city/manager-speech', component: ManagerSpeechComponent },
    { path: ':city/payment', component: UserPaymentPageComponent },
    { path: ':city/payment/:child', component: UserPaymentPageComponent },
    { path: ':city/payment/QR_TAG/:stub/:payerId', component: UserPaymentPageComponent },
    { path: ':city/form/:pageUid', component: UserFormPageComponent }, 
    { path: ':city/forms', component: UserFormsPageComponent }, 
    { path: 'registraion-log-in-page', component: RegistraionLogInPageComponent },
    { path: 'registraion-log-in-page/:city', component: RegistraionLogInPageComponent },
    { path: ':city/call-106', component: Call106Component },
    { path: 'change-phone', component: ChangePhoneNumberComponent },
    { path: 'version-info', component: TestCameraComponent },
    { path: ':city/city-content/:id', component: CityContentComponent }, // אין באמת צורך במזהה רשות, אבל כבר הרבה לינקים נכתבו עם המזהה רשות
    { path: 'city-content/:id', component: CityContentComponent },
    { path: ':city/midot-arnona/:code', component: UserMidotArnonaPageComponent },
    { path: ':city/fast-mast/:code/:parent', component: UserFastMastPageComponent },
    { path: 'success-bill-to-mail', component: SuccessBillToMaiLComponent },
    { path: ':city/contact-city', component: UserContactCityPageComponent },
    { path: ':city/bill-in-mail', component: BillInMailComponent },
    { path: ':city/news', component: UserNewsPageComponent },
    { path: 'not-found', component: NotFoundPageComponent },
    { path: ':city/appointments', component: GeneralComponent }, // appointments page 
    { path: ':city/my-appointments', component: MyAppointmentsComponent }, // appointments page 
    { path: ':city/chat', component: UserChetPageComponent }, 
    { path: 'app-store-menu', component: AppStoreMenuComponent }, 
    { path: ':city/afternoon', component: UserAfternoonKidsPaymentComponent }, 
    { path: ':city/summer-camp', component: UserSummerCampPageComponent }, 
    { path: ':city/summer-camp/:lang', component: UserSummerCampPageComponent }, 
    { path: ':city/veterinaria/:step', component: UserVetrerinariaGeneralPageComponent },  
    { path: 'customerregistartionformagaremployee', component: ManagerLogInComponent },  
    { path: '37/magic-citizens', component: MagicCitizensComponent },  
    { path: 'search-engine/:query', component: SearchEngineResultsComponent },  
    { path: ':city/search-engine/:query', component: SearchEngineResultsComponent },  
    { path: ':city/fast-mast-details', component: UserFastMastGeneralComponent },  

              /////user-pages////
    { path: 'user/:city/services', component: UserServicesPageComponent },
    { path: 'user/:city/services/:parent', component: UserServicesPageComponent },
    { path: 'user/:city/forms', component: UserFormsPageComponent },
    { path: 'user/:city/form/:pageUid', component: UserFormPageComponent },
    { path: 'user/:city/payments', component: UserPaymentsPageComponent },
    { path: 'user/:city/payment/:child', component: UserPaymentPageComponent },
    { path: 'user/:city/news', component: UserNewsPageComponent },
    { path: 'user/:city/bills', component: UserBillsPageComponent },
    { path: 'user/:city/bill/:stub', component: UserBillPageComponent },
    { path: 'user/:city/manag', component: UserManagCorPageComponent },
    { path: 'user/:city/update-details', component: UserMyDetailsPageComponent },
    { path: 'user/:city/change-credit-details', component: UserChangeCreditDetailsPageComponent },
    { path: 'user/:city/call-106', component: User106CallPageComponent },
    { path: 'user/:city/prev-106-call', component: UserPrevious106CallPageComponent },   
    { path: 'assets/MastImages/SharedFiles/:id/:idd/:idf' , redirectTo: 'not-found' }, // דף לא נמצא לטובת מסמך שלא קיים
    { path: 'assets/arnona_images/:id/:idd' , redirectTo: 'not-found' }, // דף לא נמצא לטובת מסמך שלא קיים

    { path: 'undefined' , redirectTo: 'not-found' }, // דף לא נמצא לטובת מסמך שלא קיים
    { path: 'user/:city/my-documents', component: UserMyDocumentsPageComponent },
    { path: 'user/:city/appointments', component: GeneralComponent }, // appointments page
    { path: 'user/:city/my-appointments', component: MyAppointmentsComponent }, // appointments page
    { path: 'user/:city/verification-asset', component: UserVerificationAssetPageComponent }, 
    { path: 'user/:city/chat', component: UserChetPageComponent }, 
    { path: 'user/:city/summer-camp', component: UserSummerCampPageComponent }, 
    { path: 'user/:city/summer-camp/:lang', component: UserSummerCampPageComponent }, 
    { path: 'user/:city/afternoon/:child', component: UserAfternoonKidsPaymentComponent }, 
    { path: 'user/:city/midot-arnona/:code', component: UserMidotArnonaPageComponent },
    { path: 'user/:city/my-opend', component: UserMyOpendPageComponent },
    { path: 'user/:city/water-details', component: UserWaterDetailsPageComponent },
    { path: 'user/:city/parent-block', component: UserWaterDetailsPageComponent },
    { path: 'user/:city/fast-mast/:code/:parent', component: UserFastMastPageComponent },
    { path: 'user/:city/contact-city', component: UserContactCityPageComponent },
    { path: 'user/:city/bill-in-mail', component: UserBillInMailComponent },
    { path: 'user/:city/point-of-intrest', component: UserPointsOfIntrestPageComponent },  
    { path: 'user/:city/veterinaria/:step', component: UserVetrerinariaGeneralPageComponent },  
    { path: 'user/:city/life-belt', component: LifeBeltComponent },  
    { path: 'user/:city/fast-mast-details', component: UserFastMastGeneralComponent },  

    { path: '**', redirectTo: '' }
  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

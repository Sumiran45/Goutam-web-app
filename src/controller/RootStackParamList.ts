import { Product } from "../Context/CartContext";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Shop: undefined;
    ProductDetail: { product: Product }; 
    Cart: undefined;
    ForgotPassword: undefined;
    ResetPassword: { token: string }; 
    EditProfile: undefined;
    ChangePassword: undefined;
    AdminScreen: undefined;
    TermsOfService:undefined;
    PrivacyPolicy:undefined;
    HelpSupport:undefined;
    AllActivities:undefined;
    UserDetails:undefined;
    ArticleDetails : undefined;
  };
  
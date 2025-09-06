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
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  HelpSupport: undefined;
  AllActivities: undefined;
  UserDetails: undefined;
  ArticleDetails: undefined;
  ArticleDetail: { article: any };
  DoctorDetail: undefined;
  BookAppointment: undefined;
  ProductScreen: undefined;
  ProductDetailScreen: { product: any };
  AddProductScreen: undefined;
  EditProductScreen: {product: any};
  Settings: undefined;
};

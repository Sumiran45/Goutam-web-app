import { Product } from "../Context/CartContext";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Shop: undefined;
    ProductDetail: { product: Product }; // Use correct param name/type
    Cart: undefined;
    ForgotPassword: undefined;
    ResetPassword: { token: string }; // Update based on your use
    EditProfile: undefined;
    ChangePassword: undefined;
    AdminScreen: undefined;
    ArticleDetail: { article: any };
  };
  
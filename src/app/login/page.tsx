import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authenticator = () => {
  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BeWear</h1>
          <p className="text-gray-600">Entre na sua conta ou crie uma nova</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <Tabs defaultValue="sign-in">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="sign-in">Entrar</TabsTrigger>
              <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="sign-in" className="mt-0">
              <SignInForm />
            </TabsContent>

            <TabsContent value="sign-up" className="mt-0">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Authenticator;

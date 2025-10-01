import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientLogin from "./ClientLogin";
import ClientRegister from "./ClientRegister";

export default function TestAuth() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6 ">
      <Tabs defaultValue="register" className="">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* login */}
        <TabsContent value="login">
          <ClientLogin />
        </TabsContent>

        {/* register */}
        <TabsContent value="register">
          <ClientRegister />
        </TabsContent>
      </Tabs>
    </div>
  );
}

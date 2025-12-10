import { useRole } from "@/contexts/RoleContext";

export function WelcomeHeader() {
  const { roleInfo } = useRole();

  return (
    <div className="relative h-[288px] w-full mb-6">
      <div className="absolute h-[288px] left-0 rounded-[32px] top-0 w-full bg-gradient-to-br from-white via-white to-purple-50">
        <div className="absolute flex flex-col items-start left-0 top-[81px] w-full max-w-[888px] px-6">
          <h1 className="font-semibold leading-[90px] relative shrink-0 text-[60px] text-black tracking-[-0.5px] w-full mb-0">
            Hello {roleInfo.name},
          </h1>
          <div className="flex items-center relative shrink-0 w-full mt-0">
            <p className="font-normal leading-[36px] relative shrink-0 text-[#464f5e] text-[20px] tracking-[0.18px]">
              Welcome back! Here's what's changed in your workforce strategy workflows since your last login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


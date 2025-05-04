import { useLang } from "@/context/lang-context";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { getDownloadLink } from "@/lib/utils";
import appStoreLogo from "@/assets/images/apple-logo.svg";
import googlePlayLogo from "@/assets/images/googleplay.svg";
import bannerImage from "@/assets/images/banner2.webp";

const Banner = () => {
  const { messages } = useLang();
  return (
    <div data-lang-id="banner" className="mt-16">
      <div className="max-container flex gap-8">
        <div className="p-6 rounded-4xl bg-white right-clip">
          <div className="space-y-6">
            <p className="text-4xl sm:text-6xl font-bold text-emerald-900">
              {messages.banner.primary_text}
            </p>
            <p className="text-2xl text-emerald-900">
              {messages.banner.description_text}
            </p>
            <a href={getDownloadLink()} target="_blank" rel="noreferrer">
              <Button
                size={"lg"}
                className="bg-yellow-600 text-white text-lg hover:bg-orange-400"
              >
                {messages.banner.button_text}
                <ArrowUpRight />
              </Button>
            </a>
          </div>

          <div className="flex gap-4 mt-8">
            <a href={getDownloadLink("ios")} target="_blank" rel="noreferrer">
              <Button
                variant={"outline"}
                className="bg-white text-emerald-900 border-2 border-emerald-900"
              >
                App Store
                <img
                  src={appStoreLogo}
                  alt="App Store"
                  className="w-4 h-4 ml-2"
                />
              </Button>
            </a>
            <a
              href={getDownloadLink("android")}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant={"outline"}
                className="bg-white text-emerald-900 border-2 border-emerald-900"
              >
                Google Play
                <img
                  src={googlePlayLogo}
                  alt="Google Play"
                  className="w-4 h-4 ml-2"
                />
              </Button>
            </a>
          </div>
        </div>
        <div className="hidden lg:block max-h-[500px]
        rounded-tr-4xl 
        overflow-hidden p-6 border bg-amber-200">
          <img src={bannerImage} alt="Banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

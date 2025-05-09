import { useLang } from "@/context/lang-context";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { getDownloadLink } from "@/lib/utils";
import appStoreLogo from "@/assets/images/apple-logo.svg";
import googlePlayLogo from "@/assets/images/googleplay.svg";
import { TransactionAnimation } from "@/components/TransactionAnimation";
import ShinyText from "@/components/ui/shiny-text";

const Banner = () => {
  const { messages } = useLang();

  return (
    <div data-lang-id="banner" className="mt-16">
      <div className="max-container flex flex-col lg:flex-row gap-8">
        <div className="p-6 rounded-4xl bg-white right-clip">
          <div className="space-y-6">
            <p className="text-4xl sm:text-5xl font-bold text-emerald-900">
              {messages.banner.primary_text}
            </p>
            <div className="text-2xl text-emerald-900">
              <ShinyText speedInMs={10000}>
                {messages.banner.description_text}
              </ShinyText>
            
            </div>
            <a href={getDownloadLink()} target="_blank" rel="noreferrer">
              <Button
                size={"lg"}
                className="bg-yellow-600 text-white text-lg hover:bg-orange-400"
              >
                <ShinyText speedInMs={5000}>
                  {messages.banner.button_text}
                </ShinyText>
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
                <ShinyText speedInMs={4000}>App Store</ShinyText>
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
                <ShinyText speedInMs={4000}>Google Play</ShinyText>
                <img
                  src={googlePlayLogo}
                  alt="Google Play"
                  className="w-4 h-4 ml-2"
                />
              </Button>
            </a>
          </div>
        </div>
        <TransactionAnimation />
      </div>
    </div>
  );
};

export default Banner;

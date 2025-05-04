import { useLang } from "@/context/lang-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getDownloadLink } from "@/lib/utils";


const Header  = ()=>{
    const { messages, langName, lang, setLang} = useLang();
    const downloadLink = getDownloadLink();
    return(
        <header data-lang-id="header"
             className="border-b border-emerald-100
             fixed top-0 left-0 right-0 z-50 bg-emerald-50 opacity-95
              ">
            <div className="max-container flex justify-between py-4">
                <div>
                    <h1 className="text-2xl font-bold text-emerald-900">
                        {messages.header.title}
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <Select defaultValue={lang} onValueChange={setLang}>
                        <SelectTrigger className="sm:w-[180px] w-[120px]">
                            <SelectValue placeholder={langName}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <a href={downloadLink} target="_blank" rel="noreferrer">
                        <Button className="bg-emerald-900 text-white hover:bg-emerald-800">
                            {messages.header.button_text}
                        </Button>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header
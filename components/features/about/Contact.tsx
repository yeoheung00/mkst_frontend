'use client';

import { Mail, Phone } from "@/components/icons";
import { Button } from "@/components/ui/Button";

export default function Contact() {
    return (
        <div className="w-fit flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText("010-6634-7955")} leftIcon={<Phone size="16px" />}>
                010-6634-7955
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText("yeoheung27@naver.com")} leftIcon={<Mail size="16px" />}>
                yeoheung27@naver.com
            </Button>
        </div>
    );
}

function CopiedToast() {
    return (
        <div className="absolute top-0 right-0 w-fit flex gap-2 items-center">
            <div className="flex-1 bg-green-100 rounded-full px-2 py-1">
                <span className="text-green-500">Copied</span>
            </div>
            <div className="bg-green-100 rounded-full px-2 py-1">
                <span className="text-green-500">✓</span>
            </div>
        </div>
    )
}
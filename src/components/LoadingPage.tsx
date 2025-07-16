// LoadingPage.tsx

import { Loader2 } from "lucide-react";

export default function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin" />
        </div>
    );
}
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function DisclaimerCard() {
    const disclaimerText = "We are a third-party facilitator. Services are provided after approval from authorized first-party institutions and facilitated strictly through official government portals. We do not sell insurance; we only assist in connecting customers with authorized insurers.";

    return (
        <Card className="bg-secondary">
            <CardHeader>
                <CardTitle className="flex items-center text-lg font-headline">
                    <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                    Important Disclaimer
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {disclaimerText}
                </p>
            </CardContent>
        </Card>
    );
}

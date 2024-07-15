import { Header } from "./header";
import { BackButton } from "./back-button";
import {
    Card,
    CardFooter,
    CardHeader
} from '@/components/ui/card';

export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label="Oops! Bir şeyler ters gitti !" />
            </CardHeader>
            <CardFooter>
                <BackButton
                label="Giriş ekranına geri dön"
                href="/auth/login"
                />
            </CardFooter>
        </Card>
    )
}
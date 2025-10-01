import PageWrapper from "@/components/PageWrapper";
import Lesson from "./Lesson";


export default function Page() {
    return (
        <PageWrapper page={<Lesson />} />
    )
}
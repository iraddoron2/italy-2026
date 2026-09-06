import { PageHeader, PageShell } from '@/components/layout/PageShell'
import { DocumentsAccordion } from './DocumentsAccordion'

export const metadata = {
    title: 'מסמכים',
}

export default function DocumentsPage() {
    return (
        <PageShell>
            <PageHeader
                title="מסמכים"
                description="כרטיסים, הזמנות ומסמכים חשובים לטיול."
            />
            <main className="flex flex-1 flex-col px-4 py-6">
                <DocumentsAccordion />
            </main>
        </PageShell>
    )
}

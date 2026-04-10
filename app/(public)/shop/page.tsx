import { Suspense } from 'react';
import Shop from '../../../_pages_legacy/Shop';

export default function Page() {
    return (
        <Suspense fallback={<div className="bg-background-light min-h-screen pt-20 flex justify-center items-center">Loading Shop...</div>}>
            <Shop />
        </Suspense>
    );
}

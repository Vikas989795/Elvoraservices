'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NavButtons() {
  const router = useRouter();

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Button variant="outline" asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" /> Home
        </Link>
      </Button>
    </div>
  );
}

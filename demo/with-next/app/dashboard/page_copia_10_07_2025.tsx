// app/page.tsx
import ClaimButton from '@/components/ClaimButton';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Token Claim CR7</h1>
      <ClaimButton />
    </div>
  );
}

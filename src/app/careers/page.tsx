import CareerForm from '@/components/forms/career-form';

export default function CareersPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Join Our Team</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We are always looking for talented individuals to join Elvora Services Enterprises. If you are passionate about helping people and simplifying complexities, we would love to hear from you.
        </p>
      </div>
      <div className="mt-12">
        <CareerForm />
      </div>
    </div>
  );
}

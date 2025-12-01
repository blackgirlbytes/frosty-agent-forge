import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ChallengePage } from '@/components/ChallengePage';
import { isChallengeUnlocked, CHALLENGE_TITLES, CHALLENGE_DATES } from '@/lib/challenge-utils';

interface PageProps {
  params: Promise<{
    day: string;
  }>;
  searchParams: Promise<{
    admin?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { day: dayParam } = await params;
  const day = parseInt(dayParam, 10);
  
  if (isNaN(day) || day < 1 || day > 17) {
    return {
      title: 'Challenge Not Found',
    };
  }

  const title = CHALLENGE_TITLES[day];
  const decemberDate = CHALLENGE_DATES[day];

  return {
    title: `${title} | Advent of AI`,
    description: `Day ${day} of Advent of AI - Unlock this challenge on December ${decemberDate} at noon ET`,
    openGraph: {
      title: `${title} | Advent of AI`,
      description: `Day ${day} of Advent of AI - Build your AI agent expertise`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Advent of AI`,
      description: `Day ${day} of Advent of AI`,
    },
  };
}

export async function generateStaticParams() {
  // Generate paths for all 17 days
  return Array.from({ length: 17 }, (_, i) => ({
    day: String(i + 1),
  }));
}

export default async function ChallengePageRoute({ params, searchParams }: PageProps) {
  const { day: dayParam } = await params;
  const { admin } = await searchParams;
  const day = parseInt(dayParam, 10);

  // Validate day parameter
  if (isNaN(day) || day < 1 || day > 17) {
    notFound();
  }

  // Check if challenge is unlocked (bypass if admin=true)
  const isAdmin = admin === 'true';
  const unlocked = isChallengeUnlocked(day);

  // If locked and not admin, redirect to home with a message
  if (!unlocked && !isAdmin) {
    redirect('/?locked=' + day);
  }

  return <ChallengePage day={day} />;
}
